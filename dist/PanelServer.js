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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuZWxTZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJQYW5lbFNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0dBSUc7QUFDSCxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBQzdCLGtDQUFrQztBQUNsQyw4QkFBOEI7QUFDOUIsMkRBQWdFO0FBQ2hFLGFBQWE7QUFDYixvREFBcUQ7QUFDckQsOENBQStDO0FBQy9DLGdFQUF5RDtBQUN6RCxnREFBaUQ7QUF5QmpELE1BQXFCLFdBQVc7SUFTL0IsWUFBWSxPQUEyQjtRQUN0QyxJQUFJLFdBQVcsQ0FBQyxRQUFRO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3hFLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUFFLE9BQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBQzlDLGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQzNGLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFhLENBQUM7WUFDdEMsT0FBTyxFQUFFLElBQUk7WUFDYixRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRO1lBQ2xDLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVk7WUFDMUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxD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