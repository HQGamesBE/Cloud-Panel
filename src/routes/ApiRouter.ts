/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import Router from "./Router";

export class ApiRouter extends Router {
	constructor() {
		super("/api", {caseSensitive: false});
	}

	protected register(): void {
		this.router.use(this)
	}
}