import React, {useState, useEffect} from "react";
import { createBreed, getBreeds, getTemperaments } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Card from "../card/card";
import defaultImage from "../../Assets/dog-cartoon-1.webp";
import s from "./createForm.module.css";


export default function CreateForm (){

// Global States
const dispatch = useDispatch();
const dogsList = useSelector(state => state.allbreeds);
const tempList = useSelector(state => state.temperaments);
const history = useHistory();


useEffect(()=>{
    dispatch(getBreeds());
    dispatch(getTemperaments());
},[dispatch]);



// Local states
const [input, setInput] = useState({
    name:'',
    image: '',
    height_min: 0,
    height_max: 0,
    weight_min: 0,
    weight_max: 0,
    temperaments: []
});
const [error, setError] = useState({});




// Function
function handleChange(e){
    setInput({
        ...input,
        [e.target.name]: e.target.value
    });
    // console.log(input)
    // Como la actualizacion del estado es algo asincrónico lo voy a ver reflejado "tarde" a los cambios
    setError(validate({
        ...input,
        [e.target.name]: e.target.value
    }));
};

function handleSelect(e){
    if(!input.temperaments.includes(e.target.value)){
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value],
        })
        setError(validate({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        }));
    };
    document.getElementById('SelectGenres').selectedIndex = 'DEFAULT';
};

function handleDeSelect(e){
    setInput({
        ...input,
        temperaments: input.temperaments.filter(gen => gen !== e.target.value)
    });
    setError(validate({
        ...input,
        temperaments: input.temperaments.filter(gen => gen !== e.target.value)
    }));
};

function handleCheckbox(e){
    if(!input.temperaments.includes(e.target.value)){
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        });
        setError(validate({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        }));
    }
    else{
        setInput({
            ...input,
            temperaments: input.temperaments.filter(plat => plat !== e.target.value)
        });
        setError(validate({
            ...input,
            temperaments: input.temperaments.filter(plat => plat !== e.target.value)
        }));
    }
};

function validate(input){
    let error = {};
    if(!input.name){error.name = 'Please write a name'};
    if(input.name.length > 50){error.name = 'The name is too long'};
    if(dogsList.some(g => g.name.toLowerCase() === input.name.toLowerCase())){error.name = 'The Breed already exist'}

    if(!input.image){error.image = 'Please insert the image link'};

    if(!input.temperaments.length){error.temperaments = 'Select at least one Temperament'};
    
    return (error);
};

function handleSubmit(e){
    e.preventDefault();
    if(input.name){
        dispatch(createBreed( {...input } ));
        setInput({
            name:'',
            image: '',
            height_min: 0,
            height_max: 0,
            weight_min: 0,
            weight_max: 0,
            temperaments: []
        });
        alert('Dog Created Successfully');
        history.push('/home');
    }
    else{
        alert('Please complete all the cases'); 
    }
};


return(
    <React.Fragment>
        <Link to='/home'><button className={s.homeButton}>Back Home</button></Link>
        <h3>Create Your GAME !</h3>
        
        <div className={s.form}>
            <form onSubmit={e=> handleSubmit(e)}>
                <p>Name: </p>
                <input
                type='text'
                value={input.name}
                name='name'
                placeholder='Game Name'
                maxLength='100'
                onChange={e => handleChange(e)}
                className={s.inputs1}
                />
                {error.name? (<p className={s.error}>{error.name}</p>) :
                (<div>
                    <br/>
                    <br/>
                </div>)}

                <p>Height: </p>
                <input
                type='range'
                min="1" 
                max='50'
                step="1"
                value={input.height_min}
                name='height_min'
                placeholder='height_min'
                onChange={e => handleChange(e)}
                className={s.inputs1}
                />


                {error.rating ? (<p className={s.error}>{error.rating}</p>) : 
                    (input.height_min ? 
                    (<p>{input.height_min}</p>)  :
                    (<div>
                        <br/>
                        <br/>
                    </div>))
                }


                <input
                type='range'
                min='1'
                max="50"
                step="1"
                value={input.height_max}
                name='height_max'
                placeholder='height_max'
                onChange={e => handleChange(e)}
                className={s.inputs1}
                />  
        
                

                {error.rating ? (<p className={s.error}>{error.rating}</p>) : 
                    (input.height_max ? 
                    (<p>{input.height_max}</p>)  :
                    (<div>
                        <br/>
                        <br/>
                    </div>))
                }


                <p>Weight: </p>
                <input
                type='number'
                min="1" 
                max={parseInt(input.weight_max) - 1}
                step="1"
                value={input.weight_min}
                name='weight_min'
                placeholder='Min'
                onChange={e => handleChange(e)}
                className={s.inputs1}
                />

                <input
                type='number'
                min={parseInt(input.weight_min) + 1}
                max="50"
                step="1"
                value={input.weight_max}
                name='weight_max'
                placeholder='Max'
                onChange={e => handleChange(e)}
                className={s.inputs1}
                />  
        
                {error.rating ? (<p className={s.error}>{error.rating}</p>) : 
                    (input.rating ? 
                    (<p>{input.rating}</p>)  :
                    (<div>
                        <br/>
                        <br/>
                    </div>))
                }

                <p>Image Link: </p>
                <input
                type='url'
                value={input.image}
                name='image'
                placeholder='http//www...'
                onChange={e => handleChange(e)}
                className={s.inputs1}
                />
                
                {error.image ? (<p className={s.error}>{error.image}</p>) :
                (<div>
                    <br/>
                    <br/>
                </div>)}
                
                <p>Temperaments: </p>
                {
                <select id='SelectGenres' onChange={e=> handleSelect(e)} defaultValue={'DEFAULT'}>
                    <option value='DEFAULT' disabled>Select a temperament</option>
                    {tempList.map((el)=>(
                        <option key={`${el}1`} value={el} name={el}>{el}</option>
                    ))}
                </select>
                }
                
                {error.temperaments ? (<p className={s.error}>{error.temperaments}</p>) :
                (<div>
                    <br/>
                    <br/>
                </div>)}

                { 
                <div className={s.listGenres}>
                {tempList.map((gen => (
                   
                    input.temperaments.includes(gen) ? 
                    (<div key={`${gen}1`}>
                        <button onClick={e => handleDeSelect(e)} value={gen}>{gen}</button>
                    </div>) 
                    : 
                    (<div key={`${gen}2`}>
                        <button disabled onClick={e => handleDeSelect(e)} value={gen}>{gen}</button>
                    </div>)
                
                )))}
                </div>
                }
                
                <br/>


                {Object.keys(error).length ? 
                    (<input type="submit" disabled name="Send" className={s.submittButton2}/>) 
                    :
                    (<input type="submit" name="Send" className={s.submittButton1}/>)
                }
            </form>
        </div>


        <div className={s.gamePreview}>
            <Card 
            id='1'
            name={input.name? <p>{input.name}</p> : <p>DOG</p>} 
            img={input.image? (input.image) : (defaultImage)}
            weight={(input.weight_min && input.weight_max)? ([input.weight_min, ' - ' , input.weight_max].join(' ')) : ('Min - Max')}
            temp={input.temperaments.length > 0? (input.temperaments.join(', ')) : ('Temperaments')} 
            ></Card>
        </div>
        
    </React.Fragment>
)};
