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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2VSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJyb3V0ZXMvYXBpL3YxL0xhbmd1YWdlUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUVILHlDQUFrQztBQUNsQyx1RUFBZ0U7QUFFaEUsTUFBcUIsY0FBZSxTQUFRLGdCQUFNO0lBQ2pEO1FBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFUyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVMsRUFBRSx5QkFBZSxDQUFDLFlBQVksRUFBRTthQUN6QyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN4Qyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBRUQ7QUFsQkQsaUNBa0JDIn0=