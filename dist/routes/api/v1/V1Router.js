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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVjFSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJyb3V0ZXMvYXBpL3YxL1YxUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUVILHlDQUFrQztBQUNsQyxzREFBK0M7QUFDL0MscURBQThDO0FBRTlDLE1BQXFCLFFBQVMsU0FBUSxnQkFBTTtJQUMzQztRQUNDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSx3QkFBYyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVTLFFBQVE7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ3pDLE9BQU87d0JBQ04sR0FBRyxFQUFFLEdBQUcscUJBQVcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFO3FCQUNoRixDQUFDO2dCQUNILENBQUMsQ0FBQzthQUNGLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNEO0FBakJELDJCQWlCQyJ9