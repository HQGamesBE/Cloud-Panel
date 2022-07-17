/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {Router as expressRouter} from "express";

export default abstract class Router {
	protected readonly router: expressRouter = expressRouter({caseSensitive: false});
	protected readonly path: string;

	protected constructor(path: string) {
		this.path = path;
		this.register();
	}

	protected abstract register(): void;

	getPath(): string {
		return this.path;
	}

	getRouter(): expressRouter {
		return this.router;
	}
}