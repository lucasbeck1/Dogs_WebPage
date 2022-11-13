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

if dogs = 172
dog per page = 8

172/8 = 21.5 --> 22

pageNumber = [1,2,3,4, ... ,22]

*/