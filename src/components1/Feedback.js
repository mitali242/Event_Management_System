import React, {useState} from "react";
import styles from "./style.module.css";
import Axios from "axios";
import Showfeedback from "./Showfeedback";


function Feedback(props)
{
    const [ Feed_description, setdescp ] = useState('');
    const [ Feed_rate, setrate] = useState('');
    const [username,setusername] = useState('');
    const submit1 = (e) => {
        e.preventDefault();
       if(console.log(Feed_description,Feed_rate));
       else{Axios.post("http://localhost:3001/submit1", {
                Feed_description: Feed_description,
                Feed_rate: Feed_rate,
                username: username,
            }).then((response)=>{
             console.log(response);
            });
        }
    }
    return(
        <div className={styles.para1}>
            <Showfeedback/>
             <label>USER NAME:</label>
            <input type="text"  onChange={(e) =>{setusername(e.target.value);}}></input><br/>
            <label>YOUR FEEDBACK:</label><br/>
          <textarea onChange={(e)=>{setdescp(e.target.value);}}></textarea><br/>
           <label>RATINGS:</label>
           <input type="number" max="5" onChange={(e) =>{setrate(e.target.value);}}/><br/>
          <button onClick={submit1}>Submit</button>
        </div>
    );
}

export default Feedback;