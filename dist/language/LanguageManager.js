/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Language_1 = require("./Language");
const fs = require("node:fs");
const PanelServer_1 = require("../PanelServer");
const path = require("path");
const discord_js_1 = require("discord.js");
class LanguageManager {
    constructor() {
        this.languages = new discord_js_1.Collection();
        if (LanguageManager.instance)
            throw new Error("LanguageManager is a singleton class");
        LanguageManager.instance = this;
        this.loadLanguages();
    }
    static getInstance() {
        if (!LanguageManager.instance)
            LanguageManager.instance = new LanguageManager();
        return LanguageManager.instance;
    }
    loadLanguages() {
        this.registerLanguage(LanguageManager.FALLBACK_LANGUAGE + ".json");
        for (let filename of fs.readdirSync(path.join(PanelServer_1.default.publicFolder, "languages"), "utf8")) {
            if (filename.startsWith(LanguageManager.FALLBACK_LANGUAGE + ".json"))
                continue;
            if (filename.endsWith(".json"))
                this.registerLanguage(filename);
        }
    }
    registerLanguage(filename) {
        if (!fs.existsSync(path.join(PanelServer_1.default.publicFolder, "languages", filename)))
            throw new Error(`Language file '${filename}' does not exist`);
        let data = JSON.parse(fs.readFileSync(path.join(PanelServer_1.default.publicFolder, "languages", filename), "utf8"));
        this.languages.set(data.langCode.toLowerCase(), new Language_1.Language(data));
    }
    static getLanguage(langCode) {
        return LanguageManager.getInstance().languages.get((langCode || LanguageManager.FALLBACK_LANGUAGE).toLowerCase()) || LanguageManager.getInstance().languages.first();
    }
    static getLanguageFromRequest(req) {
        return LanguageManager.getInstance().languages.get((req.cookies.langCode || LanguageManager.getLanguage().getLangCode()).toLowerCase());
    }
    static getLanguages() {
        return LanguageManager.getInstance().languages;
    }
}
LanguageManager.FALLBACK_LANGUAGE = "eng";
exports.default = LanguageManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2VNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUVILHlDQUF1RDtBQUN2RCw4QkFBOEI7QUFDOUIsZ0RBQXlDO0FBQ3pDLDZCQUE2QjtBQUM3QiwyQ0FBc0M7QUFHdEMsTUFBTSxlQUFlO0lBVXBCO1FBUFEsY0FBUyxHQUFpQyxJQUFJLHVCQUFVLEVBQW9CLENBQUM7UUFRcEYsSUFBSSxlQUFlLENBQUMsUUFBUTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUN0RixlQUFlLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQVRELE1BQU0sQ0FBQyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUTtZQUFFLGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNoRixPQUFPLGVBQWUsQ0FBQyxRQUFRLENBQUM7SUFDakMsQ0FBQztJQVFPLGFBQWE7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUNuRSxLQUFLLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBVyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUM5RixJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztnQkFBRSxTQUFTO1lBQy9FLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0YsQ0FBQztJQUVPLGdCQUFnQixDQUFDLFFBQWdCO1FBQ3hDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQVcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsUUFBUSxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFXLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBaUI7UUFDMUMsT0FBaUIsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLElBQUksZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hMLENBQUM7SUFFTSxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBWTtRQUNoRCxPQUFpQixlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDbkosQ0FBQztJQUVNLE1BQU0sQ0FBQyxZQUFZO1FBQ3pCLE9BQU8sZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUNoRCxDQUFDOztBQXZDdUIsaUNBQWlCLEdBQVcsS0FBSyxDQUFDO0FBeUMzRCxrQkFBZSxlQUFlLENBQUMifQ==