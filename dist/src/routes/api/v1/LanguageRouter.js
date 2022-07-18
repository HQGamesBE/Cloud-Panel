"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../../Router");
const LanguageManager_1 = require("../../../language/LanguageManager");
class LanguageRouter extends Router_1.default {
    constructor() {
        super("/language");
    }
    register() {
        this.router.all("/list", (req, res) => {
            res.json({
                status: "ok",
                languages: LanguageManager_1.default.getLanguages(),
            });
        });
        this.router.post("/reload", (req, res) => {
            LanguageManager_1.default.getInstance().reloadLanguages();
            res.status(200).json({ status: "ok" });
        });
    }
}
exports.default = LanguageRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2VSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvcm91dGVzL2FwaS92MS9MYW5ndWFnZVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCx5Q0FBa0M7QUFDbEMsdUVBQWdFO0FBRWhFLE1BQXFCLGNBQWUsU0FBUSxnQkFBTTtJQUNqRDtRQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRVMsUUFBUTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDUixNQUFNLEVBQUUsSUFBSTtnQkFDWixTQUFTLEVBQUUseUJBQWUsQ0FBQyxZQUFZLEVBQUU7YUFDekMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDeEMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUVEO0FBbEJELGlDQWtCQyJ9