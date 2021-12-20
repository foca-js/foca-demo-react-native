import axios, { AxiosError } from 'axios';
import { enhance } from 'foca-axios';
import { Alert } from 'react-native';

const instance = axios.create({
  baseURL: 'https://registry.npmmirror.com',
});

instance.interceptors.response.use(undefined, (err: AxiosError) => {
  Alert.alert(err.message);
  return Promise.reject(err);
});

export const http = enhance(instance, {
  cache: {
    // 缓存不推荐全局开启，可以在单个请求中手动开启
    enable: false,
  },
  throttle: {
    enable: true,
  },
  retry: {
    enable: true,
  },
});
