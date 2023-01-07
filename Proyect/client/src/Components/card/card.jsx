import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../Assets/dog-cartoon-1.webp"
import s from "./card.module.css";



export default function Card({id, name, img, weight, temp}){
    
    if(temp && temp.split(', ').length > 3){
        temp = temp.split(', ').slice(0,3).join(', ');
    };
    
    
    const styleDiv = {
        width:'340px', 
        height:'200px',
        //backgroundColor: "rgb(204, 109, 31)",
    };
    
    
    // import Grade from 'grade-js'
    // function gradient(){
    //     let div = document.querySelectorAll('.gradient-wrap')
    //     let divGrade = Grade(div)
    //     console.log('1: ', divGrade)
    // };
    // <img src={img? img: (defaultImage)} alt='Dog' className={s.image} cross-origin="anonymous" key={img} onLoad={gradient}/>
 

    return(
        id === 'NO LINK' ?
        (
        <div key={id} className={s.cardStatic}>
          <img src={img? (img) : (defaultImage)} alt='Dog'className={s.image}/>
          <h4>{name}</h4>
          <p>{weight} Kg</p>
          <p>{temp}</p>
        </div>
        )
        : 
        (
        <Link to={`/detail/${id}`} className={s.det}>
          <div key={id} className={s.card}>
            <div key={id} className='gradient-wrap' style={styleDiv}>
              <img src={img? img: (defaultImage)} alt='Dog' className={s.image} cross-origin="anonymous" key={img}/>
            </div>
            <h4>{name}</h4>
            <p>{weight} Kg</p>
            <p>{temp}</p>
          </div>
        </Link>
        )
    );
};

