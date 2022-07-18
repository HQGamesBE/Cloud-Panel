"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const Router_1 = require("./Router");
const PanelServer_1 = require("../PanelServer");
const MiddlewareHolder_1 = require("../MiddlewareHolder");
// @ts-ignore
const Logger = require("cloud/src/utils/Logger");
class HomeRouter extends Router_1.default {
    constructor() {
        super("/");
    }
    register() {
        this.router.use((request, response, next) => {
            if (request.cookies["session_id"]) {
                response.clearCookie("session_id");
            }
            next();
        });
        this.router.get("/login", MiddlewareHolder_1.MiddlewareHolder.redirectDashboardIfLoggedIn, async (req, res) => {
            if (!req.query.code)
                return res.render("login", PanelServer_1.default.getInstance().getBasicOptions(req, { layout: false }));
            try {
                let data = await PanelServer_1.default.oAuth2.tokenRequest({
                    scope: ["identify", "guilds.join", "connections"],
                    grantType: "authorization_code",
                    // @ts-ignore
                    code: req.query.code
                });
                let __data = {
                    access_token: data.access_token,
                    user: await PanelServer_1.default.oAuth2.getUser(data.access_token),
                    token_type: data.token_type,
                    expires_at: Date.now() + data.expires_in * 1000,
                };
                if (!__data.user)
                    res.status(500).json({ error: "Error while getting your discord-user data." });
                //if (!__data.user.verified) return res.status(401).json({error: "Your Discord-Account isn't verified, please verify your Discord-Account first."});
                let xboxAccounts = [];
                for (let connection of await PanelServer_1.default.oAuth2.getUserConnections(data.access_token)) {
                    if (connection.type === "xbox" && connection.verified)
                        xboxAccounts.push(connection.name);
                }
                // @ts-ignore
                __data.xboxAccounts = xboxAccounts;
                // @ts-ignore
                __data.user.tag = __data.user.username + "#" + __data.user.discriminator;
                // @ts-ignore
                res
                    .cookie("__data", jwt.sign(__data, PanelServer_1.default.getInstance().getOptions().jwt_secret), { maxAge: data.expires_in * 1000, httpOnly: false, secure: true })
                    .send("<script>window.location = '/';</script>");
                await PanelServer_1.default.oAuth2.addMember({
                    // @ts-ignore
                    userId: __data.user.id,
                    guildId: CONFIG.guild_id,
                    botToken: CONFIG_PRIVATE.discord_token,
                    accessToken: data.access_token
                });
            }
            catch (e) {
                Logger.error(e);
                console.error(e);
                res.redirect("/login");
                //res.status(500).json({error: "An error occurred while logging in."});
            }
        });
        this.router.get("/logout", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            // @ts-ignore
            res.status(200).clearCookie("__data").redirect("/");
            // @ts-ignore
            PanelServer_1.default.oAuth2.revokeToken(req.__data.access_token);
        });
        this.router.get("/", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            res.status(301).redirect("/dashboard");
        });
        this.router.get("/dashboard", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            res.status(200).render("dashboard", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: "dashboard",
            }));
        });
        this.router.get("/dashboard/templates", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            res.status(200).render("templates/templates", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: "templates",
            }));
        });
        this.router.get("/dashboard/template/:template_name", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            let template_name = req.params.template_name;
            res.status(200).render("templates/template", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: req.params.template_name,
            }));
        });
        this.router.get("/dashboard/reports", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            res.status(200).render("templates/templates", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: "templates",
            }));
        });
        this.router.get("/dashboard/reports/:report_id", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            let report_id = req.params.report_id;
            res.status(200).render("reports/report", PanelServer_1.default.getInstance().getBasicOptions(req, {
                // @ts-ignore
                title_prefix: req.language.getValue("report_title_id", report_id),
            }));
        });
        this.router.get("/dashboard/replays", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            res.status(200).render("replays/replays", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: "replays",
            }));
        });
        this.router.get("/dashboard/replays/:replay_id", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            let replay_id = req.params.replay_id;
            res.status(200).render("players/player", PanelServer_1.default.getInstance().getBasicOptions(req, {
                // @ts-ignore
                title_prefix: req.language.getValue("replay_title_id", replay_id),
            }));
        });
        this.router.get("/dashboard/players", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            res.status(200).render("players/players", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: "players",
            }));
        });
        this.router.get("/dashboard/players/:gamertag", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            let gamertag = req.params.gamertag;
            res.status(200).render("players/player", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: gamertag,
            }));
        });
    }
}
exports.default = HomeRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZVJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvSG9tZVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFHSCxvQ0FBb0M7QUFDcEMscUNBQThCO0FBQzlCLGdEQUF5QztBQUN6QywwREFBcUQ7QUFHckQsYUFBYTtBQUNiLGlEQUFrRDtBQWNsRCxNQUFxQixVQUFXLFNBQVEsZ0JBQU07SUFDN0M7UUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRVMsUUFBUTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUNsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxFQUFFLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxtQ0FBZ0IsQ0FBQywyQkFBMkIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzFGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUk7Z0JBQ2xCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztZQUU3RixJQUFJO2dCQUNILElBQUksSUFBSSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO29CQUNoRCxLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQztvQkFD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