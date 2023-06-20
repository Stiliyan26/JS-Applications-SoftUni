import page from '../node_modules/page/page.mjs';
import { authMiddleware } from './middleWares/authMiddleware.js';
import { renderNavigation, renderContent } from './middleWares/renderMiddleware.js';
import { logout } from './services/api.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { editView } from './views/edit.js';
import { deleteView } from './views/delete.js';
import { detailsView } from './views/details.js';
import { searchView } from './views/search.js';

page(authMiddleware);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', onLogout);
page('/catalog', catalogView);
page('/create', createView);
page('/search', searchView);
page('/albums/:albumId', detailsView)
page('/albums/:albumId/edit', editView);
page('/albums/:albumId/delete', deleteView);


page.start();

async function onLogout(){
    await logout();
    page.redirect('/');
}