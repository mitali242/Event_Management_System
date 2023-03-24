import React from 'react';
//import styles from "./style.module.css";
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from "../components1/Sidebar";
//import Account from "./Account";

function customer()
{
    return(
        <Router>
        <div>
            <Sidebar/>
        </div>
        </Router>
    );
}

export default customer;