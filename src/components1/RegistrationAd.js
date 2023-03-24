import React, { useState } from "react";
import styles from "./style.module.css";
import { Link } from 'react-router-dom';
import Axios from "axios";
//mport { render } from "react-dom";

function Registration(props){
    const [C_name , setUsername] = useState('');
    const [C_Password , setPassword] = useState('');
    const [usernameErr , setUsernameErr] = useState('');
    const [passwordErr , setPasswordErr] = useState('');
    const [InfoErr , setInfoErr] = useState('');
    const [C_emailid , setEmailid] = useState('');
    const [C_ContNo, setContactno] = useState('');
    const [C_add, setAddress] = useState('');
    const [C_IDproof, setIDproof] = useState('');
    const [C_IDproofNo,setIDproofNo] = useState('');

   // const [Loginstatus,setLoginStatus]= useState("");
    Axios.defaults.withCredentials = true

    const handleChange = (e) => {
       setIDproof(e.target.value);
    }
    const Signin =(e) => {
        e.preventDefault();
        if(!C_name && !C_Password){
            setUsernameErr(' Please enter Username')
            setPasswordErr(' Please enter password')
        }else if(!C_name || !C_Password){
            setInfoErr('fill valid information')
        }else if(C_Password.length < 8){
            setPasswordErr('password must contain atleast 8 character')
        }else if(console.log(C_name,C_Password,C_emailid,C_ContNo,C_add,C_IDproof,C_IDproofNo));
        else{
            Axios.post("http://localhost:3001/Signin", {
                C_name: C_name,
                C_ContNo:C_ContNo,
                C_emailid:  C_emailid,
                C_Password: C_Password,
                C_add:C_add,
                C_IDproofNo:C_IDproofNo,
                C_IDproof:C_IDproof,
            }).then((response)=>{
               console.log(response);
            });
        }
    };
    /*useEffect( ()=>{
        Axios.get("http://localhost:3001/Signin").then((response)=>{
            if(response.data.loggedIn === true){
            setLoginStatus(response.data.user[0].C_name);}
        });
    },[])*/
    return(
        <body>
        <div>
            <div className={styles.Cust}>
                <h1 align="center">Create Account</h1>
        <div style={{color:"red",fontSize:"20px"}}>{InfoErr}</div>
        <label>username:</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{usernameErr}</div>
         <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value);}}></input>
         <label>password:</label>
         <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{passwordErr}</div>
        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value);}}></input>
        <label>contactno</label>
        <input type="contactno" placeholder="contactno" onChange={(e)=>{setContactno(e.target.value);}}></input>
        <label>emailid</label>
        <input type="emailid" placeholder="emailid" onChange={(e)=>{setEmailid(e.target.value);}}></input>
        <label>address</label>
        <input type="address" placeholder="address" onChange={(e)=>{setAddress(e.target.value);}}/>
       <label>IDproof</label>
       <center> <input  type="radio" name="formdata" onChange={handleChange} value="Pancard"/> <span>PanCard</span></center>
        <center><input type="radio" name="formdata" onChange={handleChange} value="AhaeCard"/>  <span>AdharCard</span></center>
        <center> <input type="radio" name="formdata" onChange={handleChange} value="Electioncard"/> <span>Electioncard</span></center>
        <center><input type="radio" name="formdata" onChange= {handleChange} value="Drivinglicense"/>  <span>Driving license</span></center>
        <label>IDproofNo</label>
        <input type="text" placeholder="IDproof number" onChange={(e)=>{setIDproofNo(e.target.value);}}/>
                   <center><button onClick={Signin}>Register</button></center>
                   <ul align="center" type="none">
                  
                      
   </ul>
        </div>
  </div>
  </body>
    );
}

export default Registration;