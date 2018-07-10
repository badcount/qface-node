import React, { Component } from 'react';
import { connect } from 'react-redux';
import Monitor from '../ServiceMonitor';
import CustomerList from '../CustomerList';
import Offers from '../Offers';
import './search.css';

export default class LandingPage extends Component {
  render() {
    return (
    <div className="container-fluid search-container">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Monitor />
          </div>
          <div className="col-md-8">
            <CustomerList />
          </div>
        </div>
        <Offers />
      </div>
    </div>
    );
  }
}
