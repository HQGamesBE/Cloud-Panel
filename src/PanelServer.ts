/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
import * as express from 'express';
import * as http from 'http';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { engine as handlebarsEngine } from 'express-handlebars';
// @ts-ignore
import Logger = require("cloud/src/utils/Logger.js");
import cookieParser = require("cookie-parser");
import {LanguageManager} from "./language/LanguageManager";
import DiscordOauth2 = require("discord-oauth2");
import {Language} from "./language/Language";
import * as Discord from "discord.js";

type ServerVisibility = "Public" | "Private";
type ServerState = "Online" | "Offline" | "Starting";
type GameState = "Lobby" | "Starting" | "Running" | "Ending";
type ServerType = "Lobby" | "Game" | "Builder" | "Developer";

declare var bot: Discord.Client;
declare var CONFIG: any;
declare var CONFIG_PRIVATE: any;

interface PanelServerOptions {
	host: string;
	jwt_secret: string;
	port: number;/*
	database?: {
		database: string;
		user: string;
		password: string;
		host: string;
		port: number;
	}*/
	discord: {
		clientId: string;
		clientSecret: string;
	}
}

export interface Template{
	enabled: boolean;
	name: string;
	display_name: string;
	type: ServerType;
	maintained: boolean;
	image: null|string;
	readonly start_amount: number;
	max_players: number;
	player_minimum_percent: number;
	player_maximum_percent: number;
	folder: string;
}

export interface Server {
	container: any;
	query_running: boolean;
	created: number;
	query_fails: number;
	visibility: ServerVisibility;
	online_state: ServerState;
	player_count: number;
	running: boolean;
	killed: boolean;

	constructor(template: Template, identifier: string, port: number): void;
	boot(): void;
	stop(): void;
	kill(): void;
	deleteFiles(command: string): void;
	query(): Promise<boolean>;
	executeCommandInContainer(command: string): void;
	executeCommand(command: string): void;
}

export default class PanelServer {
	private static instance: PanelServer;
	readonly options: PanelServerOptions;
	readonly app: express.Application;
	readonly server: http.Server;
	static readonly publicFolder: string = path.join(__dirname, "../public");
	static oAuth2: DiscordOauth2;
	readonly DOMAIN: string;

	constructor(options: PanelServerOptions) {
		if (PanelServer.instance) throw new Error("PanelServer is a singleton");
		PanelServer.instance = this;
		if (!options) throw new Error("Options are undefined");
		if (!options.host) options.host = "127.0.0.1";
		// @ts-ignore
		this.DOMAIN = (TESTING ? "http://localhost:" + options.port : "https://cloud.hqgames.net");
		PanelServer.oAuth2 = new DiscordOauth2({
			version: "v9",
			clientId: options.discord.clientId,
			clientSecret: options.discord.clientSecret,
			credentials: Buffer.from(`${options.discord.clientId}:${options.discord.clientSecret}`).toString("base64"),
			// @ts-ignore
			scope: [
				"identify",
				"guilds.join",
				"connections"
			],
			redirectUri: (this.DOMAIN + "/login")
		})
		this.options = options;
		this.app = express();
		this.app.set('port', PanelServer.normalizePort(this.options.port));
		this.server = http.createServer(this.app);
		this.init();
	}

	static getInstance(): PanelServer {
		if (!PanelServer.instance) throw new Error("PanelServer is not initialized");
		return PanelServer.instance;
	}

	static getBaseUrl(): string {
		if (process.platform === "win32") return "http://localhost:" + PanelServer.getInstance().options.port;
		else if (process.platform === "darwin") throw new Error("MacOS is not supported");
		else return "https://cloud.hqgames.net";
	}

	getLoggerPrefix() {
		// @ts-ignore
		return "[".gray + "Panel".green + "]".gray;
	}

	log(content: any) {
		Logger.class(this, content);
	}

	private init(): void {
		this.server.on("error", (err) => this.onError(err));
		this.server.on("listening", () => this.onListening());

		this.app.set("views", path.join(__dirname, "../views"));
		this.app.set("view engine", "hbs");

		this.app.engine("hbs", handlebarsEngine({
			layoutsDir: path.join(__dirname, "../views/layouts"),
			extname: "hbs",
			defaultLayout: "main"
		}));

		this.app.use(express.json());
		this.app.use(express.urlencoded({extended: false}));
		this.app.use(cookieParser());
		this.app.use("/public", express.static(PanelServer.publicFolder));

		this.app.disable("x-powered-by");

		this.registerErrorHandlers();
		this.registerRoutes();
	}

	start(): void {
		Logger.info("Starting server...");
		this.server.listen(PanelServer.normalizePort(this.options.port), this.options.host);
	}

	stop() {
		this.server.close();
	}

	private registerErrorHandlers(): void{
		this.app.use(function (req, res, next) {
			try {
				next();
			} catch (e) {
				console.error(e);
			}
		});
		this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
			console.error(err.stack);
			res.status(500).render("error", {error: err, title_prefix: "Error"});
		}.bind(this));
	}

	private registerRoutes(): void {
		let routesFolder = path.join(__dirname, "routes");
		let files = fs.readdirSync(routesFolder);
		for (let file of files) {
			if (file.startsWith("Router.")) continue;
			let filePath = path.join(routesFolder, file);
			let stat = fs.statSync(filePath);
			if (stat.isFile()) {
				let route = new (require(filePath).default)();
				this.app.use(route.getPath(), route.getRouter());
				this.log(`Registering route ${route.getPath()}`);
			}
		}
	}

	private onListening(): void {
		let addr = this.server.address();
		if (!addr) throw new Error("Address is undefined");
		let bind = (typeof addr === "string") ? `pipe ${addr}` : `http://${addr.address}:${addr.port}`;
		this.log("Listening on " + bind);
	}

	private onError(error: NodeJS.ErrnoException): void {
		if (error.syscall !== "listen") throw error;
		let bind = "Port " + this.options.port;
		switch (error.code) {
			case "EACCES":
				console.error(`${bind} requires elevated privileges`);
				process.exit(1);
				break;
			case "EADDRINUSE":
				console.error(`${bind} is already in use`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	}

	private static normalizePort(port: number | string): number {
		if (typeof port === "string") port = parseInt(port, 10);
		if (isNaN(port)) return port;
		if (port >= 0 && port <= 65535) return port;
		throw new Error("Port is out of range");
	}

	getApp(): express.Application {
		return this.app;
	}

	getServer(): http.Server {
		return this.server;
	}

	getOptions(): PanelServerOptions {
		return this.options;
	}

	getBasicOptions(req: express.Request, base: Object = {}): Object{
		let lang: Language = LanguageManager.getLanguageFromRequest(req);
		// @ts-ignore
		if (base.title_prefix) base.title_prefix = lang.getValue(base.title_prefix);
		let obj = {
			...base,
			...{
				// @ts-ignore
				loggedIn: !!req.__data,
				// @ts-ignore
				__data: req.__data,
				loginLink: PanelServer.oAuth2.generateAuthUrl({scope: ["identify", "guilds.join", "connections"]}),
				language: {
					name: lang.getName(),
					globalName: lang.getGlobalName(),
					emoji: lang.getEmoji(),
				},
				lang: Object.fromEntries(lang.getValues())
			}
		};
		return obj;
	}
}

