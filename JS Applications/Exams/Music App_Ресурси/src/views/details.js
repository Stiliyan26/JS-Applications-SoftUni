import { getById } from "../services/albumServices.js"
import { html } from '../../node_modules/lit-html/lit-html.js'

const detailsTemplate = (album, userData) => html`<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src=${album.imgUrl}>
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${album.name}</h1>
            <h3>Artist: ${album.artist}</h3>
            <h4>Genre: ${album.genre}</h4>
            <h4>Price: ${album.price}</h4>
            <h4>Date: ${album.releaseDate}</h4>
            <p>Description: ${album.description}</p>
        </div>

        ${userData.id == album._ownerId ? html`
        <div class="actionBtn">
            <a href="/albums/${album._id}/edit" class="edit">Edit</a>
            <a href="/albums/${album._id}/delete" class="remove">Delete</a>
        </div>
    </div>
</div>
</section>` : ''}`

export async function detailsView(ctx){
    const album = await getById(ctx.params.albumId);

    ctx.render(detailsTemplate(album, ctx.user));
}