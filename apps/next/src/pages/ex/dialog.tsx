import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import {
  usePostDialogMutation,
  useSubscriptDialogSubscription,
} from '../../graphql/generated/graphql';
import { Form, Input, ButtonBig } from '@next/ui';

type PostDialogInput = {
  id: string;
  content: string;
};

const Dialog: NextPage = () => {
  const { data, error } = useSubscriptDialogSubscription();
  const [postDialog] = usePostDialogMutation();
  const { register, handleSubmit } = useForm<PostDialogInput>();

  const handleMutation = async (input: PostDialogInput) => {
    try {
      await postDialog({
        variables: { DialogId: input.id, DialogContent: input.content },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  if (!data && error) return <p>エラー：{error.message}</p>;

  return (
    <>
      <p>{data?.dialogPosted.dialogContent || null}</p>
      <Form onSubmit={handleSubmit(handleMutation)}>
        <Input<PostDialogInput> label="id" type="text" required register={register} />
        <Input<PostDialogInput> label="content" type="text" required register={register} />
        <ButtonBig type="submit">Post Dialog</ButtonBig>
      </Form>
    </>
  );
};

export default Dialog;
