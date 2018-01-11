const getters = {
  route: state => state.route,
  path: state => state.route.path,
  MemberID: state => state.app.MemberID,
  SysAppID: state => state.app.SysAppID,
  OpenID: state => state.app.OpenID,
  UserInfo: state => state.app.UserInfo,
  CityID: state => state.app.CityID,
  cityList: state => state.app.cityList
};
export default getters;
