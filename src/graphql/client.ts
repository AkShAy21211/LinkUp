import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";


const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_SUPABASE_GRAPHQL_URL,
    headers: {
      apiKey:
        import.meta.env.VITE_SUPABASE_API_KEY
    },
  }),
  cache: new InMemoryCache(),
});



export default client;
