//import contactform from 'components1/contactform';
import React, {useState} from 'react';
import styles from "./style.module.css";
import Axios from "axios";
//import Stepform from './Stepform';
//import Otpinput from "./Verifyotp";
//import Stepform from "./Stepform";
import { withRouter,useHistory } from 'react-router-dom';



function Contact(props) {
  // const {value,handlechange,hashhandlechange} = props;
    const [VAdmin_emailID,setEmailid] = useState('');
    const [VAdmin_name,setVAname] = useState('');
    const [emailErr,setemailErr] = useState('');
  //const [EmailStaus,setEmailStatus] = useState('');
  const history = useHistory();
 const sendEmailV= e =>{
        e.preventDefault();
        if(!(VAdmin_emailID.includes("@",1)))
        {
            setemailErr("not validate email ID");
        }
       
        Axios.post("http://localhost:3001/sendEmailV", {
            VAdmin_emailID:  VAdmin_emailID,
            VAdmin_name: VAdmin_name,
        }).then((response)=>{
          if (response.data.message)  {
            //alert(response.data.message);
            alert(response.data.message);
            }else {
              alert('email sent on your mailid');
              history.push({pathname:"/Verifyotp2",
              state: response.data.hash});
            }})
            
        }
    return (
        <div className={styles.formgroup1}>
       <form action="" method="POST" className="contact-form" onSubmit={sendEmailV}>
       <center> <label>Forgot Password</label><br/></center>
          <label>Name</label>
          <input type="text" name="user_name" onChange={(e)=>{setVAname(e.target.value);}}/><br/>
          <label>Email</label>
          <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{emailErr}</div>
           <input type="email" className="form-control" placeholder="mail id" onChange={(e)=> {setEmailid(e.target.value)}}></input>
          <center>  <button type="submit">next</button> <br/><br/></center>
        </form>
 </div>
      );
    }
    export default withRouter(Contact);