import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getBreeds, getTemperaments } from '../../Redux/actions';
import s from "./landing.module.css";
import image1 from "../../Assets/back-1.jpeg";
import image2 from "../../Assets/back-2.jpg";
import image3 from "../../Assets/back-3.jpg";


export default function Landing(){

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBreeds());
    dispatch(getTemperaments());
  },[dispatch]);

  return(
    <React.Fragment>
      <div className={s.pageContainer}>
        <div className={s.contentConatiner}>
          <div className={s.textContainer}>
            <h2>Dogui Pedia</h2>
            <h4>The Dog Breeds Encyclopedia</h4>
            <Link to='/home' >
              <button className={s.btnStart}>Get Started</button>
            </Link>
          </div>
          <div className={s.imageContainer}>
            <img src={image1} alt="dogui" className={s.image}/>
            <img src={image2} alt="dogui" className={s.image}/>
            <img src={image3} alt="dogui" className={s.image}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};
