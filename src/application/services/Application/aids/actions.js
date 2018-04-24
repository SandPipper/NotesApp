export const APP = {
  INITIALIZE: 'INITIALIZE',
};

export function initializeAction(payload) {
  return { type: APP.INITIALIZE, payload };
}