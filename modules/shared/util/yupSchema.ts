import * as yup from "yup";

// FIXME:really needs third party validator?
const passwordRegExp = /[A-Za-z0-9.\-_@*!]+/;

export const yupPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "最低8文字以上です")
    .required("入力必須項目です")
    .matches(passwordRegExp, {
      message: "使用不可能な文字が含まれています",
      excludeEmptyString: true,
    }),
});

export const yupEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required("入力必須項目です")
    .email("メールアドレスの形式を満たしていません"),
});

export const yupChangePasswordSchema = yup.object().shape({
  currentPass: yup
    .string()
    .required("入力必須項目です")
    .min(8, "最低8文字以上です"),
  newPass: yup
    .string()
    .required("入力必須項目です")
    .min(8, "最低8文字以上です")
    .matches(passwordRegExp, {
      message: "使用不可能な文字が含まれています",
      excludeEmptyString: true,
    }),
});

export const yupRegisterUserAndLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("入力必須項目です")
    .email("メールアドレスの形式を満たしていません"),
  password: yup
    .string()
    .required("入力必須項目です")
    .min(8, "最低8文字以上です")
    .max(30, "最大30文字です")
    .matches(passwordRegExp, {
      message: "使用不可能な文字が含まれています",
      excludeEmptyString: true,
    }),
});

export const yupRegisterOrg = yup.object().shape({
  orgName: yup.string().required("入力必須項目です"),
  orgEmail: yup
    .string()
    .required("入力必須項目です")
    .email("メールアドレスの形式を満たしていません"),
  orgPostcode: yup
    .string()
    .typeError("7~8桁の数字を入力して下さい")
    .required("入力必須項目です")
    .min(7, "7桁以上を入力して下さい")
    .max(8, "8桁以下を入力して下さい"),
  orgAddress: yup.string(),
  orgAddressDetail: yup.string(),
  orgPhoneNumber: yup.string().required("入力必須項目です"),
});
