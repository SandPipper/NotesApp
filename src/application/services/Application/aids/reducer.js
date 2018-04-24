import { APP } from './actions';

const initialState = {
  initialization: false,
};

export default (state = initialState, {type, action}) => {
  switch(type) {
    case APP.INITIALIZE: {
      return {
        ...state,
        initialization: !state.initialization,
      };
    }
    default: {
      return state;
    }
  }
}