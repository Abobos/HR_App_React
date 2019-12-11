import React, { Component } from 'react';

import SideNav from '../components/SideNav.jsx';
import UserNav from '../components/UserNav.jsx';
import Tables from '../components/Tables.jsx';

import baseUrl from '../config/baseUrl';
import Loader from '../components/Loaders.jsx';

class TemplatePage extends Component {
  state = {
    loading: false,
    templates: [],
    mainResponse: '',
  };

  componentDidMount() {
    this.getTemplates();
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

  deleteTemplate = templateId => {
    this.setState({
      loading: true,
    });

    const { token } = localStorage;

    fetch(`${baseUrl}/api/v1/template/${templateId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      cache: 'reload',
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (!response.error) {
          this.setState(
            {
              mainResponse: 'success',
              loading: false,
            },
            this.getTemplates
          );
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
        <SideNav />
        <UserNav />
        {!this.state.loading ? (
          <Tables
            deleteTemplate={this.deleteTemplate}
            templates={this.state.templates}
            name="Template"
          />
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default TemplatePage;
