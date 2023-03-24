import React from "react";
//import { Router } from "react-router-dom";
import styles from "./style.module.css";
import Verifyotp from "./Verifyotp";

const Forgetpass = (props) =>{

    const handleSubmit = (e) => {
        e.preventDefault();
    }

        return(
            <div onSubmit={handleSubmit}>

                <div className={styles.formgroup}>
                <h3>forget password</h3>
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="mail id" onChange={(e)=> {this.email(e.target.value)}}></input>
                <center><button className="btn btn-primary btn-block">Submit</button></center>
                </div> 
                <div>
                    <Verifyotp/>
                </div>

            </div>
        );
     }

export default Forgetpass;