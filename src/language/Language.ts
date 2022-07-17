/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {Collection} from "discord.js";

export interface LanguageArguments {
	name: string;
	globalName: string;
	langCode: string;
	emoji: string;
	values: { [key: string]: string };
}

export class Language {
	private readonly name: string;
	private readonly globalName: string;
	private readonly langCode: string;
	private readonly emoji: string;
	private readonly values: Collection<string, string>;

	constructor(args: LanguageArguments) {
		this.name = args.name;
		this.globalName = args.globalName;
		this.langCode = args.langCode;
		this.emoji = args.emoji;
		this.values = new Collection<string, string>();
		for (let key in args.values) this.values.set(key, args.values[key]);
	}

	getName(): string {
		return this.name;
	}

	getGlobalName(): string {
		return this.globalName;
	}

	getLangCode(): string {
		return this.langCode;
	}

	getEmoji(): string {
		return this.emoji;
	}

	getValue(key: string, ...params: Array<string>): string {
		let translated = <string>this.values.get(key) || key;
		if (params.length == 0) return translated;
		for (let i = 0; i < params.length; i++) translated = translated.replace(`{${i}}`, params[i]);
		return translated;
	}

	getValues(): Collection<string, string> {
		return this.values;
	}
}
