import React, { Component } from "react";
import Navbar from "../components/Navbar.jsx";
import Main from "../components/Main.jsx";

class IndexPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-bg">
          <Navbar />
          <Main path={this.props.path} />
        </div>
      </React.Fragment>
    );
  }
}

export default IndexPage;
