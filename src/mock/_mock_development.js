import Mock from 'mockjs';
import homeAPI from './hellowWorld';
const baseURL = '/BricomMobileApi'; // 根据../utils/fetch.js的接口地址baseURL配置

Mock.setup({
  // timeout: '1000-2000' // 表示响应时间介于 1000 和 2000 毫秒之间，默认值是'10-100'。
  timout: '10-100'
});

// ********  首页相关接口 start ************/
// 根据所在城市，获取广告轮询图片
Mock.mock(baseURL + '/api/WeiXinApi/GetJsSdkUiPackage', 'post', homeAPI.getUserInfo);
// ********  首页相关接口 end ************/

export default Mock;
