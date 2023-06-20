import { getUserData } from "../services/utils.js";

export function authorMiddleWare(ctx, next){
    ctx.user = getUserData();

    if (ctx.user){
        ctx.email = ctx.user.email;
    }

    next();
}