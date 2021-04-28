import * as yup from 'yup';

export const yupPasswordSchema = yup.object().shape({
  password: yup.string().min(8, '最低8文字以上です').required('入力必須項目です'),
});

export const yupChangePasswordSchema = yup.object().shape({
  currentPass: yup.string().required('入力必須項目です').min(8, '最低8文字以上です'),
  newPass: yup.string().required('入力必須項目です').min(8, '最低8文字以上です'),
});
