import { Issuer } from "openid-client";

const createYahooClient = async () => {
  const yahooIdP = await Issuer.discover(
    process.env.YAHOO_OIDC_ISSUER_BASE_URL as string
  );
  const yahooClient = new yahooIdP.Client({
    response_types: ["code"],
    client_id: process.env.YAHOO_OIDC_CLIENT_ID as string,
    client_secret: process.env.YAHOO_OIDC_CLIENT_SECRET,
    redirect_uris: [process.env.YAHOO_OIDC_CLIENT_REDIRECT as string],
  });

  return yahooClient;
};

const createGoogleClient = async () => {
  const googleIdP = await Issuer.discover(
    process.env.GOOGLE_OIDC_ISSUER_BASE_URL as string
  );
  const googleClient = new googleIdP.Client({
    response_types: ["code"],
    client_id: process.env.GOOGLE_OIDC_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_OIDC_CLIENT_SECRET,
    redirect_uris: [process.env.GOOGLE_OIDC_CLIENT_REDIRECT as string],
  });

  return googleClient;
};

export { createGoogleClient, createYahooClient };
