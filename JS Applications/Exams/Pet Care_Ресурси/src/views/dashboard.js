import { getAllPets } from '../services/data.js';
import { html, until } from '../services/lib.js';


const dashBoardTemplate = (pets) =>html`<section id="dashboard">
<h2 class="dashboard-title">Services for every animal</h2>
<div class="animals-dashboard">
       ${pets.length > 0
            ? until(pets.map(p => petTemp(p)), html`<p>Loading...</p>`)
            : noPetsTemp};
</div>
</section>`

const noPetsTemp = html`
<div>
    <p class="no-pets">No pets in dashboard</p>
</div>`

const petTemp = (pet) => html`
<div class="animals-board">
<article class="service-img">
    <img class="animal-image-cover" src=${pet.image}>
</article>
<h2 class="name">${pet.name}</h2>
<h3 class="breed">${pet.breed}</h3>
<div class="action">
    <a class="btn" href="/details/${pet._id}">Details</a>
</div>
</div>`

export async function dashBoardView(ctx){
    const pets = await getAllPets();

    ctx.render(dashBoardTemplate(pets));
}