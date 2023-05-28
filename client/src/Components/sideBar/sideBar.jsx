import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, filters, orders } from '../../Redux/actions';
import Vectors from '../../Assets/vectors.js'
import s from "./sideBar.module.css";


export default function SideBar({CurrentPage}){

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments)


    // Button Functions
    function clearFilters(e){
        e.preventDefault();
        dispatch(getBreeds());
        CurrentPage(1);
    };

    function orderDogs(e){
        e.preventDefault();
        dispatch(orders(e.target.value));
        CurrentPage(1);
        document.getElementById('name').selectedIndex = 'DEFAULT';
        document.getElementById('weight').selectedIndex = 'DEFAULT';
    };
    
    function filterDogs(e){
        e.preventDefault();
        dispatch(filters(e.target.value));
        CurrentPage(1);
        document.getElementById('storage').selectedIndex = 'DEFAULT';
        document.getElementById('breeds').selectedIndex = 'DEFAULT';
    };


    return(
        <>
        <div className={s.nav}>
            <button onClick={e => clearFilters(e)} className={s.btn}>
                Clear  {Vectors.clean}
            </button>
            <h4>Filter by</h4>
            <label htmlFor='storage'>Storage</label>
            <select id='storage' onChange={(e) => filterDogs(e)} defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Storage</option>
                <option value='All'>All</option>
                <option value='Api'>Library</option>
                <option value='Db'>Added</option>
            </select>
            <label htmlFor='breeds'>Breeds</label>
            <select id='breeds' onChange={(e) => filterDogs(e)} defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Breeds</option>
                <option value='All'>All</option>
                {temperaments?.map(element => {
                return(<option value={element} key={element}>{element}</option>) 
                })}
            </select>
            <h4>Order by</h4>
            <label htmlFor='name'>Name</label>
            <select id='name' onChange={(e) => orderDogs(e)} defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Alphabetical</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>
            <label htmlFor='weight'>Weight</label>
            <select id='weight' onChange={(e) => orderDogs(e)} defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Weight</option>
                <option value='Low weight'>Low Weight</option>
                <option value='High weight'>High Weight</option>
            </select>
        </div>
        </>
    )
};
