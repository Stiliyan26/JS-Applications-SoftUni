import { page } from './services/lib.js';
import { authorMiddleware } from './services/authorServices.js';
import { mainRenderMiddleware, renderMiddleware } from './services/renderMiddleware.js';
import { loginView } from './views/login.js';
import { logout } from './services/api.js';
import { registerView } from './views/register.js';
import { homeView } from './views/home.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { deleteView } from './views/delete.js';

import * as api from './services/data.js';
window.api = api;

page(authorMiddleware)
page(renderMiddleware);
page(mainRenderMiddleware);
page('/', homeView)
page('/login', loginView);
page('/logout', onLogout);
page('/register', registerView);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:gameId', detailsView);
page('/details/:gameId/edit', editView);
page('/details/:gameId/delete', deleteView);


page.start();

async function onLogout(){
    await logout();
    page.redirect('/');
}