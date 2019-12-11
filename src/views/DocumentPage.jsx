import React, { Component } from "react";

import SideNav from "../components/SideNav.jsx";
import UserNav from "../components/UserNav.jsx";
import TablesII from "../components/TablesII.jsx";
import Loaders from "../components/Loaders.jsx";

import baseUrl from "../config/baseUrl.js";

class DocumentPage extends Component {
  state = {
    loading: false,
    documents: [],
    mainResponse: ""
  };

  componentDidMount() {
    this.setState({ loading: true });

    const { token } = localStorage;

    fetch(`${baseUrl}/api/v1/document`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
      cache: "reload"
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.error) {
          this.setState({ loading: false, mainResponse: response.error });
        } else {
          this.setState({
            loading: false,
            mainResponse: "success",
            documents: response.data
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({ loading: false, mainResponse: "Something went wrong" });
      });
  }
  render() {
    return (
      <React.Fragment>
        <SideNav />
        <UserNav />
        {!this.state.loading ? (
          <TablesII documents={this.state.documents} name="Document" />
        ) : (
          <Loaders />
        )}
      </React.Fragment>
    );
  }
}

export default DocumentPage;
