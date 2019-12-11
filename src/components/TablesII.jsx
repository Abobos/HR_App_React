import React, { Component } from 'react';
import { Link } from '@reach/router';
import Empty from '../components/Empty.jsx';

class Tables extends Component {
  dateFormatter(date) {
    const format = { month: 'long', day: 'numeric', year: 'numeric' };

    const today = new Date(date);

    const todayFormat = today.toLocaleString('en-Us', format).split(',');

    const monthDay = todayFormat[0];
    let day = `${monthDay.split(' ')[1]}`;

    if (day.charAt(day.length - 1) === '1' && day !== '11') day += 'st';
    else if (day.charAt(day.length - 1) === '2' && day !== '12') day += 'nd';
    else if (day.charAt(day.length - 1) === '3' && day !== '13') day += 'rd';
    else day += 'th';

    const month = `${monthDay.split(' ')[0]}`;
    const year = `${todayFormat[1]}`;
    const todayDate = `${day} ${month},${year}`;

    return todayDate;
  }
  render() {
    const { documents } = this.props;
    if (documents && documents[0]) {
      return (
        <div className="template row align-items">
          <div className="col-3" />
          <div className="col-8">
            <br />
            <div className="template-hd row">
              <div>
                <h1>{this.props.name}</h1>
              </div>

              <div className="ml-a">
                <Link to="/createTemplate">
                  <button>Create {this.props.name}</button>
                </Link>
              </div>
            </div>
            <br />
            <table className="ab-table">
              <thead>
                <tr>
                  <th>Template Name</th>
                  <th>Owner</th>
                  <th>Recipient</th>
                  <th>Status</th>
                  <th>Date Posted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {documents[0] &&
                  documents.map((template, i) => {
                    return (
                      <tr key={i}>
                        <td>{template.name}</td>
                        <td>{template.full_name}</td>
                        <td>{template.recipient}</td>
                        <td>{template.status}</td>
                        <td>{this.dateFormatter(template.created_at)}</td>
                        <td>
                          <div>
                            <button className="">delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Empty name={this.props.name} />;
    }
  }
}

export default Tables;
