import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import './confirm.css';
import tick from './tick.png'

const ConfirmPage = ({ goToLandingPage }) =>
  <div className="container-fluid confirm-container">
    <div className="text-center">
      <img src={tick} />
    </div>
    <div className="container text-center">
      <br />
      <h1 className="text-center">You're all set!</h1>
        <br />
        <br />
      <p className="text-center">To get you started, head to GG's <strong>for a FREE coffee on the house.</strong> Don’t worry, they’ll know who you are.</p>
      <Button outline size="lg" color="dark" onClick={() => goToLandingPage()}>Done</Button>
    </div>
  </div>

export default connect(null, { goToLandingPage: () => push('/') })(ConfirmPage);
