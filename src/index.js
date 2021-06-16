import Vue from 'vue'
import App from './App'
import router from './router'
import Base from './assets/js/base'
Vue.prototype.Base = Base.Base
Vue.prototype.Curren = Base.Curren
Vue.prototype.OpenLink = function (_url){_url.indexOf('http') ==-1 ? '' : window.open(_url)}

// router.beforeResolve()
// router.afterEach((to, from) => {
 
//     // console.log(window)
//     // console.log(this)
// })
Vue.config.productionTip = false
const app = new Vue({
  render: h => h(App),
  router,
  mounted () {
    document.dispatchEvent(new Event('render-active'))
  }
  // components: VEditor
 }).$mount('#app')