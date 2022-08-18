import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// const result = await axios("character", "post", { name: "minsu" });

const defaultAxios = async (url: string, method: string, ...data: any) => {
  const result = await axios({
    url: "http://localhost:3001/" + url,
    method,
    // data,
    cancelToken: source.token,
  }).catch((err) => {
    console.error(err); // Cancel { message: 'Want to cancel' }
    console.info(axios.isCancel(err)); // true
  });
  //   const result = await axios({
  //     url: url,
  //     method,
  //     params,
  //     proxy: {
  //       host: "localhost",
  //       port: 3001,
  //     },
  //     // baseURL: "localhost:3001/",
  //   });
  return result;
};

export default defaultAxios;
