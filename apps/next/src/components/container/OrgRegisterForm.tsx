import { useEffect, useState, VFC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { yupRegisterOrg, fetchAddressByPostcode } from '@kurakichi/node-util';
import { Form, Input, ButtonOrLoading, ButtonBig, NotificationSet } from '@next/ui';
import { useRegisterOrgMutation } from '@next/graphql';

interface OrgRegisterInput {
  orgName: string;
  orgEmail: string;
  orgPostcode: number;
  orgLocation: string;
  orgLocationDetail: string;
  orgPhoneNumber: string;
}

export const OrgRegisterForm: VFC = () => {
  const [isPostcode, setIsPostcode] = useState<number>();
  const [isLocation, setIsLocation] = useState('');
  const [orgRegister, { data, loading, error }] = useRegisterOrgMutation();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<OrgRegisterInput>({
    mode: 'onBlur',
    resolver: yupResolver(yupRegisterOrg),
  });

  useEffect(() => {
    const getLocation = async () => {
      const address = await fetchAddressByPostcode(isPostcode);
      setIsLocation(address);
    };
    getLocation();
  }, [isPostcode]);

  useEffect(() => {
    setValue('orgLocation', isLocation);
  }, [isLocation, setValue]);

  const onSubmit = async (input: OrgRegisterInput) => {
    const {
      orgEmail,
      orgLocation,
      orgLocationDetail,
      orgName,
      orgPhoneNumber,
      orgPostcode,
    } = input;
    try {
      await orgRegister({
        variables: {
          orgName,
          orgEmail,
          orgPhoneNumber,
          orgLocation: orgPostcode.toString() + orgLocation + orgLocationDetail,
        },
      });
    } catch (err) {
      console.error('err:', err);
    }
  };
  return (
    <div>
      <NotificationSet
        data={data?.registerOrg.org}
        errData={data?.registerOrg.error}
        sysErr={error}
        dataLabel={`${data?.registerOrg.org?.orgName}の仮登録が完了しました`}
        errDataLabel="入力内容エラー"
        errDataContent={data?.registerOrg.error?.message}
        sysErrLabel={error?.message}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="団体名"
          label="orgName"
          required
          register={register}
          errMessage={errors.orgName && errors.orgName.message}
        />
        <Input<OrgRegisterInput>
          type="email"
          fieldLabel="団体メールアドレス"
          label="orgEmail"
          required
          register={register}
          errMessage={errors.orgEmail && errors.orgEmail.message}
        />
        <span className="flex">
          <span>
            <Input<OrgRegisterInput>
              type="text"
              fieldLabel="郵便番号"
              label="orgPostcode"
              required
              register={register}
              maxLength={7}
              errMessage={errors.orgPostcode && errors.orgPostcode.message}
            />
          </span>
          <ButtonBig
            label="所在地を取得する"
            type="button"
            onClick={() => setIsPostcode(getValues('orgPostcode'))}
          />
        </span>
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="所在地"
          label="orgLocation"
          required={false}
          disable
          register={register}
          errMessage={errors.orgLocation && errors.orgLocation.message}
        />
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="所在地詳細"
          label="orgLocationDetail"
          required
          register={register}
          errMessage={errors.orgLocationDetail && errors.orgLocationDetail.message}
        />
        <Input<OrgRegisterInput>
          type="tel"
          fieldLabel="代表電話番号"
          label="orgPhoneNumber"
          required
          register={register}
          errMessage={errors.orgPhoneNumber && errors.orgPhoneNumber.message}
        />
        <ButtonOrLoading
          disabled={!isValid}
          buttonType="submit"
          color="yellow"
          buttonLabel={!isValid ? '未入力の項目があります' : '登録'}
          loading={loading}
        />
      </Form>
    </div>
  );
};
