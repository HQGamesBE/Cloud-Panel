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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpUm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic3JjL3JvdXRlcy9BcGlSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7O0FBRUgscUNBQThCO0FBQzlCLGdEQUF5QztBQUN6Qyw4QkFBOEI7QUFDOUIsMkNBQXNDO0FBQ3RDLGdEQUF5QztBQUV6QyxNQUFxQixTQUFVLFNBQVEsZ0JBQU07SUFDNUM7UUFDQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksa0JBQVEsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVTLFFBQVE7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLElBQUksUUFBUSxHQUFHLElBQUksdUJBQVUsRUFBa0IsQ0FBQztZQUNoRCxLQUFLLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxFQUFFO2dCQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7b0JBQUUsU0FBUztnQkFDeEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxxQkFBVyxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZGO1lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQzthQUN0QyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQWxCRCw0QkFrQkMifQ==