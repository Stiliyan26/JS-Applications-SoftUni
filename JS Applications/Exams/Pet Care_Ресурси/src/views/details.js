import { delPetById, getPetById, getTotalDonationsByPetId, getMyDonationByPetId, donate } from '../services/data.js';
import { html, nothing } from '../services/lib.js';

const detailsTemplate = (pet, onDelete, showDonateBtn, onDonate, totalDonations) => html`<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src=${pet.image}>
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</</h4>
            <h4 class="donation">Donation: ${totalDonations}00$</h4>
        </div>

        ${divTemp(pet, onDelete, showDonateBtn, onDonate)}
    </div>
</div>
</section>`

const divTemp = (pet, onDelete, showDonateBtn, onDonate) => html`
<div class="actionBtn">
    ${pet.isOwner
        ? buttonsTemp(pet, onDelete)
        : nothing}
    ${donatonControlBtn(showDonateBtn, onDonate)}
</div>`


const buttonsTemp = (pet, onDelete) => html`
    <a href="/details/${pet._id}/edit" class="edit">Edit</a>
    <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>`

const donatonControlBtn = (showDonateBtn, onDonate) => {
    if (showDonateBtn) {
        return html`<a href="javascript:void(0)" class="donate" @click=${onDonate}>Donate</a>`
    } else {
        return nothing;
    }
}

export async function detailsPage(ctx) {
    const pet = await getPetById(ctx.params.petId);

    pet.isOwner = ctx.user != null && pet._ownerId == ctx.user.id;

    const [totalDonations, hasDonated] = await Promise.all([
        getTotalDonationsByPetId(ctx.params.petId),
        ctx.user ? getMyDonationByPetId(ctx.params.petId, ctx.user.id) : 0
    ])

    const showDonateBtn =  ctx.user != null && pet.isOwner == false && hasDonated == false;

    ctx.render(detailsTemplate(pet, onDelete, showDonateBtn, onDonate, totalDonations));

    async function onDelete(event) {
        event.preventDefault();

        try {
            let confirmed = confirm('Are you sure you want to delete this pet: ' + `${pet.name}`);

            if (confirmed) {
                await delPetById(ctx.params.petId);
                ctx.page.redirect('/');
            }

        } catch (err) {
            alert(err.message);
        }
    }

    async function onDonate(event) {
        event.preventDefault();

        ctx.page.redirect(`/details/${ctx.params.petId}`);
    }
}