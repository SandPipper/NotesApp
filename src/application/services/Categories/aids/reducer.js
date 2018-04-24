import { CATEGORIES } from './actions';

let initialState = {
  'First Categorie': [{}, ],
  'Second Categorie': [{}, ], 
  'Third Categorie': [{}, ] , 
  'last_id': 0,
}

const objectContructor = (payload) => {
  initialState.last_id += 1;
  return { 'id': initialState.last_id,
  'message': payload || 'hello world!', 
  'timestamp': new Date(), }
};

initialState = { 
  'First Categorie': [objectContructor('First note'), ],
  'Second Categorie': [objectContructor('Second note'), ], 
  'Third Categorie': [objectContructor('Third note'), ] , 
  'last_id': initialState.last_id,
};


export default (state=initialState, {type, payload}) => {
  switch(type) {

    case CATEGORIES.ADD:
      return {...state, payload};

    case CATEGORIES.REMOVE:
      return Object.keys(state)
        .filter(key => key !== payload)
        .reduce((result, current) => {
          result[current] = state[current];
          console.log('test_reduce', result);
          return result;
        }, {});

    default:
      return state;
  };
};
