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
    if (!result) {
      const error = new Error(result.message || 'Failed to Store Data');
      throw error;
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },

  async fetchCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      'https://coachfind-63e29-default-rtdb.firebaseio.com/coaches.json'
    );
    const data = await response.json();
    if (!data) {
      const error = new Error(data.message || 'Failed to fetch');
      throw error;
    }
    let coaches = [];
    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        hourlyRate: data[key].hourlyRate,
        description: data[key].description,
        areas: data[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  },
};
