import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import s from "./landing.module.css";
import { getBreeds, getTemperaments } from '../../Redux/actions';
import loader from "../../Assets/loader-10.gif";


export default function Landing(){


    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBreeds());
        dispatch(getTemperaments());
    },[dispatch]);

return(
    <React.Fragment>
        <div className={s.page}>
            <div className={s.page2}>
                <h2>Lucky Dog</h2>
                <h4>The Dog Breeds Browser</h4>
                <Link exact to='/home' >
                    <button className={s.btnStart}>START</button>
                </Link>
            </div>
        </div>
    </React.Fragment>
)};



/* 
Mod landing,
mostrar de a 10 numeros
añadir idiomas (switch), 
tema oscuro, 
fondo en imagenes, 
responsive,
previsualizacion loading
cretae form: ranges veritcal y dinamicos
modularizar los svg dentro de assets y requerirlos en el detail
clases para los colores y botones
-
eliminar razas,
autorizacion,
deploy: railway, netlify, render, vercel. Recuerden que estas son gratuitas y heroku dejará de serlo a fin de año, por lo que si deployan su proyecto en heroku, luego lo perderían
*/