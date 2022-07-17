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
        this.register();
    }
    getPath() {
        return this.path;
    }
    getRouter() {
        return this.router;
    }
    getBaseUrl() {
        return this.getPath();
    }
}
exports.default = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsicm91dGVzL1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCxxQ0FBaUQ7QUFFakQsTUFBOEIsTUFBTTtJQUtuQyxZQUFzQixJQUFZLEVBQUUsR0FBRyxhQUF1QjtRQUYzQyxrQkFBYSxHQUFhLEVBQUUsQ0FBQztRQWE3QiwwQkFBcUIsR0FBRyxHQUFTLEVBQUU7WUFDckQsS0FBSyxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xFLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQ3JDO1FBQ0YsQ0FBQyxDQUFBO1FBZkEsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUEsZ0JBQWEsRUFBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFXRCxPQUFPO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxTQUFTO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUNEO0FBbENELHlCQWtDQyJ9