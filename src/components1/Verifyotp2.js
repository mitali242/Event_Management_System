import React, { useState }  from 'react'
import styles from "./style.module.css";
import Axios from "axios";
import { withRouter,useHistory } from 'react-router-dom';
//import { hash } from 'bcrypt';
//import Stepform from "./Stepform";



function Otpinput2(props) {
  //const {value} = props;
  const [userotp1,handlechange] = useState('');
  const history= useHistory();
  Axios.defaults.withCredentials = true;
  const confirmotp2 = (e) =>{
    Axios.post("http://localhost:3001/Verifyotp2", {
    // Admin_emailID: `${value.Admin_emailID}`,
    // hash: `${value.hash}`,
      userotp1: userotp1,
  }).then((response)=>{
    if(response.data.message)
    {
    alert(response.data.message);
  } else{
    console.log(response.data);
    history.push("/Resetpass2");
  }
})
    e.preventDefault();
   // props.nextstep()
}
/*const Back = (e) =>{
  e.preventDefault();
  props.prevstep()
}*/

return (
  <div className={styles.formgroup1}>
   <center> <label>OTP Verify</label><br/></center>
    <label>Enter otp</label>
    <input type="number" onChange={(e)=>{handlechange(e.target.value);} } placeholder="Enter otp here"></input><br/>
    <center><button onClick={confirmotp2}>SendOTP</button></center>
  </div>

)
}
export default withRouter(Otpinput2);

  
  