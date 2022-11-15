import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./home.module.css";
import {getBreeds, getBreedsByName, getTemperaments, filters, orders} from '../../Redux/actions';
import Card from "../card/card";
import Paginated from "../paginated/paginated";



export default function Home(){

    // Global states
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds);
    const allbreeds = useSelector(state => state.allbreeds);
    const temperaments = useSelector(state => state.temperaments)


    useEffect(()=>{
        dispatch(getBreeds());
        dispatch(getTemperaments());
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


    function orderD(e){
        e.preventDefault();
        dispatch(orders(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
        // Esto se necesita porque al aplicar un sort, a diferecia de un filter, React no detecta cambios en nuestro estado y por eso no se actualizaría
        document.getElementById('name').selectedIndex = 'DEFAULT';
        document.getElementById('weight').selectedIndex = 'DEFAULT';
    };
    

    function filterD(e){
        e.preventDefault();
        dispatch(filters(e.target.value));
        setCurrentPage(1);
        document.getElementById('storage').selectedIndex = 'DEFAULT';
        document.getElementById('breeds').selectedIndex = 'DEFAULT';
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

        <div className={s.nav}>
            <button onClick={e => clean(e)}>Clean</button>
            <h4>Filter by</h4>
            <label htmlFor='storage'>Storage</label>
            <select id='storage' onChange={(e) => filterD(e)} defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Storage</option>
                <option value='All'>All</option>
                <option value='Api'>Api</option>
                <option value='Db'>Library</option>
            </select>
            <label htmlFor='breeds'>Breeds</label>
            <select id='breeds' onChange={(e) => filterD(e)} defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Breeds</option>
                <option value='All'>All</option>
                {temperaments?.map(element => {
                return(<option value={element} key={element}>{element}</option>) 
                })}
            </select>
            <h4>Order by</h4>
            <label htmlFor='name'>Name</label>
            <select id='name' onChange={(e) => orderD(e)} defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Alphabetical</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>
            <label htmlFor='weight'>Weight</label>
            <select id='weight' onChange={(e) => orderD(e)} defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Weight</option>
                <option value='High weight'>High Weight</option>
                <option value='Low weight'>Low Weight</option>
            </select>
        </div>

        <div>
            <Paginated dogsTotal={breeds.length} dogsPage={cardsPerPage} pag={changePage}/>
            <div className={s.list}>
                {currentCards.map(b=>{return(
                    <Card key={b.id} id={b.id} name={b.name} img={b.image} weight={b.weight} temp={b.temperament}/>
                )})}
            </div>
        </div>
    </React.Fragment>
)
};