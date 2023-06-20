import { get } from './api.js';
import { getById } from './data.js';
import { e } from './dom.js';

const section = document.getElementById('detailsPage');
section.remove();

export async function showDetailsPage(ctx, id) {
    ctx.showSection(section);
    loadIdea(id);
}

async function loadIdea(id) {
    const ideas = await getById(id);
    section.replaceChildren(createIdeaDiv(ideas));
}

function createIdeaDiv(idea) {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(e('img', { className: 'det-img', src: idea.img }));
    fragment.appendChild(e('div', { className: 'desc' },
        e('h2', { className: 'display-5' }, idea.title),
        e('p', { className: 'infoType' }, 'Description:'),
        e('p', { className: 'idea-description' }, idea.description),
    ));
    fragment.appendChild(e('div', { className: 'text-center' },
        e('a', { className: 'btn detb', href: '' }, 'Delete')
    ));

    return fragment;
}