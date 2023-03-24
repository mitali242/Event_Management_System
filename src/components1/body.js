import { React } from "react";
import { useState } from 'react';
//import style from './style.module.css';

const Body = (props) => {
    const [showView,changeView] = useState(true)
    const changeview=()=>{
        changeView(!showView);
    }
   return(
        <div>
            <h3>
            {
                showView ? 'View1':'View2'
            }
            </h3>
            <button onClick={()=>changeview()}>ChangeView</button>
            </div>
    )
}

export default Body;