import React, {useState} from 'react';
import styles from "./style.module.css";
//import {Route} from 'react-router-dom';
//import { Link } from 'react-router-dom';
import Axios from "axios";
//import { withRouter,useHistory } from 'react-router-dom';
//import Stepform from "./Stepform";
 
function ResetPass(props) {

    const [newpassword , setnewpassword] = useState('');
   // const [otp, handlechange] = useState('');
    const [confirmpassword , setconfirmPassword] = useState('');
    const [newpassErr , setnewpasseErr] = useState('');
    const [confirmpassErr , setconfirmPasswErr] = useState('');
    const [InfoErr , setInfoErr] = useState('');
    const [Admin_name,setAdminname] = useState('');
    //const history = useHistory();

    //const [Loginstatus,setLoginStatus]= useState("");

    Axios.defaults.withCredentials = true
    const resetpass =(e) => {
        e.preventDefault();
        if(!newpassword && !confirmpassword){
            setnewpasseErr(' Please enter new password')
            setconfirmPasswErr(' Please enter confirm password')
        }else if(!newpassword || !confirmpassword){
            setInfoErr('fill valid information')
        }else if(newpassword.length < 8 && confirmpassword.length< 8){
            setInfoErr('password must contain atleast 8 character')
        }else if(newpassword!==confirmpassword)
        {
            setInfoErr('Password mismatch');
        }
         else if(console.log(newpassword,confirmpassword));
        else{
            Axios.post("http://localhost:3001/resetpass", {
                newpassword:newpassword,
                confirmpassword:confirmpassword,
                Admin_name: Admin_name,
            }).then((response)=>{
                if(response.data.message){
                    alert(response.data.message);
                }
                console.log(response);
            });
           // history.push("/");
        } };

    return(
        <div className={styles.resetform}>
        
            <h1 align="center">Reset Password</h1>
            <div style={{color:"red",fontSize:"20px"}}>{InfoErr}</div>
       <label>New password:</label>
       <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{newpassErr}</div>
        <input type="password" placeholder="new password" onChange={(e)=>{setnewpassword(e.target.value);}}></input>
        <label>Confirm password:</label>
        <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{confirmpassErr}</div>
        <input type="password" placeholder=" confirm password" onChange={(e)=>{setconfirmPassword(e.target.value);}}></input> 
        <label>user name:</label>
        <input type="text" placeholder="username" onChange={(e)=>{setAdminname(e.target.value);}}></input> 
        <center><button onClick={resetpass}>Reset password</button></center>
       </div>
   );
}
export default ResetPass;