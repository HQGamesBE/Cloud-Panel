"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareHolder = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const LanguageManager_1 = require("./language/LanguageManager");
class MiddlewareHolder {
    static checkForLogin(req, res, next) {
        if (!req.cookies.__data)
            return res.redirect("/login"); // NOTE: This is a redirect to the login page.
        let __data = (0, jsonwebtoken_1.decode)(req.cookies.__data);
        // @ts-ignore
        if (Date.now() < __data.expires_at) {
            // @ts-ignore
            req.__data = __data;
            // @ts-ignore
            req.language = LanguageManager_1.LanguageManager.getLanguage(req.cookies.langCode);
            return next();
        }
        res.redirect("/login"); // NOTE: If __data is expired, redirect to the login page.
    }
    static redirectDashboardIfLoggedIn(req, res, next) {
        if (req.cookies.__data) {
            let __data = (0, jsonwebtoken_1.decode)(req.cookies.__data);
            // @ts-ignore
            if (Date.now() < __data.expires_at) {
                // @ts-ignore
                req.__data = __data;
                res.redirect("/");
                return;
            }
        }
        // @ts-ignore
        req.language = LanguageManager_1.LanguageManager.getLanguage(req.cookies.lang);
        next();
    }
}
exports.MiddlewareHolder = MiddlewareHolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlkZGxld2FyZUhvbGRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIk1pZGRsZXdhcmVIb2xkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQUdILCtDQUFpRDtBQUNqRCxnRUFBMkQ7QUFFM0QsTUFBYSxnQkFBZ0I7SUFDNUIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ25FLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU07WUFBRSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7UUFDdEcsSUFBSSxNQUFNLEdBQUcsSUFBQSxxQkFBUyxFQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDbkMsYUFBYTtZQUNiLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLGFBQWE7WUFDYixHQUFHLENBQUMsUUFBUSxHQUFHLGlDQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakUsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNkO1FBQ0QsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLDBEQUEwRDtJQUNuRixDQUFDO0lBQ0QsTUFBTSxDQUFDLDJCQUEyQixDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDakYsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLE1BQU0sR0FBRyxJQUFBLHFCQUFTLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUzQyxhQUFhO1lBQ2IsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRTtnQkFDbkMsYUFBYTtnQkFDYixHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDcEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsT0FBTzthQUNQO1NBQ0Q7UUFDRCxhQUFhO1FBQ2IsR0FBRyxDQUFDLFFBQVEsR0FBRyxpQ0FBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELElBQUksRUFBRSxDQUFDO0lBQ1IsQ0FBQztDQUNEO0FBOUJELDRDQThCQyJ9