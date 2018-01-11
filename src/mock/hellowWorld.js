import Mock from 'mockjs';

let userInfo = {};

userInfo = Mock.mock({
  NickName: 'Miss'
});

export default {
  getUserInfo: config => {
    console.log(config);
    return {
      userInfo,
      IsSuccess: true,
      ErrorCode: null,
      Description: null
    };
  }
};
