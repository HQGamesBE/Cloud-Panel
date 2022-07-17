/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
global.DEBUG = true;
global.TESTING = true;
require("colors");
global.LIBRARIES = {
	moment: require("moment"),
};


const panelServer = new (require("../dist/PanelServer").default)({port: 1111,jwt_secret:"123456789"});
panelServer.start();

process.on("exit", () => {
	Logger.success("Exiting...");
	panelServer.stop();
});