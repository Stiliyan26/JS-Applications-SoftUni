import { edit, getById } from '../services/data.js';
import { html } from '../services/lib.js';
import { getUserData } from '../services/utils.js';

const editTemplate = (onSubmit, game) => html`
<section id="edit-page" class="auth">
<form id="edit" @submit=${onSubmit}>
    <div class="container">

        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" value=${game.title}>

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" value=${game.category}>

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" value=${game.maxLevel}>

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" value=${game.imageUrl}>

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary">${game.summary}</textarea>
        <input class="btn submit" type="submit" value="Edit Game">

    </div>
</form>
</section>`

export async function editView(ctx) {
    const game = await getById(ctx.params.gameId);
    ctx.render(editTemplate(onSubmit, game));

    async function onSubmit(event) {
        event.preventDefault();

        const gameData = Object.fromEntries(new FormData(event.currentTarget));
        const missing = Object.entries(gameData).filter(([key, value]) => value.trim() == '');

        if (missing.length > 0) {
           alert('All fields are required!');
           return;
        }

        await edit(ctx.params.gameId, gameData);
        ctx.page.redirect(`/details/${ctx.params.gameId}`);


    }
}