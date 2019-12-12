import React, { Component } from 'react';

import SideNav from '../components/SideNav.jsx';
import UserNav from '../components/UserNav.jsx';
import Loaders from '../components/Loaders.jsx';

import baseUrl from '../config/baseUrl';

import { navigate } from '@reach/router';

import FileViewer from 'react-file-viewer';

class editTemplatePage extends Component {
  state = {
    template_name: '',
    document: '',
    recipient: '',
    fileType: '',
    filePreviewUrl: '',
    templates: [],
    loading: false,
    mainError: false,
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

  componentDidMount() {
    this.setState({ loading: true });

    const { token } = localStorage;

    const { id } = this.props;

    fetch(`${baseUrl}/api/v1/template/${id}`, {
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
            template_name: response.data[0].name,
            recipient: response.data[0].recipient,
            mainResponse: 'success',
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({ loading: false, mainResponse: 'Something went wrong' });
      });
  }

  handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('docs', this.state.document);
    formData.append('recipient', this.state.recipient);
    formData.append('name', this.state.template_name);

    const { token } = localStorage;

    const { id: templateId } = this.props;

    this.setState({ loading: true });

    fetch(`${baseUrl}/api/v1/template/${templateId}`, {
      method: 'PUT',
      headers: { Authorization: token },
      body: formData,
    })
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          this.setState({ loading: false, mainResponse: response.error });
        } else {
          this.setState({ loading: false, mainResponse: 'success' });
          navigate('/template');
        }
      })
      .catch(e => {
        console.error(e);
        this.setState({ loading: false, mainResponse: 'Something went wrong' });
      });
  };

  error = e => {
    console.log(e, 'something went wrong');
  };

  render() {
    // if (this.state.mainResponse === 'success') {
    //   this.setState({
    //     mainResponse: '',
    //   });
    //
    // }
    // let $imagePreview = (
    //   <div className="previewText image-container">file preview here</div>
    // );
    // if (this.state.filePreviewUrl) {
    //   $imagePreview = (
    //     <div className="image-container">
    //       <FileViewer
    //         fileType={this.state.fileType}
    //         filePath={this.state.filePreviewUrl}
    //         onError={this.error}
    //         key={this.state.fileType}
    //       />{" "}
    //     </div>
    //   );
    // }
    return (
      <React.Fragment>
        <SideNav />
        <UserNav />
        <div className="template row">
          <div className="col-3" />

          {!this.state.loading ? (
            <div className="template-form-card col-8">
              <h2 className="text-center">Edit Template</h2>

              <br />
              <br />
              <br />

              <form onSubmit={this.handleSubmit} className="text-center">
                <br />
                <div className="">
                  {/* <div> {$imagePreview}</div> */}
                  <br />
                  <label htmlFor="document">
                    <b>Upload Document:</b>
                    <br />
                    {/* <span className="error">{this.state.firstNameError}</span> */}
                    <input
                      type="file"
                      name="document"
                      onChange={this.fileChangeHandler}
                      required
                    />
                  </label>
                  <p>NB: Only Pdf file is required</p>
                </div>
                <br />
                <div className="">
                  <label htmlFor="templateName">
                    <b>Template Name:</b>
                    <br />
                    {/* <span className="error">
                      {this.state.confirmPasswordError}
                    </span> */}
                    <input
                      type="text"
                      name="template_name"
                      onChange={this.fileChangeHandler}
                      value={this.state.template_name}
                      required
                    />
                  </label>
                </div>
                <br />
                <div className="">
                  <label htmlFor="recipient">
                    <b>recipients email:</b>
                    <br />
                    {/* <span className="error">{this.state.lastNameError}</span> */}
                    <input
                      type="email"
                      name="recipient"
                      onChange={this.fileChangeHandler}
                      value={this.state.recipient}
                      required
                    />
                  </label>
                </div>
                <br />
                <div>
                  <button className="btn-creates">save</button>
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

export default editTemplatePage;
