import { VFC } from 'react';
import { useForm } from 'react-hook-form';

import { Form, InputTextarea, NotificationSet, ButtonOrLoading } from '@next/ui';
import { useResponseMessageMutation } from '@next/graphql';

type ResponseMessageProps = {
  originalMessageId: string;
  onClick?: () => void;
};

type ResponseMessageInput = {
  textInput: string;
};
export const ResponseMessageForm: VFC<ResponseMessageProps> = ({ originalMessageId, onClick }) => {
  const { register, handleSubmit } = useForm<ResponseMessageInput>();
  const [responseMessage, { data, error, loading }] = useResponseMessageMutation();

  const onSubmit = async (values: ResponseMessageInput) => {
    console.log('resMessageValues:', values);
    try {
      await responseMessage({
        variables: {
          text: values.textInput,
          originalMessageId,
        },
        // update: (cache,result) => {
        //   result.data.responseMessage.message
        //   // cache.modify()
        // }
      });
      console.log('returnData:', data);
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <div>
      <NotificationSet
        data={data?.responseMessage.message}
        errData={data?.responseMessage.error}
        sysErr={error}
        dataContent="メッセージを送信しました!"
        errDataContent={data?.responseMessage.error?.message}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputTextarea<ResponseMessageInput>
          rows={3}
          cols={30}
          fieldLabel="メッセージ内容"
          label="textInput"
          required
          register={register}
        />
        <ButtonOrLoading
          onClick={onClick}
          loading={loading}
          buttonType="submit"
          buttonLabel="メッセージ送信"
        />
      </Form>
    </div>
  );
};
