import React, { Component } from "react";

import baseUrl from "../config/baseUrl";

import { navigate } from "@reach/router";

import Loader from "../components/Loader.jsx";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainResponse: "",
    isAdmin: false,
    loading: false,
    loginStatus: ""
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { email, password } = this.state;

    const userDetails = {
      email,
      password
    };
    const url = `${baseUrl}/api/v1/auth/login`;

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userDetails)
    })
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          const { email: emailError, password: passwordError } = response.error;
          let error;
          if (typeof response.error === "string") error = response.error;
          this.setState({
            emailError,
            passwordError,
            mainResponse: error,
            loading: false
          });
        } else {
          localStorage.token = response.data.token;
          localStorage.userEmail = userDetails.email;
          this.setState({
            isAdmin: response.data.isAdmin,
            loading: false,
            loginStatus: "success"
          });
        }
      })
      .catch(e => {
        this.setState({ mainResponse: "Something went wrong" });
        console.error(e);
      });
  };
  render() {
    if (this.state.loginStatus === "success") {
      navigate("/dahboard");
    }
    if (!this.state.loading) {
      return (
        <div className="card">
          <form onSubmit={this.handleSubmit}>
            <div className="feedback text-center">
              {this.state.mainResponse}
            </div>
            <div className="form-element">
              <label htmlFor="email">
                Email:
                <br />
                <span className="error">{this.state.emailError}</span>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-element">
              <label htmlFor="firstname">
                Password:
                <br />
                <span className="error">{this.state.passwordError}</span>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
            </div>
            <button className="btn btn-secondary">Login</button>
          </form>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default LoginForm;
