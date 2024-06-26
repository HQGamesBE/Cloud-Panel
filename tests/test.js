/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
global.DEBUG = true;
global.TESTING = true;
global.CONFIG = {
	guild_id: "988405121807417395",
};
global.CONFIG_PRIVATE = {
	discord_token: "OTkxODMyMzc3NDIyNzkwNjk2.GrtNmO.DGX9N4qJ1tuh-PzQJf2jX5crkQyfHPtPrdQRLI",
};
global.bot = new (require("discord.js")).Client({
	intents: [
		"GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_SCHEDULED_EVENTS",
		"GUILD_VOICE_STATES", "GUILD_PRESENCES",
		"GUILD_INVITES", "GUILD_EMOJIS_AND_STICKERS",
		"DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING",
	],
});
global.Logger = require('cloud/src/utils/Logger.js');
require("colors");
global.LIBRARIES = {
	moment: require("moment"),
};

const options = {
	port: 1111,
	jwt_secret: "123456789",
	discord: {
		clientId: "991832377422790696",
		clientSecret: "P1dpHvqk9xGI9CpOjSjoiaG1-J302XgJ",
	},
};
const panelServer = new (require("../dist/PanelServer").default)(options);
panelServer.start();

process.on("exit", () => {
	Logger.success("Exiting...");
	panelServer.stop();
});