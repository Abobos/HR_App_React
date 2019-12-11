import React, { Component } from "react";

import baseUrl from "../config/baseUrl.js";

import Loader from "../components/Loader.jsx";

import { navigate } from "@reach/router";

class RegisterForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    mainResponse: "",
    isAdmin: false,
    registerStatus: "",
    loading: false
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

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        loading: false,
        confirmPasswordError: "Passwords do not match"
      });
    } else {
      this.setState({
        confirmPasswordError: ""
      });
      const userDetails = {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      };
      const url = `${baseUrl}/api/v1/auth/register`;

      fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userDetails)
      })
        .then(res => res.json())
        .then(response => {
          if (response.error) {
            const {
              first_name: firstNameError,
              last_name: lastNameError,
              email: emailError,
              password: passwordError
            } = response.error;

            let error;

            if (typeof response.error === "string") error = response.error;

            this.setState({
              firstNameError,
              lastNameError,
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
              registerStatus: "success"
            });
          }
        })
        .catch(e => {
          this.setState({
            loading: false,
            mainResponse: "Something went wrong"
          });
          console.error(e);
        });
    }
  };
  render() {
    if (this.state.registerStatus === "success") {
      navigate("/dahboard");
    }

    if (!this.state.loading) {
      return (
        <div className="card">
          <div className="feedback text-center">{this.state.mainResponse}</div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-element">
              <label htmlFor="firstName">
                First Name:
                <br />
                <span className="error">{this.state.firstNameError}</span>
                <input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="form-element">
              <label htmlFor="lastName">
                Last Name:
                <br />
                <span className="error">{this.state.lastNameError}</span>
                <input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
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
              <label htmlFor="password">
                Password:
                <br />
                <span className="error"> {this.state.passwordError}</span>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="form-element">
              <label htmlFor="confirmPassword">
                Confirm Password:
                <br />
                <span className="error">{this.state.confirmPasswordError}</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
            </div>
            <button className="btn btn-secondary">Register</button>
          </form>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default RegisterForm;
