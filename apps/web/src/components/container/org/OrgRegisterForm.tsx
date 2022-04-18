import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PostcodeAPI } from '@kurakichi/modules/shared/infra';
import { useRegisterOrgMutation } from '@next/graphql';
import { ButtonBig, Form, Input, TextSmall } from '../../presentational/atoms';
import {
  ButtonOrLoading,
  NotificationSet,
} from '../../presentational/molecules';

type OrgRegisterInput = {
  orgName: string;
  orgEmail: string;
  orgPostcode: string;
  orgLocation: string;
  orgLocationDetail: string;
  orgPhoneNumber: string;
};

export const OrgRegisterForm: FC = () => {
  const [isPostcode, setIsPostcode] = useState('');
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
      const address = await PostcodeAPI(isPostcode);
      setIsLocation(address);
    };
    getLocation();
  }, [isPostcode]);

  useEffect(() => {
    setValue('orgLocation', isLocation);
  }, [isLocation, setValue]);

  const onSubmit = async (input: OrgRegisterInput) => {
    console.log('orgRegisterInput:', input);
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
          orgPhoneNumber: orgPhoneNumber.trim(),
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
      <Form onSubmit={handleSubmit(onSubmit)} overWriteCSS="">
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
        <span className="grid grid-cols-3">
          <span className="col-span-2">
            <Input<OrgRegisterInput>
              type="text"
              fieldLabel="郵便番号"
              label="orgPostcode"
              required
              register={register}
              minLength={7}
              maxLength={8}
              helperText={'例: 100-0001 or 1000001'}
              errMessage={errors.orgPostcode && errors.orgPostcode.message}
            />
          </span>
          <span className="flex col-span-1 justify-end items-center ml-4">
            <ButtonBig
              label={<TextSmall content={'郵便番号から\n所在地を取得する'} />}
              type="button"
              color="yellow"
              onClick={() => setIsPostcode(getValues('orgPostcode'))}
            />
          </span>
        </span>
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="所在地"
          label="orgLocation"
          required={false}
          disable
          register={register}
          helperText={
            '郵便番号から取得された住所が自動で入力されます\n続く住所を所在地詳細に入力して下さい\n\n例:東京都千代田区千代田'
          }
          errMessage={errors.orgLocation && errors.orgLocation.message}
        />
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="所在地詳細"
          label="orgLocationDetail"
          required={false}
          register={register}
          helperText={
            '例:1-1 エンペラーパレス1F\n\n※全て自動で取得された場合は不要です'
          }
          errMessage={
            errors.orgLocationDetail && errors.orgLocationDetail.message
          }
        />
        <Input<OrgRegisterInput>
          type="tel"
          fieldLabel="代表電話番号"
          label="orgPhoneNumber"
          required
          register={register}
          errMessage={errors.orgPhoneNumber && errors.orgPhoneNumber.message}
        />
        <span className="flex justify-end mt-5">
          <ButtonOrLoading
            disabled={!isValid}
            buttonType="submit"
            color="yellow"
            buttonLabel={!isValid ? '未入力の項目があります' : '登録'}
            loading={loading}
          />
        </span>
      </Form>
    </div>
  );
};
