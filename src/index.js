import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Gallery from './Gallery';
//import tusliground1 from "./pic1/tusliground1.jpg";
//import Newcomponent from './components1/newcomponent';
import App from './App';
//import * as serviceWorker from './serviceWorker';
/*let urls = [
    {tusliground1},
    " C:/Users/MITALI/Desktop/basic-react-app/src/components1/pic/tulsiground2.jpg",
    " C:/Users/MITALI/Desktop/basic-react-app/src/components1/pic/tulsiground3.jpg"
   ];

  
ReactDOM.render(<Gallery imageUrls={urls} />, document.getElementById("root"));*/
ReactDOM.render(<App/>,  document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//serviceWorker.unregister();