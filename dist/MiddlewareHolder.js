"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const LanguageManager_1 = require("./language/LanguageManager");
class MiddlewareHolder {
    static applyLangauge(req, res, next) {
        // @ts-ignore
        req.language = LanguageManager_1.default.getInstance().getLanguage(req.cookies.lang);
        next();
    }
}
exports.default = MiddlewareHolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlkZGxld2FyZUhvbGRlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIk1pZGRsZXdhcmVIb2xkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7O0FBR0gsZ0VBQXlEO0FBRXpELE1BQXFCLGdCQUFnQjtJQUNwQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDbkUsYUFBYTtRQUNiLEdBQUcsQ0FBQyxRQUFRLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRSxJQUFJLEVBQUUsQ0FBQztJQUNSLENBQUM7Q0FDRDtBQU5ELG1DQU1DIn0=