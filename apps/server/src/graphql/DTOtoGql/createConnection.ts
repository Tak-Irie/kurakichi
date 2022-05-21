const createGqlConn = (ids: string[]) => {
  const pageInfo = { hasNext: false, hasPrevious: false };
  const edges = ids.map((id) => {
    return {
      cursor: id,
      node: {
        id,
      },
    };
  });
  return { pageInfo, edges };
};

export { createGqlConn };
