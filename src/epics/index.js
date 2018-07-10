import { combineEpics } from 'redux-observable';
import indexPhoto from './indexPhoto';
import searchPhoto from './searchPhoto';

export default combineEpics(...indexPhoto, ...searchPhoto);
