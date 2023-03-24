import React, { useState } from "react";
//import { Link } from "react-router-dom";
import styles from "./style.module.css";
import Axios from "axios";

function AddVenue(props)
{
   const [Venue_name,setvenname] = useState('');
    const [Venue_add,setvenadd] = useState('');
    const [Venue_capacity,setvencapacity] = useState('');
    const [Venue_rate,setvenrate] = useState('');
    const [VAdmin_name , setUsername] = useState('');

    const upload = (e) =>{
        e.preventDefault();
       if(console.log(Venue_name,Venue_add,Venue_capacity,Venue_rate));
       else{Axios.post("http://localhost:3001/upload", {
        VAdmin_name:VAdmin_name,
        Venue_name: Venue_name,
        Venue_add: Venue_add,
        Venue_capacity:Venue_capacity,
        Venue_rate: Venue_rate,
    }).then((response)=>{
        if(response.data.message){
            alert(response.data.message);
        }
       console.log(response);
    });
}}
    return(
        <div>
        <div className={styles.pa}>
        <h1>Add venue </h1>
        </div><br/>
        <div className={styles.bookE}>
        <label>User Name:</label>
              <input type="text" onChange={(e) =>{setUsername(e.target.value);}}/><br/><br/>
             <label>Venue Name:</label>
              <input type="text" onChange={(e) =>{setvenname(e.target.value);}}/><br/><br/>
              <label>Venue address:</label>
              <textarea width="200px" height="200px" onChange={(e) =>{setvenadd(e.target.value);}}/><br/><br/>
              <label>Venue Capacity:</label>
              <input type="text" onChange={(e) =>{setvencapacity(e.target.value);}}/><br/><br/>
              <label>Venue rate:</label>
              <input type="text" onChange={(e) =>{setvenrate(e.target.value);}}/><br/><br/>
              <center><button onClick={upload}>Upload</button></center>
        </div>
        </div>
    )
}

export default AddVenue;