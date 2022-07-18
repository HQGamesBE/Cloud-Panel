"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInRlc3RzL3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNwQixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUN0QixNQUFNLENBQUMsTUFBTSxHQUFHO0lBQ2YsUUFBUSxFQUFFLG9CQUFvQjtDQUM5QixDQUFDO0FBQ0YsTUFBTSxDQUFDLGNBQWMsR0FBRztJQUN2QixhQUFhLEVBQUUsd0VBQXdFO0NBQ3ZGLENBQUM7QUFDRixNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDL0MsT0FBTyxFQUFFO1FBQ1IsUUFBUSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSx5QkFBeUIsRUFBRSx3QkFBd0I7UUFDaEcsb0JBQW9CLEVBQUUsaUJBQWlCO1FBQ3ZDLGVBQWUsRUFBRSwyQkFBMkI7UUFDNUMsaUJBQWlCLEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCO0tBQ3RFO0NBQ0QsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNyRCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEIsTUFBTSxDQUFDLFNBQVMsR0FBRztJQUNsQixNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQztDQUN6QixDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUc7SUFDZixJQUFJLEVBQUUsSUFBSTtJQUNWLFVBQVUsRUFBRSxXQUFXO0lBQ3ZCLE9BQU8sRUFBRTtRQUNSLFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsWUFBWSxFQUFFLGtDQUFrQztLQUNoRDtDQUNELENBQUM7QUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUUsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBRXBCLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdCLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyJ9