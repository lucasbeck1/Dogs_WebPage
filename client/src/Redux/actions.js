export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREEDS_BYNAME = 'GET_BREEDS_BYNAME';


export function getBreeds(){
    return (async function(dispath){
        return fetch(`http://localhost:3001/dogs`)
        .then(response => response.json())
        .then(data => {
            dispath({type: GET_BREEDS, payload: data})
        })
    })
};


export function getBreedsByName(name){
    return (async function(dispath){
        return fetch(`http://localhost:3001/dogs?name=${name}`)
        .then(response => response.json())
        .then(data => {
            dispath({type: GET_BREEDS_BYNAME, payload: data});
        })
    })
};