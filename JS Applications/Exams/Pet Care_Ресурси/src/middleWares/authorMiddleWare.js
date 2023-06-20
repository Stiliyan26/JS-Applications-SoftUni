import { getUserData } from "../services/utils.js";

export function authorMiddleWare(ctx, next){
    ctx.user = getUserData();

    next();
}