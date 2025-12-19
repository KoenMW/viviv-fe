export const get = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    method: "GET",
  });
  return response.json() as Promise<T>;
};
