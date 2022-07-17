"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareHolder = void 0;
const LanguageManager_1 = require("./language/LanguageManager");
const jsonwebtoken_1 = require("jsonwebtoken");
class MiddlewareHolder {
    static checkForLogin(req, res, next) {
        if (!req.cookies.__data)
            return res.redirect("/login"); // NOTE: This is a redirect to the login page.
        let __data = (0, jsonwebtoken_1.decode)(req.cookies.__data);
        // @ts-ignore
        if (Date.now() < __data.expires_at) {
            // @ts-ignore
            req.__data = __data;
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
        next();
    }
    static applyLangauge(req, res, next) {
        // @ts-ignore
        req.language = LanguageManager_1.default.getInstance().getLanguage(req.cookies.lang);
        next();
    }
}
exports.MiddlewareHolder = MiddlewareHolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlkZGxld2FyZUhvbGRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIk1pZGRsZXdhcmVIb2xkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQUdILGdFQUF5RDtBQUN6RCwrQ0FBaUQ7QUFFakQsTUFBYSxnQkFBZ0I7SUFDNUIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ25FLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU07WUFBRSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7UUFDdEcsSUFBSSxNQUFNLEdBQUcsSUFBQSxxQkFBUyxFQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDbkMsYUFBYTtZQUNiLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxFQUFFLENBQUM7U0FDZDtRQUNELEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQywwREFBMEQ7SUFDbkYsQ0FBQztJQUNELE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ2pGLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxNQUFNLEdBQUcsSUFBQSxxQkFBUyxFQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0MsYUFBYTtZQUNiLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQ25DLGFBQWE7Z0JBQ2IsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU87YUFDUDtTQUNEO1FBQ0QsSUFBSSxFQUFFLENBQUM7SUFDUixDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ25FLGFBQWE7UUFDYixHQUFHLENBQUMsUUFBUSxHQUFHLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0UsSUFBSSxFQUFFLENBQUM7SUFDUixDQUFDO0NBQ0Q7QUFoQ0QsNENBZ0NDIn0=