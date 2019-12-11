import React from "react";

import { Link } from "@reach/router";

const Empty = props => {
  return (
    <div className="container-centerII text-center">
      <div>
        <i className="fa fa-exclamation-circle" />
        <p>{props.name} is empty</p>
        <br />
        <p>
          <b>
            It seems you do not have any {props.name.toLowerCase()}, kindly
            create a {props.name.toLowerCase()}
          </b>
        </p>
        <br />
        <br />
        <Link to="/createTemplate">
          <button className="btn-create">Create {props.name}</button>
        </Link>
      </div>
    </div>
  );
};

export default Empty;
