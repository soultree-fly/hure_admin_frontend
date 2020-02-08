export const defaults = {
  isSignedIn: localStorage.getItem('token') ? true : false
};

export const resolvers = {
  Mutation: {
    adminSignIn: (_, { token }, { cache }) => {
      localStorage.setItem('token', token);
      cache.writeData({
        data: {
          isSignedIn: true
        }
      });
      return null;
    },
    adminSignOut: (_, __, { cache }) => {
      localStorage.removeItem('token');
      window.location.reload();
      return null;
    }
  }
};
