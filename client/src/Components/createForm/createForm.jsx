import React, { useState } from "react";
import { createBreed, getBreeds } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Card from "../card/card";
import defaultImage from "../../Assets/dog-cartoon-1.webp";
import Vectors from '../../Assets/vectors.js';
import s from "./createForm.module.css";


export default function CreateForm (){
    // Global States
    const dispatch = useDispatch();
    const dogsList = useSelector(state => state.allbreeds);
    const tempList = useSelector(state => state.temperaments);
    const history = useHistory();

    // Local states
    const [input, setInput] = useState({
        name:'',
        image: '',
        height_min: '0',
        height_max: '0',
        weight_min: '0',
        weight_max: '0',
        life_span: '0',
        temperament: []
    });
    const [error, setError] = useState({});


    // Form Functions
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
        e.preventDefault();
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value],
            })
            setError(validate({
                ...input,
                temperament: [...input.temperament, e.target.value]
            }));
        };
        document.getElementById('SelectGenres').selectedIndex = 'DEFAULT';
    };

    function handleDeSelect(e){
        e.preventDefault();
        setInput({
            ...input,
            temperament: input.temperament.filter(gen => gen !== e.target.value)
        });
        setError(validate({
            ...input,
            temperament: input.temperament.filter(gen => gen !== e.target.value)
        }));
    };
    
    function validate(input){
        let error = {};
        if(!input.name){error.name = 'Please write a name'}
        else if(input.name.length > 40){error.name = 'The name is too long'}
        else if(dogsList.some(g => g.name.toLowerCase() === input.name.toLowerCase())){error.name = 'The Breed already exist'};

        if(!input.height_min){error.height = 'Min Height required'}
        else if(!input.height_max){error.height = 'Max Height required'}
        else if(parseInt(input.height_min) >= parseInt(input.height_max)){error.height = 'Min must be less than Max'};

        if(!input.weight_min){error.weight = 'Min Weight required'}
        else if(!input.weight_max){error.weight = 'Max Weight required'}
        else if(parseInt(input.weight_min) >= parseInt(input.weight_max)){error.weight = 'Min must be less than Max'};

        if(input.life_span === '0' || !input.life_span){error.life_span = 'Life Span value required'};

        if(!input.image){error.image = 'Please insert the image link'}
        else if(input.image.slice(-3) !== 'bmp' &&
        input.image.slice(-3) !== 'jpg' &&
        input.image.slice(-4) !== 'jpeg' &&
        input.image.slice(-3) !== 'jpg' &&
        input.image.slice(-3) !== 'tif' &&
        input.image.slice(-4) !== 'tiff' &&
        input.image.slice(-3) !== 'png' &&
        input.image.slice(-3) !== 'svg')
        {error.image = 'This link is not a valid image'};

        if(!input.temperament.length){error.temperament = 'Select at least one Temperament'};
        
        return (error);
    };

    function handleSubmit(e){
        e.preventDefault();
        if(input.name){
            dispatch(createBreed({
                name: input.name,
                image: input.image,
                height: `${input.height_min} - ${input.height_max}`,
                weight: `${input.weight_min} - ${input.weight_max}`,
                life_span: `${input.life_span} years`,
                temperament: input.temperament
            }));
            setInput({
                name:'',
                image: '',
                height_min: '0',
                height_max: '0',
                weight_min: '0',
                weight_max: '0',
                life_span: '0',
                temperament: []
            });
            dispatch(getBreeds());
            alert('Dog Created Successfully, Redirecting to Home');
            history.push('/home');
        }
        else{
            alert('Please complete all the cases'); 
        }
    };



    return(
        <React.Fragment>
            <Link to='/home'>
                <button className={s.homeButton}>
                    {Vectors.dogHouse}
                    Back Home
                </button>
            </Link>
            <h3>Create Your BREED !</h3>
            
            <div className={s.form}>
                <form onSubmit={e=> handleSubmit(e)}>
                    <p className={s.textBold}>Name: </p>
                    <input
                    type='text'
                    value={input.name}
                    name='name'
                    placeholder='Breed Name'
                    maxLength='70'
                    onChange={e => handleChange(e)}
                    className={s.inputs1}
                    />
                    {error.name? (<p className={s.error}>{error.name}</p>) :
                    (<div>
                        <br/>
                    </div>)}
                    

                    <p className={s.textBold}>Height: </p>
                    <span> Min </span>
                    <input
                    type='number'
                    min="1" 
                    max={parseInt(input.height_max) - 1}
                    step="1"
                    value={input.height_min}
                    name='height_min'
                    placeholder='Min'
                    onChange={e => handleChange(e)}
                    className={s.inputs2}
                    />
               

                    <span> Max </span>
                    <input
                    type='number'
                    min={parseInt(input.height_min) + 1}
                    max='100'
                    step="1"
                    value={input.height_max}
                    name='height_max'
                    placeholder='Max'
                    onChange={e => handleChange(e)}
                    className={s.inputs2}
                    />
                  
                

                    {error.height ? (<p className={s.error}>{error.height}</p>) : 
                        (<div>
                            <br/>
                        </div>)
                    }


                    <p className={s.textBold}>Weight: </p>
                    <span> Min </span>
                    <input
                    type='number'
                    min="1" 
                    max={parseInt(input.weight_max) - 1}
                    step="1"
                    value={input.weight_min}
                    name='weight_min'
                    placeholder='Min'
                    onChange={e => handleChange(e)}
                    className={s.inputs2}
                    />
                    
                    <span> Max </span>
                    <input
                    type='number'
                    min={parseInt(input.weight_min) + 1}
                    max="100"
                    step="1"
                    value={input.weight_max}
                    name='weight_max'
                    placeholder='Max'
                    onChange={e => handleChange(e)}
                    className={s.inputs2}
                    />  
                   
            
                    {error.weight ? (<p className={s.error}>{error.weight}</p>) : 
                        (<div>
                            <br/>
                        </div>)
                    }


                    <p className={s.textBold}>Life Span: </p>
                    <input
                    type='range'
                    min="0" 
                    max='100'
                    step="1"
                    value={input.life_span}
                    name='life_span'
                    placeholder='life_span'
                    onChange={e => handleChange(e)}
                    className={s.inputs1}
                    />
                    
                    {(input.life_span ? 
                    (<p>{input.life_span}</p>)  :
                    (<div>
                        <br/>
                    </div>))}

                    {error.life_span ? (<p className={s.error}>{error.life_span}</p>) : 
                    (<div>
                       <br/>
                    </div>) 
                    }


                    <p className={s.textBold}>Image Link: </p>
                    <input
                    type='url'
                    value={input.image}
                    name='image'
                    placeholder='http://www...'
                    onChange={e => handleChange(e)}
                    className={s.inputs1}
                    />
                    
                    {error.image ? (<p className={s.error}>{error.image}</p>) :
                    (<div>
                        <br/>
                    </div>)}
                    
                    
                    <p className={s.textBold}>Temperament: </p>
                 
                    <select id='SelectGenres' onChange={e=> handleSelect(e)} defaultValue={'DEFAULT'} >
                        <option key={'default'} value='DEFAULT' disabled>Select a temperament</option>
                        {tempList.map((el)=>(
                           <option key={`${el} - 1`} value={el} name={el}>{el}</option>
                        ))}
                    </select>
                 
                    
                    {error.temperament ? (<p className={s.error}>{error.temperament}</p>) :
                    (<div>
                        <br/>
                    </div>)}

                    { 
                    <div className={s.listTemp}>
                    {tempList.map((gen => (
                        input.temperament.includes(gen) ? 
                        (<button key={`${gen} - 2`} className={s.btnTempON} onClick={e => handleDeSelect(e)} value={gen}>{gen}</button>) 
                        : 
                        (<React.Fragment key={`${gen} - 3`}>
                        </React.Fragment>)
                    )))}
                    </div>
                    }
                    
                    <br/>

                    <div>
                        {Object.keys(error).length ? 
                            (<input type="submit" disabled name="Send" className={s.submittButton2}/>) 
                            :
                            (<input type="submit" name="Send" className={s.submittButton1}/>)
                        }
                    </div>
                    
                </form>
            </div>


            <div className={s.dogPreview}>
                <p className={s.textBold}>Dog Preview</p>
                <Card 
                id='NO LINK'
                name={input.name? (input.name) : ('YOUR DOG')} 
                img={input.image? (input.image) : (defaultImage)}
                weight={(parseInt(input.weight_min) && parseInt(input.weight_max))? ([input.weight_min, ' - ' , input.weight_max].join(' ')) : ('Min - Max')}
                temp={input.temperament.length > 0? (input.temperament.join(', ')) : ('Temperament')} 
                ></Card>
            </div>
            
        </React.Fragment>
    )
};
