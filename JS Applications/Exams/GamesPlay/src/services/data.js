import * as api from './api.js';

const endpoints = {
    byId: '/data/games/'
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function edit(gameId, gameData) {
    await api.put(endpoints.byId + `/${gameId}`, gameData);
}

export async function getCommentsByGameId(id) {
    return api.get(`/data/comments?where=gameId%3D%22${id}%22`);
}

export async function postComment(comment) {
    return api.post('/data/comments', comment);
}
