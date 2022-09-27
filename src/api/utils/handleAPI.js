const handleAPI = async (response) => {
  if (!response.ok) {
    return Promise.reject(response.status);
  }

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');

  const data = isJson ? await response.json() : await response.text();

  return data;
};

export default handleAPI;
