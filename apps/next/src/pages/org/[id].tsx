import { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import { fetchGraphqlApi } from '../../util/fetchGraphqlApi';
import { useRouter } from 'next/router';
import { OrgProfile } from '@next/ui';
import { OrgPayload } from '../../graphql/generated/graphql';

type OrgProps = InferGetStaticPropsType<typeof getStaticProps>;

const Org: NextPage<OrgProps> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <OrgProfile {...props.data.getOrg.org} />;
};

// TODO:need to SSR?, examine it
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchGraphqlApi({
    query: `query GetOrgs {
              getOrgs {
                orgs {
                id
              }
            }
          }`,
  });

  const paths = data.getOrgs.orgs.map((org) => {
    return { params: { id: org.id } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const data: { getOrg: OrgPayload } = await fetchGraphqlApi({
    query: `query GetOrg($OrgId: String!) {
              getOrg(orgId: $OrgId) {
                org {
                  id
                  orgName
                  location
                  email
                  phoneNumber
                  image
                  avatar
                  description
                  homePage
                  members {
                    id
                    userName
                  }
                  inquiries {
                    id
                    content
                  }
                }
                error {
                    message
                  }
              }
            }`,
    variables: { OrgId: params.id },
  });

  // console.log('SSG data:', data.getOrg.org.members);
  return { props: { data } };
};

export default Org;
