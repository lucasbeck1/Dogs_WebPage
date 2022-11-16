import React from "react";
import s from "./paginated.module.css";

export default function Paginated({dogsTotal, dogsPage, select, nextSelect, prevSelect}){

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dogsTotal/dogsPage); i++) {
        pageNumbers.push(i)
    };

return(
    <React.Fragment>
        <nav className={s.nav}>
            <button onClick={()=>prevSelect()} className={s.number}>{'<'}</button>
            {pageNumbers?.map( number => { return(
                <button onClick={()=>select(number)} key={number} className={s.number}>{number}</button>
            )})}
            <button onClick={()=>nextSelect(pageNumbers[pageNumbers.length-1])} className={s.number}>{'>'}</button>
        </nav>
    </React.Fragment>
)};

/* 

if dogs = 172
dog per page = 8

172/8 = 21.5 --> 22

pageNumber = [1,2,3,4, ... ,22]

*/