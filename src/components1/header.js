import React from "react";
//import './App.CSS';
import { useDispatch }from 'react-redux';
const Header = (props) => {
    const dispatch = useDispatch();
    const action = {
        type:'UPDATE_NAME',
        name:'Kamran'
    }
  return (
    <div>
      <h1>
        learn react js...
        </h1>
        <button onClick={() => dispatch(action)}>update</button>
    </div>
  )
}

export default Header;

