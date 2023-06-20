import { html } from '../services/lib.js';

const navTemplate = (user) => html`<nav>
<section class="logo">
    <img src="./images/logo.png" alt="logo">
</section>
<ul>
    <!--Users and Guest-->
    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    ${user
        ? userTemp
        : guestTemp}
</ul>
</nav>`

const guestTemp = html`
<li><a href="/login">Login</a></li>
<li><a href="/register">Register</a></li>`

const userTemp = html`
<li><a href="/create">Create Postcard</a></li>
<li><a href="/logout">Logout</a></li>`

export function navigationView(ctx) {
    return navTemplate(ctx.user);
}