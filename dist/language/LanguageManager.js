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
        this.reloadLanguages();
    }
    static getInstance() {
        if (!LanguageManager.instance)
            LanguageManager.instance = new LanguageManager();
        return LanguageManager.instance;
    }
    reloadLanguages() {
        this.languages.clear();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2VNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUVILHlDQUFvQztBQUNwQyw4QkFBOEI7QUFDOUIsZ0RBQXlDO0FBQ3pDLDZCQUE2QjtBQUM3QiwyQ0FBc0M7QUFHdEMsTUFBTSxlQUFlO0lBVXBCO1FBUFEsY0FBUyxHQUFpQyxJQUFJLHVCQUFVLEVBQW9CLENBQUM7UUFRcEYsSUFBSSxlQUFlLENBQUMsUUFBUTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUN0RixlQUFlLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQVRELE1BQU0sQ0FBQyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUTtZQUFFLGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNoRixPQUFPLGVBQWUsQ0FBQyxRQUFRLENBQUM7SUFDakMsQ0FBQztJQVFNLGVBQWU7UUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLEtBQUssSUFBSSxRQUFRLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFXLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzlGLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO2dCQUFFLFNBQVM7WUFDL0UsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEU7SUFDRixDQUFDO0lBRU8sZ0JBQWdCLENBQUMsUUFBZ0I7UUFDeEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBVyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixRQUFRLGtCQUFrQixDQUFDLENBQUM7UUFDOUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQVcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFpQjtRQUMxQyxPQUFpQixlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEwsQ0FBQztJQUVNLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFZO1FBQ2hELE9BQWlCLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNuSixDQUFDO0lBRU0sTUFBTSxDQUFDLFlBQVk7UUFDekIsT0FBTyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDO0lBQ2hELENBQUM7O0FBeEN1QixpQ0FBaUIsR0FBVyxLQUFLLENBQUM7QUEyQzNELGtCQUFlLGVBQWUsQ0FBQyJ9