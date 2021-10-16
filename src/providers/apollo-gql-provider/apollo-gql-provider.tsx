import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import fetch from "isomorphic-fetch";

const API_URL = "https://take-my-todo.hasura.app/v1/graphql";

export const ApolloGraphqlProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const { getAccessTokenSilently, user } = useAuth0();

  const authLink = setContext(async (_, { headers }) => {
    let accessToken = null;
    try {
      accessToken = await getAccessTokenSilently();
    } catch (e) {
      console.log({ e });
    }

    headers = { ...headers };
    if (accessToken) {
      headers.authorization = `Bearer ${accessToken}`;
    }
    if (user) {
      headers["x-hasura-user-id"] = user.sub;
      headers["x-hasura-role"] = "user";
    }

    return { headers };
  });

  const httpLink = createHttpLink({
    fetch,
    uri: API_URL,
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
