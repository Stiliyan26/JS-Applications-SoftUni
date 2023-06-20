import { render } from '../services/lib.js'
import { navPage } from '../views/navigation.js';

export function renderNavMiddleware(ctx, next){
    const navRoot = document.querySelector('header');

    render(navPage(ctx.user), navRoot);
    next();
}

export function setRenderMiddleware(ctx, next){
    const mainRoot = document.querySelector('main');

    ctx.render = (template) => render(template, mainRoot);
    next();
}

