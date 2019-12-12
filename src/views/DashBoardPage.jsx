import React, { Component } from 'react';

import SideNav from '../components/SideNav.jsx';
import UserNav from '../components/UserNav.jsx';

import baseUrl from '../config/baseUrl';
import Loader from '../components/Loaders.jsx';

class DashBoard extends Component {
  state = {
    templates: [],
    documents: [],
    loading: false,
    mainResponse: '',
  };

  componentDidMount() {
    this.getTemplates();
    this.getDocuments();
  }

  getTemplates = () => {
    this.setState({ loading: true });

    const { token } = localStorage;

    fetch(`${baseUrl}/api/v1/template`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      cache: 'reload',
    })
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          this.setState({ loading: false, mainResponse: response.error });
        } else {
          console.log(response);
          this.setState({
            loading: false,
            mainResponse: 'success',
            templates: response.data,
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({ loading: false, mainResponse: 'Something went wrong' });
      });
  };

  getDocuments = () => {
    this.setState({ loading: true });

    const { token } = localStorage;

    fetch(`${baseUrl}/api/v1/document`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      cache: 'reload',
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.error) {
          this.setState({ loading: false, mainResponse: response.error });
        } else {
          console.log(response);
          this.setState({
            loading: false,
            mainResponse: 'success',
            documents: response.data,
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({ loading: false, mainResponse: 'Something went wrong' });
      });
  };
  render() {
    return (
      <React.Fragment>
        <UserNav />
        <SideNav />
        {!this.state.loading ? (
          <div className="templateII">
            <h1 className="text-center">Overview</h1>
            <br />

            <div className="row justify-content-sa">
              <div className="td cursor-pointer">
                <p>{this.state.templates.length}</p>
                <br />
                Templates
                <br />
                <button className="btn-new cursor-pointer">
                  View Templates
                </button>
              </div>
              <div className="td cursor-pointer">
                <p>{this.state.documents.length}</p>
                <br />
                Documents
                <br />
                <button className="btn-new cursor-pointer">
                  View Documents
                </button>
              </div>
            </div>

            <div className="td cursor-pointer">
              <p>0</p>
              <br />
              Signed Documents
              <br />
              <button className="btn-new cursor-pointer">
                View Signed Forms
              </button>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default DashBoard;
