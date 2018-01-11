<template>
  <div class="hello">
    <mt-button type="default" @click="showIndicator">{{userInfo.NickName}}</mt-button>
  </div>
</template>

<script>
import { Button, Indicator } from 'mint-ui';
import { getJsSdkUiPackage } from '../api/index';
export default {
  name: 'HelloWorld',
  components: {
    Button,
    Indicator
  },
  data () {
    return {
      userInfo: {
        NickName: null
      }
    };
  },
  mounted () {
    this.getUserInfo();
  },
  methods: {
    showIndicator () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    },
    getUserInfo () {
      const request = {
        requestID: 'zm10203456'
      };
      getJsSdkUiPackage(request).then(response => {
        this.userInfo = response.data.userInfo;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
