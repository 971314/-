var Vue = require('vue');
var VueRouter = require('vue-router');
window.utils = require('./utils.js');

if(utils.cookieDisabled()){
    alert("请启用cookie！");
}

Vue.use(VueRouter);
//var App = Vue.extend({});
var router = new VueRouter();
router.map({
    '/': {component: require("../components/login.vue")},
    '/appoints': {component: require("../components/appoints.vue")},
    '/products': {component: require("../components/products.vue")},
    '/product/appoints/:id/:name': {component: require("../components/productAppoints.vue")},
    '/product/:id': {component: require("../components/product.vue")},
    '/customers': {component: require("../components/customers.vue")},
    '/customer/:id': {component: require("../components/customer.vue")},
    '/intrests': {component: require("../components/intrests.vue")},
    '/pass': {component: require("../components/pass.vue")}
            });
router.beforeEach(o => {
    if(!o.to.matched || (o.to.path != "/" && !app.currentUser)) {
        o.redirect({path:"/", query:{}});
        return;
    }
    if((o.to.path.indexOf("/appoints")==0 || o.to.path.indexOf("/customer")==0) && app.currentUser.group > 2){
        o.redirect({path:"/", query:{}});
        return;
    }
    if(o.to.path.indexOf("/product")==0 && app.currentUser.group != 1 && app.currentUser.group != 3){
        o.redirect({path:"/", query:{}});
        return;
    }
    if(o.to.path.indexOf("/intrests")==0 && app.currentUser.group != 1 && app.currentUser.group != 4){
        o.redirect({path:"/", query:{}});
        return;
    }
    o.next();
});

Vue.component('filter', require('../components/filter.vue'));
Vue.component('logs', require('../components/logs.vue'));
Vue.component('page', require('../components/page.vue'));
Vue.component('sort', require('../components/sort.vue'));
Vue.component('search', require('../components/search.vue'));
Vue.component('chk', require('../components/validate.vue'));
Vue.filter('time', function (value) {
        return utils.time(value);
    })

router.start(require('../components/app.vue'), '#app');


