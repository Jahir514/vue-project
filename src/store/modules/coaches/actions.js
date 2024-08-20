export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      hourlyRate: payload.rate,
      description: payload.des,
      areas: payload.areas,
    };

    const response = await fetch(
      `https://coachfind-63e29-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    const result = await response.json();
    if (!result.ok) {
      //
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
};
