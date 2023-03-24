import React from "react";
import styles from "./style.module.css";
import Axios from "axios";


function Showfeedback(){
    const [venuefeed,setvenuefeedlist]=React.useState([]);
    //const [Venue_name1,setevplace] = React.useState('');


    


    React.useEffect(()=>{
        Axios.get("http://localhost:3001/get_venue_feed").then((response)=>{
            console.log(response.data);            
            setvenuefeedlist(response.data);  
            
            });
    
      },[])


    return(
         <div className={styles.tablefeedlist}>


        <div className={styles.selectallfeed}>
        <h1 color="white">Reviews of other Customer</h1>
        <table border="1" bgcolor="white">
            <tr>
                <th>Feedback Description</th>
                <th>RATINGS</th>
                <th>C_ID</th>
            </tr>  
        {venuefeed.map((val,i) =>(
            <tr key={i}>
            <td key={val.Feed_description}>{val.Feed_description}</td>
            <td key={val.Feed_rate}>{val.Feed_rate}</td>
            <td key={val.C_ID}>{val.C_ID}</td>
            </tr>           
        ))}
        
        </table>
        </div>
        </div>      
    );
}


export default Showfeedback;