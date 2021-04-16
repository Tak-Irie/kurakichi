/**
 * @desc dataTransferFnc from DTO of UseCaseLayer to GraphQL Field of PresentationLayer
 */
export const idMapper = (ids: string[]) => {
  return ids.map((id) => {
    return {
      id,
    };
  });
};
