import fetch from '../utils/fetch';

/**
 *获取授权用户信息
 */
export function getJsSdkUiPackage (data) {
  return fetch({
    url: '/api/WeiXinApi/GetJsSdkUiPackage',
    method: 'post',
    data
  });
};
