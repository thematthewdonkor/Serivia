export const buildQuery = (
  params: Record<string, string | number | boolean | undefined>
) => {
  const query = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: false,
  });

  return query;
};
