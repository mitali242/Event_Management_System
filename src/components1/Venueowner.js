import React from 'react';
//import styles from "./style.module.css";
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar1 from "../components1/Sidebar1";
//import Account from "./Account";

function venueowner(props)
{
    return(
        <Router>
        <div>
            <Sidebar1/>
        </div>
        </Router>
    );
}

export default venueowner;