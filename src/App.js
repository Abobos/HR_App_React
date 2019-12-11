import React, { Component } from 'react';

import { hot } from 'react-hot-loader/root';

import { Router } from '@reach/router';

// import "../public/font-awesome/css/font-awesome.min.css";

import '../public/css/style2.css';

import ErrorHandler from './components/ErrorHandler.jsx';

import DashBoard from './views/DashBoardPage.jsx';
import IndexPage from './views/IndexPage.jsx';
import TemplatePage from './views/TemplatePage.jsx';
import DocumentPage from './views/DocumentPage.jsx';
import CreateTemplatePage from './views/CreateTemplatePage.jsx';
import SignaturePage from './views/SignaturePage.jsx';

class App extends Component {
  render() {
    return (
      <ErrorHandler>
        <Router>
          <IndexPage path="/" />
          <IndexPage path="/login" />
          <DashBoard path="/dahboard" />
          <TemplatePage path="/template" />
          <DocumentPage path="/document" />
          <CreateTemplatePage path="/createTemplate" />
          <SignaturePage path="/signature" />
        </Router>
      </ErrorHandler>
    );
  }
}

export default hot(App);
