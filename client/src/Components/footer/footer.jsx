import React from "react";

import Vectors from '../../Assets/vectors.js'

import s from "./footer.module.css";


export default function Footer ({currentPage}) {

  return(
    <React.Fragment>
      <div className={s.header}>
        <p className={s.text}>Made by <b>Lucas Beckford</b></p>
        <div className={s.links}>
          <a href='https://github.com/lucasbeck1/' target='blank'>
          {Vectors.git}     
          </a>
          <a href='https://www.linkedin.com/in/lucas-jbec/'target='blank'>
          {Vectors.person}   
          </a>
          <a href='https://www.linkedin.com/in/lucas-jbec/'target='blank'>
          {Vectors.linkedIn}   
          </a>
        </div>
        <p className={s.text}>2022 - All rights reserved</p>
      </div>
    </React.Fragment>
  )
};
