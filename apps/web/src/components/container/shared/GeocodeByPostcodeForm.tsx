import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetGeocodeByPostcodeLazyQuery } from '../../../graphql';
import { PostcodeRegExp } from '../../../lib';

import {
  ButtonWithIcon,
  Form,
  IconsPost,
  LoadingSpinner,
} from '../../presentational/atoms';
import { Input, InputValue } from '../../presentational/molecules';

type Geocode = {
  lat: number;
  lng: number;
};

type GeocodeByPostcodeButtonProps = {
  buttonLabel: string;
  dispatcher: Dispatch<SetStateAction<Geocode>>;
};

interface PostcodeInput extends InputValue {
  postcode: string;
}

export const GeocodeByPostcodeForm: FC<GeocodeByPostcodeButtonProps> = ({
  buttonLabel,
  dispatcher,
}) => {
  const { register, handleSubmit } = useForm<PostcodeInput>();
  const [getGeocode, { data, loading }] = useGetGeocodeByPostcodeLazyQuery();

  const onSubmit = async (input: PostcodeInput) => {
    await getGeocode({ variables: { postcode: input.postcode } });
  };

  useEffect(() => {
    if (
      data?.getGeocodeByPostcode.__typename === 'Geocode' &&
      data.getGeocodeByPostcode.lat !== '0'
    ) {
      dispatcher({
        lat: Number(data.getGeocodeByPostcode.lat),
        lng: Number(data.getGeocodeByPostcode.lng),
      });
    }
  }, [data, dispatcher]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-2 rounded border border-gray-200">
      <Form onSubmit={handleSubmit(onSubmit)} overWriteCSS="">
        <div className="space-y-1">
          <ButtonWithIcon
            type="submit"
            label={buttonLabel}
            icon={<IconsPost />}
          />
          <Input<PostcodeInput>
            type="text"
            label="postcode"
            pattern={PostcodeRegExp}
            required={false}
            register={register}
            placeholder="例:100-0001"
            maxLength={8}
          />
        </div>
      </Form>
    </div>
  );
};
