"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../../Router");
const PanelServer_1 = require("../../../PanelServer");
const LanguageRouter_1 = require("./LanguageRouter");
class V1Router extends Router_1.default {
    constructor() {
        super("/v1", new LanguageRouter_1.default);
    }
    register() {
        this.router.get("/", (req, res) => {
            res.json({
                status: "ok",
                routes: this.nestedRouters.map((router) => {
                    return {
                        url: `${PanelServer_1.default.getBaseUrl()}/api${this.getBaseUrl()}${router.getBaseUrl()}`
                    };
                })
            });
        });
    }
}
exports.default = V1Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVjFSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvcm91dGVzL2FwaS92MS9WMVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCx5Q0FBa0M7QUFDbEMsc0RBQStDO0FBQy9DLHFEQUE4QztBQUU5QyxNQUFxQixRQUFTLFNBQVEsZ0JBQU07SUFDM0M7UUFDQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksd0JBQWMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFUyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN6QyxPQUFPO3dCQUNOLEdBQUcsRUFBRSxHQUFHLHFCQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRTtxQkFDaEYsQ0FBQztnQkFDSCxDQUFDLENBQUM7YUFDRixDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQWpCRCwyQkFpQkMifQ==