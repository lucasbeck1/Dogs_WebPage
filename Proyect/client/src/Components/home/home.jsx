import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBreeds, getTemperaments } from '../../Redux/actions';
import Header from "../header/header";
import Footer from "../footer/footer";
import SideBar from "../sideBar/sideBar";
import Card from "../card/card";
import Paginated from "../paginated/paginated";
import Loading from "../loading/loading"
import loadImage from "../../Assets/loader-10.gif";
import s from "./home.module.css";


export default function Home(){
    // Global states
    let breeds = useSelector(state => state.breeds);
    const allbreeds = useSelector(state => state.allbreeds);
    const temperaments = useSelector(state => state.temperaments);
    
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!allbreeds.length) dispatch(getBreeds());
        if(!temperaments.length) dispatch(getTemperaments());
    },[dispatch, allbreeds, temperaments]);


    // Local states
    const [currentPage, setCurrentPage] = useState(1);
    const changePage = (pageNumber) => {setCurrentPage(pageNumber)};
    const previousPage = () => {if(parseInt(currentPage) !== 1) setCurrentPage(parseInt(currentPage) -1)};
    const nextPage = (last) => {if(parseInt(currentPage) !== (last)) setCurrentPage(parseInt(currentPage) + 1)};

    //const [cardsPerPage, setcardsPerPage] = useState(8);
    const cardsPerPage = 8;
    const indexLastCard = currentPage * cardsPerPage;
    const ixdexFirstCard = indexLastCard - cardsPerPage;
    const currentCards = breeds.slice(ixdexFirstCard, indexLastCard);
    
 
    return(
        <React.Fragment>
            <Header currentPage={setCurrentPage}/>
            {allbreeds.length? (
                <div>
                    <Paginated 
                    dogsTotal={breeds.length} 
                    dogsPage={cardsPerPage} 
                    actualPage={parseInt(currentPage)}
                    select={changePage} 
                    prevSelect={previousPage}
                    nextSelect={nextPage} 
                    />
                    <div className={s.content}> 
                    <SideBar CurrentPage={setCurrentPage}/>
                    <div className={s.list}>
                        {currentCards.map(b=>{return(
                            <Card key={b.id} id={b.id} name={b.name} img={b.image} weight={b.weight} temp={b.temperament}/>
                        )})}
                    </div>
                    
                    </div>
                </div>  
                ) : 
                (<Loading loadImg={loadImage} smallImage={true}/>)
            }
            <Footer/>
        </React.Fragment>
    )
};
