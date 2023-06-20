import { del } from "../services/api.js";
import { getById } from "../services/data.js";


export async function deleteView(ctx) {
    try {
        const game = await getById(ctx.params.gameId);
        let confiremd = confirm(`Are you sure that you want to delete this game: ${game.title}`);

        if (confiremd){
            await del('/data/games/' + `${ctx.params.gameId}`);
            ctx.page.redirect('/');
        }
    } catch(err){
        alert(err.message);
    }
}