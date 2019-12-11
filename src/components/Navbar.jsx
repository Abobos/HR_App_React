import React from "react";

import { Link } from "@reach/router";

import logo from "../../public/img/favicon.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="navbar-cover row justify-content-sb">
        <Link to="/">
          <div className="row">
            <span className="navbar-brand">
              <img className="navbar-img" src={logo} alt="img" />
            </span>
            <span className="brand-name align-self brand-text">HR@ssist</span>
          </div>
        </Link>

        <div className="row">
          <Link to="/login">
            <h4 className="navbar-text cursor-pointer">Login</h4>
          </Link>
          <Link to="/">
            <h4 className="navbar-text cursor-pointer">Register</h4>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
