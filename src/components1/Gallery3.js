import React from "react";
import dolphin from './pic/dolphin.jpg';
import styles from "./style.module.css";
//import Images from "./Images";

const Gallery3 =(props)=>{
    return(
        <body>
          <div className={styles.search3}>
          <img src={dolphin} alt="not display"></img>
        </div>
        </body>
    );
}

export default Gallery3;