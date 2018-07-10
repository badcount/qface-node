import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import './service.css';

export default class Monitor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) =>{
      this.video.srcObject = stream;
    });
    this.props.takePhoto(this.video, this.canvas)
  }
  render() {
    return(
      <div className="service-monitor text-center">
        <video ref={video => {this.video = video}} controls autoPlay />
        <canvas ref={canvas => { this.canvas = canvas }} style={{ display: 'none' }}  width="800" height="600"></canvas>
        { this.props.searchingPhoto && <span>Searching Customer...</span> }
        { this.props.customers.length > 0 && <Button className="restart" outline color="light" onClick={() => this.props.takePhoto(this.video, this.canvas)}>Restart</Button> }
      </div>
    );
  }
}
