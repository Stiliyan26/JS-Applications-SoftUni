
import { getById } from '../services/data.js';
import { html } from '../services/lib.js';
import { commentView } from './comments.js';
import { commentFormView } from './formComments.js';

const detailsTemplate = (game, commentsSection, commentFormSection) => html`<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src=${game.imageUrl} />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
    </div>

    <p class="text">
        ${game.summary}
    </p>

    <div class="buttons">
        ${game.isOwner
            ? html`<a href="/details/${game._id}/edit" class="button">Edit</a>
            <a href="/details/${game._id}/delete" class="button">Delete</a>`
            : ''}
    </div>
        
    ${commentsSection}
    ${game.isOwner 
        ? ''
        : commentFormSection};
    
</div>

</section>`

export async function detailsView(ctx){
    const game = await getById(ctx.params.gameId);

    const commentsSection = await commentView(ctx.params.gameId);

    if (ctx.user){
        game.isOwner = ctx.user.id == game._ownerId
    }

    const commentFormSection = commentFormView(ctx);

    ctx.render(detailsTemplate(game, commentsSection, commentFormSection));
}