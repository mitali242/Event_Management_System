import React, { useState } from "react"
import styles from "./style.module.css";
import { Link } from 'react-router-dom';
import Axios from "axios";

function Admin(props) {
    const [Admin_name , setUsername] = useState('');
    const [Password , setPassword] = useState('');
    const [confirm_Password , setconfirm_Password] = useState('');
    const [name,setname] = useState('');
    const [usernameErr , setUsernameErr] = useState('');
    const [passwordErr , setPasswordErr] = useState('');
    const [contactErr,setcontactErr] = useState('');
    const [emailErr,setemailErr] = useState('');
    const [InfoErr , setInfoErr] = useState('');
    const [Admin_emailID , setEmailid] = useState('');
    const [Admin_ContNo, setContactno] = useState('');
    const [Admin_add, setAddress] = useState('');

    //const [Loginstatus,setLoginStatus]= useState("");

    Axios.defaults.withCredentials = true
    const Register =(e) => {
        e.preventDefault();
        if(!Admin_name && !Password){
            setUsernameErr(' Please enter Username')
            setPasswordErr(' Please enter password')
        }else if(!Admin_name || !Password){
            setInfoErr('fill valid information')
        }else if(Password.length < 8){
            setPasswordErr('password must contain atleast 8 character')
        }else if(Password!==confirm_Password)
        {
            setPasswordErr('password mismatch')
        }
        else if(Admin_ContNo.length !== 10 || Admin_ContNo < 0){
            setcontactErr('invalid Contact Number')
        }
        else if(!(Admin_emailID.includes("@",1)))
        {
            setemailErr("not validate email ID");
        }else if(console.log(Admin_name,Password,Admin_emailID,Admin_ContNo,Admin_add));
        else{
            Axios.post("http://localhost:3001/Register", {
                Admin_name: Admin_name,
                Password: Password,
                Admin_emailID:  Admin_emailID,
                name:name,
                Admin_ContNo: Admin_ContNo,
                Admin_add:Admin_add,
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
        <div>
            <div className={styles.Ad}>
                <h1 align="center">Create Account</h1>
        <div style={{color:"red",fontSize:"20px"}}>{InfoErr}</div>
        <label>Username:</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{usernameErr}</div>
         <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value);}}></input>
         <label>Password:</label>
         <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{passwordErr}</div>
        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value);}}></input>
        <input type="password" placeholder="confirm password" onChange={(e)=>{setconfirm_Password(e.target.value);}}></input>
        <label>Name:</label>
         <input type="text" placeholder="name" onChange={(e)=>{setname(e.target.value);}}></input>
        <label>Contactno</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{contactErr}</div>
        <input type="number" placeholder="contactno" min="0" onChange={(e)=>{setContactno(e.target.value);}}></input>
        <label>Emailid</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{emailErr}</div>
        <input type="email" placeholder="emailid" onChange={(e)=>{setEmailid(e.target.value);}}></input>
        <label>Address</label>
        <input type="address" placeholder="address" onChange={(e)=>{setAddress(e.target.value);}}></input>
                   <center><button onClick={Register}>Register</button></center>
                   <ul align="center" type="none">
                  
                   <li> <Link to="./acc">Already have an account?</Link></li>   
   </ul>
        </div>
  </div>
    );
}

export default Admin;