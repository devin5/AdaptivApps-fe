// Import dependencies
import React from 'react';
import { Router } from '@reach/router';

// Import components
import DashRouter from './pages/DashRoute';
import PrivateRoute from './utils/PrivateRoute';
import { useGetToken } from './components/auth/Auth';

// Import apollo server
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// Import styling
import './App.css';

function App() {
  // At app rendering, call useGetToken() to get token from auth0 login
  const [token] = useGetToken();
  console.log('THE ONE TOKEN TO RULE THEM ALL!!!! ', token);

  // Generate new apollo client
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    request: operation => {
      // Attach token to header
      operation.setContext(context => ({
        headers: {
          ...context.headers,
          Authorization: token,
        },
      }));
    },
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <PrivateRoute exact path="/" component={DashRouter} />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
