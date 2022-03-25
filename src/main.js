import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import config from './config';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Service from './service';
import VueSweetalert2 from 'vue-sweetalert2';
import {FulfillingBouncingCircleSpinner} from 'epic-spinners';
import Paginate from 'vuejs-paginate';
import vmodal from 'vue-js-modal';
import vSelect from 'vue-select';
import moment from 'moment';
import VueCarousel from 'vue-carousel';

import { BCarousel } from 'bootstrap-vue';
Vue.component('b-carousel', BCarousel);
// Vue.use(BCarousel);

// If you don't need the styles, do not connect
Vue.use(VueAxios, axios);
Vue.use(vmodal);
Vue.use(VueCarousel);

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import "vue-select/src/scss/vue-select.scss";
import './main.scss';

import Dashboard from './components/Dashboard.vue';
import StatCard from './components/StatCard.vue';
import ProduitCard from './components/ProduitCard.vue';
import CommandeCard from './components/CommandeCard.vue';
import BtnDropDown from './components/BtnDropDown.vue';
import Rating from './components/Rating.vue';

Vue.use(VueSweetalert2);
Vue.component('v-select', vSelect)
Vue.component('dashboard-layout', Dashboard);
Vue.component('stat-card', StatCard);
Vue.component('fulfilling-bouncing-circle-spinner', FulfillingBouncingCircleSpinner);
Vue.component('paginate', Paginate);
Vue.component('btn-dropdown', BtnDropDown);
Vue.component('produit-card', ProduitCard);
Vue.component('commande-card', CommandeCard);
Vue.component('rating', Rating );

Vue.filter('prettyNumber', function (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});

Vue.filter('prettyDate', function (value) {
  moment.locale('fr');
  return moment(value).utcOffset(1).format('DD MMMM YYYY');
});

Vue.filter('prettyDateHour', function (value) {
  return moment(value).utcOffset(1).format('DD MMM YYYY à HH:mm');
});

Vue.config.productionTip = false

Vue.prototype.$config = config;
Vue.prototype.$service = Service(config, axios);

Vue.prototype.$win = function () {
  return this.$swal.fire(
    'Opération réussie',
    'success'
  );
}

store.commit('getAdminInfo');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
