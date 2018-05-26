import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from '../reducers';
// redux-observable
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from "../epics";
const epicMiddleware = createEpicMiddleware(rootEpic);

const middleware = [];
middleware.push(logger);
middleware.push(epicMiddleware);
if(process.env.NODE_ENV == 'development') {

}

export default createStore(reducers, applyMiddleware(...middleware));
