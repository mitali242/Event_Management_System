import React, {useEffect,useState} from 'react';
import styles from "./style.module.css";
//import {Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from "axios"
//import Stepform from "./Stepform";
 
function Acc(props) {
    const [Admin_name, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [usernameErr , setUsernameErr] = useState('');
    const [passwordErr , setPasswordErr] = useState('');
    const [InfoErr , setInfoErr] = useState('');
    const [,setLoginStatus] = useState('');


    const login = (e) =>{
        e.preventDefault();
        if(!Admin_name && !Password){
            setUsernameErr(' Please enter Username')
            setPasswordErr(' Please enter password')
        }else if(!Admin_name || !Password){
            setInfoErr('fill valid information')}
            else{
                    Axios.post("http://localhost:3001/login", {
                        Admin_name: Admin_name,
                        Password: Password,
                    }).then((response)=>{
                      if (response.data.message)  {
                          alert(response.data.message);
                      }
                      console.log(response);
                    });
                };
            }
            useEffect( ()=>{
                Axios.get("http://localhost:3001/login").then((response)=>{
                    if(response.data.loggedIn === true){
                    setLoginStatus(response.data.Admin_name);}
                });
            },[])
     return(
         <div className={styles.sin}>
             <h1 align="center">Login Form</h1>
             <div style={{color:"red",fontSize:"20px"}}>{InfoErr}</div>
        <label>username:</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{usernameErr}</div>
         <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value);}}></input>
         <label>password:</label>
         <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{passwordErr}</div>
         <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value);}}></input>
         <ul type="none">
         <li> <Link to="./contactform">Forget Password?</Link></li> 
         </ul>  
         <center><button onClick={login}>Login</button></center>
        </div>
    );
}
export default Acc;