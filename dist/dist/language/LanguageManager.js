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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2VNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiZGlzdC9sYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2I7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUIsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDaEQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzQyxNQUFNLGVBQWU7SUFDakI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9DLElBQUksZUFBZSxDQUFDLFFBQVE7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzVELGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFdBQVc7UUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7WUFDekIsZUFBZSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3JELE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsZUFBZTtRQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUNuRSxLQUFLLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNyRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztnQkFDaEUsU0FBUztZQUNiLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxRQUFRO1FBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BGLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLFFBQVEsa0JBQWtCLENBQUMsQ0FBQztRQUNsRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNySCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVE7UUFDdkIsT0FBTyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekssQ0FBQztJQUNELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHO1FBQzdCLE9BQU8sZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzVJLENBQUM7SUFDRCxNQUFNLENBQUMsWUFBWTtRQUNmLE9BQU8sZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUNuRCxDQUFDO0NBQ0o7QUFDRCxlQUFlLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0FBQzFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDIn0=