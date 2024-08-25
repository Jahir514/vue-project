export default {
  //add request to database and vuex
  async contactCoach(context, payload) {
    const coachId = payload.coachId;
    const requestData = {
      userEmail: payload.email,
      message: payload.message,
    };
    //send data to firebase
    const response = await fetch(
      `https://coachfind-63e29-default-rtdb.firebaseio.com/requests/${coachId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    );
    //handle error if process failed
    if (!response.ok) {
      const error = new Error(response.message || 'Failed to store data');
      throw error;
    }
    // response.name provide "id" by firebase
    requestData.id = response.name;
    requestData.coachId = coachId;
    //store data to request module in vuex
    context.commit('addRequest', requestData);
  },

  //get request for specific coach from database and add to vuex
  async fetchRequests(context) {
    //get coach Id from root index
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    console.log('token', token);
    const response = await fetch(
      `https://coachfind-63e29-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    //handle error if process failed
    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch data');
      throw error;
    }
    const data = await response.json();
    console.log('response', data);
    //process request from response of firebase
    const requests = [];
    for (const key in data) {
      const request = {
        id: response.name,
        userEmail: data[key].userEmail,
        message: data[key].message,
        coachId,
      };
      requests.push(request);
    }
    context.commit('storeRequests', requests);
  },
};
