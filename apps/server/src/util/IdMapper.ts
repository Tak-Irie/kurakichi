export const idMapper = (id: string) => {
  return {
    id,
  };
};

export const idsMapper = (ids: string[]) => {
  return ids.map((id) => idMapper(id));
};
