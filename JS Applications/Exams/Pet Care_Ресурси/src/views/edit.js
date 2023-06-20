import { put } from '../services/api.js';
import { getPetById } from '../services/data.js';
import { html } from '../services/lib.js';

const editTemp = (onSubmit, pet) => html`<section id="editPage">
<form class="editForm" @submit=${onSubmit}>
    <img src="./images/editpage-dog.jpg">
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" value=${pet.name}>
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" value=${pet.breed}>
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" value=${pet.age}>
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" value=${pet.weight}>
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" value=${pet.image}>
        </div>
        <button class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section>`

export async function editView(ctx){
    const pet = await getPetById(ctx.params.petId);
    ctx.render(editTemp(onSubmit, pet));

    async function onSubmit(event){
        event.preventDefault();

        try {
            const { name, breed, age, weight, image } = Object.fromEntries(new FormData(event.currentTarget));
            const data = { name, breed, age, weight, image };
            const info = Object.entries(data);
            const missing = info.filter(([key, value]) => value.trim() == '');

            if (missing.length > 0){
                throw new Error('All fields required!');
            }

            await put(`/data/pets/${ctx.params.petId}`, data);
            ctx.page.redirect(`/details/${ctx.params.petId}`);

        } catch (err) {
            alert(err.message)
        }
    }
}