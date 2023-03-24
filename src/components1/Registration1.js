import React, { useState } from "react";
import styles from "./style.module.css";
//import { Link } from 'react-router-dom';
import Axios from "axios";
//mport { render } from "react-dom";

function Registration1(props){
    const [VAdmin_name , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [confirm_Password , setconfirm_Password] = useState('');
    const [name,setname] = useState('');
    const [usernameErr , setUsernameErr] = useState('');
    const [passwordErr , setPasswordErr] = useState('');
    const [InfoErr , setInfoErr] = useState('');
    const [contactErr,setcontactErr] = useState('');
    const [emailErr,setemailErr] = useState('');
    const [VAdmin_emailID , setEmailid] = useState('');
    const [VAdmin_ContNo, setContactno] = useState('');
    const [VAdmin_add, setAddress] = useState('');

    const Signup =(e) => {
        e.preventDefault();
        if(!VAdmin_name && !password){
            setUsernameErr(' Please enter Username')
            setPasswordErr(' Please enter password')
        }else if(!VAdmin_name || !password){
            setInfoErr('fill valid information')
        }else if(password.length < 8){
            setPasswordErr('password must contain atleast 8 character')
        }else if(password!==confirm_Password)
        {
            setPasswordErr('password mismatch')
        }
        else if(VAdmin_ContNo.length !== 10 || VAdmin_ContNo < 0){
            setcontactErr('invalid Contact Number')
        }
        else if(!(VAdmin_emailID.includes("@",1)))
        {
            setemailErr("not validate email ID");
        }else if(console.log(VAdmin_name,password,VAdmin_emailID,VAdmin_ContNo,VAdmin_add));
        else{
            Axios.post("http://localhost:3001/Signup", {
                VAdmin_name: VAdmin_name,
                VAdmin_ContNo:VAdmin_ContNo,
                VAdmin_emailID:  VAdmin_emailID,
                password: password,
                name:name,
                VAdmin_add:VAdmin_add,
            }).then((response)=>{
               console.log(response);
               if(response.data.message)
               {
                   alert(response.data.message);
               }
            });
        }
    };
    return(
        <body>
        <div>
            <div className={styles.VA}>
                <h1 align="center">Create Account</h1>
        <div style={{color:"red",fontSize:"20px"}}>{InfoErr}</div>
        <label>username:</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{usernameErr}</div>
         <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value);}}></input>
         <label>password:</label>
         <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{passwordErr}</div>
        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value);}}></input>
        <input type="password" placeholder="confirm password" onChange={(e)=>{setconfirm_Password(e.target.value);}}></input>
        <label>your name:</label>
        <input type="text" placeholder="name" onChange={(e)=>{setname(e.target.value);}}></input>
        <label>contactno</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{contactErr}</div>
        <input type="number" placeholder="contactno" onChange={(e)=>{setContactno(e.target.value);}}></input>
        <label>emailid</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{emailErr}</div>
        <input type="email" placeholder="emailid" onChange={(e)=>{setEmailid(e.target.value);}}></input>
        <label>address</label>
        <input type="address" placeholder="address" onChange={(e)=>{setAddress(e.target.value);}}/>
                   <center><button onClick={Signup}>Register</button></center>
                   <ul align="center" type="none">
                  
   </ul>
        </div>
  </div>
  </body>
    );
}

export default Registration1;