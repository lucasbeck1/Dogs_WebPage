import { GET_BREEDS, GET_BREEDS_BYNAME } from './actions';

let initialState = {
    breeds: [],
    allbreeds: []
};

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_BREEDS: return({...state, breeds: action.payload, allbreeds: action.payload}); 
        case GET_BREEDS_BYNAME: return({...state, breeds: action.payload}); 
        default: return(state)   
    }
}