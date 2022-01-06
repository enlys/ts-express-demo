import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Toast } from 'vant';

const csrfToken = document!.querySelector('meta[name="csrf-token"]')!.getAttribute('content');

class Request {
  public axiosInstance: AxiosInstance;

  constructor() {
    // 创建axios实例
    this.axiosInstance = axios.create({
      baseURL: `${document.baseURI}api/`, // api的base_url
      timeout: 3000
    });
    // 初始化拦截器
    this.initInterceptors();
  }

  // 初始化拦截器
  public initInterceptors() {
    // 设置post请求头
    // this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        config!.headers!['Content-Type'] = 'application/json';
        config!.headers!['CSRF-Token'] = csrfToken!;
        return config;
      },
      (error: any) => {
        console.log(error);
      },
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      // 请求成功
      (response: AxiosResponse) => {
        if (response.status === 200) {
          // return Promise.resolve(response.data);
          return response.data;
        } else {
          Request.errorHandle(response);
          // return Promise.reject(response.data);
          return response.data;
        }
      },
      // 请求失败
      (error: any) => {
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          Request.errorHandle(response);
          return Promise.reject(response.data);
        } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
          Toast({
            message: '网络连接异常,请稍后再试!',
            duration: 3000,
          });
          return Promise.reject(response.data);
        }
      });
  }


  /**
   * http握手错误
   * @param res 响应回调,根据不同响应进行不同操作
   */
  private static errorHandle(res: any) {
    // 状态码判断
    switch (res.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        Toast({
          message: '请求的资源不存在',
          duration: 3000,
        });
        break;
      default:
        Toast({
          message: '连接错误',
          duration: 3000,
        });
    }
  }

}

export default new Request();