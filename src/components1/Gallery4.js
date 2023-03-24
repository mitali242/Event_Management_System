import React from "react";
import maheshwaripartyplot from './pic/maheshwaripartyplot.jpg';
import styles from "./style.module.css";
//import Images from "./Images";

const Gallery =(props)=>{
    return(
        <body>
          <div className={styles.search2}>
          <img src={maheshwaripartyplot} alt="not display"></img>
        </div>
        </body>
    );
}

export default Gallery;