import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./home.module.css";
import {getBreeds, getBreedsByName, getTemperaments, filters, orders} from '../../Redux/actions';
import Card from "../card/card";
import Paginated from "../paginated/paginated";
import Loading from "../loading/loading"
import loader from "../../Assets/loader-10.gif";



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
    const previousPage = () => {if(parseInt(currentPage) !== 1) setCurrentPage(parseInt(currentPage) -1)};
    const nextPage = (max) => {if(parseInt(currentPage) !== (max)) setCurrentPage(parseInt(currentPage) + 1)};

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

        {allbreeds.length? (
            <>
            <div className={s.header}>
            <div>
                <form>
                    <input id='SearchInput' type='text' onChange={e => setName(e.target.value)} placeholder="Search..."/>
                    <button  onClick={e => search(e)} type="submit">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>Browser svg no compatible</svg>
                    </button>
                </form>
            </div>
            <h2>Lucky DOG Browser</h2>
            <div>
                <Link to='/'><button>To Landing</button></Link>
                <Link to='/create'>
                    <button>
                        New <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M298.06,224,448,277.55V496a16,16,0,0,1-16,16H368a16,16,0,0,1-16-16V384H192V496a16,16,0,0,1-16,16H112a16,16,0,0,1-16-16V282.09C58.84,268.84,32,233.66,32,192a32,32,0,0,1,64,0,32.06,32.06,0,0,0,32,32ZM544,112v32a64,64,0,0,1-64,64H448v35.58L320,197.87V48c0-14.25,17.22-21.39,27.31-11.31L374.59,64h53.63c10.91,0,23.75,7.92,28.62,17.69L464,96h64A16,16,0,0,1,544,112Zm-112,0a16,16,0,1,0-16,16A16,16,0,0,0,432,112Z"></path></svg>

                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,18 L12,6 M6,12 L18,12"></path></svg>

                    </button>
                </Link>
            </div>
        </div>

        <div className={s.nav}>
            <button onClick={e => clean(e)} className={s.btn}>
                Clear  <svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1569683368540" viewBox="0 0 1024 1024" version="1.1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z"></path></svg>
            </button>
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
        </>
        ) : (<Loading loadImg={loader}/>)}
        
    </React.Fragment>
)
};