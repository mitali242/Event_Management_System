import React from "react";
import { Link } from 'react-router-dom';
const Section = (props)=> {
    return(
            <div>
                <ul>
                    <li> <Link to ="./admin">Admin</Link></li>
                    <li> <Link to ="./customer">Customer</Link></li>
                    <li> <Link to ="./venueowner">VenueOwner</Link></li>
                    <li> <Link to ="./aboutus">Aboutus</Link></li>
                    </ul>
            </div>
           
    );
}
export default Section;