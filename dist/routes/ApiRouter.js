"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./Router");
const V1Router_1 = require("./api/v1/V1Router");
const fs = require("node:fs");
const discord_js_1 = require("discord.js");
const PanelServer_1 = require("../PanelServer");
class ApiRouter extends Router_1.default {
    constructor() {
        super("/api", new V1Router_1.default());
    }
    register() {
        this.router.get("/", (req, res) => {
            let versions = new discord_js_1.Collection();
            for (let filename of fs.readdirSync(__dirname + "/api")) {
                if (!filename.startsWith("v"))
                    continue;
                versions.set(filename, `${PanelServer_1.default.getBaseUrl()}${this.getBaseUrl()}/${filename}`);
            }
            res.status(200).json({
                status: "ok",
                versions: Object.fromEntries(versions),
            });
        });
    }
}
exports.default = ApiRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpUm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsicm91dGVzL0FwaVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCxxQ0FBOEI7QUFDOUIsZ0RBQXlDO0FBQ3pDLDhCQUE4QjtBQUM5QiwyQ0FBc0M7QUFDdEMsZ0RBQXlDO0FBRXpDLE1BQXFCLFNBQVUsU0FBUSxnQkFBTTtJQUM1QztRQUNDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxrQkFBUSxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRVMsUUFBUTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDakMsSUFBSSxRQUFRLEdBQUcsSUFBSSx1QkFBVSxFQUFrQixDQUFDO1lBQ2hELEtBQUssSUFBSSxRQUFRLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEVBQUU7Z0JBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztvQkFBRSxTQUFTO2dCQUN4QyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLHFCQUFXLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDdkY7WUFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDcEIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osUUFBUSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2FBQ3RDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNEO0FBbEJELDRCQWtCQyJ9