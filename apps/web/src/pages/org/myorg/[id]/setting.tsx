import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UpdateOrgProfileForm } from '../../../../components/container';
import {
  ButtonWithIcon,
  IconsUsers,
} from '../../../../components/presentational/atoms';
import { OrgTemplate } from '../../../../components/presentational/templates';
import { useGetOrgPrivateInfoByCookieAndIdQuery } from '../../../../graphql';
import { FAIL_TO_FETCH } from '../../../../util/Constants';

const OrgSetting: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;

  const { data } = useGetOrgPrivateInfoByCookieAndIdQuery({
    fetchPolicy: 'cache-first',
    variables: { orgId },
    ssr: false,
  });

  if (data?.getOrgInfoByMemberCookieAndId?.__typename === 'Org') {
    const {
      avatarUrl,
      heroImageUrl,
      email,
      description,
      name,
      homePage,
      phoneNumber,
      address,
      id,
    } = data.getOrgInfoByMemberCookieAndId;
    return (
      <OrgTemplate
        avatar={avatarUrl || FAIL_TO_FETCH}
        image={heroImageUrl || FAIL_TO_FETCH}
        orgName={name || FAIL_TO_FETCH}
        settingHeader={true}
        headerButtons={
          <Link href="/org/myorg/[id]" as={`/org/myorg/${id}`} passHref>
            <a href="replace">
              <ButtonWithIcon
                type="button"
                label="団体ページに戻る"
                icon={<IconsUsers />}
              />
            </a>
          </Link>
        }
        pageContents={
          <UpdateOrgProfileForm
            exDescription={description || FAIL_TO_FETCH}
            exEmail={email || FAIL_TO_FETCH}
            exHomePage={homePage || FAIL_TO_FETCH}
            exLocation={address?.address || FAIL_TO_FETCH}
            exPhoneNumber={phoneNumber || FAIL_TO_FETCH}
            exName={name || FAIL_TO_FETCH}
            orgId={id}
          />
        }
      />
    );
  }

  return <p>something wrong</p>;
};

export default OrgSetting;
