import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import './monitor.css';

export default class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ffId: '',
      isFF: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
  }

  handleChange(e) {
    this.setState({ ffId: e.target.value });
  }

  takePhoto(ffId) {

    this.setState({ isFF: !!ffId && ffId.length > 1 });
    if (ffId) {
      this.props.takePhoto(this.video, this.canvas, `QF${ffId}`)
    } else {
      this.props.takePhoto(this.video, this.canvas)
    }
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) =>{
      this.video.srcObject = stream;
    });
  }
  render() {
    const ffButtonText = this.props.takingPhoto && this.state.isFF ? `Taking Photo...(${this.props.count}s)` : 'JOIN QFACE';
    const buttonText = this.props.count === 0 && this.props.takingPhoto ? 'Sending Photo' : ffButtonText;
    const nonFfButtonText = this.props.takingPhoto && !this.state.isFF ? `Taking Photo...(${this.props.count}s)` : 'Not Member Yet';

    return(
      <div className="container index-monitor">
        <div className="row">
          <div className="col-md-6">
            <video ref={video => {this.video = video}} controls autoPlay />
            <canvas ref={canvas => { this.canvas = canvas }} style={{ display: 'none' }}  width="800" height="600"></canvas>
          </div>
          <div className="col-md-6">
            <div className="input-control">
              <h2>Enter your Frequent Flyer number</h2>
              <InputGroup size="lg">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>QF</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="eg. 12345" disabled={this.props.takingPhoto} onChange={e => this.handleChange(e)} value={this.state.ffId}/>
              </InputGroup>
              <br/>
              <Button color="primary" size="lg" block disabled={this.props.takingPhoto || this.state.ffId.length < 2} onClick={() => this.takePhoto(this.state.ffId)}>{ buttonText }</Button>
              <a href="#" color="secondary" size="lg" block disabled={this.props.takingPhoto} onClick={() => this.takePhoto()}>{ nonFfButtonText }</a>
            </div>
          </div>
        </div>
      </div>
    );
}
}
