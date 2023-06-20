import { getMyDonationByPetId } from '../../../Pet Care_Ресурси/src/services/data.js';
import { del } from '../services/api.js';
import { getById, getLikesByTheaterId, getMyLikeByTheaterId, likeTheater } from '../services/data.js';
import { html, nothing } from '../services/lib.js';

const detailsTemplate = (theatre, onDelete, likes, showLikeButton, onLike) => html`
<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: ${theatre.title}</h1>
        <div>
            <img src="${theatre.imageUrl}" />
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${theatre.description}</p>
        <h4>Date: ${theatre.date}</h4>
        <h4>Author: ${theatre.author}</h4>
        <div class="buttons">
            ${viewButtonsTemp(theatre, onDelete)}
            ${likesControlTemplate(showLikeButton, onLike)}
        </div>
        <p class="likes">Likes: ${likes}</p>
    </div>
</div>
</section>`

const viewButtonsTemp = (theatre, onDelete) => html`
    ${theatre.isOwner
        ? html`
            <a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
            <a class="btn-edit" href="/details/${theatre._id}/edit">Edit</a>`
        : nothing}`

const likesControlTemplate = (showLikeButton, onLike) => {
    if (showLikeButton){
        return html`<a class="btn-like" @click=${onLike} href="javascript:void(0)">Like</a>`;
    } else {
        return nothing;
    }
}

export async function detailsPage(ctx) {
    const theatre = await getById(ctx.params.theatreId);

    theatre.isOwner = ctx.user != null && theatre._ownerId == ctx.user.id;
    
    const [likes, hasLiked] = await Promise.all([
        getLikesByTheaterId(ctx.params.theatreId),
        ctx.user ? getMyDonationByPetId(ctx.params.theatreId, ctx.user.id ): 0
    ])

    const showLikeButton = ctx.user != null && theatre.isOwner == false && hasLiked == false;

    ctx.render(detailsTemplate(theatre, onDelete, likes, showLikeButton, onLike));

    async function onDelete(event) {
        event.preventDefault();

        try {
            const confirmed = confirm(`Are you sure you want to delte this theatre: ${theatre.title}`);

            if (confirmed) {
                await del(`/data/theaters/${ctx.params.theatreId}`);
                ctx.page.redirect('/profile');
            }
        } catch(err){
            alert(err.message);
        }
    }

    async function onLike(event){
        event.preventDefault();

        await likeTheater(ctx.params.theatreId);
        ctx.page.redirect(`/details/${ctx.params.theatreId}`);
    }
}

