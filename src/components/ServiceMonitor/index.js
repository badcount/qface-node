import { connect } from 'react-redux';
import Monitor from './MonitorComponent';

const mapStateToProps = ({ customers, searchingPhoto }) => ({ customers, searchingPhoto });

export default connect(mapStateToProps, {
  takePhoto: (video, canvas, ffId) => ({ type: 'SEARCH_PHOTO', canvas, video, lId: 'cafe1' })
})(Monitor);
