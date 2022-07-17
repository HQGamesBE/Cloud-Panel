"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../../Router");
class V1Router extends Router_1.default {
    constructor() {
        super("/v1");
    }
    register() {
        this.router.get("/", (req, res) => {
            res.json({
                status: "ok",
                version: "1.0.0",
            });
        });
    }
}
exports.default = V1Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVjFSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJyb3V0ZXMvYXBpL3YxL1YxUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUVILHlDQUFrQztBQUVsQyxNQUFxQixRQUFTLFNBQVEsZ0JBQU07SUFDM0M7UUFDQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRVMsUUFBUTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDUixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsT0FBTzthQUNoQixDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQWJELDJCQWFDIn0=