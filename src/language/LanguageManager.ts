/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {Language} from "./Language";
import * as fs from "node:fs";
import PanelServer from "../PanelServer";
import * as path from "path";
import {Collection} from "discord.js";
import {Request} from "express";

export class LanguageManager {
	private static readonly FALLBACK_LANGUAGE: string = "eng";
	private static instance: LanguageManager;
	private languages: Collection<string, Language> = new Collection<string, Language>();

	static getInstance(): LanguageManager {
		if (!LanguageManager.instance) LanguageManager.instance = new LanguageManager();
		return LanguageManager.instance;
	}

	constructor() {
		if (LanguageManager.instance) throw new Error("LanguageManager is a singleton class");
		LanguageManager.instance = this;
		this.reloadLanguages();
	}

	public reloadLanguages(): void {
		this.languages.clear();
		this.registerLanguage(LanguageManager.FALLBACK_LANGUAGE + ".json");
		for (let filename of fs.readdirSync(path.join(PanelServer.publicFolder, "languages"), "utf8")) {
			if (filename.startsWith(LanguageManager.FALLBACK_LANGUAGE + ".json")) continue;
			if (filename.endsWith(".json")) this.registerLanguage(filename);
		}
	}

	private registerLanguage(filename: string): void {
		if (!fs.existsSync(path.join(PanelServer.publicFolder, "languages", filename))) throw new Error(`Language file '${filename}' does not exist`);
		let data = JSON.parse(fs.readFileSync(path.join(PanelServer.publicFolder, "languages", filename), "utf8"));
		this.languages.set(data.langCode.toLowerCase(), new Language(data));
	}

	public static getLanguage(langCode?: string): Language {
		return <Language>LanguageManager.getInstance().languages.get((langCode || LanguageManager.FALLBACK_LANGUAGE).toLowerCase()) || LanguageManager.getInstance().languages.first();
	}

	public static getLanguageFromRequest(req: Request): Language {
		return <Language>LanguageManager.getInstance().languages.get((req.cookies.langCode || LanguageManager.getLanguage().getLangCode()).toLowerCase());
	}

	public static getLanguages(): Collection<string, Language> {
		return LanguageManager.getInstance().languages;
	}
}