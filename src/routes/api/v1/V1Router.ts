/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import Router from "../../Router";

export default class V1Router extends Router{
	constructor() {
		super("/v1");
	}

	protected register(): void {
		this.router.get("/", (req, res) => {
			res.json({
				status: "ok",
				version: "1.0.0",
			});
		});
	}
}