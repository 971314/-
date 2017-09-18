import "../less/style.less";
import Vue from "vue";
import VueRouter from "vue-router";
import user from './utils.js';
import app from "../components/app.vue";

if(utils.cookieDisabled())
    alert("请启用cookie！");

Vue.use(VueRouter);

app.router = new VueRouter({
    routes: [
        {
            path: "/",
            component: require("../components/login.vue")
        },
        {
            path: "/main",
            component: require("../components/main.vue"),
            children: [
                {
                    path: "users",
                    component: require("../components/users/users.vue")
                },
                {
                    path: "user/:id",
                    component: require("../components/users/user.vue")
                },
                {
                    path: "column",
                    component: require("../components/biz/columns.vue")
                },
                {
                    path: "column/:id",
                    component: require("../components/biz/column.vue")
                },
                {
                    path: "column/:id/:pid",
                    component: require("../components/biz/column.vue")
                },
                {
                    path: "info",
                    component: require("../components/biz/columnInfos.vue")
                },
                {
                    path: "gggl",
                    component: require("../components/biz/adTypes.vue")
                },
                {
                    path: "gggl/:id/:name",
                    component: require("../components/biz/ads.vue")
                },
                {
                    path: "func",
                    component: require("../components/biz/appFuns.vue")
                },
                {
                    path: "download",
                    component: require("../components/biz/downloads.vue")
                },
                {
                    path: "pass",
                    component: require("../components/pass.vue")
                }
            ]
        }
    ]
});

app.router.beforeEach((to, from, next) => {
    scrollTo(window.scrollX||$(document).scrollLeft(), 0);
    window.scrollY;
    if(to.path == "/") {
        next();
        return;
    }
    if(to.matched.length == 0 || !user.n){
        next("/");
        return;
    }
    next();
});

Vue.component('CustomInput', require('../components/common/input.vue'));
Vue.component('ColumnTree', require('../components/biz/columnTree.vue'));
Vue.component('Page', require('../components/common/page.vue'));
Vue.component('File', require('../components/common/file.vue'));


new Vue(app);
