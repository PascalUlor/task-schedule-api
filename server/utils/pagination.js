const pagination = (query, perPage = 10, currentPage = 1) => {
  const limit = perPage;
  const page = Math.max(currentPage, 1);
  const offset = (page - 1) * perPage;

  return {
    ...query,
    offset,
    limit,
  };
};

export default pagination;
