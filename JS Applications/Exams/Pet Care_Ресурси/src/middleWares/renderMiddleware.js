import { render } from "../services/lib.js";
import { navigationView } from "../views/navigation.js";

export function renderNaviMiddleware(ctx, next){
    const headerRoot = document.querySelector('header');
    render(navigationView(ctx), headerRoot);
    next();
}

export function setRenderToCtx(ctx, next){
    const mainRoot = document.querySelector('main');
    ctx.render = (template) => render(template, mainRoot);
    next();
}