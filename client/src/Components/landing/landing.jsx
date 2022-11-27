import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getBreeds, getTemperaments } from '../../Redux/actions';

import s from "./landing.module.css";


export default function Landing(){

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBreeds());
        dispatch(getTemperaments());
    },[dispatch]);

    return(
        <React.Fragment>
            <div className={s.pageContainer}>
                <div className={s.textContainer}>
                    <h2>Lucky DOG</h2>
                    <h4>The Dog Breeds Encyclopedia</h4>
                    <Link exact to='/home' >
                        <button className={s.btnStart}>START</button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
};






/*
favicon
Mod landing,
mostrar de a 10 numeros
añadir idiomas (switch), 
tema oscuro, colores:
    --chakra-colors-gray-50: #F7FAFC;
    --chakra-colors-gray-100: #EDF2F7;
    --chakra-colors-gray-200: #E2E8F0;
    --chakra-colors-gray-300: #CBD5E0;
    --chakra-colors-gray-400: #A0AEC0;
    --chakra-colors-gray-500: #718096;
    --chakra-colors-gray-600: #4A5568;
    --chakra-colors-gray-700: #2D3748;
    --chakra-colors-gray-800: #1A202C;
    --chakra-colors-gray-900: #171923;
fondo en imagenes - Grade - Cors?, 
responsive,
previsualizacion loading
create form: ranges veritcal y dinamicos
clases para los colores y botones
quitar warnings
-
test
eliminar razas,
autorizacion,
deploy: railway, netlify, render, vercel. Recuerden que estas son gratuitas y heroku dejará de serlo a fin de año, por lo que si deployan su proyecto en heroku, luego lo perderían
*/