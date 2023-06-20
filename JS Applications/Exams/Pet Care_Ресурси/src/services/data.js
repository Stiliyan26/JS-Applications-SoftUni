import * as api from "./api.js"


const endpoints = {
    getAllPetsByDes: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    petId: (petId) => `/data/pets/${petId}`,
    delPet: (petId) => `/data/pets/${petId}`
}

export async function getAllPets(){
    return api.get(endpoints.getAllPetsByDes);
}

export async function getPetById(id){
    return api.get(endpoints.petId(id));
}

export async function delPetById(id){
    return api.del(endpoints.delPet(id));
}

export async function donate(petId){
    return api.post(`/data/donation`, { petId });
}

export async function getTotalDonationsByPetId(petId){
    return api.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function getMyDonationByPetId(petId, userId){
    return api.get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}