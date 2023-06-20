import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import { get } from '../services/api.js';
import { getUserData } from '../services/utils.js';

const catalogTemplate = (existingAlbums, userData) => html`
<section id="catalogPage">
<h1>All Albums</h1>
${existingAlbums.length > 0  
    ? html`${until(existingAlbums.map(album => singleAlbumTemp(album, userData)) , html`<p>Loading &hellip;</p>`)}` 
    : html`<p>No Albums in Catalog!</p>`}


</section>`

const singleAlbumTemp = (album, userData) => html`
<div class="card-box">
<img src="${album.imgUrl}">
<div>
    <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: ${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    <div class="btn-group">
    ${userData 
        ? html`<a href="/albums/${album._id}" id="details">Details</a>`
        : ''}
    </div>
</div>
</div>`

export async function catalogView(ctx){
    const albumData = await get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
    const userData = getUserData();

    ctx.render(catalogTemplate(albumData, userData));
}
