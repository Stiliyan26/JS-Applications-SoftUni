function attachEvents() {
    const loadBtn = document.getElementById('btnLoadPosts');
    const viewBtn = document.getElementById('btnViewPost');

    loadBtn.addEventListener('click', getAllPosts);
    viewBtn.addEventListener('click', dispalyInfo);
}

attachEvents();

async function dispalyInfo(){
    const postsOutp = document.getElementById('posts');

    const selectedId = postsOutp.value;

    const [post, comments] = await Promise.all([
        getPostById(selectedId),
        getCommentsByPostID(selectedId)
    ]);

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-body').textContent = post.body;

    const ulEL = document.getElementById('post-comments');
    ulEL.replaceChildren();

    comments.forEach(comment => {
        const liEl = document.createElement('li');
        liEl.textContent = comment.text;
        ulEL.appendChild(liEl);
    })
}

async function getAllPosts(){
    const postsOutp = document.getElementById('posts');
    postsOutp.replaceChildren();

    const url = `http://localhost:3030/jsonstore/blog/posts`;

    const data = await getData(url);

    Object.values(data)
        .forEach(post => {
            const optionEl = document.createElement('option');
            optionEl.setAttribute('value', post.id);
            optionEl.textContent = `${post.title}`;

            postsOutp.appendChild(optionEl);
        })
} 

async function getPostById(postID){
    const url = `http://localhost:3030/jsonstore/blog/posts`;

    const data = await getData(url);

    const post = Object.values(data).find(p => p.id == postID);

    return post;
}

async function getCommentsByPostID(postId){
    const url = `http://localhost:3030/jsonstore/blog/comments`;

    const data = await getData(url);
    
    const comments =  Object.values(data)
        .filter(c => c.postId == postId);

    return comments;
}

async function getData(url){
    const res = await fetch(url);
    const data = await res.json();

    return data;
}