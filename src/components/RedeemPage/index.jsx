import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import tick from './tick.png';
import './redeem.css';

const ConfirmPage = ({ goToLandingPage }) =>
  <div className="container-fluid redeem-container">
    <div className="text-center">
      <img src={tick} />
    </div>
    <div className="container text-center">
      <br />
      <h1 className="text-center">Offer Redeemed!</h1>
        <br />
        <br />
      <p className="text-center">Thank you</p>
      <Button outline size="lg" color="dark" onClick={() => goToLandingPage()}>Done</Button>
    </div>
  </div>
export default connect(null, { goToLandingPage: () => push('/service') })(ConfirmPage);
