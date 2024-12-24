import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  );
}
