import { html } from '../services/lib.js';

const loggedTemplate = html`
    <div id="user">
        <a href="/create">Create Game</a>
        <a href="/logout">Logout</a>
    </div>`;

const guestTemplate = html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`;

const navigationTemplate = (loggedUser) =>  html` 
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/catalog">All games</a>
    ${loggedUser
        ? loggedTemplate
        : guestTemplate}
</nav>`

export function navigationView(ctx){
    return navigationTemplate(ctx.user);
}