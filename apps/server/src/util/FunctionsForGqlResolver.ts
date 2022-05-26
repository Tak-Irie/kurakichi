// FIXME:fix whole process. Result, Usecase, Resolver.
// in usecase, implement error type in result object.
// like type: "UserError", "ApplicationError"
const returnErrorToGQL = (message: string) => ({
  __typename: 'Errors' as const,
  applicationError: { message },
});

const returnNotLoggedIn = () => returnErrorToGQL('ログインしていません');

export { returnErrorToGQL, returnNotLoggedIn };
