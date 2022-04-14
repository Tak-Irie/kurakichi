import { Dispatch, SetStateAction, useEffect, useState, VFC } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { ButtonWithIcon, Form, IconsPost, Input } from '../../presentational';

type Geocode = {
  lat: number;
  lng: number;
};

type GeocodeByPostcodeButtonProps = {
  buttonLabel: string;
  dispatcher: Dispatch<SetStateAction<Geocode>>;
};

type PostcodeInput = {
  postcode: string;
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export const GeocodeByPostcodeForm: VFC<GeocodeByPostcodeButtonProps> = ({
  buttonLabel,
  dispatcher,
}) => {
  const [isLocation, setIsLocation] = useState<Geocode>();
  const [isPostcode, setIsPostcode] = useState<string>();
  const { register, handleSubmit } = useForm<PostcodeInput>();

  useSWR(`http://localhost:4000/geocode/postcode?code=${isPostcode}`, fetcher, {
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
        <span className="space-y-1">
          <ButtonWithIcon
            type="submit"
            label={buttonLabel}
            icon={<IconsPost />}
          />
          <Input<PostcodeInput>
            type="text"
            label="postcode"
            required={false}
            register={register}
          />
        </span>
      </Form>
    </div>
  );
};
