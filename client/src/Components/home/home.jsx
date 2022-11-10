import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./home.module.css";
import {getBreeds} from '../../Redux/actions'



export default function Landing(){

    // Global states
    const dispatch = useDispatch();
    const allBreeds = useSelector(state => state.breeds);


    useEffect(()=>{
        dispatch(getBreeds())
    },[dispatch]);





return(
    <React.Fragment>
        <h1>HOME</h1>
        {allBreeds.map(g=>{return(
            <div key={g.id}>
            <h5>{g.name}</h5>
            <img src={g.image} alt='Dog' height='200px' width='300px'></img>
            </div>
        )})}
    </React.Fragment>
)
};