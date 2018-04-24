import { NOTES } from './actions';

const objectContructor = (state, payload) => ({
  'id': state && state[0] ? state[state.length - 1].id + 1 : 0,
  'message': payload || 'hello world!', 
  'timestamp': new Date(),
});

const initialState = [
  objectContructor(),
];

export default (state=initialState, { type, payload }) => {
  switch(type) {

    case NOTES.ADD:
      return [...state, objectContructor(state, payload)]

    case NOTES.REMOVE:
      return state.filter(message => message.id !== payload);
    
    case NOTES.UPDATE:
      return state.map(message => message.id === payload.id ? message = payload : message);

    default:
      return state;
  }
}
