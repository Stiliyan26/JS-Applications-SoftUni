import { navigationView } from "../views/navigation.js";
import { render } from "./lib.js";

const headerRoot = document.querySelector('#header-navigation');

export function renderMiddleware(ctx, next){
    render(navigationView(ctx), headerRoot);

    next();
}

export function mainRenderMiddleware(ctx, next){
    const main = document.querySelector('main');

    ctx.render = (template) => render(template, main);
    next();
}