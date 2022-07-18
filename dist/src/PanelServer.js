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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuZWxTZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvUGFuZWxTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztHQUlHO0FBQ0gsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFDbEMsOEJBQThCO0FBQzlCLDJEQUFnRTtBQUNoRSxhQUFhO0FBQ2Isb0RBQXFEO0FBQ3JELDhDQUErQztBQUMvQyxnRUFBeUQ7QUFDekQsZ0RBQWlEO0FBeUJqRCxNQUFxQixXQUFXO0lBUy9CLFlBQVksT0FBMkI7UUFDdEMsSUFBSSxXQUFXLENBQUMsUUFBUTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN4RSxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7WUFBRSxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUM5QyxhQUFhO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMzRixXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDO1lBQ3RDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNsQyxZQUFZLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZO1lBQzFDLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFFB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