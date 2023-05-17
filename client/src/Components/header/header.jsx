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
    const [smallScreen, setSmallScreen] = useState(false);
    const [start, setStart] = useState(true);

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



    if(window.screen.availWidth <= 590 && smallScreen !== true && start === true){
        setSmallScreen(true);
        setStart(false);
    };


    return(
        <React.Fragment>
            {smallScreen ? (
            <div className={s.headerSmall}>
                 <h2 className={s.titleSmall}>Dogui Pedia</h2>
                 <div>
                    <Link to='/'><button className={s.btn}>To Landing</button></Link>
                    <Link to='/create'>
                        <button className={s.btn}>
                            New {Vectors.dog}
                            {Vectors.add}
                        </button>
                    </Link>
               
                    <form>
                        <input className={s.input} id='SearchInput' type='text' onChange={e => setName(e.target.value)} placeholder="Search..."/>
                        <button  onClick={e => search(e)} type="submit" className={s.btn}>
                        {Vectors.search}
                        </button>
                    </form>
                </div>  
            </div>
            ) : (
            <div className={s.header}>
                <div>
                    <form>
                        <input className={s.input} id='SearchInput' type='text' onChange={e => setName(e.target.value)} placeholder="Search..."/>
                        <button  onClick={e => search(e)} type="submit" className={s.btn}>
                        {Vectors.search}
                        </button>
                    </form>
                </div>
                <h2 className={s.title}>Dogui Pedia</h2>
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
            )}
            
        </React.Fragment>
    )
};
