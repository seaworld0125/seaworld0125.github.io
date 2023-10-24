import axios from 'axios';

const instance = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
})
instance.interceptors.request.use(
    (config) => {
      console.log('Axios 요청\n', config);
      return config
    },
    (error) => {
      return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
      console.log('Axios 요청 응답\n', res);
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
)
export default instance;