"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Router {
    constructor(path, ...nestedRouters) {
        this.nestedRouters = [];
        this.registerNestedRouters = () => {
            for (let nestedRouter of this.nestedRouters) {
                this.router.use(nestedRouter.getPath(), nestedRouter.getRouter());
                nestedRouter.registerNestedRouters();
            }
        };
        let mergeParams = false;
        if (nestedRouters.length > 0)
            mergeParams = true;
        this.router = (0, express_1.Router)({ caseSensitive: false, mergeParams: mergeParams });
        this.path = path;
        this.nestedRouters = nestedRouters;
        this.registerNestedRouters();
        this.register();
    }
    getPath() {
        return this.path;
    }
    getRouter() {
        return this.router;
    }
    getBaseUrl() {
        return `${this.getPath()}`;
    }
}
exports.default = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic3JjL3JvdXRlcy9Sb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7O0FBRUgscUNBQWlEO0FBR2pELE1BQThCLE1BQU07SUFLbkMsWUFBc0IsSUFBWSxFQUFFLEdBQUcsYUFBdUI7UUFGM0Msa0JBQWEsR0FBYSxFQUFFLENBQUM7UUFjN0IsMEJBQXFCLEdBQUcsR0FBUyxFQUFFO1lBQ3JELEtBQUssSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRSxZQUFZLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUNyQztRQUNGLENBQUMsQ0FBQTtRQWhCQSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBQSxnQkFBYSxFQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQVdELE9BQU87UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELFNBQVM7UUFDUixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDcEIsQ0FBQztJQUVELFVBQVU7UUFDVCxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNEO0FBbkNELHlCQW1DQyJ9