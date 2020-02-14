import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from 'Apollo/LocalState';

export default new ApolloClient({
  uri: 'https://hure-backend.herokuapp.com/',
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
