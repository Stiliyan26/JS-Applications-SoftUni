import { postComment } from '../services/data.js';
import { html, nothing } from '../services/lib.js';


const formTemplate = (onSubmit) => html`<article class="create-comment">
<label>Add new comment:</label>
<form class="form" @submit=${onSubmit}>
    <textarea name="comment" placeholder="Comment......"></textarea>
    <input name="comment" class="btn submit" type="submit" value="Add Comment">
</form>
</article>`

export function commentFormView(ctx) {
    if (ctx.user){
        return formTemplate(onSubmit);
    } else {
        return nothing;
    }

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const comment = formData.get('comment');
        const data = {
            gameId: ctx.params.gameId,
            comment: comment
        }
    
        await postComment(data);
        event.target.reset();
        ctx.page.redirect(`/details/${ctx.params.gameId}`);
    }
}

