import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/api.js';

const loginTemplate = (onSubmit) => html`<section id="loginPage">
<form @submit=${onSubmit}>
    <fieldset>
        <legend>Login</legend>

        <label for="email" class="vhide">Email</label>
        <input id="email" class="email" name="email" type="text" placeholder="Email">

        <label for="password" class="vhide">Password</label>
        <input id="password" class="password" name="password" type="password" placeholder="Password">

        <button type="submit" class="login">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="#">here</a></span>
        </p>
    </fieldset>
</form>
</section>`;

export function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const { email, password } = Object.fromEntries(new FormData(event.currentTarget));
            await login(email, password);
            ctx.page.redirect('/');
        } catch(err){
            alert(err.message);
        }
    }
}