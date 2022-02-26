import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入element ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入第三方图标
import '@/assets/fonts/iconfont.css'
// 导入全局样式表
import '@/assets/css/global.css'

import TreeTable from 'vue-table-with-tree-grid'

// 导入副文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// require styles   导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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

// 将富文本编辑器 注册为全局可用
Vue.use(VueQuillEditor)

Vue.use(ElementUI); 

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)

// 时间过滤器 
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 +'').padStart(2,'0')  //.padStart(2,'0') 不足两位 用零填充
  const d = (dt.getDate() +'').padStart(2,'0')
  
  const hh = (dt.getHours() +'').padStart(2,'0')
  const mm = (dt.getMinutes() +'').padStart(2,'0')
  const ss = (dt.getSeconds() +'').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
