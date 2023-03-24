import React from "react";
import tulsiground1 from './pic/tulsiground1.jpg';
import styles from "./style.module.css";
//import Images from "./Images";+

const Gallery =(props)=>{
    return(
        <body>
          <div className={styles.search2}>
          <img src={tulsiground1} alt="not display"></img>
        </div>
        </body>
    );
}

export default Gallery;