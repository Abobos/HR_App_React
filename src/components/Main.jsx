import React, { Component } from "react";

import LoginForm from "./LoginPage.jsx";

import RegisterForm from "./RegisterPage.jsx";

class Main extends Component {
  showLoginForm = () => {
    if (this.props.path === "/login") return <LoginForm />;
    else {
      return <RegisterForm />;
    }
  };
  render() {
    return (
      <div className="main row align-items justify-content-sb">
        <div className="main-text align-self col-6">
          <h1>Welcome to HR@ssist</h1>
          <br />
          <p>
            {" "}
            HR@ssist is revolutionalizing the whole process involved in
            documentation. Providing a seamless means to send and get your
            documments signed. Eliminating all logistics. All at your
            fingertips.
          </p>
        </div>
        {this.showLoginForm()}
      </div>
    );
  }
}
export default Main;
