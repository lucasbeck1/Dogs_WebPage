export const GET_BREEDS = 'GET_BREEDS';


export function getBreeds(){
    return (async function(dispath){
        return fetch(`http://localhost:3001/dogs`)
        .then(response => response.json())
        .then(data => {
            dispath({type: GET_BREEDS, payload: data})
        })
    })
};