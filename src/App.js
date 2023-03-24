import React from 'react';
import './App.css';
import Images from './components1/Images';
//import tulsiground1 from "./pic1/tulsiground1.jpg";
//import tulsiground3 from "./pic1/tulsiground3.jpg";
import { BrowserRouter as Router } from 'react-router-dom';
/*let urls = [
  " components1/pic/tusliground1.jpg",
  "components1/pic/tusliground2.jpg",
  "components1/pic/tusliground3.jpg"
 ];*/

function App() {
  //const [paymentCompleted, setPaymentCompleted] = useState(false);
    return (
      <Router>
        <div>
         <Images/>
      </div>
     </Router> 
    );
}
export default App;