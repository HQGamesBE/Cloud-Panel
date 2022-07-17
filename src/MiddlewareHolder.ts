/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {Request, Response, NextFunction} from "express";
import LanguageManager from "./language/LanguageManager";

export default class MiddlewareHolder {
	static applyLangauge(req: Request, res: Response, next: NextFunction): void {
		// @ts-ignore
		req.language = LanguageManager.getInstance().getLanguage(req.cookies.lang);
		next();
	}
}