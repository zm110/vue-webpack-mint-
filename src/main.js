// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';
import Mint from 'mint-ui';
import './mock/index.js'; // 该项目所有请求使用mockjs模拟
import './style/style.css';
Vue.use(Mint);

Vue.config.productionTip = false;

// 关联路由和store
sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
