import { getUserData } from "./utils.js";

export function authorMiddleware(ctx, next){
    ctx.user = getUserData();
    next();
}