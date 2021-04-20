import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App.vue';
import './components';
import router from './router';
import store from './store';

Vue.use(ElementUI, {
    size: 'small',
    zIndex: 3000
});
Vue.prototype.$store = store;
new Vue({
    store,
    router,
    render: (h) => h(App)
}).$mount('#app')