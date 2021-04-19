type FetchProps = {
  query: string;
  variables?: any;
  preview?: any;
};

const GQL_URL = process.env.NEXT_PUBLIC_GQL_HTTP || 'http://localhost:4000/graphql';

// this function be used for SSR processes like getStaticProps/getStaticPaths
// in order to avoid Apollo's getDataFromTree, use simple fetch API
// if getDataFromTree will work highly performative, replace it.
export const fetchGraphqlApi = async (props: FetchProps) => {
  const { preview, query, variables } = props;
  const res = await fetch(GQL_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
};
