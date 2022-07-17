/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import Router from "./Router";
import V1Router from "./api/v1/V1Router";
import * as fs from "node:fs";

export default class ApiRouter extends Router {
	constructor() {
		super("/api", new V1Router());
	}

	protected register(): void {
		this.router.get("/", (req, res) => {
			res.json({
				status: "ok",
				versions: fs.readdirSync(__dirname + "/api").map(filename => {
					if (!filename.startsWith("v")) return;
					return {
						version: filename,
						url: `http://localhost:1111/${this.getBaseUrl()}/${filename.substring(1)}`,
					};
				}),
			});
		});
	}
}