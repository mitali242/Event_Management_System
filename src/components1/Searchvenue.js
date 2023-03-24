
import React from "react";
import styles from "./style.module.css";
import Axios from "axios";
import { Link } from 'react-router-dom';
//import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

const events=[
    "Tulsi ground",
    "Silver hall",
    "Dolphin Restraurant",
    "Maheshwari party plot",
    "Akshar ground",
    "The Paradise Inn",
];


function Searchvenue(){
    const[serachterm,setsearchterm]=React.useState('');
    const[searchResults,setsearchResults]=React.useState([]);
    const[searchdate,setsearchdate]=React.useState(new Date());
   // const[venueStatus,setvenueStatus]=React.useState('');
    const[venueplacelist,setvenueplacelist]=React.useState([]);
    //const[venueStatus,setvenueStatus]=React.useState('');
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
      };

    React.useEffect(()=>{
        Axios.get("http://localhost:3001/get_venue_places").then((response)=>{
            console.log(response.data);            
            setvenueplacelist(response.data);  
            
            });
      },[])
        
    
        const handleChange=event=>{
            
                setsearchterm(event.target.value);
    
        
        };
    
        const handleChange2=event=>{
            {venueplacelist.map(val =>(
                events.splice(1,events.lastIndexOf(val.Venue_name))    
                 ))}
            
            
            
            {venueplacelist.map(val =>(
                events.unshift(val.Venue_name)    
                 ))}
    
    };
    
        
        React.useEffect(()=>{   
    
            const results=events.filter(eventss=>
                eventss.toLowerCase().includes(serachterm.toLowerCase()));
                setsearchResults(results);    },[serachterm]);
    

 const searching =(e) => {
                
                e.preventDefault();
                console.log(serachterm,searchdate);

                if(serachterm===""){
                alert("Enter Search data")
                }else if(events.includes(serachterm))
                {
                   alert("match data",searchResults);
                }
                else
                {
                    alert("not found data")
                }

                Axios.post("http://localhost:3001/searching", {
                searchdate:searchdate,
                serachterm:serachterm,
                  }).then((response)=>{
                    console.log(response);

                    if(response.data.message)
                    {
                        alert(response.data.message);
                    }
                });
            }
            
            return(
                <div className={styles.search1}>
                    <input type="text" placeholder="search"
                    value={serachterm}
                    onChange={handleChange}
                     onClick={handleChange2}/><br/><br/>
                    <label>Enter date</label>
                    <input type="date" isValidDate={disablePastDt} selected={searchdate} onChange={(e) => {setsearchdate(e.target.value);}}></input><br/><br/> 
                {searchResults.map(item =>(
                        <ul type ="none">
                    <li>{item}</li>
                    </ul>
                    ))}
                    <div className={styles.search2}>
                      <ul type="none">
              <li> <Link to ="/gallery">Images for venue Tulsi Ground</Link></li>
                <li> <Link to ="/gallery1">Images for venue Silver hall</Link></li> 
                <li> <Link to ="/gallery3">Images for venue Dolphin Restraurant</Link></li> 
                <li> <Link to ="/gallery4">Images for venue maheshwaripartyplot</Link></li> 
                <li> <Link to ="/gallery5">Images for venue aksharground</Link></li> 
                <li> <Link to ="/gallery6">Images for venue paradiseinn</Link></li> 
                </ul>
                </div>
                <center><button onClick={searching}>search</button></center>
                <center>
                <div className={styles.tablevenuelist}>
                <table border="1" bgcolor="white">
                    <tr>
                        <th>Available Venue</th>
                        <th>Venue Rate</th>
                    </tr>  
                {venueplacelist.map((val,i) =>(
                    <tr key={i}>
                    <td key={val.Venue_name}>{val.Venue_name}</td>
                    <td key={val.Venue_rate}>{val.Venue_rate}</td>
                    </tr>           
                ))}
                
                </table>
                </div>
                </center>
                </div>
        
            );
}

export default Searchvenue;