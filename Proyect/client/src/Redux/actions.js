import { dogs, temperament} from '../Back-data';
export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREEDS_BYNAME = 'GET_BREEDS_BYNAME';
export const ORDER_BREEDS = 'ORDER_BREEDS';
export const FILTER_BREEDS = 'FILTER_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';


let dogsCopy = dogs.slice()
const localhost = 'http://localhost:3001';


export function getBreeds(){
    return (async function(dispatch){
        return fetch(`${localhost}/dogs`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: GET_BREEDS, payload: data})
            //console.log('Db ok')
        })
        .catch(function(error){
            dispatch({type: GET_BREEDS, payload: dogsCopy})
            //console.log('Db not working')
        })
    })
};


export function getBreedsByName(name){
    return (async function(dispatch){
        return fetch(`${localhost}/dogs?name=${name}`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: GET_BREEDS_BYNAME, payload: data});
        })
        .catch(function(error){
            let dogsFilter = dogsCopy.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            dispatch({type: GET_BREEDS_BYNAME, payload: dogsFilter});
        })
    })
};



export function getTemperaments(){
    return (async function(dispatch){
        return fetch(`${localhost}/temperaments`)
        .then(response => response.json())
        .then(data => {
            let dataSend = data.map(t=>t.name);
            dataSend = dataSend.sort();
            dispatch({type: GET_TEMPERAMENTS, payload: dataSend});
        })
        .catch(function(error){
            dispatch({type: GET_TEMPERAMENTS, payload: temperament}) 
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



export function createBreed(info){
    return( async function(dispatch){
        fetch(`${localhost}/dogs`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(info)
        })
        .then(function(res){ console.log(res) })
        .catch(function(error){
            let date =  Date.now();
            let newID = Math.ceil(date / (Math.floor(Math.random()*1000)));
            dogsCopy.push({
                id: newID,
                name: info.name,
                image: info.image,
                height: info.height,
                weight: info.weight,
                life_span: info.life_span,
                temperament: info.temperament.join(", "),
                createdInDatabase: true
            });  
        })
    });
};


export function getDetail(id){
    return(async function (dispatch) {
        fetch(`${localhost}/dogs/${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: GET_DETAIL, payload: data});
        })
        .catch(function(error){
            const idBreed = id;
            let dogsFound = dogsCopy.find(d => d.id.toString() === idBreed.toString());
            dispatch({type: GET_DETAIL, payload: dogsFound});
        });   
    });
};

export function clearDetail(){
    return({
        type: CLEAR_DETAIL,
    });
};
