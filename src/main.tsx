import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for createRoot
import { ApolloProvider } from '@apollo/client';
import client from "./graphql/client";
import "./index.css"
import App from './App';

const container = document.getElementById('root');

// Ensure the container exists before proceeding
if (container) {
  const root = ReactDOM.createRoot(container); // Create a root
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
