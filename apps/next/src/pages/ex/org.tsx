import { NextPage } from 'next';
import { useOrgRegisterMutation } from '../../graphql/generated/graphql';

const Org: NextPage = () => {
  const {} = useOrgRegisterMutation();
  return <p>this is ex3</p>;
};

export default Org;
