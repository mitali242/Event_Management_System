import React,{useState} from 'react';
import styles from "./style.module.css";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
//import  {useState} from 'react';


const stripePromise = loadStripe("pk_test_51ImV2tSAmoTezFtzBq42VxVTphHvBFnMAqcUQ1Mes2YlnU8zkDLmXtMmwnb9Kk9PCrgGFp6eLvBZEd9X8ahMRUR200y4WAfGQb");


const successMessage = () => {
    return (
      <div className={styles.cardgroup}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </svg>
        <div className="title">Payment Successful</div>
      </div>
    )
  }
  //const [paymentCompleted, setPaymentCompleted] = useState(false);
  function Pay() {
    //const [Paymentmode,setpaymentmode] = useState('');
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    return(
    <div className="row s-box">
        {paymentCompleted ? successMessage() : <React.Fragment>
          <div className="col-md-7 order-md-1">
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={2000} setPaymentCompleted={setPaymentCompleted} />
            </Elements>
          </div>
        </React.Fragment>}
      </div>
    )
        }
  export default Pay;