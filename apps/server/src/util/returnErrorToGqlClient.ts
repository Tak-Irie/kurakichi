import type { Errors } from "../graphql/generated/generatedTypes";

// FIXME:fix whole process. Result, Usecase, Resolver.
// in usecase, implement error type in result object.
// like type: "UserError", "ApplicationError"
export const returnErrorToGQL = (result: any) => {
  return { errors: { applicationError: { message: result } } };
};
