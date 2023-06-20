import { register } from '../services/api.js';
import { html } from '../services/lib.js';

const registerTemplate = (onSubmit) => html`<section id="registerPage">
<form class="registerForm" @submit=${onSubmit}>
    <h2>Register</h2>
    <div class="on-dark">
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div class="on-dark">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
        <span>If you have profile click <a href="#">here</a></span>
    </p>
</form>
</section>`

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const { email, password, repeatPassword } = Object.fromEntries(formData);

            if (email == '' || password == '' || repeatPassword == ''){
                throw new Error('All fields are required!');
            }

            if (password.trim() != repeatPassword.trim()){
                throw new Error('Passwords do not match!');
            }

            await register(email, password);
            ctx.page.redirect('/');

        } catch (err) {
            alert(err.message);
        }
    }
}