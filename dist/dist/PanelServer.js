"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
const express = require("express");
const http = require("http");
const path = require("node:path");
const fs = require("node:fs");
const express_handlebars_1 = require("express-handlebars");
// @ts-ignore
const Logger = require("cloud/src/utils/Logger.js");
const cookieParser = require("cookie-parser");
const LanguageManager_1 = require("./language/LanguageManager");
const DiscordOauth2 = require("discord-oauth2");
class PanelServer {
    constructor(options) {
        if (PanelServer.instance)
            throw new Error("PanelServer is a singleton");
        PanelServer.instance = this;
        if (!options)
            throw new Error("Options are undefined");
        if (!options.host)
            options.host = "127.0.0.1";
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
        });
        this.options = options;
        this.app = express();
        this.app.set('port', PanelServer.normalizePort(this.options.port));
        this.server = http.createServer(this.app);
        this.init();
    }
    static getInstance() {
        if (!PanelServer.instance)
            throw new Error("PanelServer is not initialized");
        return PanelServer.instance;
    }
    static getBaseUrl() {
        if (process.platform === "win32")
            return "http://localhost:" + PanelServer.getInstance().options.port;
        else if (process.platform === "darwin")
            throw new Error("MacOS is not supported");
        else
            return "https://cloud.hqgames.net";
    }
    getLoggerPrefix() {
        // @ts-ignore
        return "[".gray + "Panel".green + "]".gray;
    }
    log(content) {
        Logger.class(this, content);
    }
    init() {
        this.server.on("error", (err) => this.onError(err));
        this.server.on("listening", () => this.onListening());
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set("view engine", "hbs");
        this.app.engine("hbs", (0, express_handlebars_1.engine)({
            layoutsDir: path.join(__dirname, "../views/layouts"),
            extname: "hbs",
            defaultLayout: "main"
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use("/public", express.static(PanelServer.publicFolder));
        this.app.disable("x-powered-by");
        this.registerErrorHandlers();
        this.registerRoutes();
    }
    start() {
        Logger.info("Starting server...");
        this.server.listen(PanelServer.normalizePort(this.options.port), this.options.host);
    }
    stop() {
        this.server.close();
    }
    registerErrorHandlers() {
        this.app.use(function (req, res, next) {
            try {
                next();
            }
            catch (e) {
                console.error(e);
            }
        });
        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.status(500).render("error", { error: err, title_prefix: "Error" });
        }.bind(this));
    }
    registerRoutes() {
        let routesFolder = path.join(__dirname, "routes");
        let files = fs.readdirSync(routesFolder);
        for (let file of files) {
            if (file.startsWith("Router."))
                continue;
            let filePath = path.join(routesFolder, file);
            let stat = fs.statSync(filePath);
            if (stat.isFile()) {
                let route = new (require(filePath).default)();
                this.app.use(route.getPath(), route.getRouter());
                this.log(`Registering route ${route.getPath()}`);
            }
        }
    }
    onListening() {
        let addr = this.server.address();
        if (!addr)
            throw new Error("Address is undefined");
        let bind = (typeof addr === "string") ? `pipe ${addr}` : `http://${addr.address}:${addr.port}`;
        this.log("Listening on " + bind);
    }
    onError(error) {
        if (error.syscall !== "listen")
            throw error;
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
    static normalizePort(port) {
        if (typeof port === "string")
            port = parseInt(port, 10);
        if (isNaN(port))
            return port;
        if (port >= 0 && port <= 65535)
            return port;
        throw new Error("Port is out of range");
    }
    getApp() {
        return this.app;
    }
    getServer() {
        return this.server;
    }
    getOptions() {
        return this.options;
    }
    getBasicOptions(req, base = {}) {
        let lang = LanguageManager_1.default.getLanguageFromRequest(req);
        // @ts-ignore
        if (base.title_prefix)
            base.title_prefix = lang.getValue(base.title_prefix);
        let obj = {
            ...base,
            ...{
                // @ts-ignore
                loggedIn: !!req.__data,
                // @ts-ignore
                __data: req.__data,
                loginLink: PanelServer.oAuth2.generateAuthUrl({ scope: ["identify", "guilds.join", "connections"] }),
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
exports.default = PanelServer;
PanelServer.publicFolder = path.join(__dirname, "../public");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuZWxTZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkaXN0L1BhbmVsU2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlEOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUIsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMzRCxhQUFhO0FBQ2IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDcEQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzlDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDaEUsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDaEQsTUFBTSxXQUFXO0lBQ2IsWUFBWSxPQUFPO1FBQ2YsSUFBSSxXQUFXLENBQUMsUUFBUTtZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDbEQsV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU87WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ2IsT0FBTyxD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