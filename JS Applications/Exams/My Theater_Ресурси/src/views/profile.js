import { html, until , nothing } from '../services/lib.js';
import { getByOwnerId } from '../services/data.js'
 
const profileTemplate = (ctx, theaters) => html`
<section id="profilePage">
<div class="userInfo">
    <div class="avatar">
        <img src="./images/profilePic.png">
    </div>
    <h2>${ctx.email}</h2>
</div>
<div class="board">
    ${theaters.length > 0
        ? until(theaters.map(t => eventTemp(t), html`<p>Loading...</p>`))
        : html`
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`}
</div>
</section>`

const eventTemp = (theater) => html`
<div class="eventBoard">
<div class="event-info">
    <img src=${theater.imageUrl}>
    <h2>${theater.title}</h2>
    <h6>${theater.date}</h6>
    <a href="/details/${theater._id}" class="details-button">Details</a>
</div>
</div>`

export async function profilePage(ctx){
    const theaters = await getByOwnerId(ctx.user.id);
    ctx.render(profileTemplate(ctx, theaters));
}