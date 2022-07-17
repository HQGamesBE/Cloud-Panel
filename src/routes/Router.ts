/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {
	Router as expressRouter,
	RouterOptions as expressRouterOptions,
} from "express";

export default abstract class Router {
	protected readonly router: expressRouter;
	protected readonly path: string;

	protected constructor(path: string, options: expressRouterOptions = {caseSensitive: false, mergeParams: false}) {
		this.router = expressRouter({caseSensitive: false, mergeParams: true});
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

	public getNestedRouters(): [[key: string], Router] {
		return [];
	}
}