import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { PostcodeRegExp } from '../../../lib';

import { ButtonWithIcon, Form, IconsPost } from '../../presentational/atoms';
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const GeocodeByPostcodeForm: FC<GeocodeByPostcodeButtonProps> = ({
  buttonLabel,
  dispatcher,
}) => {
  const [isLocation, setIsLocation] = useState<Geocode>();
  const [isPostcode, setIsPostcode] = useState<string>();
  const { register, handleSubmit } = useForm<PostcodeInput>();
  const POST_CODE_API =
    process.env.POST_CODE_API ||
    `http://localhost:4000/geocode/postcode?code=${isPostcode}`;

  useSWR(POST_CODE_API, fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: (data) => {
      setIsLocation(data);
    },
  });

  const onSubmit = (input: PostcodeInput) => {
    setIsPostcode(input.postcode);
  };

  useEffect(() => {
    if (isLocation) {
      dispatcher({ lat: isLocation.lat, lng: isLocation.lng });
    }
  }, [isLocation, dispatcher]);

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
          />
        </div>
      </Form>
    </div>
  );
};
