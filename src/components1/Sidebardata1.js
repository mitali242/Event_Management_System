import React from "react";
import { Link } from 'react-router-dom';
const Sidebardata1 = (props)=> {
    return(
            <div>
                <ul>
                    <li> <Link to ="./registration1">Registration</Link></li>
                    <li> <Link to ="./acc_va">AddVenue</Link></li>
                    <li> <Link to ="./feedback1">Feedback</Link></li>
                    </ul>
            </div>
           
    );
}
export default Sidebardata1;