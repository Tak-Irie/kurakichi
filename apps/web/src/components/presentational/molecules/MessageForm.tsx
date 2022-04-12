import { FC } from 'react';
import { Form, Input, Select } from '@next/ui';
import { useForm } from 'react-hook-form';

type MessageFormPros<T> = {
  onSubmit: (props: T) => void;
};

interface IFormProps {
  select: string;
  textArea: string;
}

export const MessageForm: FC<IFormProps> = <IFormProps extends any>(props) => {
  const { register, handleSubmit } = useForm<IFormProps>();

  return (
    <div>
      <p>placer</p>
      {/* <Form onSubmit={handleSubmit(props.onSubmit)}>
        <Select<IFormProps>
          label=""
          options={['相談', '問い合わせ', '所属申請', 'その他']}
          required
          register={register}
        ></Select>
        <textarea rows={4} cols={30} {...register(props.)}></textarea>
      </Form> */}
    </div>
  );
};
