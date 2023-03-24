//import contactform from 'components1/contactform';
import React, {useState} from 'react';
import styles from "./style.module.css";
import Axios from "axios";
import { withRouter,useHistory } from 'react-router-dom';
//import Verifyotp from "./Verifyotp";
//import Stepform from './Stepform';
//import Otpinput from "./Verifyotp";
//import Stepform from "./Stepform";


 function ContactUs(props) {
  // const {value,handlechange,hashhandlechange} = props;
  const [emailErr,setemailErr] = useState('');
 // const [Emailid,setemailid] = useState('');
    const [Admin_emailID,setEmailid] = useState('');
    const [Admin_name,setAdminname] = useState('');
// const [EmailStaus,setEmailStatus] = useState('');
 // const [otp,handlechange] = useState('');
  const history= useHistory();
 const sendEmail= e =>{
  if(!(Admin_emailID.includes("@",1)))
  {
      setemailErr("not validate email ID");
  }
        e.preventDefault();
        Axios.post("http://localhost:3001/sendEmail", {
            Admin_emailID:  Admin_emailID,
            Admin_name: Admin_name,
        }).then((response)=>{
            if (response.data.message)  {
              //alert(response.data.message);
              alert(response.data.message);
            }else {
              // console.log(response.data);
               alert('email sent on your mailid');
               history.push({
                 pathname: "/Verifyotp",
               state: response.data.hash});
               }
              })}
            
       // }
        /*const [otp,handlechange] = useState('');
        const confirmotp = (e) =>{
          Axios.post("http://localhost:3001/confirmotp", {
          // Admin_emailID: `${value.Admin_emailID}`,
          // hash: `${value.hash}`,
            otp: otp,
        }).then((res)=>{
          console.log(res.data.message)
        }).catch((error)=>{
          console.error(error.response.data)
        })
          e.preventDefault();
         // props.nextstep()
      }*/
    return (
        <div className={styles.formgroup1}>
       <form action="" method="POST" className="contact-form" onSubmit={sendEmail}>
       <center> <label>Forgot Password</label><br/></center>
          <label>Name</label>
          <input type="text" name="user_name" onChange={(e)=>{setAdminname(e.target.value);}}/><br/>
          <label>Email</label>
          <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{emailErr}</div>
           <input type="email" className="form-control" placeholder="mail id" onChange={(e)=> {setEmailid(e.target.value)}}></input>
        
          <center>  <button type="submit">next</button> <br/><br/></center>
        </form>

 </div>
      );
    }
    export default withRouter(ContactUs);