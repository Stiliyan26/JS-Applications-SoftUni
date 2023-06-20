import { register } from '../services/api.js';
import { html } from '../services/lib.js';


const registerTemplate = (onSubmit) => html`<section id="register-page" class="content auth">
<form id="register" @submit=${onSubmit}>
    <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com">

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password">

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password">

        <input class="btn submit" type="submit" value="Register">

        <p class="field">
            <span>If you already have profile click <a href="#">here</a></span>
        </p>
    </div>
</form>
</section>`

export function registerView(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get('email');
            const password = formData.get('password');
            const confPass = formData.get('confirm-password');

            if (email == '' || password == '' || confPass == '') {
                throw new Error('All fileds are required!');
            }
            if (password != confPass){
                throw new Error('Passwords should match!');
            }

            await register(email.trim(), password.trim());
            ctx.page.redirect('/');

        } catch(err){
            alert(err.message);
        }
    }
}