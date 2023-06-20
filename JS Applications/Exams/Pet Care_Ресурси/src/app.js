import { authorMiddleWare } from './middleWares/authorMiddleWare.js';
import { renderNaviMiddleware, setRenderToCtx } from './middleWares/renderMiddleware.js';
import { logout } from './services/api.js';
import { page } from './services/lib.js';
import { createPage } from './views/create.js';
import { dashBoardView } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editView } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginView } from './views/login.js';
import { registerPage } from './views/register.js';

page(authorMiddleWare);
page(renderNaviMiddleware);
page(setRenderToCtx);

page('/', homePage);
page('/login', loginView);
page('/register', registerPage);
page('/logout', onLogout);
page('/dashboard', dashBoardView);
page('/create', createPage);
page('/details/:petId', detailsPage);
page('/details/:petId/edit', editView);

page.start();

async function onLogout(){
    await logout();
    page.redirect('/');
}