type base64Props = {
  domainObject: string;
  uid: string;
};

export const base64Encode = ({ domainObject, uid }: base64Props): string => {
  const encodeTarget = `${domainObject}:${uid}`;

  const encoded = Buffer.from(encodeTarget).toString("base64");
  return encoded;
};

export const base64Decode = (base64: string): string => {
  const decoded = Buffer.from(base64, "base64").toString();
  return decoded;
};

export const base64DecodeToDomainAndId = (base64: string): base64Props => {
  const decoded = Buffer.from(base64, "base64").toString();
  const separated = decoded.split(":");

  return { domainObject: separated[0], uid: separated[1] };
};
