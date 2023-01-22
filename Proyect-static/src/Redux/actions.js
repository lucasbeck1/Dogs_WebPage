import { dogs, temperament} from '../Back-data';

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREEDS_BYNAME = 'GET_BREEDS_BYNAME';
export const ORDER_BREEDS = 'ORDER_BREEDS';
export const FILTER_BREEDS = 'FILTER_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const CREATE = 'CREATE';

let dogsCopy = dogs.slice()

export function getBreeds(){
    return (async function(dispatch){
        dispatch({type: GET_BREEDS, payload: dogsCopy})     
    })
};


export function getBreedsByName(name){
    let dogsFilter = dogsCopy.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));

    return (async function(dispatch){
       dispatch({type: GET_BREEDS_BYNAME, payload: dogsFilter});
    })
};



export function getTemperaments(){
    return (async function(dispatch){
        dispatch({type: GET_TEMPERAMENTS, payload: temperament})     
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



export function createBreed(info){
    let newID =  new Date().toString();
    dogsCopy.push({
        id: newID,
        name: info.name,
        image: info.image,
        height: info.height,
        weight: info.weight,
        life_span: info.life_span,
        temperament: info.temperament,
        createdInDatabase: true
    });
    
    return (async function(dispatch){
        dispatch({type: CREATE, payload: dogsCopy})     
    })
};


export function getDetail(id){

    return (async function(dispatch){
       dispatch({type: GET_DETAIL, payload: id});
    })
};

export function clearDetail(){
    return({
        type: CLEAR_DETAIL,
    });
};
