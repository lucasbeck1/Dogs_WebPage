import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../../Redux/actions";
import Loading from "../loading/loading";
import defaultImage from "../../Assets/dog-cartoon-1.webp";
import loader from "../../Assets/loader-9.gif";
import Vectors from "../../Assets/vectors";
import s from "./detail.module.css";



export default function Detail (props){
    const detailB = useSelector(state => state.detail);
    
    // Mostrar loading
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
        return () => {dispatch(clearDetail())}
    },[dispatch, props.match.params.id])
    
    
    let idB = (detailB.id)?.toString();
    // Otra forma de mostrar el loading
    // Luego agregar el condicional:
    // {Object.keys(detailB).length > 0 ?



    return(
        <React.Fragment>
            <Link to='/home' className={s.link}>
                <button className={s.homeButton}>
                    {Vectors.dogHouse}
                    Back Home
                </button>
            </Link>
            {idB === props.match.params.id ?
            (<div className={s.page}>
                <div className={s.upText}>
                    <h2>{detailB.name}</h2>
                </div>
                <img src={detailB.image? (detailB.image) : (defaultImage)} alt="Img Not Found" className={s.image}/>
                <p className={s.description}>{detailB.temperament}</p>

                <div className={s.downText}>
                    <div className={s.container}>
                        {Vectors.life}
                        <p>{detailB.life_span}</p>
                    </div>

                    <div className={s.container}>
                        {Vectors.height}
                        <p>{detailB.height} cm</p>
                    </div>

                    <div className={s.container}>
                        {Vectors.weight}
                        <p>{detailB.weight} Kg</p>
                    </div>
                </div>
            </div>) 
            :  
            (<Loading loadImg={loader} smallImage={true}/>)}
        </React.Fragment>
    )};
