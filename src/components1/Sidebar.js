import React from "react";
import styles from "./style.module.css";
import Registration from './Registration';
import booking from './Booking';
import Searchvenue from './Searchvenue';
//import paymentcancel from './Paymentcancel';
import feedback from './Feedback';
import Sidebardata from "./Sidebardata";
import {Route} from 'react-router-dom';
import Acc1 from "./Acc1";
import Forgetpass1 from "./Forgetpass1";
import ResetPass1 from "./Resetpass1";
import form1 from "./Form1";
import Verifyotp1 from "./Verifyotp1";
//import CheckoutForm from "./CheckoutForm";
//import Paymentcancel from "./Paymentcancel";
import pay from "./pay";
import gallery from "./Gallery";
import gallery1 from "./Gallery1";
import gallery3 from "./Gallery3";
import gallery4 from "./Gallery4";
import gallery5 from "./Gallery5";
import gallery6 from "./Gallery6";
const Sidebar = (props) =>
{
    return(
        <body>
             <div className={styles.sidebar1}>
               <li> <Route path="/Registration" component={Registration} /></li>
               <li>  <Route path="/booking" component={booking} /></li>
                <li> <Route path="/feedback" component={feedback} /></li>
                <li> <Route path="/acc1" component={Acc1} /></li>
                <li><Route path="/Forgetpass1" component={Forgetpass1} /></li>
                <li><Route path="/Verifyotp1" component={Verifyotp1} /></li>
                <li><Route path="/Resetpass1" component={ResetPass1} /></li>
                <li> <Route path="/form1" component={form1} /></li>
                <li> <Route path="/pay" component={pay} /></li>
                <li>  <Route path="/searchvenue" component={Searchvenue} /></li>
                <li>  <Route path="/gallery" component={gallery} /></li>
                <li>  <Route path="/gallery1" component={gallery1} /></li>
                <li>  <Route path="/gallery3" component={gallery3} /></li>
                <li>  <Route path="/gallery4" component={gallery4} /></li>
                <li>  <Route path="/gallery5" component={gallery5} /></li>
                <li>  <Route path="/gallery6" component={gallery6} /></li>
                <div className={styles.sidebar}>
                    <Sidebardata/>

                </div>
        </div>
        </body>
    );
}

export default Sidebar;