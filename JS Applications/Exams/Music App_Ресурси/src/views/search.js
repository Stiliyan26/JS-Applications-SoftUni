import { html } from '../../node_modules/lit-html/lit-html.js'
import { search } from '../services/albumServices.js';
import { getUserData } from '../services/utils.js';

const searchTemplate = (onSearch, albums, userData) => html`<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button class="button-list" @click=${onSearch}>Search</button>
            </div>

            <h2>Results:</h2>

            <div class="search-result">
                ${albums.length > 0
                    ? albums.map(a => matchesTemplate(a, userData))
                    : html`<p class="no-result">No result.</p>`}
            </div>
        </section>`

const matchesTemplate = (album, userData) => html`
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

export const searchView = (ctx) => {
    const userData = getUserData();

    const onSearch = (event) => {
        event.preventDefault();

        let searchElement = document.getElementById('search-input');

        search(searchElement.value)
            .then(albums => {
                ctx.render(searchTemplate(onSearch, albums, userData));
            });
    }

    ctx.render(searchTemplate(onSearch, [], userData));
}