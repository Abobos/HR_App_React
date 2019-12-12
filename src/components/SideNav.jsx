import React, { Component } from 'react';
import { navigate } from '@reach/router';

class SideNav extends Component {
  state = {
    features: [
      { type: 'DashBoard', icon: 'fa fa-dashboard' },
      { type: 'Documents', icon: 'fa fa-file' },
      { type: 'Templates', icon: 'fa fa-envelope' },
      { type: 'Signature', icon: 'fa fa-pencil' },
      { type: 'Forms', icon: 'fa fa-file' },
    ],
  };

  handleNavigation = link => {
    link = link.replace(/[s]/, '').toLowerCase();
    navigate(`${link}`);
  };

  render() {
    return (
      <React.Fragment>
        <div className="sideNav col-2">
          <h1 className="app-name">HR@ssist</h1>
          <hr />
          <ul>
            {this.state.features.map((feature, i) => (
              <li
                className="cursor-pointer"
                key={i}
                onClick={() => this.handleNavigation(feature.type)}
              >
                <i className={feature.icon} />
                <span className="ml-II list-text">{feature.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default SideNav;
