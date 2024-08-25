export default {
  userId(state) {
    return state.userId;
  },
  isAuthenticated(state) {
    // !! sign makes a string to boolean
    return !!state.token;
  },
  token(state) {
    return state.token;
  },
};
