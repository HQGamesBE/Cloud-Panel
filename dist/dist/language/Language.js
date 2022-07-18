"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const discord_js_1 = require("discord.js");
class Language {
    constructor(args) {
        this.name = args.name;
        this.globalName = args.globalName;
        this.langCode = args.langCode;
        this.emoji = args.emoji;
        this.values = new discord_js_1.Collection();
        for (let key in args.values)
            this.values.set(key, args.values[key]);
    }
    getName() {
        return this.name;
    }
    getGlobalName() {
        return this.globalName;
    }
    getLangCode() {
        return this.langCode;
    }
    getEmoji() {
        return this.emoji;
    }
    getValue(key, ...params) {
        let translated = this.values.get(key) || key;
        if (params.length == 0)
            return translated;
        for (let i = 0; i < params.length; i++)
            translated = translated.replace(`{${i}}`, params[i]);
        return translated;
    }
    getValues() {
        return this.values;
    }
}
exports.Language = Language;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkaXN0L2xhbmd1YWdlL0xhbmd1YWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RCxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQzFCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzQyxNQUFNLFFBQVE7SUFDVixZQUFZLElBQUk7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QyxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNELGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNELFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNO1FBQ25CLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUM3QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNsQixPQUFPLFVBQVUsQ0FBQztRQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDbEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFDRCxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyJ9