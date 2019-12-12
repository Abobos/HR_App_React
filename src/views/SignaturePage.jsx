import React, { Component } from 'react';

import Loaders from '../components/Loader.jsx';
import SideNav from '../components/SideNav.jsx';
import UserNav from '../components/UserNav.jsx';

import { navigate } from '@reach/router';

class Signature extends Component {
  state = {
    loading: false,
  };

  fileChangeHandler = e => {
    e.preventDefault();

    if (e.target.files) {
      const name = e.target.files[0].name;
      const lastDot = name.lastIndexOf('.');
      const ext = name.substring(lastDot + 1);

      this.setState({
        fileType: ext,
        document: e.target.files[0],
      });

      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          filePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(e.target.files[0]);
    }

    if (!e.target.files) {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleRedirect = e => {
    e.preventDefault();

    navigate('/success');
  };
  render() {
    let $imagePreview = <div className="previewText image-containerI"></div>;
    if (this.state.filePreviewUrl) {
      $imagePreview = (
        <div className="image-containerI">
          <img
            src={this.state.filePreviewUrl}
            width="200"
            height="150"
            alt="signature"
          />{' '}
        </div>
      );
    }
    return (
      <React.Fragment>
        <SideNav />
        <UserNav />
        <div className="template row align-items">
          {' '}
          <div className="col-3" />
          {!this.state.loading ? (
            <div className="template-form-card col-8">
              <h2 className="text-center">Upload Signature</h2>

              <br />
              <br />
              <br />

              <div className="feedback text-center">
                {this.state.mainResponse}
              </div>

              <form onSubmit={this.handleRedirect} className="text-center">
                <br />
                <div className="">
                  <div> {$imagePreview}</div>
                  <p>
                    <b>NB: Only jpg/png file is required</b>
                  </p>
                  <br />
                  <label htmlFor="document">
                    {/* <b>Upload Document:</b> */}
                    <br />
                    <span className="error">{this.state.firstNameError}</span>
                    <input
                      type="file"
                      name="document"
                      // value={this.state.firstName}
                      onChange={this.fileChangeHandler}
                      required
                    />
                  </label>
                </div>

                <div>
                  <button className="btn-creates">upload</button>
                </div>
              </form>
            </div>
          ) : (
            <Loaders />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Signature;
