export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  storeRequests(state, payload) {
    state.requests = payload;
  },
};
