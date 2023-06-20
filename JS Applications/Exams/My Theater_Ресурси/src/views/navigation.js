import { html } from '../services/lib.js';

const navTemplate = (user) => html`<nav>
<a href="/">Theater</a>
<ul>
    ${user
        ? usersTemp
        :guestTemp}
</ul>
</nav>`

const usersTemp = html`
<li><a href="/profile">Profile</a></li>
<li><a href="/create">Create Event</a></li>
<li><a href="/logout">Logout</a></li>`;

const guestTemp = html` 
<li><a href="/login">Login</a></li>
<li><a href="/register">Register</a></li>`

export function navPage(user){
    return navTemplate(user);
}