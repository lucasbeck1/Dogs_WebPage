import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDetail } from "../../Redux/actions";
import s from "./card.module.css";
import defaultImage from "../../Assets/dog-cartoon-1.webp"



export default function Card({id, name, img, weight, temp}){

    const dispatch = useDispatch();

    function detailB(e){
        /* dispatch(getDetail(id)) */
    };
    
    if(temp && temp.split(', ').length > 3){
        temp = temp.split(', ').slice(0,3).join(', ');
    };

    return(
        id === 'NO LINK' ?
        (
            <div key={id} className={s.cardStatic}>
                <img src={img? (img) : (defaultImage)} alt='Dog'className={s.image}/>
                <h4>{name}</h4>
                <p>{weight} Kg</p>
                <p>{temp}</p>
            </div>
            )
        : 
        (
            <Link to={`/detail/${id}`} className={s.det}>
                <div key={id} onClick={e => detailB(e)} className={s.card}>
                    <img src={img? (img) : (defaultImage)} alt='Dog'className={s.image}/>
                    <h4>{name}</h4>
                    <p>{weight} Kg</p>
                    <p>{temp}</p>
                </div>
            </Link>
            )
    );
};