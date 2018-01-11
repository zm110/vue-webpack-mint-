import fetch from 'utils/fetch';
import jsonp from 'jsonp';
import Vue from 'vue';
import store from '../../store/index';
/**
 *获取授权用户信息
 */
export function getJsSdkUiPackage (data) {
  return fetch({
    url: '/api/WeiXinApi/GetJsSdkUiPackage',
    method: 'post',
    data
  });
}

/**
 * 根据经纬度获取城市名称
 * @param {string} lat 纬度坐标
 * @param {string} lng 经度坐标
 */
export function getUserCityName (lat, lng) {
  let bdurl =
    'http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=';
  bdurl += lat;
  bdurl += ',';
  bdurl += lng;
  bdurl += '&output=json&pois=1&callback_type=jsonp&callback=test';

  return fetch({
    url: bdurl,
    method: 'get',
    responseType: 'jsonp'
  });
}

export function getUserCity (ReturnUrl, next) {
  getJsSdkUiPackage({ ReturnUrl }).then(response => {
    if (response.data.IsSuccess) {
      const res = response.data.JsSdkUiPackage;
      Vue.wechat.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.AppId, // 必填，公众号的唯一标识
        timestamp: res.Timestamp, // 必填，生成签名的时间戳
        nonceStr: res.NonceStr, // 必填，生成签名的随机串
        signature: res.Signature, // 必填，签名，见附录1
        jsApiList: ['getLocation', 'chooseWXPay', 'showMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      Vue.wechat.ready(() => {
        Vue.wechat.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: res => {
            // const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            // const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            // const speed = res.speed; // 速度，以米/每秒计
            // const accuracy = res.accuracy; // 位置精度
            // _this.getcityName(res.latitude, res.longitude);
            console.log(res);
            jsonp('http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=' + res.latitude + ',' + res.longitude + '&output=json&pois=1', null, (err, data) => {
              if (err) {
                console.error(err.message);
              } else {
                console.log(data);
                // store.commit('UPDATE_USER_CITY', response.data.TicketUserData.DefaultCityID);
                console.log(store.getters.cityList, 'citylist');
                for (const item of store.getters.cityList) {
                  if (item.CityName === data.result.addressComponent.city) {
                    store.commit('UPDATE_USER_CITY', item.CityID);
                  }
                }
              }
              next();
            });
          },
          fail: () => {
            // _this.setCity(null);
            next();
          },
          error: res => {
            Vue.$vux.alert.show({
              title: '系统',
              content: JSON.stringify(res)
            });
          },
          cancel: () => {
            // 获取微信用户资料默认城市
            Vue.$vux.alert.show({
              title: '系统',
              content: '您拒绝授权获取地理位置'
            });
            // _this.setCity(null);
            next();
          }
        });
      });
    } else {
      next();
    }
  });
}

/**
 *微信支付 获取支付参数
 *OrderID:订单标识string
 *OrderNo:订单编号string
 *ActualPrice:支付金额string
 *PaymentTypeKey:支付类型(微信支付 ，余额支付，下线支付。  具体guid参考配置表)string
 *IsRecharge:充值标记 是：true  否：false  string
 */
export function getWXPayParams (data) {
  return fetch({
    url: '/api/WeiXinApi/GetWXPayParamsByJsApi',
    method: 'post',
    data
  });
};
