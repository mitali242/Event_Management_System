import React, {useEffect,useState} from 'react';
import styles from "./style.module.css";
//import {Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withRouter,useHistory } from 'react-router-dom';
import Axios from "axios";
 
function Acc1(props) {
    const [C_name, setUsername] = useState('');
    const [C_Password, setPassword] = useState('');
    const [usernameErr , setUsernameErr] = useState('');
    const [passwordErr , setPasswordErr] = useState('');
    const [InfoErr , setInfoErr] = useState('');
    const [,setLoginStatus] = useState('');
    //const [bookingLink,setbookingLink] = useState('');
    const history= useHistory();

    const login1 = (e) =>{
        e.preventDefault();
        if(!C_name && !C_Password){
            setUsernameErr(' Please enter Username')
            setPasswordErr(' Please enter password')
        }else if(!C_name || !C_Password){
            setInfoErr('fill valid information')}
            else{
                    Axios.post("http://localhost:3001/login1", {
                        C_name: C_name,
                        C_Password: C_Password,
                    }).then((response)=>{
                       // console.log(response);
                       // history.push({pathname:"/booking"});
                        if (response.data.message)  {
                            alert(response.data.message);
                             }
                            // if(response.data)
                            else{
                                 console.log(response.data);
                       //alert("logged in");
                         history.push({pathname: "/booking"});
                        }
                     // console.log(response);
                })
            };
        }
            useEffect( ()=>{
                Axios.get("http://localhost:3001/login1").then((response)=>{
                  //  if(response.data.loggedIn === true){
                    setLoginStatus(response.data.C_name);
                });
            },[])
     return(
         <div className={styles.sin1}>
             <h1 align="center">Login Form</h1>
             <div style={{color:"red",fontSize:"20px"}}>{InfoErr}</div>
        <label>username:</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{usernameErr}</div>
         <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value);}}></input>
         <label>password:</label>
         <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{passwordErr}</div>
         <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value);}}></input>
         <ul type="none">
        
         <li> <Link to="./forgetpass1">Forget Password?</Link></li> 

         </ul>  
         <center><button onClick={login1}>Login</button></center>
        </div>
    );
}
export default withRouter(Acc1);