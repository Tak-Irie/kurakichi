import fetch from "node-fetch";

interface AddressData {
  prefecture: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
}

interface LocationResponse {
  code: string;
  data: {
    en: AddressData;
    ja: AddressData;
    prefcode: string;
  }[];
}

export const fetchAddressByPostcode = async (
  postcode: string | number
): Promise<string> => {
  let code: string;
  console.log("postcode:", postcode);
  if (postcode === undefined) {
    return "郵便番号を入力して所在地を取得して下さい";
  }

  if (typeof postcode === "number") {
    code = postcode.toString();
  } else {
    code = postcode;
  }

  const former = code.slice(0, 3);

  if (code.includes("-")) {
    code = code.replace("-", "");
  }

  const modified = former + "/" + code.slice(3, 7);

  const response = await fetch(
    `https://madefor.github.io/postal-code-api/api/v1/${modified}.json`
  );

  if (response.ok === false) {
    return "存在しない郵便番号です";
  }
  const locationData = (await response.json()) as LocationResponse;

  const ja = locationData.data[0].ja;
  const concatenated = ja.prefecture.concat(
    "",
    ja.address1,
    ja.address2,
    ja.address3,
    ja.address4
  );

  return concatenated;
};

const isLocation = (json: unknown): false | LocationResponse => {
  if (typeof json === "object" && json !== null) {
    if ("code" in json) {
      return json as LocationResponse;
    }
  }
  return false;
};
