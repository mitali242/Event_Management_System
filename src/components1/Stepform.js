import React,{useState} from 'react';
import ContactUs from './contactform';

import Otpinput from './Verifyotp';


function Stepform(){
    const [state,setstate] = useState({
        Admin_emailID:'',
        hash: '',
        otp:''
    })
    const [step,setstep] = useState(1)
    const handlechange = (input) => (e) =>{
        setstate({...state,[input]: e.target.value})
    }
    const hashhandlechange = (hash) =>{
        setstate({...state,hash: hash})
    }
    const nextstep = () =>{
        setstep((prevstep) => prevstep +  1)
    }
    const prevstep = () =>{
        setstep((prevstep) => prevstep - 1)
    }

    const {Admin_emailID,hash,otp} = state
    const value = {Admin_emailID,hash,otp}
    switch(step){
        case 1:
             return <ContactUs nextstep={nextstep} hashhandlechange={hashhandlechange} handlechange = {handlechange} value = {value}/>;
        case 2:
            return <Otpinput nextstep={nextstep} prevstep={prevstep} handlechange = {handlechange} value = {value}/>;
        default:
            return  <ContactUs nextstep={nextstep} hashhandlechange={hashhandlechange} handlechange = {handlechange} value = {value}/>;

    }
}
   export default Stepform;