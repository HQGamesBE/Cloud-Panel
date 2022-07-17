/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import * as Discord from "discord.js";
import * as jwt from "jsonwebtoken";
import Router from "./Router";
import PanelServer from "../PanelServer";
import {MiddlewareHolder} from "../MiddlewareHolder";
import {Connection, User} from "discord-oauth2";

// @ts-ignore
import Logger = require("cloud/src/utils/Logger");

declare var bot: Discord.Client;
declare var CONFIG: any;
declare var CONFIG_PRIVATE: any;

interface DiscordSessionData {
	user: User;
	connections: Connection[];
	accessToken: string;
	refreshToken: string;
	expires_in: number;
}

export default class HomeRouter extends Router {
	constructor() {
		super("/");
	}

	protected register(): void {
		this.router.use((request, response, next) => {
			if (request.cookies["session_id"]) {
				response.clearCookie("session_id");
			}
			next();
		});
		this.router.get("/login", MiddlewareHolder.redirectDashboardIfLoggedIn, async (req, res) => {
			if (!req.query.code)
				return res.render("login", PanelServer.getInstance().getBasicOptions(req, {layout: false}));

			try {
				let data = await PanelServer.oAuth2.tokenRequest({
					scope: ["identify", "guilds.join", "connections"],
					grantType: "authorization_code",
					// @ts-ignore
					code: req.query.code
				});
				let __data = {
					access_token: data.access_token,
					user: await PanelServer.oAuth2.getUser(data.access_token),
					token_type: data.token_type,
					expires_at: Date.now() + data.expires_in * 1000,
					refresh_token: data.refresh_token,
				};
				if (!__data.user) res.status(500).json({error: "Error while getting your discord-user data."});
				//if (!__data.user.verified) return res.status(401).json({error: "Your Discord-Account isn't verified, please verify your Discord-Account first."});
				let xboxAccounts = [];
				for (let connection of await PanelServer.oAuth2.getUserConnections(data.access_token)) {
					if (connection.type === "xbox" && connection.verified) xboxAccounts.push(connection.name);
				}

				// @ts-ignore
				__data.xboxAccounts = xboxAccounts;
				// @ts-ignore
				__data.user.tag = __data.user.username + "#" + __data.user.discriminator;
				// @ts-ignore
				res
					.cookie("__data", jwt.sign(__data, PanelServer.getInstance().getOptions().jwt_secret), {maxAge: data.expires_in, httpOnly: true})
					.send("<script>window.location = '/';</script>")
				;

				await PanelServer.oAuth2.addMember({
					// @ts-ignore
					userId: __data.user.id,
					guildId: CONFIG.guild_id,
					botToken: CONFIG_PRIVATE.discord_token,
					accessToken: data.access_token
				});
			} catch (e) {
				Logger.error(e);
				console.error(e);
				res.redirect("/login");
				//res.status(500).json({error: "An error occurred while logging in."});
			}
		});
		this.router.get("/", MiddlewareHolder.checkForLogin, (req, res) => {
			res.status(200).render("dashboard", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: "dashboard",
			}));
		});
		this.router.get("/logout", MiddlewareHolder.checkForLogin, (req, res) => {
			// @ts-ignore
			res.status(200).clearCookie("__data").redirect("/");
			// @ts-ignore
			PanelServer.oAuth2.revokeToken(req.__data.access_token);
		});
	}
}