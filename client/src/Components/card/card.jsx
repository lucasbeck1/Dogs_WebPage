import React from "react";
import { Link } from "react-router-dom";



export default function Card({id, name, img}){



    return(
        <div key={id}>
            <h5>{name}</h5>
            <img src={img} alt='Dog' height='200px' width='300px'/>
        </div>
    )


}