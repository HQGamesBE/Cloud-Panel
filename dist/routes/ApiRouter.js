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
class ApiRouter extends Router_1.default {
    constructor() {
        super("/api", new V1Router_1.default());
    }
    register() {
        this.router.get("/", (req, res) => {
            res.json({
                status: "ok",
                versions: fs.readdirSync(__dirname + "/api").map(filename => {
                    if (!filename.startsWith("v"))
                        return;
                    return {
                        version: filename,
                        url: `http://localhost:1111/${this.getBaseUrl()}/${filename.substring(1)}`,
                    };
                }),
            });
        });
    }
}
exports.default = ApiRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpUm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsicm91dGVzL0FwaVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCxxQ0FBOEI7QUFDOUIsZ0RBQXlDO0FBQ3pDLDhCQUE4QjtBQUU5QixNQUFxQixTQUFVLFNBQVEsZ0JBQU07SUFDNUM7UUFDQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksa0JBQVEsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVTLFFBQVE7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osUUFBUSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO3dCQUFFLE9BQU87b0JBQ3RDLE9BQU87d0JBQ04sT0FBTyxFQUFFLFFBQVE7d0JBQ2pCLEdBQUcsRUFBRSx5QkFBeUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7cUJBQzFFLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUFuQkQsNEJBbUJDIn0=