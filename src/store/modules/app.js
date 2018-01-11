const state = {
  MemberID: '',
  SysAppID: '',
  OpenID: '',
  UserInfo: null,
  CityID: '',
  memberCityID: '',
  memberCityName: '',
  cityList: []
};

const app = {
  state,
  mutations: {
    UPDATE_APP_ID (state, SysAppID) {
      state.SysAppID = SysAppID;
    },
    UPDATE_LOADING (state, status) {
      state.isLoading = status;
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction;
    },
    UPDATE_USER_INFO (state, UserInfo) {
      state.UserInfo = UserInfo;
      state.MemberID = UserInfo.MemberID;
      state.OpenID = UserInfo.OpenID;
    },
    UPDATE_USER_CITY (state, cityID) {
      state.CityID = cityID;
    },
    UPDATE_CITY_LIST (state, cityList) {
      state.cityList = cityList;
    }
  }
};

export default app;
