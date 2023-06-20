import { login } from '../services/api.js';
import { html } from '../services/lib.js';

const loginTemplate = (onSubmit) => html`<section id="loginPage">
<form class="loginForm" @submit=${onSubmit}>
    <img src="./images/logo.png" alt="logo" />
    <h2>Login</h2>

    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div>
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Login</button>

    <p class="field">
        <span>If you don't have profile click <a href="#">here</a></span>
    </p>
</form>
</section>`

export function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const { email, password } = Object.fromEntries(new FormData(event.currentTarget));

            if (email == '' || password == ''){
                throw new Error('All fields are required!');
            }

            await login(email, password);
            ctx.page.redirect('/');

        } catch (err) {
            alert(err.message)
        }
    }
}