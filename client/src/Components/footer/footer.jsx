import React, {useState} from "react";
import Vectors from '../../Assets/vectors.js'
import s from "./footer.module.css";


export default function Footer () {

  const year = new Date().getFullYear().toString();
  const [smallScreen, setSmallScreen] = useState(false);
  const [start, setStart] = useState(true);

  if(window.screen.availWidth <= 590 && smallScreen !== true && start === true){
    setSmallScreen(true);
    setStart(false);
  };
  
  return(
    <React.Fragment>
       {smallScreen ? (
        <div className={s.footerSmall}>
         <div>
           <span className={s.text}>Made by </span>
           <span className={s.textBold}>Lucas Beckford</span>
         </div>
 
         <div className={s.links}>
          <a href='https://lucasbeck1.github.io/Portfolio/'target='blank'>
           {Vectors.person}   
          </a>
          <a href='https://www.linkedin.com/in/lucas-jbec/'target='blank'>
           {Vectors.linkedIn}   
          </a>
          <a href='https://github.com/lucasbeck1' target='blank'>
           {Vectors.git}
          </a>
         </div>
         <p className={s.text}>{year} - All rights reserved</p>
       </div>
      ):(
      <div className={s.footer}>
        <div>
          <span className={s.text}>Made by </span>
          <span className={s.textBold}>Lucas Beckford</span>
        </div>

        <div className={s.links}>
          <a href='https://lucasbeck1.github.io/Portfolio/'target='blank'>
           {Vectors.person}   
          </a>
          <a href='https://www.linkedin.com/in/lucas-jbec/'target='blank'>
           {Vectors.linkedIn}   
          </a>
          <a href='https://github.com/lucasbeck1' target='blank'>
           {Vectors.git}
          </a>
        </div>
        <p className={s.text}>{year} - All rights reserved</p>
      </div>
      )}
    </React.Fragment>
  )
};
