/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const Router_1 = require("./Router");
const PanelServer_1 = require("../PanelServer");
// @ts-ignore
const Logger = require("cloud/src/utils/Logger");
class HomeRouter extends Router_1.default {
    constructor() {
        super("/");
    }
    register() {
        this.router.use(session({
            key: "session_id",
            secret: PanelServer_1.default.getInstance().getOptions().jwt_secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                // @ts-ignore
                expires: 1000 * 60 * 60, //1 day
            },
        }));
        this.router.use((request, response, next) => {
            if (request.cookies["session_id"]) {
                response.clearCookie("session_id");
            }
            next();
        });
        this.router.get("/", (req, res) => {
            res.status(200).render("dashboard", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: "Dashboard",
            }));
        });
        this.router.get("/login", (req, res) => {
            res.status(200).render("login", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: "Login",
            }));
        });
        this.router.get("/logout", (req, res) => {
            if (!req.session) {
                res.status(200).redirect("/login");
                return;
            }
            req.session.destroy((err) => {
                if (err)
                    Logger.error(err);
            });
            res.clearCookie("session_id");
            res.redirect("/login");
        });
    }
}
exports.default = HomeRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZVJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInJvdXRlcy9Ib21lUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUVILDJDQUE0QztBQUM1QyxxQ0FBOEI7QUFDOUIsZ0RBQXlDO0FBQ3pDLGFBQWE7QUFDYixpREFBa0Q7QUFFbEQsTUFBcUIsVUFBVyxTQUFRLGdCQUFNO0lBQzdDO1FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVTLFFBQVE7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLEdBQUcsRUFBRSxZQUFZO1lBQ2pCLE1BQU0sRUFBRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLFVBQVU7WUFDekQsTUFBTSxFQUFFLEtBQUs7WUFDYixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLE1BQU0sRUFBRTtnQkFDUCxhQUFhO2dCQUNiLE9BQU8sRUFBRSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPO2FBQ2hDO1NBQ0QsQ0FBQyxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFFLFlBQVksQ0FBRSxFQUFFO2dCQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxFQUFFLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO2dCQUNsRixZQUFZLEVBQUUsV0FBVzthQUN6QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3RDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7Z0JBQzlFLFlBQVksRUFBRSxPQUFPO2FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPO2FBQ1A7WUFDRCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUMzQixJQUFJLEdBQUc7b0JBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQTVDRCw2QkE0Q0MifQ==