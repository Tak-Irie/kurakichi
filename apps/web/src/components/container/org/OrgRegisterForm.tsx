import {
  Any100chrRegExp,
  EmailRegExp,
  OrgNameRegExp,
  PhoneNumberRegExp,
  PostcodeRegExp,
} from '@kurakichi/domain';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useGetAddressByPostcodeLazyQuery,
  useRegisterOrgMutation,
} from '../../../graphql/generated';
import { ButtonBig, Form, Input, TextSmall } from '../../presentational/atoms';
import { ButtonOrLoading } from '../../presentational/molecules';
import { NotificationSet } from '../../presentational/organisms';

type OrgRegisterInput = {
  name: string;
  email: string;
  postcode: string;
  location: string;
  locationDetail: string;
  phoneNumber: string;
};

export const OrgRegisterForm: FC = () => {
  const [isPostcode, setIsPostcode] = useState('');
  const [isLocation, setIsLocation] = useState('');
  const [orgRegister, { data, loading, error }] = useRegisterOrgMutation();
  const [
    getAddress,
    { data: addressData, loading: addressLoading, error: addressError },
  ] = useGetAddressByPostcodeLazyQuery();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<OrgRegisterInput>({
    mode: 'onBlur',
  });

  useEffect(() => {
    const getLocation = async () => {
      await getAddress({ variables: { postcode: isPostcode } });
    };
    getLocation();
  }, [isPostcode]);

  useEffect(() => {
    setValue('location', isLocation);
  }, [isLocation, setValue]);

  useEffect(() => {
    if (addressData?.getAddressByPostcode?.__typename === 'Address') {
      setIsLocation(addressData.getAddressByPostcode.address);
    }
  }, [addressData]);

  const onSubmit = async (input: OrgRegisterInput) => {
    // console.log('orgRegisterInput:', input);
    const { phoneNumber, postcode, location, locationDetail, ...rest } = input;

    try {
      await orgRegister({
        variables: {
          input: {
            phoneNumber: phoneNumber.trim(),
            address: postcode.toString() + location + locationDetail,
            ...rest,
          },
        },
      });
    } catch (err) {
      console.error('err:', err);
    }
  };
  return (
    <div>
      <NotificationSet
        succeededContent={
          data?.registerOrg?.__typename === 'Org' ? '登録が完了しました' : ''
        }
        errContent={
          data?.registerOrg?.__typename === 'Errors'
            ? data.registerOrg.applicationError?.message
            : ''
        }
        sysErrContent={error}
        sysErrLabel="システムトラブルが発生しました。管理者に連絡してください"
      />
      <Form onSubmit={handleSubmit(onSubmit)} overWriteCSS="">
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="団体名"
          label="name"
          required
          pattern={OrgNameRegExp}
          register={register}
          errMessage={errors.name && errors.name.message}
        />
        <Input<OrgRegisterInput>
          type="email"
          fieldLabel="団体メールアドレス"
          label="email"
          pattern={EmailRegExp}
          required
          register={register}
          errMessage={errors.email && errors.email.message}
        />
        <span className="grid grid-cols-3">
          <span className="col-span-2">
            <Input<OrgRegisterInput>
              type="text"
              fieldLabel="郵便番号"
              label="postcode"
              required
              pattern={PostcodeRegExp}
              register={register}
              minLength={7}
              maxLength={8}
              helperText={'例: 100-0001 or 1000001'}
              errMessage={errors.postcode && errors.postcode.message}
            />
          </span>
          <span className="flex col-span-1 justify-end items-center ml-4">
            <ButtonBig
              label={<TextSmall content={'郵便番号から\n所在地を取得する'} />}
              type="button"
              color="yellow"
              onClick={() => setIsPostcode(getValues('postcode'))}
            />
          </span>
        </span>
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="所在地"
          label="location"
          required={false}
          pattern={Any100chrRegExp}
          disable
          register={register}
          helperText={
            '郵便番号から取得された住所が自動で入力されます\n続く住所を所在地詳細に入力して下さい\n\n例:東京都千代田区千代田'
          }
          errMessage={errors.location && errors.location.message}
        />
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="所在地詳細"
          label="locationDetail"
          required={false}
          pattern={Any100chrRegExp}
          register={register}
          helperText={
            '例:1-1 エンペラーパレス1F\n\n※全て自動で取得された場合は不要です'
          }
          errMessage={errors.locationDetail && errors.locationDetail.message}
        />
        <Input<OrgRegisterInput>
          type="tel"
          fieldLabel="代表電話番号"
          label="phoneNumber"
          required
          pattern={PhoneNumberRegExp}
          register={register}
          errMessage={errors.phoneNumber && errors.phoneNumber.message}
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
