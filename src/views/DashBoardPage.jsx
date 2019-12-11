import React, { Component } from 'react';
import SideNav from '../components/SideNav.jsx';
import UserNav from '../components/UserNav.jsx';

class DashBoard extends Component {
  render() {
    return (
      <React.Fragment>
        <SideNav />
        <UserNav />

        <div className="template rows align-items">
          {' '}
          <div className="col-4" />
          <div className="col-8">
            <h1 className="text-center">Overview</h1>
            <div />

            <div />

            <div />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashBoard;
