import { dogs, temperament} from '../Back-data';

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREEDS_BYNAME = 'GET_BREEDS_BYNAME';
export const ORDER_BREEDS = 'ORDER_BREEDS';
export const FILTER_BREEDS = 'FILTER_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const CREATE = 'CREATE';



export function getBreeds(){
    return (async function(dispatch){
        dispatch({type: GET_BREEDS, payload: dogs})     
    })
};


export function getBreedsByName(name){
    let dogs2 = dogs.find(d => d.name === name);

    return (async function(dispatch){
       dispatch({type: GET_BREEDS_BYNAME, payload: dogs2});
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



export function createBreed(payload){
    let dogId = 500
    let dogs2 = [...dogs,
    {
    id: (dogId++).toString(),
    name: payload.name,
    image: payload.image,
    height: payload.height,
    weight: payload.weight,
    life_span: payload.life_span,
    temperament: payload.temperament,
    createdInDatabase: true
    }]
  
    return (async function(dispatch){
        dispatch({type: CREATE, payload: dogs2})     
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
