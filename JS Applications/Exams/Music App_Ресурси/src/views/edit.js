import { html } from '../../node_modules/lit-html/lit-html.js'
import { edit, getById } from "../services/albumServices.js"

const editTemplate = (album, onSubmit) => html`<section class="editPage">
<form @submit=${onSubmit}>
    <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
            <label for="name" class="vhide">Album name</label>
            <input id="name" name="name" value=${album.name} class="name" type="text">

            <label for="imgUrl" class="vhide">Image Url</label>
            <input id="imgUrl" name="imgUrl" value=${album.imgUrl} class="imgUrl" type="text">

            <label for="price" class="vhide">Price</label>
            <input id="price" name="price" value=${album.price} class="price" type="text">

            <label for="releaseDate" class="vhide">Release date</label>
            <input id="releaseDate" name="releaseDate" value=${album.releaseDate} class="releaseDate" type="text">

            <label for="artist" class="vhide">Artist</label>
            <input id="artist" name="artist" value=${album.artist} class="artist" type="text">

            <label for="genre" class="vhide">Genre</label>
            <input id="genre" name="genre" value=${album.genre} class="genre" type="text">

            <label for="description" class="vhide">Description</label>
            <textarea name="description" class="description" rows="10"
                cols="10"> ${album.description} </textarea>

            <button class="edit-album" type="submit">Edit Album</button>
        </div>
    </fieldset>
</form>
</section>`;

export async function editView(ctx) {
    const album = await getById(ctx.params.albumId);
    ctx.render(editTemplate(album, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const albumData = Object.fromEntries(new FormData(event.currentTarget));
        const missing = Object.entries(albumData).filter(([key, value]) => value.trim() == '');

        if (missing.length > 0) {
            alert('All fields are required!');
            return;
        }

        await edit(ctx.params.albumId, albumData);
        ctx.page.redirect('/albums/' + `${ctx.params.albumId}`);
    }
}



