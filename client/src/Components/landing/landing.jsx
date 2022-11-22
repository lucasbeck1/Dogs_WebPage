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
                    <h4>The Dog Breeds Browser</h4>
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
tema oscuro, 
fondo en imagenes, 
responsive,
previsualizacion loading
create form: ranges veritcal y dinamicos
clases para los colores y botones
-
eliminar razas,
autorizacion,
deploy: railway, netlify, render, vercel. Recuerden que estas son gratuitas y heroku dejará de serlo a fin de año, por lo que si deployan su proyecto en heroku, luego lo perderían
*/