// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './theme/element/index.css'
// import 'assets/sass/style.scss'
// import './assets/css/animate.css'
// import '../src/assets/css/icomoon.css'
// import '../src/assets/css/bootstrap.css'
// import '../src/assets/css/superfish.css'
// import '../src/assets/css/magnific-popup.css'
// import '../src/assets/css/bootstrap-datepicker.min.css'
// import '../src/assets/css/cs-select.css'
// import '../src/assets/css/cs-skin-border.css'
// import '../src/assets/css/style.css'
// import '../src/assets/js/modernizr-2.6.2.min.js'



Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
