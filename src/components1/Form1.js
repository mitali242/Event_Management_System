import React, { useState} from 'react';
import styles from "./style.module.css";
import Axios from "axios";

function Form1(){
    const [Card_number, setCardnumber] = useState('');
    const [Card_expiry, setcardexpiry] = useState('');
    const [Card_CVC, setcardCVC] = useState('');
    const [Card_holder, setcardholder] = useState('');
    const [C_emailid , setEmailid] = useState('');
    const [cardnumberErr , setcardnumberErr] = useState('');
    const [cardexpiryErr , setcardexpiryErr] = useState('');
    const [cardCVCErr , setcardCVCErr] = useState('');
    const [cardholderErr , setcardholderErr] = useState('');
    const [Payment,setPAyment] = useState('');

    const [InfoErr , setInfoErr] = useState('');

 
    const sendPayment = (e) =>{
        if(C_emailid &&!Card_number && !Card_expiry && !Card_CVC && !Card_holder){
            setcardnumberErr(' Please enter Card Number')
            setcardexpiryErr(' Please enter Card Expiry')
            setcardCVCErr(' Please enter Card CVC')
            setcardholderErr(' Please enter Card Holder Name')
            
        }else if(!Card_number || !Card_expiry || !Card_CVC || !Card_holder || !Payment){
            setInfoErr('fill valid information')
        }else{
            e.preventDefault();
                Axios.post("http://localhost:3001/sendPayment", {
                C_emailid :C_emailid,
           
        }).then((response)=>{
            if (response.data === 'email not in db')  {
                setEmailid(response.data.message);
            }else {
               console.log(response);
            }})
        }

    }
    
    return(
            <div className={styles.debitpay}>
                
               <h1 align="center">DEBIT/CREDIT CARD PAYMENT</h1>
               <div style={{color:"red",fontSize:"20px"}}>{InfoErr}</div>
               <label>emailid</label>
        <input type="emailid" placeholder="emailid" onChange={(e)=>{setEmailid(e.target.value);}}></input>
            <label>CARD NUMBER</label>
            <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{cardnumberErr}</div>
            <input type="text" placeholder="Card Number" onChange={(e)=>{setCardnumber(e.target.value);}}></input>
            
            <label>CARD EXPIRY</label>
            <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{cardexpiryErr}</div>
            <input type="month" onChange={(e)=>{setcardexpiry(e.target.value);}}></input>

            <label>CARD CVC</label>
            <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{cardCVCErr}</div>
            <input type="number" placeholder="Card CVC" onChange={(e)=>{setcardCVC(e.target.value);}}></input>
            
            <label>Payment Amount:</label>
              <input type="text" onChange={(e)=>{setPAyment(e.target.value)}}/>

            <label>CARD HOLDER NAME</label>
            <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}>{cardholderErr}</div>
            <input type="text" placeholder="Card holder name" onChange={(e)=>{setcardholder(e.target.value);}}></input>

            <center><button onClick={sendPayment}>MAKE PAYMENT</button></center>
            
            </div>
           
    );
    }
export default Form1;