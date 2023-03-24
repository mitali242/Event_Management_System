import React from "react";
import img1 from './pic/event.jpg';
import styles from "./style.module.css";
//import { Link } from 'react-router-dom';
//import Images from "./Images";

const Aboutus =(props)=>{
    return(
        <body>
          <div className={styles.content}>
          <img src={img1} alt="not display"></img>
        <h1>Event Registration</h1>
        <p>Its Deliver a perfect registration experience and increase repeat event attendance.Our Registration platform is the most secure, easy-to-use, highly customizable and feature-packed platform powering meetings and events of all sizes.</p>
        </div>
        </body>
    );
}

export default Aboutus;