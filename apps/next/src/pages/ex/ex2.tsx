import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { MiddleButton } from '../../components/presentational/atoms/Button';
import { useDialogPostMutation, useSubDialogSubscription } from '../../graphql/generated/graphql';
import { Form } from '../../components/presentational/molecules/Form';
import { Input } from '../../components/presentational/atoms/Input';

type PostDialogInput = {
  id: string;
  text: string;
};

const Ex2: NextPage = () => {
  const { data, loading, error } = useSubDialogSubscription();
  const [postDialog] = useDialogPostMutation();
  const { register, handleSubmit } = useForm();

  const handleMutation = async (value: PostDialogInput) => {
    try {
      await postDialog({
        variables: { postDialogId: value.id, postDialogText: value.text },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  if (!data && error) return <p>{error.message}</p>;

  return (
    <>
      <p>{data?.dialogPosted.text || null}</p>
      <Form onSubmit={handleSubmit(handleMutation)}>
        <Input name="id" type="text" labeled={true} register={register} />
        <Input name="text" type="text" labeled={true} register={register} />
        <MiddleButton type="submit">Post Dialog</MiddleButton>
      </Form>
    </>
  );
};

export default Ex2;
