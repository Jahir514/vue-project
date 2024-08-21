export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetchTime;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getDate();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
