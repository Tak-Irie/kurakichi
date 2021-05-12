import { NextPage } from 'next';

import { OrgRegisterForm } from '@next/container';
import { FormPageTemplate } from '@next/ui';

const RegisterOrgPublicPage: NextPage = () => {
  return <FormPageTemplate formTitle="団体登録" formContent={<OrgRegisterForm />} />;
};

export default RegisterOrgPublicPage;
