/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import session = require("express-session");
import Router from "./Router";
import PanelServer from "../PanelServer";
// @ts-ignore
import Logger = require("cloud/src/utils/Logger");

export default class HomeRouter extends Router{
	constructor() {
		super("/", {caseSensitive: false, mergeParams: false});
	}

	protected register(): void {
		this.router.use(session({
			key: "session_id",
			secret: PanelServer.getInstance().getOptions().jwt_secret,
			resave: false,
			saveUninitialized: false,
			cookie: {
				// @ts-ignore
				expires: 1000 * 60 * 60, //1 day
			},
		}));
		this.router.use((request, response, next) => {
			if (request.cookies[ "session_id" ]) {
				response.clearCookie("session_id");
			}
			next();
		});
		this.router.get("/", (req, res) => {
			res.status(200).render("dashboard", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: "Dashboard",
			}));
		});
		this.router.get("/login", (req, res) => {
			res.status(200).render("login", PanelServer.getInstance().getBasicOptions(req, {
				title_prefix: "Login",
			}));
		});
		this.router.get("/logout", (req, res) => {
			if (!req.session) {
				res.status(200).redirect("/login");
				return;
			}
			req.session.destroy((err) => {
				if (err) Logger.error(err);
			});
			res.clearCookie("session_id");
			res.redirect("/login");
		});
	}
}