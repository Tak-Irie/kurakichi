// FIXME:fix whole process. Result, Usecase, Resolver.
// in usecase, implement error type in result object.
// like type: "UserError", "ApplicationError"
const returnErrorToGQL = (message: string) => {
  return {
    __typename: 'Errors' as const,
    applicationError: { message },
  };
};

const returnNotLoggedIn = () => {
  return returnErrorToGQL('ログインしていません');
};

export { returnErrorToGQL, returnNotLoggedIn };
