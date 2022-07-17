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
import LanguageManager from "./language/LanguageManager";

interface PanelServerOptions {
	host: string;
	jwt_secret: string;
	port: number;
	database?: {
		database: string;
		user: string;
		password: string;
		host: string;
		port: number;
	}
}

export default class PanelServer {
	private static instance: PanelServer;
	readonly options: PanelServerOptions;
	readonly app: express.Application;
	readonly server: http.Server;
	static readonly publicFolder: string = path.join(__dirname, "../public");

	constructor(options: PanelServerOptions) {
		if (PanelServer.instance) throw new Error("PanelServer is a singleton");
		PanelServer.instance = this;
		if (!options) throw new Error("Options are undefined");
		if (!options.host) options.host = "127.0.0.1";
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

	registerRoutes(): void {
		let routesFolder = path.join(__dirname, "routes");
		let files = fs.readdirSync(routesFolder);
		for (let file of files) {
			if (file.startsWith("Router.")) continue;
			let filePath = path.join(routesFolder, file);
			let stat = fs.statSync(filePath);
			if (stat.isFile()) {
				console.log(filePath)
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

	getBasicOptions(req: express.Request, base: Object): Object{
		let lang = LanguageManager.getLanguageFromRequest(req);
		return {
			...base,
			...{
				language: {
					name: lang.getName(),
					globalName: lang.getGlobalName(),
					emoji: lang.getEmoji(),
				},
				lang: Object.fromEntries(lang.getValues()),
				port: this.options.port
			}
		};
	}
}

