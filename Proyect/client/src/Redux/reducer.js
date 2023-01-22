import { GET_BREEDS, GET_BREEDS_BYNAME, GET_TEMPERAMENTS, ORDER_BREEDS, FILTER_BREEDS, GET_DETAIL, CLEAR_DETAIL, CREATE_OFFLINE } from './actions';

let initialState = {
    breeds: [],
    allbreeds: [],
    temperaments: [],
    detail:{}
};

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_BREEDS: return({...state, breeds: action.payload, allbreeds: action.payload}); 
        
        case CREATE_OFFLINE: return({...state, breeds: action.payload, allbreeds: action.payload});
        
        case GET_BREEDS_BYNAME: return({...state, breeds: action.payload}); 
        
        case GET_TEMPERAMENTS: return({...state, temperaments: action.payload});

        case FILTER_BREEDS:
            let actualbreeds = state.allbreeds.slice();
            //actualbreeds = actualbreeds.filter(g=> g.temperament !== undefined)
            const filter = action.payload;
            let temperaments = state.temperaments;
        
            if(filter === 'All'){actualbreeds = state.allbreeds}
            else if(filter === 'Api'){actualbreeds = actualbreeds.filter(g => g.createdInDatabase === false)}
            else if(filter === 'Db'){actualbreeds = actualbreeds.filter(g => g.createdInDatabase === true)}
            else if(temperaments.includes(filter)){actualbreeds = actualbreeds.filter(g => g.temperament.includes(filter))}

            return({
                ...state,
                breeds: actualbreeds
            });

        case ORDER_BREEDS:
            let actualbreeds2 = state.breeds.slice();
            const order = action.payload;     
            if(order === 'A-Z'){
                actualbreeds2 = actualbreeds2.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                    }
                    return 0;
                });
            }
            else if(order === 'Z-A'){
                actualbreeds2 = actualbreeds2.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                return 0;
                });
            }
            else if(order === 'High weight'){
                actualbreeds2 = actualbreeds2.sort(function (a, b) {
                    if (parseInt(a.weight.split(' - ')[1]) < parseInt(b.weight.split(' - ')[1])) {
                    return 1;
                    }
                    if (parseInt(a.weight.split(' - ')[1]) > parseInt(b.weight.split(' - ')[1])) {
                    return -1;
                    }
                    return 0;
                });
            }
            else if(order === 'Low weight'){
                actualbreeds2 = actualbreeds2.sort(function (a, b) {
                if (parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])) {
                    return 1;
                }
                if (parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])) {
                    return -1;
                }
                return 0;
                });
            }
            return({
                    ...state,
                    breeds: actualbreeds2
            });

        case GET_DETAIL: return({...state, detail: action.payload});

        case CLEAR_DETAIL: return({...state, detail: {}});


        default: return(state);   
    };
};
