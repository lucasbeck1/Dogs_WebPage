import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../../Redux/actions"
import Loading from "../loading/loading";
import defaultImage from "../../Assets/dog-cartoon-1.webp"
import s from "./detail.module.css";



export default function Detail (props){
    const detailB = useSelector(state => state.detail);
    
    /* 
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
        return () => {dispatch(clearDetail())}
    },[dispatch, props.match.params.id])
   */


    
    // Otra forma de mostrar el loading
    let idB = (detailB.id)?.toString();
    useEffect(()=>{
        console.log('Ruta',props.match.params.id);
        console.log('Dog',idB);
    },[idB, props.match.params.id]);
    // Luego agregar el condicional:
    // {idB === props.match.params.id ?
    

    
    //Styles
    const styleDiv = {
        // backgroundColor: "rgba(255, 228, 196, 0.664)",
    /*     backgroundImage: 'url(' + detailB.image + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', */
    };
    



return(
    <React.Fragment>
        {/* {Object.keys(detailB).length > 0 ? */}
        {idB === props.match.params.id ?
        (<div style={styleDiv}>
        <Link to={`/home`} className={s.link}><p className={s.homeButton}>Home</p></Link>

        <div className={s.page}>
            <div className={s.upText}>
                <h2>{detailB.name}</h2>
                <p>{detailB.height} cm</p>
                <p>{detailB.weight} Kg</p>

            </div>
            <img src={detailB.image? (detailB.image) : (defaultImage)} alt="Img Not Found" className={s.image}/>
            <div className={s.downText}>
                <p>{detailB.life_span}</p>
            </div>
            <p className={s.description}>{detailB.temperament}</p>
        </div>

        </div>) 

        : ( <div style={styleDiv}>
        <Link to={`/home`} className={s.link}><p className={s.homeButton}>Home</p></Link>
        <Loading/>
        </div>)}
    </React.Fragment>
)};