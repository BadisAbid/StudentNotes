import React from "react";
import iset from './iset.png';
import "./App.css";
const Header= () => {
  return (
    <div className="navbar" >
      <div className="image">
      <img src={iset} alt="iset kebili" style={{ width: '130px', margin:  '20px', height: '108px' }} />

   
      </div>
      <div className="links">
     <ul>
        <li> <a href="/">Home</a> </li>
        <li> <a href="/">About</a> </li>
        <li> <a href="/">Services</a> </li>
        <li> <a href="/">Contact</a> </li>
     </ul>
      </div>
     </div>
  );
};
export default Header;