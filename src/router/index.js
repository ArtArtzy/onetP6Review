import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

var firebaseConfig = {
  apiKey: "AIzaSyCfBrMSIExvrqNQarXuyx4nx-eCiad2Kqo",
  authDomain: "onet-p6.firebaseapp.com",
  databaseURL: "https://onet-p6.firebaseio.com",
  projectId: "onet-p6",
  storageBucket: "onet-p6.appspot.com",
  messagingSenderId: "769708058724",
  appId: "1:769708058724:web:2de2dcf7a7053d73e91771"
};

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
const storage = firebase.storage()
export const st = storage.ref()
Vue.use(VueRouter)

Vue.mixin({
  data() {
    return {
      version: "1.0.0",
    };
  },
  methods: {
    notifyRed(text) {
      this.$q.notify({
        message: text,
        color: "negative",
        timeout: 2000,
        icon: "fas fa-exclamation-triangle",
        position: "top"
      });
    },
    notifyGreen(text) {
      this.$q.notify({
        message: text,
        color: "secondary",
        timeout: 2000,
        icon: "fas fa-check-circle",
        position: "top"
      });
    },
    loadingShow() {
      this.$q.loading.show({
        delay: 400 // ms
      });
    },
    loadingHide() {
      this.$q.loading.hide();
    },

    async loadTime() {
      let api = "https://api.winner-english.com/data/api/gettime.php";
      let response = await axios.get(api);
      let microtime = response.data[0].microtime;

      return microtime

    }
  }
});
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ( /* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
