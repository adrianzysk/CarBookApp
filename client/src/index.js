
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { getToken } from "./tokenService/tokens";
import App from "./App";
import Private from './pages/Private'
import Register from './pages/Register'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: operation => {
    const token = getToken();
    if (token) {
      operation.setContext({
        headers: {
          'Authorization': token ? `Bearer ${token}` : null
        }
      });
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App path="/" />
      <Register path="/register" />
      <Private path="/private" />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
