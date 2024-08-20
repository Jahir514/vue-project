export default {
  contactCoach(context, payload) {
    const requestData = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    context.commit('addRequest', requestData);
  },
};
