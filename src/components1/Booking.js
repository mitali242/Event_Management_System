import React, { Component, useState } from "react";
//import { Link } from "react-router-dom";
import styles from "./style.module.css";
//import 'react-dates/initialize';
//import 'react-dates/lib/css/_datepicker.css';
//import { DayPickerRangeController} from 'react-dates';
//import 'react-google-flight-datepicker/dist/main.css';
//import { RangeDatePicker } from 'react-google-flight-datepicker';
import Pay from "./pay";
import Axios from "axios";
//import CheckoutForm from "./CheckoutForm";
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
function Booking(props)
{
    const [Event_name,setevname] = useState('');
    const [Event_place,setevplace] = useState('');
   // const [Venue_name,setevplace] = useState('');
    const [Noofguest,setevnoofguest] = useState('');
    const [Bookdate,setbookdate] = useState('');
   // const [Bookerr,setbookerr] = useState('');
    const [C_emailID , setEmailid] = useState('');
  // const [Paymentmode,setpaymentmode] = useState('');
    const [Paymentdate,setpaymentdate] = useState('');
    const [Pay_amount , setpaymentAmount] = useState('');
    const [ratelist,setvenueratelist]=useState([]);
    const [venuerate,setvenuerate]=useState([]);
    const yesterday = moment().subtract(1, 'day');
const disablePastDt = current => {
  return current.isAfter(yesterday);
};
   // const current = new Date();
   // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    React.useEffect(()=>{
        Axios.get("http://localhost:3001/get_venue_rates").then((response)=>{
            console.log(response.data);            
            setvenueratelist(response.data);  
            });
      
      },[])
      
      
      const handleChange=event=>{
              
        setevplace(event.target.value);
      
        {ratelist.map(item=>{
          if((item.Venue_name)===(event.target.value)){
          setvenuerate(item.Venue_rate)
          console.log(venuerate);
         }
          })}
      
      };
   // const [paymentCompleted, setPaymentCompleted] = useState(false);
        const submit=event=>{
            setbookdate(event.target.value);
         event.preventDefault();
       if(console.log(Event_name,Event_place,Noofguest,Bookdate,Paymentdate,Pay_amount));
      /* else if(Bookdate<=date){
            setbookerr("please enter valid date");
       }*/
       else{
        Axios.post("http://localhost:3001/submit", {
            Event_name: Event_name,
            Noofguest: Noofguest,
            Bookdate: Bookdate,
            Paymentdate: Paymentdate,
            Event_place: Event_place,
            C_emailID :C_emailID,
            Pay_amount: Pay_amount,
        }).then((response)=>{
           // console.log(response.Moment);
           if(response.data.message){
               alert(response.data.message);
           }
           else{
               alert("booking successfull");
           }
        });
       }
        }
    return(
        <div>
        <div className={styles.pa}>
          <h1>Book venue </h1>
          </div><br/>
          <div className={styles.bookE}>
              <label>Event Name:</label>
              <select onChange = {(e)=> {setevname(e.target.value);}}>
              <option>--------</option>
                  <option>Marraige</option>
                  <option>freshers party</option>
                  <option>farewell party</option>
                  <option>birthday party</option>
                  <option>conferrences</option>
                  <option>formal parties</option>
              </select>
              <br/><br/>
              <label>Event place:</label>
              <select value={Event_place} onChange={handleChange}>
              <option>--------</option>
                  {ratelist.map(item=>(
                    <option>{item.Venue_name}</option>
                  ))}
              </select><br/>
              <label>Venue Rate:</label>
              <label>{venuerate}</label><br/>
              <label>No-of-guest:</label>
              <input type="text" onChange={(e) =>{setevnoofguest(e.target.value);}}/><br/><br/>
              <div style={{color:"red",fontSize:"20px",marginTop:"8px"}}></div>
              <label>Book date:</label>
              <input type="date" isValidDate={disablePastDt} selected={Bookdate} onChange={(e) => {setbookdate(e.target.value);}} className={styles.inputStyles}/><br/><br/>
              <label>Payment date:</label>
              <input type="date" onChange={(e) => {setpaymentdate(e.target.value);}} className={styles.inputStyles}></input><br/><br/>
              <label>emailid:</label>
        <input type="email" placeholder="emailid" onChange={(e)=>{setEmailid(e.target.value);}}></input><br/>
        <label>Payment Amount:</label>
              <input type="number" onChange={(e) => {setpaymentAmount(e.target.value);}}></input><br/><br/>
              <center><button onClick={submit}>Submit</button></center>
              <label>Payment:</label>
        <Pay/>
          </div>
          </div>
          )
    }
export default Booking;