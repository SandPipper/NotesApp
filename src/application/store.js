import {
  createStore,
  applyMiddleware,
} from 'redux';

import reducers from './reducers';

// Logs all actions and states after they are dispatched. needed sagas.

const logger = store => next => action => {

  const style = (() => {
    if (action.type.match('FAILED')) {
      return 'color: #F4511E; font-weight: bold;';
    } else if (action.type.match('SUCCEEDED')) {
      return 'color: #43A047; font-weight: bold;';
    } else {
      return 'color: #00ACC1; font-weight: bold;';
    }
  })();

  console.group(`%c${action.type}`, style);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

export default initialState => {
  const store = createStore(
    reducers,
    initialState
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducers));
  }

  return store;
};
 