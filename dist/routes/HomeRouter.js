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
                    refresh_token: data.refresh_token,
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
                    .cookie("__data", jwt.sign(__data, PanelServer_1.default.getInstance().getOptions().jwt_secret), { maxAge: data.expires_in, httpOnly: true })
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
        this.router.get("/", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            res.status(200).render("dashboard", PanelServer_1.default.getInstance().getBasicOptions(req, {
                title_prefix: "dashboard",
            }));
        });
        this.router.get("/logout", MiddlewareHolder_1.MiddlewareHolder.checkForLogin, (req, res) => {
            // @ts-ignore
            res.status(200).clearCookie("__data").redirect("/");
            // @ts-ignore
            PanelServer_1.default.oAuth2.revokeToken(req.__data.access_token);
        });
    }
}
exports.default = HomeRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZVJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInJvdXRlcy9Ib21lUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUdILG9DQUFvQztBQUNwQyxxQ0FBOEI7QUFDOUIsZ0RBQXlDO0FBQ3pDLDBEQUFxRDtBQUdyRCxhQUFhO0FBQ2IsaURBQWtEO0FBY2xELE1BQXFCLFVBQVcsU0FBUSxnQkFBTTtJQUM3QztRQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFUyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUMzQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2xDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLEVBQUUsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLG1DQUFnQixDQUFDLDJCQUEyQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDMUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSTtnQkFDbEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdGLElBQUk7Z0JBQ0gsSUFBSSxJQUFJLEdBQUcsTUFBTSxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7b0JBQ2hELEtBQUssRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDO29CQUNqRCxT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