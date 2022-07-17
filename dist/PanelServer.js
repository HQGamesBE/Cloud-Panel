/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

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
class PanelServer {
    constructor(options) {
        if (PanelServer.instance)
            throw new Error("PanelServer is a singleton");
        PanelServer.instance = this;
        if (!options)
            throw new Error("Options are undefined");
        if (!options.host)
            options.host = "127.0.0.1";
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
                console.log(filePath);
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
    getBasicOptions(req, base) {
        let lang = LanguageManager_1.default.getLanguageFromRequest(req);
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
exports.default = PanelServer;
PanelServer.publicFolder = path.join(__dirname, "../public");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuZWxTZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJQYW5lbFNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0dBSUc7QUFDSCxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBQzdCLGtDQUFrQztBQUNsQyw4QkFBOEI7QUFDOUIsMkRBQWdFO0FBQ2hFLGFBQWE7QUFDYixvREFBcUQ7QUFDckQsOENBQStDO0FBQy9DLGdFQUF5RDtBQWV6RCxNQUFxQixXQUFXO0lBTy9CLFlBQVksT0FBMkI7UUFDdEMsSUFBSSxXQUFXLENBQUMsUUFBUTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN4RSxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7WUFBRSxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNLENBQUMsV0FBVztRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDN0UsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRCxlQUFlO1FBQ2QsYUFBYTtRQUNiLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUVELEdBQUcsQ0FBQyxPQUFZO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVPLElBQUk7UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFBLDJCQUFnQixFQUFDO1lBQ3ZDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQztZQUNwRCxPQUFPLEVBQUUsS0FBSztZQUNkLGFBQWEsRUFBRSxNQUFNO1NBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUs7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELElBQUk7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxxQkFBcUI7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDcEMsSUFBSTtnQkFDSCxJQUFJLEVBQUUsQ0FBQzthQUNQO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQjtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFRLEVBQUUsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO1lBQ3RHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELGNBQWM7UUFDYixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQUUsU0FBUztZQUN6QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNqRDtTQUNEO0lBQ0YsQ0FBQztJQUVPLFdBQVc7UUFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNuRCxJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9GLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyxPQUFPLENBQUMsS0FBNEI7UUFDM0MsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVE7WUFBRSxNQUFNLEtBQUssQ0FBQztRQUM1QyxJQUFJLElBQUksR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDdkMsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ25CLEtBQUssUUFBUTtnQkFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSwrQkFBK0IsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNO1lBQ1AsS0FBSyxZQUFZO2dCQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNO1lBQ1A7Z0JBQ0MsTUFBTSxLQUFLLENBQUM7U0FDYjtJQUNGLENBQUM7SUFFTyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQXFCO1FBQ2pELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtZQUFFLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzdCLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsTUFBTTtRQUNMLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRUQsU0FBUztRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVTtRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQixDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQW9CLEVBQUUsSUFBWTtRQUNqRCxJQUFJLElBQUksR0FBRyx5QkFBZSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELE9BQU87WUFDTixHQUFHLElBQUk7WUFDUCxHQUFHO2dCQUNGLFFBQVEsRUFBRTtvQkFDVCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDcEIsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO2lCQUN0QjtnQkFDRCxJQUFJLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7YUFDdkI7U0FDRCxDQUFDO0lBQ0gsQ0FBQzs7QUF6SkYsOEJBMEpDO0FBckpnQix3QkFBWSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDIn0=