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
				let __data: {
					access_token: string;
					user: User;
					expires_at: number;
					xboxAccounts: string[];
				} = {
					access_token: data.access_token,
					user: await PanelServer.oAuth2.getUser(data.access_token),
					expires_at: Date.now() + data.expires_in * 1000,
					xboxAccounts: []
				};
				if (!__data.user) res.status(500).json({error: "Error while getting your discord-user information."});

				if (!__data.user.avatar) __data.user.avatar = "https://cdn.discordapp.com/embed/avatars/" + (parseInt(__data.user.discriminator) %5) + ".png?size=512";
				else __data.user.avatar = __data.user.avatar = "https://cdn.discordapp.com/avatars/" + __data.user.id + "/" + __data.user.avatar + (__data.user.avatar?.startsWith("a_") ? ".gif" : ".png");

				let xboxAccounts = [];
				for (let connection of await PanelServer.oAuth2.getUserConnections(data.access_token)) {
					if (connection.type === "xbox" && connection.verified) xboxAccounts.push(connection.name);
				}

				__data.xboxAccounts = xboxAccounts;
				// @ts-ignore
				__data.user.tag = __data.user.username + "#" + __data.user.discriminator;
				res
					.cookie("__data", jwt.sign(__data, PanelServer.getInstance().getOptions().jwt_secret), {maxAge: data.expires_in * 1000, httpOnly: false, secure: true})
					.send("<script>window.location = '/';</script>")
				;

				await PanelServer.oAuth2.addMember({
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
		this.router.get("/logout", MiddlewareHolder.checkForLogin, (req, res) => {
			// @ts-ignore
			res.status(200).clearCookie("__data").redirect("/");
			// @ts-ignore
			PanelServer.oAuth2.revokeToken(req.__data.access_token);
		});

		this.router.get("/", MiddlewareHolder.checkForLogin, (req, res) => {
			res.status(301).redirect("/dashboard");
		});
		this.router.get("/dashboard", MiddlewareHolder.checkForLogin, (req, res) => {
			res.status(200).render("dashboard", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: "dashboard",
			}));
		});

		this.router.get("/dashboard/templates", MiddlewareHolder.checkForLogin, (req, res) => {
			res.status(200).render("templates/templates", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: "templates",
			}));
		});
		this.router.get("/dashboard/templates/:template_name", MiddlewareHolder.checkForLogin, (req, res) => {
			let template_name = req.params.template_name;
			res.status(200).render("templates/template", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: req.params.template_name,
			}));
		});

		this.router.get("/dashboard/servers", MiddlewareHolder.checkForLogin, (req, res) => {
			res.status(200).render("templates/servers/servers", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: "servers",
			}));
		});
		this.router.get("/dashboard/templates/:template_name/servers/:server_id", MiddlewareHolder.checkForLogin, (req, res) => {
			let template_name = req.params.template_name;
			let server_id = req.params.server_id;
			res.status(200).render("templates/servers/server", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: server_id,
			}));
		});

		this.router.get("/dashboard/reports", MiddlewareHolder.checkForLogin, (req, res) => {
			res.status(200).render("templates/templates", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: "templates",
			}));
		});
		this.router.get("/dashboard/reports/:report_id", MiddlewareHolder.checkForLogin, (req, res) => {
			let report_id = req.params.report_id;
			res.status(200).render("reports/report", PanelServer.getInstance().getBasicOptions(req, {
				// @ts-ignore
				title_prefix: req.language.getValue("report_title_id", report_id),
			}));
		});

		this.router.get("/dashboard/replays", MiddlewareHolder.checkForLogin, (req, res) => {
			res.status(200).render("replays/replays", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: "replays",
			}));
		});
		this.router.get("/dashboard/replays/:replay_id", MiddlewareHolder.checkForLogin, (req, res) => {
			let replay_id = req.params.replay_id;
			res.status(200).render("players/player", PanelServer.getInstance().getBasicOptions(req, {
				// @ts-ignore
				title_prefix: req.language.getValue("replay_title_id", replay_id),
			}));
		});

		this.router.get("/dashboard/players", MiddlewareHolder.checkForLogin, (req, res) => {
			res.status(200).render("players/players", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: "players",
			}));
		});
		this.router.get("/dashboard/players/:gamertag", MiddlewareHolder.checkForLogin, (req, res) => {
			let gamertag = req.params.gamertag;
			res.status(200).render("players/player", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: gamertag,
			}));
		});
	}
}