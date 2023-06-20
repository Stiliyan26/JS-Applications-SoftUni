import * as api from './api.js';

export const login = api.login;
export const register = api.login;
export const logout = api.login;

export async function getAllIdeas(){
    return api.get('/data/ideas?select=_id%2Ctitle%2Cimg&amp;sortBy=_createdOn%20desc');
}

export async function getById(id){
    return api.get('/data/ideas/' + id);
}

export async function createIdeas(idea){
    return api.post('/data/ideas/', idea);
}

export async function deleteById(id){
    return api.del('/data/ideas/', id);
}