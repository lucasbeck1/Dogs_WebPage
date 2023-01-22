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
                    <h2>Dogui Pedia</h2>
                    <h4>The Dog Breeds Encyclopedia</h4>
                    <Link to='/home' >
                        <button className={s.btnStart}>START</button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
};
