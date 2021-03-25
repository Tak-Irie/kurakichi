import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GQL_HTTP,
  credentials: 'include',
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: process.env.NEXT_PUBLIC_GQL_WS,
      options: {
        reconnect: true,
        // TODO:
        // connectionParams: {
        //   authToken: user.authToken,
        // },
      },
    })
  : null;

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink,
    )
  : httpLink;

export { splitLink };
