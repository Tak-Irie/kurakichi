import memoize from 'fast-memoize';
import { Issuer } from 'openid-client';

const YahooClient = async () => {
  const yahooIdP = await Issuer.discover(
    process.env.NX_YAHOO_OIDC_ISSUER_BASE_URL as string,
  );
  const yahooRP = new yahooIdP.Client({
    response_types: ['code'],
    client_id: process.env.NX_YAHOO_OIDC_CLIENT_ID as string,
    client_secret: process.env.NX_YAHOO_OIDC_CLIENT_SECRET,

    // TODO:dev
    redirect_uris: ['https://localhost/yahoo/callback'],
  });

  return yahooRP;
};

const GoogleClient = async () => {
  const googleIdP = await Issuer.discover(
    process.env.NX_GOOGLE_OIDC_ISSUER_BASE_URL as string,
  );
  const googleRP = new googleIdP.Client({
    response_types: ['code'],
    client_id: process.env.NX_GOOGLE_OIDC_CLIENT_ID as string,
    client_secret: process.env.NX_GOOGLE_OIDC_CLIENT_SECRET,

    // TODO:dev
    redirect_uris: ['https://localhost/google/callback'],
  });

  return googleRP;
};

const memoizedYahooClient = memoize(YahooClient);
const memoizedGoogleClient = memoize(GoogleClient);

export { memoizedYahooClient, memoizedGoogleClient };
