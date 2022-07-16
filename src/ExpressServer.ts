/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
import * as express from 'express';

class ExpressServer {
	bind_port: number;
	app: express.Application;

	constructor(bind_port: number) {
		this.bind_port = bind_port;
		this.app = express();
	}
}