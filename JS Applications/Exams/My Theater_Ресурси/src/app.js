import { authorMiddleWare } from './middleWares/authorMiddleware.js';
import { renderNavMiddleware, setRenderMiddleware,  } from './middleWares/renderingMiddleware.js';
import { logout } from './services/api.js';
import { page } from './services/lib.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';

page(authorMiddleWare);
page(renderNavMiddleware);
page(setRenderMiddleware);

page('/', homePage)
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/create', createPage);
page('/details/:theatreId', detailsPage);
page('/details/:theatreId/edit', editPage)
page('/profile', profilePage);

page.start();

async function onLogout(){
    await logout();
    page.redirect('/');
}