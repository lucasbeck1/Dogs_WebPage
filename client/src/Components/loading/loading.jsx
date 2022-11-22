import React from "react";

import defaultImage from "../../Assets/loader-12.gif";
import s from "./loading.module.css";


export default function Loading ({loadImg}) {
    return(
        <div className={s.load}>
            <h3>Loading</h3>
            <img src={loadImg? (loadImg) : (defaultImage)} alt="Load" className={s.loadIMG}/>
            <p>Please Wait ...</p>
        </div>
    )
};