import * as albumServices from "../services/albumServices.js"
import { del } from '../services/api.js';

export const deleteView = async (ctx) => {
    try {
        const album = await albumServices.getById(ctx.params.albumId)
        let confirmed = confirm(`Do you whant to delete the album: ${album.name}`);

        if (confirmed) {
            await del('/data/albums/' + `${ctx.params.albumId}`);
            ctx.page.redirect('/catalog');

        }
        
    } catch (err) {
        alert(err.message);
    }
}