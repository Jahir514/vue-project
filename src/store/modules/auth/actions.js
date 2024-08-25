export default {
  async register(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
AIzaSyD51oeD0jy8zSFMgom1OtodaU6LzSv1I_s`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(response.message || 'Failed to register');
    }
    const responseData = await response.json();
    //set user to vuex
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  //login action
  async login(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
AIzaSyD51oeD0jy8zSFMgom1OtodaU6LzSv1I_s`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    console.log('res', response);
    if (!response.ok) {
      throw new Error(response.message || 'Failed To Login');
    }
    const responseData = await response.json();
    console.log('resData', responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
