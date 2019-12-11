import React from "react";
import { Link } from "@reach/router";

import logo from "../../public/img/guaranty-trust-bank-gtbank-vector-logo.png";

const UserNav = () => (
  <div className="user-nav row">
    <div className="">
      <img className="sm-img" src={logo} alt="GTB" />
    </div>

    <div className="lg">
      <Link to="/">
        <h4 className="cursor-pointer lg-button">Logout</h4>
      </Link>
    </div>
  </div>
);

export default UserNav;
