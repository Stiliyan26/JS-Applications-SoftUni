import { getUserData } from "../services/utils.js";

export const authMiddleware = (ctx, next) => {
    const user = getUserData();

    if (user){
        ctx.user = user;
    }

    next();
};