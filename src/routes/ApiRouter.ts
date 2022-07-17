/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import Router from "./Router";
import V1Router from "./api/v1/V1Router";
import * as fs from "node:fs";
import {Collection} from "discord.js";
import PanelServer from "../PanelServer";

export default class ApiRouter extends Router {
	constructor() {
		super("/api", new V1Router());
	}

	protected register(): void {
		this.router.get("/", (req, res) => {
			let versions = new Collection<string, string>();
			for (let filename of fs.readdirSync(__dirname + "/api")) {
					if (!filename.startsWith("v")) continue;
					versions.set(filename, `${PanelServer.getBaseUrl()}${this.getBaseUrl()}/${filename}`);
			}
			res.status(200).json({
				status: "ok",
				versions: Object.fromEntries(versions),
			});
		});
	}
}