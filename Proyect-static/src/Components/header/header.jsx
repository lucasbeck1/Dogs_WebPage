import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getBreedsByName } from '../../Redux/actions';
import Vectors from '../../Assets/vectors.js'

import s from "./header.module.css";


export default function Header ({currentPage}) {

    const dispatch = useDispatch();
    const allbreeds = useSelector(state => state.allbreeds);

    const [name, setName] = useState('');

    async function search(e){
        e.preventDefault();
        if(allbreeds.some(g=>g.name.toLowerCase().includes(name.toLowerCase()))){
            await dispatch(getBreedsByName(name));
            currentPage(1);
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
                    <form>
                        <input id='SearchInput' type='text' onChange={e => setName(e.target.value)} placeholder="Search..."/>
                        <button  onClick={e => search(e)} type="submit" className={s.btn}>
                        {Vectors.search}
                        </button>
                    </form>
                </div>
                <h2>Lucky DOG</h2>
                <div>
                    <Link to='/'><button className={s.btn}>To Landing</button></Link>
                    <Link to='/create'>
                        <button className={s.btn}>
                            New {Vectors.dog}
                            {Vectors.add}
                        </button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
};