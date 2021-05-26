import { NextPage } from 'next';

import { OrgRegisterForm } from '../../components/container';
import { FormPageTemplate } from '../../components/presentational';

const RegisterOrgPublicPage: NextPage = () => {
  return <FormPageTemplate title="団体登録" content={<OrgRegisterForm />} />;
};

export default RegisterOrgPublicPage;
