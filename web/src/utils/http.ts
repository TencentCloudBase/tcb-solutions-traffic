import axios from "axios";
import { baseApiUrl, storageKey } from "../config/config";
import { Message } from "element-ui";

const instance = axios.create({
  baseURL: baseApiUrl,
  timeout: 5000,
});

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 添加请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    // 将 token 添加到请求头
    const token = localStorage.getItem(storageKey);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error: any) => {
    // 相应错误处理
    // 比如： token 过期， 无权限访问， 路径不存在， 服务器问题等
    switch (error.response && error.response.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        break;
      case 421:
        Message.error({
          message: error.response.data.message,
          onClose: () => {
            location.href = `/login?return=`;
          },
        });
        break;
      case 500:
        break;
      default:
        Message.error({
          message: error.response.data.message,
          onClose: () => {
            location.href = `/login?return=${location.href}`;
          },
        });
        localStorage.removeItem(storageKey);
        break;
    }
    return Promise.reject(error);
  },
);

const get = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const post = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    // qs.stringify(data)
    instance
      .post(url, params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const put = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    // qs.stringify(data)
    instance
      .put(url, params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const deleterReq = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    // qs.stringify(data)
    instance
      .delete(url, params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export { get, post, put, deleterReq };
