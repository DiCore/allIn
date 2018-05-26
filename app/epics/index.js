import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';

function loadingEpic(action$) {
  return action$.ofType("LOADING_START")
  .switchMap(({loading}) => {
    return Observable.of({type: "LOADING_STOP"}).delay(2000);
  });
}

export const rootEpic = combineEpics(loadingEpic);
