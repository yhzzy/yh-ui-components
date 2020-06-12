import Vue from 'vue';
import ElementUI from 'element-ui';
import moment from 'moment';
import App from './App.vue';
import YhUI from './index';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(YhUI);

Vue.prototype.$moment = moment;

new Vue({
  render: h => h(App),
}).$mount('#app');
