import * as api from './api.js'

const endpoints = {
    getAllSorted: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    getById: (id) => `/data/theaters/${id}`,
    getByOwner: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    like: `/data/likes`
}

export async function getAll(){
    return api.get(endpoints.getAllSorted);
}

export async function getById(id){
    return api.get(endpoints.getById(id));
}

export async function getByOwnerId(id){
    return api.get(endpoints.getByOwner(id));
}

export async function likeTheater(theaterId){
    return api.post(endpoints.like, { theaterId });
}

export async function getLikesByTheaterId(theaterId){
    return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeByTheaterId(theaterId, userId){
    return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}


