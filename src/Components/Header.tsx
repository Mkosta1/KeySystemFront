import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JwtContext } from "../routes/Root";
import IdentityHeader from "./IdentityHeader";
import React from "react";

const Header = () => {

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);


    return (
       
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
        </li>
        <li className="nav-link" aria-current="page" style={{'display': jwtResponse == null ? 'none' : ''}}>
          <Link to="keys" className="dropdown-item" >Keys</Link>
        </li>
        <li className="nav-link" aria-current="page" style={{'display': jwtResponse == null ? 'none' : ''}}>
          <Link to="worker" className="dropdown-item" >Workers</Link>
        </li>

      </ul>
    </div>
        <ul className="navbar-nav" aria-current="page" >
        <IdentityHeader/>
        </ul>
  </div>

</nav>

    );
}

export default Header;