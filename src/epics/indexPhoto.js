import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';
import axios from 'axios';

export const takePhotosScream = (action$, { getState }) =>
  action$.ofType('TAKE_PHOTOS')
    .switchMap(({ canvas, video, ffId, lId }) =>
       Observable.interval(1000)
         .map((count) => {
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
           return canvas.toDataURL('image/jpeg', 0.5).replace('data:image/jpeg;base64,', '');
         })
         .bufferCount(5)
         .take(1)
         .map(photos => (
            { type: 'SEND_PHOTOS', photos, ffId, lId }
         ))
       );

export const countScream = (action$, { getState }) =>
  action$.ofType('TAKE_PHOTOS')
    .switchMap(({ canvas, video, ffId, lId }) =>
      Observable.interval(1000)
        .mapTo({ type: 'COUNT' })
        .takeUntil(action$.ofType('SEND_PHOTOS'))
      );

const sendPhoto = (ffId, photos) => {
  return Observable.fromPromise(axios.post('/Prod/index', {
    ffId,
    photos,
    collectionId: 'qface-ff'
  }));
}

export const sendPhotosStream = action$ =>
   action$.ofType('SEND_PHOTOS')
     .switchMap(({ photos, ffId, lId }) =>
       sendPhoto(ffId, photos, lId)
         .takeUntil(action$.ofType('SEND_PHOTOS'))
       )
     .flatMap((result) =>  [{ type: 'STOP_TAKING_PHOTO' }, push('confirm')])
     .catch(() => Observable.of(push('/')));

const getCustomerDetails = (id) => Observable.of({
  tier: 'Gold',
  gift: [ 'coffee', 'candy'] ,
  id
});

export default [
  takePhotosScream,
  countScream,
  sendPhotosStream
]
