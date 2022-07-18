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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvbGFuZ3VhZ2UvTGFuZ3VhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQUVILDJDQUFzQztBQVV0QyxNQUFhLFFBQVE7SUFPcEIsWUFBWSxJQUF1QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHVCQUFVLEVBQWtCLENBQUM7UUFDL0MsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELE9BQU87UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELGFBQWE7UUFDWixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVc7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEIsQ0FBQztJQUVELFFBQVE7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXLEVBQUUsR0FBRyxNQUFxQjtRQUM3QyxJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDckQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPLFVBQVUsQ0FBQztRQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFBRSxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdGLE9BQU8sVUFBVSxDQUFDO0lBQ25CLENBQUM7SUFFRCxTQUFTO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3BCLENBQUM7Q0FDRDtBQTFDRCw0QkEwQ0MifQ==