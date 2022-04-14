import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UpdateOrgProfileForm } from '../../../../components/container';
import { ButtonWithIcon } from '../../../../components/presentational/atoms';
import { OrgTemplate } from '../../../../components/presentational/templates';

const OrgSetting: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;

  const { data } = useGetOrgPrivateInfoByIdAndCookieQuery({
    fetchPolicy: 'cache-only',
    variables: { orgId },
  });

  if (data?.getOrgPrivateInfoByIdAndCookie.org) {
    const { avatar, image, email, description, orgName, homePage, phoneNumber, location, id } =
      data?.getOrgPrivateInfoByIdAndCookie.org;
    return (
      <OrgTemplate
        avatar={avatar}
        image={image}
        orgName={orgName}
        settingHeader={true}
        headerButtons={
          <Link href="/org/myorg/[id]" as={`/org/myorg/${id}`} passHref>
            <a href="replace">
              <ButtonWithIcon type="button" label="団体ページに戻る" icon={<IconsUsers />} />
            </a>
          </Link>
        }
        pageContents={
          <UpdateOrgProfileForm
            exDescription={description}
            exEmail={email}
            exHomePage={homePage}
            exLocation={location}
            exPhoneNumber={phoneNumber}
            exName={orgName}
            orgId={id}
          />
        }
      />
    );
  }

  return <p>something wrong</p>;
};

export default OrgSetting;
