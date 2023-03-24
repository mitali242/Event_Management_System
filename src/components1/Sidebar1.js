import React from "react";
import styles from "./style.module.css";
import Registration1 from './Registration1';
import AddVenue from './AddVenue';
import feedback1 from './Feedback1';
import Sidebardata1 from "./Sidebardata1";
import {Route} from 'react-router-dom';
import Acc_va from "./Acc_va"
import Forgetpass2 from "./Forgetpass2";
import Verifyotp2 from "./Verifyotp2";
import Resetpass2 from "./Resetpass2";
const Sidebar1 = (props) =>
{
    return(
        <body>
             <div className={styles.sidebar2}>
               <li> <Route path="/Registration1" component={Registration1} /></li>
               <li> <Route path="/addvenue" component={AddVenue} /></li>
                <li> <Route path="/feedback1" component={feedback1} /></li>
                <li> <Route path="/acc_va" component={Acc_va} /></li>
                <li> <Route path="/forgetpass2" component={Forgetpass2} /></li>
                <li> <Route path="/Verifyotp2" component={Verifyotp2} /></li>
                <li> <Route path="/Resetpass2" component={Resetpass2} /></li>
                <div className={styles.sidebar3}>
                    <Sidebardata1/>

                </div>
        </div>
        </body>
    );
}

export default Sidebar1;