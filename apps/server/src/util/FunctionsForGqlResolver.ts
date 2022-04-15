// FIXME:fix whole process. Result, Usecase, Resolver.
// in usecase, implement error type in result object.
// like type: "UserError", "ApplicationError"
const returnErrorToGQL = (message: string) => {
  return { errors: { applicationError: { message } } };
};

const returnNotLoggedIn = () => {
  return returnErrorToGQL('ログインしていません');
};

export { returnErrorToGQL, returnNotLoggedIn };
