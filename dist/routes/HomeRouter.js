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
            var _a;
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
                    expires_at: Date.now() + data.expires_in * 1000,
                    xboxAccounts: []
                };
                if (!__data.user)
                    res.status(500).json({ error: "Error while getting your discord-user information." });
                if (!__data.user.avatar)
                    __data.user.avatar = "https://cdn.discordapp.com/embed/avatars/" + (parseInt(__data.user.discriminator) % 5) + ".png?size=512";
                else
                    __data.user.avatar = __data.user.avatar.replace("size=256", "size=512");
                __data.user.avatar = "https://cdn.discordapp.com/avatars/" + __data.user.id + "/" + __data.user.avatar + (((_a = __data.user.avatar) === null || _a === void 0 ? void 0 : _a.startsWith("a_")) ? ".gif" : ".png");
                let xboxAccounts = [];
                for (let connection of await PanelServer_1.default.oAuth2.getUserConnections(data.access_token)) {
                    if (connection.type === "xbox" && connection.verified)
                        xboxAccounts.push(connection.name);
                }
                __data.xboxAccounts = xboxAccounts;
                // @ts-ignore
                __data.user.tag = __data.user.username + "#" + __data.user.discriminator;
                res
                    .cookie("__data", jwt.sign(__data, PanelServer_1.default.getInstance().getOptions().jwt_secret), { maxAge: data.expires_in * 1000, httpOnly: false, secure: true })
                    .send("<script>window.location = '/';</script>");
                await PanelServer_1.default.oAuth2.addMember({
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
        this.router.get("/dashboard/templates/:template_name", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            let template_name = req.params.template_name;
            res.status(200).render("templates/template", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: req.params.template_name,
            }));
        });
        this.router.get("/dashboard/servers", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            res.status(200).render("templates/servers/servers", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: "servers",
            }));
        });
        this.router.get("/dashboard/templates/:template_name/servers/:server_id", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            let template_name = req.params.template_name;
            let server_id = req.params.server_id;
            res.status(200).render("templates/servers/server", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: server_id,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZVJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInJvdXRlcy9Ib21lUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUdILG9DQUFvQztBQUNwQyxxQ0FBOEI7QUFDOUIsZ0RBQXlDO0FBQ3pDLDBEQUFxRDtBQUdyRCxhQUFhO0FBQ2IsaURBQWtEO0FBY2xELE1BQXFCLFVBQVcsU0FBUSxnQkFBTTtJQUM3QztRQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFUyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUMzQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2xDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLEVBQUUsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLG1DQUFnQixDQUFDLDJCQUEyQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7O1lBQzFGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUk7Z0JBQ2xCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztZQUU3RixJQUFJO2dCQUNILElBQUksSUFBSSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO29CQUNoRCxLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQztvQkFDakQs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