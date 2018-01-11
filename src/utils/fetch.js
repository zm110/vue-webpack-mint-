/**
 * api接口调用
 */

import axios from 'axios';
import store from '../store/index';

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: '/BricomMobileApi', // api的base_url
  timeout: 0                  // 请求超时时间,指定请求超时的毫秒数(0 表示无超时时间)
});

// request拦截器
service.interceptors.request.use(
  config => { // 请求的时候可以做一些拦截操作
    if (config.data === undefined) config.data = {};
    config.data.Sys_AppID = store.getters.SysAppID;
    console.log(store.getters.SysAppID);
    return config;
  },
  error => {
    // 请求错误的时候
    console.log(error); // for debug
    Promise.reject(error);
  });

// respone拦截器
service.interceptors.response.use(
  response => response, // 在这里可以做一些拦截操作，比如说登陆过期/在别的地方登陆等等
  error => {
    console.log('err' + error);// for debug

    return Promise.reject(error);
  }
);

export default service;
