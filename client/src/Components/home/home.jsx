import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "../header/header";
import ContentBar from "../contentBar/contentBar";
import Card from "../card/card";
import Paginated from "../paginated/paginated";
import Loading from "../loading/loading"
import loadImage from "../../Assets/loader-10.gif";

import s from "./home.module.css";


export default function Home(){

    // Global states
    const breeds = useSelector(state => state.breeds);
    const allbreeds = useSelector(state => state.allbreeds);

    // Local states
    const [currentPage, setCurrentPage] = useState(1);
    const changePage = (pageNumber) => {setCurrentPage(pageNumber)};
    const previousPage = () => {if(parseInt(currentPage) !== 1) setCurrentPage(parseInt(currentPage) -1)};
    const nextPage = (max) => {if(parseInt(currentPage) !== (max)) setCurrentPage(parseInt(currentPage) + 1)};

    const [cardsPerPage, setcardsPerPage] = useState(8);
    const indexLastCard = currentPage * cardsPerPage;
    const ixdexFirstCard = indexLastCard - cardsPerPage;
    const currentCards = breeds.slice(ixdexFirstCard, indexLastCard);
    
 
    return(
        <React.Fragment>
            <Header currentPage={setCurrentPage}></Header>

            <ContentBar CurrentPage={setCurrentPage}></ContentBar>

            {allbreeds.length? (
            <div>
                <Paginated 
                dogsTotal={breeds.length} 
                dogsPage={cardsPerPage} 
                select={changePage} 
                prevSelect={previousPage}
                nextSelect={nextPage} 
                actualPage={parseInt(currentPage)}
                />

                <div className={s.list}>
                    {currentCards.map(b=>{return(
                        <Card key={b.id} id={b.id} name={b.name} img={b.image} weight={b.weight} temp={b.temperament}/>
                    )})}
                </div>
            </div>  
            ) : (<Loading loadImg={loadImage}/>)}
        </React.Fragment>
    )
};
