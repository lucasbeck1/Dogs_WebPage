export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREEDS_BYNAME = 'GET_BREEDS_BYNAME';
export const ORDER_BREEDS = 'ORDER_BREEDS';
export const FILTER_BREEDS = 'FILTER_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';




export function getBreeds(){
    return (async function(dispatch){
        return fetch(`http://localhost:3001/dogs`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: GET_BREEDS, payload: data})
        })
    })
};


export function getBreedsByName(name){
    return (async function(dispatch){
        return fetch(`http://localhost:3001/dogs?name=${name}`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: GET_BREEDS_BYNAME, payload: data});
        })
    })
};



export function getTemperaments(){
    return (async function(dispatch){
        return fetch(`http://localhost:3001/temperaments`)
        .then(response => response.json())
        .then(data => {
            let data1 = data.map(t=>t.name)
            dispatch({type: GET_TEMPERAMENTS, payload: data1});
        })
    })
};




export function orders(payload){
    return({
        type: ORDER_BREEDS,
        payload
    });
};

export function filters(payload){
    return({
        type: FILTER_BREEDS,
        payload
    });
};