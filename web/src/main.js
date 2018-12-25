import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'
import  './assets/font_894531_aqxmxgy5k9h/iconfont.css'
import moment from 'moment' //日期转换
import md5 from 'js-md5';  //MD5密码加密
import OSS from 'ali-oss'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$md5 = md5;//将MD5转换为vue原型

//路由前验证


new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
