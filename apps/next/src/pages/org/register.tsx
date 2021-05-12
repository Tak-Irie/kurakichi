import { NextPage } from 'next';
import { OrgRegisterForm } from '@next/container';

const RegisterOrgPublicPage: NextPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-3 col-end-11">
        <OrgRegisterForm />
      </div>
    </div>
  );
};

export default RegisterOrgPublicPage;
