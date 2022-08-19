import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const defaultAxios = async (
  url: string,
  method: string,
  data?: any,
  params?: any
) => {
  const result = await axios({
    url: "http://localhost:3001/" + url,
    method,
    data,
    params,
    cancelToken: source.token,
  }).catch((err) => {});
  return result;
};

export default defaultAxios;
