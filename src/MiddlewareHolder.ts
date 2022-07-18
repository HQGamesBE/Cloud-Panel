/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {Request, Response, NextFunction} from "express";
import {decode as jwtDecode} from "jsonwebtoken";
import {LanguageManager} from "./language/LanguageManager";

export class MiddlewareHolder {
	static checkForLogin(req: Request, res: Response, next: NextFunction): void {
		if (!req.cookies.__data) return res.redirect("/login"); // NOTE: This is a redirect to the login page.
		let __data = jwtDecode(req.cookies.__data);
		// @ts-ignore
		if (Date.now() < __data.expires_at) {
			// @ts-ignore
			req.__data = __data;
			// @ts-ignore
			req.language = LanguageManager.getLanguage(req.cookies.langCode);
			return next();
		}
		res.redirect("/login"); // NOTE: If __data is expired, redirect to the login page.
	}
	static redirectDashboardIfLoggedIn(req: Request, res: Response, next: NextFunction): void {
		if (req.cookies.__data) {
			let __data = jwtDecode(req.cookies.__data);

			// @ts-ignore
			if (Date.now() < __data.expires_at) {
				// @ts-ignore
				req.__data = __data;
				res.redirect("/");
				return;
			}
		}
		// @ts-ignore
		req.language = LanguageManager.getLanguage(req.cookies.lang);
		next();
	}
}