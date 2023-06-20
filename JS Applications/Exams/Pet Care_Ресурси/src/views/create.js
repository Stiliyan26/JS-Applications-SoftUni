import { post } from '../services/api.js';
import { html } from '../services/lib.js';

const createTemplate = (onSubmit) => html`
<section id="createPage">
<form class="createForm" @submit=${onSubmit}>
    <img src="./images/cat-create.jpg">
    <div>
        <h2>Create PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" placeholder="Max">
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" placeholder="2 years">
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" placeholder="5kg">
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
        </div>
        <button class="btn" type="submit">Create Pet</button>
    </div>
</form>
</section>`

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const { name, breed, age, weight, image } = Object.fromEntries(new FormData(event.currentTarget));
            const data = { name, breed, age, weight, image };
            const info = Object.entries(data);
            const missing = info.filter(([key, value]) => value.trim() == '');

            if (missing.length > 0){
                throw new Error('All fields required!');
            }

            await post('/data/pets', data);
            ctx.page.redirect('/');

        } catch (err) {
            alert(err.message)
        }
    }
}