import React from "react";


export default function Paginated({dogsTotal, dogsPage, pag}){

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dogsTotal/dogsPage); i++) {
        pageNumbers.push(i)
    };

return(
    <React.Fragment>
        <nav>
            {pageNumbers?.map( number => { return(
                <button onClick={()=>pag(number)} key={number}>{number}</button>
            )}  )}
        </nav>
    </React.Fragment>
)};

/* 

if dogs = 100
dog per page = 15

100/15 = 6.66 --> 7

pageNumber = [1,2,3,4,5,6,7]

*/