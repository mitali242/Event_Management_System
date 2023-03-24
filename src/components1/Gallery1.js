import React from "react";
import silverhall from './pic/silverhall.jpg';
import styles from "./style.module.css";
//import Images from "./Images";

const Gallery1 =(props)=>{
    return(
        <body>
          <div className={styles.search3}>
          <img src={silverhall} alt="not display"></img>
        </div>
        </body>
    );
}

export default Gallery1;