import { login } from '../services/api.js';
import { html } from '../services/lib.js';

const loginTemplate = (onSubmit) => html` 
<section id="login-page" class="auth">
<form id="login" @submit=${onSubmit}>

    <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password">
        <input type="submit" class="btn submit" value="Login">
        <p class="field">
            <span>If you don't have profile click <a href="#">here</a></span>
        </p>
    </div>
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

        } catch(err){
            alert(err.message);
        }
    }
}