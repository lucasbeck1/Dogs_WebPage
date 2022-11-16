import React from "react";
import { Link } from "react-router-dom";
import s from "./landing.module.css";


export default function Landing(){

return(
    <React.Fragment>
        <div className={s.page}>
            <div className={s.page2}>
                <h2>Luckys Dog</h2>
                <h4>The Dog Breeds Browser</h4>
                <Link exact to='/home' >
                    <button className={s.btnStart}>START</button>
                </Link>
            </div>
        </div>
    </React.Fragment>
)};