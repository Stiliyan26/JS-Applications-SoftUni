function solution() {
    (async () =>  {
        const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
        const main = document.getElementById('main');

        const res = await fetch(url);
        const articles = await res.json();

        articles
            .forEach(async (article) => {
                const id = article.id;
                const title = article.title;
                
                const moreInfo = await returnMoreInfo(id);

                const contentMoreInfo = moreInfo.content;

                const htmlEl = createHtml(id, title, contentMoreInfo);
                main.appendChild(htmlEl);
            })
    })();

    async function returnMoreInfo(id) {
        const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + `${id}`;

        const resText = await fetch(url);
        const moreInfo = await resText.json();

        return moreInfo;
    }


    function createHtml(id, title, contentMoreInfo) {
        const divAcordion = document.createElement('div');
        divAcordion.classList.add('accordion');

        const headDiv = document.createElement('div');
        headDiv.classList.add('head');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = `${title}`;

        const moreBtn = document.createElement('button');
        moreBtn.classList.add('button');
        moreBtn.id = `${id}`;

        const extraDiv = document.createElement('div');
        extraDiv.classList.add('extra');

        const contentP = document.createElement('p');
        contentP.textContent = `${contentMoreInfo}`;

        headDiv.appendChild(titleSpan);
        headDiv.appendChild(moreBtn);

        extraDiv.appendChild(contentP);

        divAcordion.appendChild(headDiv);
        divAcordion.appendChild(extraDiv);

        return divAcordion;
    }
}
