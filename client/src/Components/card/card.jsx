import React from "react";
import { Link } from "react-router-dom";



export default function Card({id, name, img, weight, temp}){



    return(
        <div key={id}>
            <h4>{name}</h4>
            <p>{weight} Kg</p>
            <p>{temp}</p>
            <img src={img} alt='Dog' height='200px' width='300px'/>
        </div>
    )


}