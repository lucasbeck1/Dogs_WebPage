import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./home.module.css";
import {getBreeds, getBreedsByName} from '../../Redux/actions';
import Card from "../card/card";
import Paginated from "../paginated/paginated";



export default function Home(){

    // Global states
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds)
    const allbreeds = useSelector(state => state.allbreeds);


    useEffect(()=>{
        dispatch(getBreeds())
    },[dispatch]);


    
    // Local states (paginated)
    const [currentPage, setCurrentPage] = useState(1);
    const changePage = (pageNumber) => {setCurrentPage(pageNumber)};
    const [cardsPerPage, setcardsPerPage] = useState(8);
    const indexLastCard = currentPage * cardsPerPage;
    const ixdexFirstCard = indexLastCard - cardsPerPage;
    const currentCards = breeds.slice(ixdexFirstCard, indexLastCard);
    // Local states (Order)
    const [order, setOrder] = useState('NO Order');
    const [name, setName] = useState('');




    // Button Functions
    function clean(e){
        e.preventDefault();
        dispatch(getBreeds());
        setCurrentPage(1);
    };

    async function search(e){
        if(allbreeds.some(g=>g.name.toLowerCase().includes(name.toLowerCase()))){
            e.preventDefault();
            await dispatch(getBreedsByName(name));
            setCurrentPage(1);
            setName('');
            document.getElementById('SearchInput').value = '';
        }else{
            alert('Breed not found');
            document.getElementById('SearchInput').value = '';
        }
    };

  
    


return(
    <React.Fragment>
        <div className={s.header}>
            <div>
                <input id='SearchInput' type='text' onChange={e => setName(e.target.value)} placeholder="Search..."/>
                <button  onClick={e => search(e)} type="submit">Search</button>
            </div>
            <h2>Lucky DOG Browser</h2>
            <div>
                <Link to='/'><button>TO LANDING</button></Link>
                <Link to='/create'><button>Create</button></Link>
            </div>
        </div>
        <div>
            <Paginated dogsTotal={breeds.length} dogsPage={cardsPerPage} pag={changePage}/>
            <div>
                {currentCards.map(g=>{return(
                    <Card id={g.id} name={g.name} img={g.image}/>
                )})}
            </div>
        </div>
    </React.Fragment>
)
};