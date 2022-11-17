import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../../Redux/actions"
import Loading from "../loading/loading";
import defaultImage from "../../Assets/dog-cartoon-1.webp"
import s from "./detail.module.css";



export default function Detail (props){
    const detailB = useSelector(state => state.detail);
    if(detailB.createdInDatabase) detailB.life_span = detailB.life_span + ' years';
    

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
    /*  backgroundImage: 'url(' + detailB.image + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', */
    };
    



return(
    <React.Fragment>
        {/* {Object.keys(detailB).length > 0 ? */}
        {idB === props.match.params.id ?
    (<div style={styleDiv}>
        
      
        <Link to={`/home`} className={s.link}>
        <div className={s.homeButton}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 27.52L25 212.3v41L256 68.48 487 253.3v-41L256 27.52zm0 64L73 237.9V487h94c.1-32.3.8-79.5 10.2-121 5.2-22.7 12.9-43.9 25.4-60 12.6-16.2 30.7-27 53.4-27s40.8 10.8 53.4 27c12.5 16.1 20.2 37.3 25.4 60 9.4 41.5 10.1 88.7 10.2 121h94V237.9L256 91.52zM163.9 198.2a25.03 14.73 15.04 0 1 12.1 2.2 25.03 14.73 15.04 0 1 17.7 14.6h124.6a14.73 25.03 74.96 0 1 17.7-14.6 14.73 25.03 74.96 0 1 12.1-2.2 14.73 25.03 74.96 0 1 17.8 7.8 14.73 25.03 74.96 0 1-13 19.6 25.03 14.73 15.04 0 1 10.7 18.4 25.03 14.73 15.04 0 1-29.9 5.7 25.03 14.73 15.04 0 1-18.1-16.7H196.4a14.73 25.03 74.96 0 1-18.1 16.7 14.73 25.03 74.96 0 1-29.9-5.7 14.73 25.03 74.96 0 1 10.7-18.4 25.03 14.73 15.04 0 1-13-19.6 25.03 14.73 15.04 0 1 17.8-7.8z"></path></svg>
            <span>Home</span>
        </div>
        </Link>

        <div className={s.page}>
            <div className={s.upText}>
                <h2>{detailB.name}</h2>
            </div>
            <img src={detailB.image? (detailB.image) : (defaultImage)} alt="Img Not Found" className={s.image}/>
            <p className={s.description}>{detailB.temperament? (detailB.temperament) : ('Loyal, like all Dogs')}</p>

            <div className={s.downText}>
                <div className={s.container}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M159.4 26.23c-51.4.6-79.6 56.3-79.3 86.97 1.5 47.3 34.2 79.4 74.8 114.8 35.4 30.8 76.1 63.2 100.9 110 .1-.1.1-.2.2-.3.1.1.1.2.2.3 24.8-46.8 65.5-79.2 100.9-110 40.6-35.4 73.3-67.5 74.8-114.8.3-30.67-27.9-86.37-79.3-86.97-38-.5-82.6 25.7-96.6 67.7-14-42-58.6-68.2-96.6-67.7zM23 375v114h466V375H23zm18 18h430v78H334v-60H41v-18z"></path>Sorry, your browser does not support inline SVG.</svg>

                    {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M298.06,224,448,277.55V496a16,16,0,0,1-16,16H368a16,16,0,0,1-16-16V384H192V496a16,16,0,0,1-16,16H112a16,16,0,0,1-16-16V282.09C58.84,268.84,32,233.66,32,192a32,32,0,0,1,64,0,32.06,32.06,0,0,0,32,32ZM544,112v32a64,64,0,0,1-64,64H448v35.58L320,197.87V48c0-14.25,17.22-21.39,27.31-11.31L374.59,64h53.63c10.91,0,23.75,7.92,28.62,17.69L464,96h64A16,16,0,0,1,544,112Zm-112,0a16,16,0,1,0-16,16A16,16,0,0,0,432,112Z"></path>Sorry, your browser does not support inline SVG.</svg> */}
                
                    <p>{detailB.life_span}</p>
                </div>

                <div className={s.container}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 0 0-11.3 0L403.6 366.3a7.23 7.23 0 0 0 5.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z"></path>Sorry, your browser does not support inline SVG.</svg>
                    {/* <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="3 8 6 5 9 8"></polyline><polyline points="3 16 6 19 9 16"></polyline><line x1="6" y1="5" x2="6" y2="19"></line><line x1="13" y1="6" x2="20" y2="6"></line><line x1="13" y1="12" x2="20" y2="12"></line><line x1="13" y1="18" x2="20" y2="18"></line>Sorry, your browser does not support inline SVG.</svg> */}
                    {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 4h10v2H11V4zM6 7v4H4V7H1l4-4 4 4H6zm0 10h3l-4 4-4-4h3v-4h2v4zm5 1h10v2H11v-2zm-2-7h12v2H9v-2z"></path></g>Sorry, your browser does not support inline SVG.</svg> */}
                    <p>{detailB.height} cm</p>
                </div>

                <div className={s.container}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg"><path d="M510.28 445.86l-73.03-292.13c-3.8-15.19-16.44-25.72-30.87-25.72h-60.25c3.57-10.05 5.88-20.72 5.88-32 0-53.02-42.98-96-96-96s-96 42.98-96 96c0 11.28 2.3 21.95 5.88 32h-60.25c-14.43 0-27.08 10.54-30.87 25.72L1.72 445.86C-6.61 479.17 16.38 512 48.03 512h415.95c31.64 0 54.63-32.83 46.3-66.14zM256 128c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32z"></path>Sorry, your browser does not support inline SVG.</svg>
                    {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 46c-45.074 0-82 36.926-82 82 0 25.812 12.123 48.936 30.938 64H128L32 480h448l-96-288h-76.938C325.877 176.936 338 153.812 338 128c0-45.074-36.926-82-82-82zm0 36c25.618 0 46 20.382 46 46s-20.382 46-46 46-46-20.382-46-46 20.382-46 46-46zm-82.215 202.95h23.5v33.263l33.873-33.264h27.283l-43.883 43.15 48.4 47.974H233.54l-36.255-35.888v35.888h-23.5V284.95zm119.934 21.24c4.76 0 8.952.934 12.573 2.806 3.62 1.872 6.938 4.82 9.95 8.85v-10.13h21.972v61.462c0 10.986-3.48 19.368-10.438 25.146-6.917 5.82-16.968 8.727-30.152 8.727-4.272 0-8.4-.325-12.39-.976-3.986-.65-7.996-1.647-12.024-2.99v-17.03c3.826 2.198 7.57 3.826 11.23 4.884 3.664 1.098 7.347 1.648 11.05 1.648 7.162 0 12.41-1.566 15.746-4.7 3.337-3.132 5.006-8.035 5.006-14.708v-4.7c-3.01 3.986-6.328 6.916-9.95 8.788-3.62 1.87-7.813 2.808-12.573 2.808-8.343 0-15.238-3.275-20.69-9.826-5.453-6.592-8.18-14.974-8.18-25.146 0-10.214 2.727-18.576 8.18-25.086 5.452-6.55 12.347-9.827 20.69-9.827zm8.118 15.746c-4.517 0-8.038 1.67-10.56 5.005-2.523 3.338-3.784 8.058-3.784 14.162 0 6.266 1.22 11.026 3.662 14.28 2.442 3.215 6.003 4.823 10.682 4.823 4.557 0 8.096-1.67 10.62-5.006 2.522-3.337 3.784-8.036 3.784-14.098 0-6.104-1.262-10.824-3.785-14.16-2.523-3.337-6.062-5.006-10.62-5.006z"></path>Sorry, your browser does not support inline SVG.</svg> */}
                    <p>{detailB.weight} Kg</p>
                </div>
            </div>
        </div>
    </div>) 

    : ( <div style={styleDiv}>
    <Link to={`/home`} className={s.link}><p className={s.homeButton}>Home</p></Link>
        <Loading/>
    </div>)}
    </React.Fragment>
)};