/**
 * Created by xiajing on 2016/9/21.
 */
import  './css/lib/bootstrap.min.css';
import  './css/lib/jquery-ui.min.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { configRouter } from './router-config';
import './css/main.css';
//import './css/pagination.css';
//初始化
Vue.use(VueRouter);
const router = new VueRouter({});
configRouter(router);
//router.beforeEach(function(transition) {
//    if (transition.to.path === '/orgManageList') {
//        transition.redirect('/orgManageList');
//    } else {
//        transition.next()
//    }
//})
const App = Vue.extend({});//根組件
router.start(App, '#app');
window.router = router;
