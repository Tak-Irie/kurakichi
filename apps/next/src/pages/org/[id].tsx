import { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import { fetchGraphqlApi } from '../../util/fetchGraphqlApi';
import { useRouter } from 'next/router';
import {
  OrgProfile,
  OrgTemplate,
  ButtonWithIcon,
  IconsMail,
  IconsCaution,
  FeedbackCaution,
  PopOnIcon,
  Disclosure,
} from '@next/ui';
import { SendInquiryForm } from '@next/container';
import { OrgPayload, useGetUserByCookieQuery } from '@next/graphql';
import { useState } from 'react';

type OrgProps = InferGetStaticPropsType<typeof getStaticProps>;

const OrgProfilePublicPage: NextPage<OrgProps> = (props) => {
  // console.log('props:', props.data.getOrgPublicInfoById.org);
  const [isOpen, setIsOpen] = useState(false);
  const { data: userData } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const org = props.data.getOrgPublicInfoById.org;

  return (
    <OrgTemplate
      avatar={org.avatar}
      image={org.image}
      orgName={org.orgName}
      headerButtons={
        userData?.getUserByCookie.user ? (
          <Disclosure
            label={
              <ButtonWithIcon
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                label="お問い合わせ"
                icon={<IconsMail />}
              />
            }
            contentCSS="absolute z-10 mt-12"
            content={<SendInquiryForm orgId={org.id} receiverId={org.members[0].id} />}
          />
        ) : (
          <div className="flex items-center space-x-3">
            <PopOnIcon
              icon={<IconsCaution />}
              content={<FeedbackCaution>ログインが必要です</FeedbackCaution>}
            />
            <ButtonWithIcon
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              label="お問い合わせ"
              disabled
              icon={<IconsMail />}
            />
          </div>
        )
      }
      pageContents={<OrgProfile org={org} />}
    />
  );
};

// TODO:need to SSR?, examine it
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchGraphqlApi({
    query: `query _query {
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
  const data: { getOrgPublicInfoById: OrgPayload } = await fetchGraphqlApi({
    query: `query _query($orgId: String!) {
              getOrgPublicInfoById(orgId: $orgId) {
                org {
                  id
                  orgName
                  location
                  latitude
                  longitude
                  email
                  phoneNumber
                  image
                  avatar
                  description
                  homePage
                  members {
                    id
                    userName
                    avatar
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
    variables: { orgId: params.id },
  });

  // console.log('SSG data:', data.getOrg.org.members);
  return { props: { data } };
};

export default OrgProfilePublicPage;
