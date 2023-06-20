import { showCatalogPage } from './catalog.js';
import { showCreatePage } from './create.js';
import { showDetailsPage } from './details.js';
import {showHomePage} from './home.js';
import { showLoginPage } from './login.js';
import { showRegisterPage } from './register.js';
import { showSection } from './dom.js';


const links = {
    'homeLink': 'home',
    'catalogLink': 'catalog',
    'loginLink': 'login',
    'registerLink': 'register',
    'createLink': 'create',
    'getStartedLink': 'home'
}

const views = {
    'home': showHomePage,
    'catalog': showCatalogPage,
    'login': showLoginPage,
    'register': showRegisterPage,
    'create': showCreatePage,
    'details': showDetailsPage
};
const ctx = {
    goTo,
    showSection,
    updateNav
}
const nav = document.querySelector('nav');

nav.addEventListener('click', onNavigate)

updateNav();
goTo('home')

function onNavigate(e){
    const link = links[e.target.id];

    if (link){
        e.preventDefault();
        goTo(link);
    }
}

function goTo(link, ...params){
    const view = views[link];

    if (typeof view == 'function'){
        view(ctx, ...params);
    }
}

function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null){
        [...nav.querySelectorAll('.user')].forEach(l => l.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(l => l.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user')].forEach(l => l.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(l => l.style.display = 'block');
    }
}