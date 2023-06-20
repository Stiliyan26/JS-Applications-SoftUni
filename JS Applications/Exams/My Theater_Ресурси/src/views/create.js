import { post } from '../services/api.js';
import { html } from '../services/lib.js';

const createTemplae = (onSubmit) => html`<section id="createPage">
<form class="create-form" @submit=${onSubmit}>
    <h1>Create Theater</h1>
    <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" value="">
    </div>
    <div>
        <label for="date">Date:</label>
        <input id="date" name="date" type="text" placeholder="Month Day, Year">
    </div>
    <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author">
    </div>
    <div>
        <label for="description">Description:</label>
        <textarea id="description" name="description" placeholder="Description"></textarea>
    </div>
    <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
    </div>
    <button class="btn" type="submit">Submit</button>
</form>
</section>`;


export function createPage(ctx) {
    ctx.render(createTemplae(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const {title, date, author, imageUrl, description} = Object.fromEntries(new FormData(event.currentTarget));
            const data = {title, date, author, imageUrl, description };
            const info = Object.entries(data);
            const missing = info.filter(([key, value]) => value.trim() == '');

            if (missing.length > 0){
                throw new Error('All fields are required!')
            }

            await post('/data/theaters' ,data);
            ctx.page.redirect('/');

        } catch (err) {
            alert(err.message)
        }
    }
}
