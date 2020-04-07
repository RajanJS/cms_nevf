import '@babel/polyfill'
import 'mutationobserver-shim';
import Vue from 'vue'
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import { firebaseAuth } from './firebase/firebase.utils';
import { authService } from '@/_services';

Vue.config.productionTip = false

let app = null;

// wait for firebase auth to init before creating the app
firebaseAuth.onAuthStateChanged((user) => {

  /* update the local storage  */
  authService.updateLocalStorage(user);

  // init app if not already created
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }

})

/*
  Convert vue object
*/
global.getPlainObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};
