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
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok || responseData.error) {
      return new Error(
        response.message || 'Failed to register' || responseData.error.message
      );
    }
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  login() {},
};
