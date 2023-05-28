import React from "react";
import s from "./paginated.module.css";

export default function Paginated({dogsTotal, dogsPage, select, nextSelect, prevSelect, actualPage}){

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dogsTotal/dogsPage); i++) {
      pageNumbers.push(i)
  };
  
  let firstInPage = actualPage * 8 - 7;
  let lastInPage = actualPage * 8;
  if(lastInPage > dogsTotal) lastInPage = dogsTotal;

  
  return(
    <React.Fragment>
      <nav className={s.nav}>
        <button onClick={()=>prevSelect()} className={s.number} title="previous">{'<'}</button>
        {pageNumbers?.map( number => { return(
          <button onClick={()=>select(number)} key={number} className={number === actualPage? (s.numberSelected) : (s.number)}>{number}</button>
        )})}
        <button onClick={()=>nextSelect(pageNumbers[pageNumbers.length-1])} className={s.number} title="next">{'>'}</button>
        <p className={s.text}>{firstInPage} - {lastInPage} of {dogsTotal}</p>
      </nav>
    </React.Fragment>
  )
};
