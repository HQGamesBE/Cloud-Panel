/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import Router from "../../Router";
import LanguageManager from "../../../language/LanguageManager";

export default class LanguageRouter extends Router{
	constructor() {
		super("/language");
	}

	protected register(): void {
		this.router.all("/list", (req, res) => {
			res.json({
				status: "ok",
				languages: LanguageManager.getLanguages(),
			});
		});
		this.router.post("/reload", (req, res) => {
			LanguageManager.getInstance().reloadLanguages();
			res.status(200).json({status: "ok"});
		});
	}

}