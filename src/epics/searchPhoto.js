import { Observable } from 'rxjs/Observable';
import { push, replace } from 'react-router-redux';
import axios from 'axios';

export const takePhotoScream = (action$, { getState }) =>
  action$.ofType('SEARCH_PHOTO')
    .switchMap(({ canvas, video, lId }) =>
       Observable.interval(5000)
         .map((count) => {
           canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
           return { type: 'SEND_PHOTO', photo: canvas.toDataURL('image/jpeg', 0.5).replace('data:image/jpeg;base64,', ''), lId, count }
         })
         .takeUntil(action$.ofType('CUSTOMER_FOUND'))
       );

const searchPhoto = (photo) => {
  return Observable.fromPromise(axios.post('Prod/search', {
    photo,
    collectionId: 'qface-ff'
  }));
}
export const sendPhotoStream = action$ =>
   action$.ofType('SEND_PHOTO')
     .switchMap(({ photo, ffId, lId, count }) =>
       searchPhoto(photo, lId)
         .map(res => res.data)
         .catch(() => [])
         .takeUntil(action$.ofType('CUSTOMER_FOUND'))
       )
     .map(result => result.filter(c => c.ffId).map(c => ({ ...c, confidence: parseInt(c.confidence) })))
     .filter(result => result.some(c => c.confidence >= '75'))
     .map(result => result.sort((a, b) => b.confidence - a.confidence).filter(c => c.confidence >= 75) )
     .flatMap((result) => [
       {
         type: 'CUSTOMER_FOUND'
       },
       {
         type: 'SET_CUSTOMER_LIST',
         result
       },
       {
         type: 'SET_SELECTED_CUSTOMER',
         customer: result[0]
       }
     ]);

export const RedeemStream = action$ =>
  action$.ofType('REDEEM')
    .map(({ ffId, offerId }) => ffId && offerId ? push('redeem') : push('service'));

export default [
  takePhotoScream,
  sendPhotoStream,
  RedeemStream
]
