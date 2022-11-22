import { GET_BREEDS, GET_BREEDS_BYNAME, GET_TEMPERAMENTS, ORDER_BREEDS, FILTER_BREEDS, GET_DETAIL, CLEAR_DETAIL } from './actions';

let initialState = {
    breeds: [],
    allbreeds: [],
    temperaments: [],
    detail:{}
};

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_BREEDS: 
            let dataBreeds = action.payload;
            
            for(let i=0; i<dataBreeds.length; i++){
                if(dataBreeds[i].createdInDatabase === true) {
                    dataBreeds[i] = ({
                        id: dataBreeds[i].id,
                        name: dataBreeds[i].name,
                        height: dataBreeds[i].height,
                        weight: dataBreeds[i].weight,
                        life_span: dataBreeds[i].life_span + ' years',
                        image:  dataBreeds[i].image,
                        createdInDatabase: dataBreeds[i].createdInDatabase,
                        temperament: dataBreeds[i].Temperaments.map(el=>el.name).join(', ')
                    })
                };
            };

            return({...state, breeds: dataBreeds, allbreeds: dataBreeds}); 
        
        case GET_BREEDS_BYNAME:
            let dataBreedsByname = action.payload;

            for(let i=0; i<dataBreedsByname.length; i++){
                if(dataBreedsByname[i].createdInDatabase === true) {
                    dataBreedsByname[i] = ({
                        id: dataBreedsByname[i].id,
                        name: dataBreedsByname[i].name,
                        height: dataBreedsByname[i].height,
                        weight: dataBreedsByname[i].weight,
                        life_span: dataBreedsByname[i].life_span + ' years',
                        image:  dataBreedsByname[i].image,
                        createdInDatabase: dataBreedsByname[i].createdInDatabase,
                        temperament: dataBreedsByname[i].Temperaments.map(el=>el.name).join(', ')
                    })
                };
            };

            return({...state, breeds: action.payload}); 
        
        case GET_TEMPERAMENTS: 
            let data1 = action.payload.map(t=>t.name);
            data1 = data1.sort();
            return({...state, temperaments: data1});

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

        case GET_DETAIL: 
            let detailD = action.payload;
            if(detailD.createdInDatabase === true) {
                detailD = ({
                    id: detailD.id,
                    name: detailD.name,
                    height: detailD.height,
                    weight: detailD.weight,
                    life_span: detailD.life_span + ' years',
                    image:  detailD.image,
                    createdInDatabase: detailD.createdInDatabase,
                    temperament: detailD.Temperaments.map(el=>el.name).join(', ')
                })
            };
            return({...state, detail: detailD});

        case CLEAR_DETAIL: return({...state, detail: {}});


        default: return(state);   
    };
};