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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsicm91dGVzL1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCxxQ0FBaUQ7QUFHakQsTUFBOEIsTUFBTTtJQUtuQyxZQUFzQixJQUFZLEVBQUUsR0FBRyxhQUF1QjtRQUYzQyxrQkFBYSxHQUFhLEVBQUUsQ0FBQztRQWM3QiwwQkFBcUIsR0FBRyxHQUFTLEVBQUU7WUFDckQsS0FBSyxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xFLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQ3JDO1FBQ0YsQ0FBQyxDQUFBO1FBaEJBLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLGdCQUFhLEVBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBV0QsT0FBTztRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRUQsU0FBUztRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVTtRQUNULE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBQ0Q7QUFuQ0QseUJBbUNDIn0=