import React, { Component } from 'react';
import { connect } from 'react-redux';
import Monitor from '../IndexMonitor';
import './landing.css'

export default class LandingPage extends Component {
  render() {
    return (
      <div className="container-fluid landing-container">
        <Monitor />
      </div>
    );
  }
}
