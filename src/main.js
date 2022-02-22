import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入element ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入第三方图标
import '@/assets/fonts/iconfont.css'

// 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// axios添加拦截
axios.interceptors.request.use(config=>{
  // console.log(config);
  // 位请求头对象 添加token验证的Authorization字段
  config.headers.Authorization=window.sessionStorage.getItem('token')
  // 在最后必须return config
  return config
})
// Vue.prototype.$http = axios

Vue.use(ElementUI); 

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
