import { connect } from 'react-redux';
import Monitor from './MonitorComponent';

const mapStateToProps = ({ takingPhoto, count }) => ({ takingPhoto, count });

export default connect(mapStateToProps, {
  takePhoto: (video, canvas, ffId) => ({ type: 'TAKE_PHOTOS', canvas, video, ffId, lId: 'kiosk1' })
})(Monitor);
