export const NOTES = {
  ADD: 'ADD_MESSAGE',
  UPDATE: 'UPDATE_MESSAGE',
  REMOVE: 'REMOVE_MESSAGE',
};

export function addNoteAction(note) {
  return { type: NOTES.ADD, payload: message};
};

export function removeNoteAction(note) {
  return { type: NOTES.REMOVE, payload: message.id };
};

export function updateNoteAction(note) {
  return { type: NOTES.UPDATE, payload: message };
}

