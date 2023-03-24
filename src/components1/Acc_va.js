import React, {useEffect,useState} from 'react';
import styles from "./style.module.css";
import { withRouter,useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from "axios";
//browserHistory.push("/booking");
 
function Acc_va(props) {
    const [VAdmin_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr , setUsernameErr] = useState('');
    const [passwordErr , setPasswordErr] = useState('');
    const [InfoErr , setInfoErr] = useState('');
    const [,setLoginStatus] = useState('');
   // const [addVenueLink,setaddVenueLink] = useState('');
    const history= useHistory();
    

    const login2 = (e) =>{
        e.preventDefault();
        if(!VAdmin_name && !password){
            setUsernameErr(' Please enter Username')
            setPasswordErr(' Please enter password')
        }else if(!VAdmin_name || !password){
            setInfoErr('fill valid information')}
            else{
                    Axios.post("http://localhost:3001/login2", {
                        VAdmin_name: VAdmin_name,
                        password: password,
                    }).then((response)=>{
                       // console.log(response);
                        //history.push({pathname:"/addvenue"});
                        if (response.data.message)  {
                            alert(response.data.message);
                           // history.push("/addvenue");
                        }
                      else  {
                          console.log(response.data);
                        //alert('logged in success');
                         history.push({pathname:"/addvenue"});
                      }
                    });
                    //  console.log(response);
                };
            }
            useEffect( ()=>{
                Axios.get("http://localhost:3001/login2").then((response)=>{
                    if(response.data.loggedIn === true){
                    setLoginStatus(response.data.VAdmin_name);}
                });
            },[])
     return(
         <div className={styles.sin_va}>
             <h1 align="center">Login Form</h1>
             <div style={{color:"red",fontSize:"20px"}}>{InfoErr}</div>
        <label>username:</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{usernameErr}</div>
         <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value);}}></input>
         <label>password:</label>
         <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{passwordErr}</div>
         <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value);}}></input>
         <button onClick={login2}>Login</button>
         <ul type="none">
         <li> <Link to="./forgetpass2">Forget Password?</Link></li> 
         </ul>
        </div>
        
    );
}
export default withRouter(Acc_va);