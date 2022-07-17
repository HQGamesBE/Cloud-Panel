/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {Router as expressRouter,} from "express";
import PanelServer from "../PanelServer";

export default abstract class Router {
	protected readonly router: expressRouter;
	protected readonly path: string;
	protected readonly nestedRouters: Router[] = [];

	protected constructor(path: string, ...nestedRouters: Router[]) {
		let mergeParams = false;
		if (nestedRouters.length > 0) mergeParams = true;
		this.router = expressRouter({caseSensitive: false, mergeParams: mergeParams});
		this.path = path;
		this.nestedRouters = nestedRouters;
		this.registerNestedRouters();
		this.register();
	}

	protected abstract register(): void;

	protected readonly registerNestedRouters = (): void => {
		for (let nestedRouter of this.nestedRouters) {
			this.router.use(nestedRouter.getPath(), nestedRouter.getRouter());
			nestedRouter.registerNestedRouters();
		}
	}

	getPath(): string {
		return this.path;
	}

	getRouter(): expressRouter {
		return this.router;
	}

	getBaseUrl(): string {
		return `${this.getPath()}`;
	}
}