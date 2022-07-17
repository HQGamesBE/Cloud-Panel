/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import Router from "../../Router";
import PanelServer from "../../../PanelServer";
import LanguageRouter from "./LanguageRouter";

export default class V1Router extends Router{
	constructor() {
		super("/v1", new LanguageRouter);
	}

	protected register(): void {
		this.router.get("/", (req, res) => {
			res.json({
				status: "ok",
				routes: this.nestedRouters.map((router) => {
					return {
						url: `${PanelServer.getBaseUrl()}/api${this.getBaseUrl()}${router.getBaseUrl()}`
					};
				})
			});
		});
	}
}