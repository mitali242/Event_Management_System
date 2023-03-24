import React from "react";
import { Link } from 'react-router-dom';
const Sidebardata = (props)=> {
    return(
            <div>
                <ul>
                    <li> <Link to ="./registration">Registration</Link></li>
                    <li> <Link to ="./Searchvenue">SearchVenue</Link></li>
                    <li> <Link to ="./acc1">Booking</Link></li>
                    <li> <Link to ="./feedback">Feedback</Link></li>
                    </ul>
            </div>
           
    );
}
export default Sidebardata;