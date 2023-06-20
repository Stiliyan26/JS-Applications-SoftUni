import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigation.js';

const headerElement = document.querySelector('.header-navigation');
const mainRoot = document.getElementById('main-content');

export const renderNavigation = (ctx, next) => {
    render(navigationView(ctx), headerElement);
    next();
};

export const renderContent = (ctx, next) => {
    ctx.render = (templateResult) => {
        render(templateResult, mainRoot);
    }

    next();
}