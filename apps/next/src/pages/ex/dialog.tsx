import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { MiddleButton } from '../../components/presentational/atoms/Button';
import {
  usePostDialogMutation,
  useSubscriptDialogSubscription,
} from '../../graphql/generated/graphql';
import { Form } from '../../components/presentational/molecules/Form';
import { Input } from '../../components/presentational/atoms/Input';

type PostDialogInput = {
  id: string;
  content: string;
};

const Dialog: NextPage = () => {
  const { data, error } = useSubscriptDialogSubscription();
  const [postDialog] = usePostDialogMutation();
  const { register, handleSubmit } = useForm();

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
        <Input name="id" type="text" labeled={true} register={register} />
        <Input name="content" type="text" labeled={true} register={register} />
        <MiddleButton type="submit">Post Dialog</MiddleButton>
      </Form>
    </>
  );
};

export default Dialog;
