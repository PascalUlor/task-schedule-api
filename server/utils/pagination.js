const pagination = (query, perPage = 1, currentPage = 1) => {
  const limit = Math.max(currentPage, 1);
  const offset = (limit - 1) * perPage;

  return {
    ...query,
    offset,
    limit,
  };
};

export default pagination;
