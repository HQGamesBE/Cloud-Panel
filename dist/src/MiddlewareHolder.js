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
            // @ts-ignore
            req.language = LanguageManager_1.default.getInstance().getLanguage(req.cookies.langCode);
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
        req.language = LanguageManager_1.default.getInstance().getLanguage(req.cookies.lang);
        next();
    }
}
exports.MiddlewareHolder = MiddlewareHolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlkZGxld2FyZUhvbGRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9NaWRkbGV3YXJlSG9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7QUFHSCxnRUFBeUQ7QUFDekQsK0NBQWlEO0FBRWpELE1BQWEsZ0JBQWdCO0lBQzVCLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQUUsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsOENBQThDO1FBQ3RHLElBQUksTUFBTSxHQUFHLElBQUEscUJBQVMsRUFBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLGFBQWE7UUFDYixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ25DLGFBQWE7WUFDYixHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNwQixhQUFhO1lBQ2IsR0FBRyxDQUFDLFFBQVEsR0FBRyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9FLE9BQU8sSUFBSSxFQUFFLENBQUM7U0FDZDtRQUNELEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQywwREFBMEQ7SUFDbkYsQ0FBQztJQUNELE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ2pGLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxNQUFNLEdBQUcsSUFBQSxxQkFBUyxFQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0MsYUFBYTtZQUNiLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQ25DLGFBQWE7Z0JBQ2IsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU87YUFDUDtTQUNEO1FBQ0QsYUFBYTtRQUNiLEdBQUcsQ0FBQyxRQUFRLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRSxJQUFJLEVBQUUsQ0FBQztJQUNSLENBQUM7Q0FDRDtBQTlCRCw0Q0E4QkMifQ==