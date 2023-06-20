import { put } from '../services/api.js';
import { getById } from '../services/data.js';
import { html } from '../services/lib.js';

const editTemplate = (onSubmit, theatre) => html`<section id="editPage">
<form class="theater-form" @submit=${onSubmit}>
    <h1>Edit Theater</h1>
    <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" value=${theatre.title}>
    </div>
    <div>
        <label for="date">Date:</label>
        <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${theatre.date}>
    </div>
    <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author"
            value=${theatre.author}>
    </div>
    <div>
        <label for="description">Theater Description:</label>
        <textarea id="description" name="description"
            placeholder="Description">${theatre.description}</textarea>
    </div>
    <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
            value=${theatre.imageUrl}>
    </div>
    <button class="btn" type="submit">Submit</button>
</form>
</section>`

export async function editPage(ctx) {
    const theatre = await getById(ctx.params.theatreId);

    ctx.render(editTemplate(onSubmit, theatre));

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

            await put(`/data/theaters/${ctx.params.theatreId}`, data);
            ctx.page.redirect(`/details/${ctx.params.theatreId}`);

        } catch (err) {
            alert(err.message)
        }
    }
}