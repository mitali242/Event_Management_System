import React from "react";
import logo1 from './pic/logo.jpeg';
import styles from "./style.module.css";
import admin from './Admin';
import customer from './Customer';
import venueowner from './Venueowner';
import aboutus from './Aboutus';
import {Route} from 'react-router-dom';
import Acc from "./Acc";
//import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Section from "./Section";
import contactform from "./contactform";
import ResetPass from "./Resetpass";
import Verifyotp from "./Verifyotp";
import HtmlToPdf from "./HtmlToPdf";
//import Stepform from "./Stepform";

const Images = (props) => {

    return(
     <body>
           <div className={styles.header}>
           <img src={logo1} alt="not display"></img>
             <h1>Event Management System</h1>
             </div>
             <div className={styles.link1}>
             <ul type = "none">
               <li> <Route path="/admin" component={admin} /></li>
                <li><Route path="/customer" component={customer} /></li>
                <li><Route path="/venueowner" component={venueowner} /></li>
                <li><Route path="/aboutus" component={aboutus} /></li>
                <li><Route path="/acc" component={Acc} /></li>
                <li><Route path="/contactform" component={contactform} /></li>
                <li><Route path="/Resetpass" component={ResetPass}/></li>
                <li><Route path="/HtmlToPdf" component={HtmlToPdf}/></li>
                <li><Route path="/Verifyotp" component={Verifyotp}/></li>
                </ul>
                <div className={styles.section}>
                <Section/>
                </div>
                </div>
                </body>
    );
}

export default Images;