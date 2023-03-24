//import contactform from 'components1/contactform';
import React, {useState} from 'react';
import styles from "./style.module.css";
import Axios from "axios";
import { withRouter,useHistory } from 'react-router-dom';
//import Stepform from './Stepform';
//import Otpinput from "./Verifyotp";
//import Stepform from "./Stepform";



function ContactMe(props) {
  // const {value,handlechange,hashhandlechange} = props;
    const [C_emailID,setEmailid] = useState('');
    const [emailErr,setemailErr] = useState('');
    const [C_name,setCustname] = useState('');
  //const [EmailStaus,setEmailStatus] = useState('');
  const history = useHistory();
 const sendEmailC= e =>{
        e.preventDefault();
        if(!(C_emailID.includes("@",1)))
        {
            setemailErr("not validate email ID");
        }
        Axios.post("http://localhost:3001/sendEmailC", {
            C_emailID:  C_emailID,
            C_name: C_name,
        }).then((response)=>{
          if (response.data.message)  {
            //alert(response.data.message);
            alert(response.data.message);
            }else {
            alert('email sent on your mailid');
               history.push({
                pathname: "/Verifyotp1",
               state: response.data.hash});
               }
            })}
            
       // }
    return (
        <div className={styles.formgroup1}>
       <form action="" method="POST" className="contact-form" onSubmit={sendEmailC}>
       <center> <label>Forgot Password</label><br/></center>
          <label>Name</label>
          <input type="text" name="user_name" onChange={(e)=>{setCustname(e.target.value);}}/><br/>
          <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{emailErr}</div>
          <input type="email" className="form-control" placeholder="mail id" onChange={(e)=> {setEmailid(e.target.value)}}></input>
          <center>  <button type="submit">next</button> <br/><br/></center>
        </form>
 </div>
      );
    }
    export default withRouter(ContactMe);