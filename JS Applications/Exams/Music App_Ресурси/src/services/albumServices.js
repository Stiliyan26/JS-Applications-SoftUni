import * as api from '../../src/services/api.js';

const endpoints = {
    byId: '/data/albums/'
}

export async function getById(id){  
    return api.get(endpoints.byId + id);
}

export async function edit(albumId, albumData){
    await api.put(`/data/albums/${albumId}`, albumData);
}

export async function search(searchText){
    const query = encodeURIComponent(`name LIKE "${searchText}"`);
    return api.get(`/data/albums?where=${query}`);
}