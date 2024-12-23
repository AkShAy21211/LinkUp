import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://filxqvhsivlgxxapbaat.supabase.co/graphql/v1",
    headers: {
      apiKey:
        import.meta.env.REACT_APP_SUPABASE_API_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpbHhxdmhzaXZsZ3h4YXBiYWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDQ1NzYsImV4cCI6MjA1MDUyMDU3Nn0.xsgDhoCn4XVwc3BVhucUGVdDn8SajqCweVDbQoJ4BUs",
    },
  }),
  cache: new InMemoryCache(),
});

console.log(client);


export default client;
