import { getCommentsByGameId } from '../services/data.js';
import { html } from '../services/lib.js';

const commentsTemplate = (comments) => html`<div class="details-comments">
<h2>Comments:</h2>
 ${comments.length > 0 
    ? ulTemp(comments)
    : html`<p class="no-comment">No comments.</p>`}
</div>`

const ulTemp = (comments)=> html`
<ul>
    ${comments.map(c => commentTemp(c))}
</ul>`

const commentTemp = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}.</p>
</li>`

export async function commentView(gameId){
    const comments = await getCommentsByGameId(gameId);
    return commentsTemplate(comments);
}