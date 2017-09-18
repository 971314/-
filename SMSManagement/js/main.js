import Vue from "vue";
import VueRouter from "vue-router";
import app from "../components/app.vue";
import "../css/style.less";
window.utils = require('./utils.js');
window.user = {
                 username: utils.cookie("username"),
                 type: utils.cookie("type")
             };

if(utils.cookieDisabled()){
    alert("请启用cookie！");
}

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
                    path: "user",
                    component: require("../components/users/user.vue")
                },
                {
                    path: "user/:id",
                    component: require("../components/users/resetPass.vue")
                },
                {
                    path: "orgs",
                    component: require("../components/orgs/orgs.vue")
                },
                {
                    path: "org/:id",
                    component: require("../components/orgs/org.vue")
                },
                {
                    path: "types",
                    component: require("../components/types/types.vue")
                },
                {
                    path: "type/:id",
                    component: require("../components/types/type.vue")
                },
                {
                    path: "channels",
                    component: require("../components/channels/channels.vue")
                },
                {
                    path: "channel/upload",
                    component: require("../components/channels/upload.vue")
                },
                {
                    path: "channel/:id",
                    component: require("../components/channels/channel.vue")
                },
                {
                    path: "templates",
                    component: require("../components/templates/templates.vue")
                },
                {
                    path: "template/:id",
                    component: require("../components/templates/template.vue")
                },
                {
                    path: "sms",
                    component: require("../components/sms.vue")
                },
                {
                    path: "statistic",
                    component: require("../components/statistic.vue")
                },
                {
                    path: "pass",
                    component: require("../components/pass.vue")
                },
            ]
        }
    ]
});

app.router.beforeEach((to, from, next) => {
    scrollTo(window.scrollX||$(document).scrollLeft(), 0);
    window.scrollY;
    var tit = "博易短信后台管理系统";
    if(to.path == "/") {
        next();
        document.title = tit;
        return;
    }
    if(to.matched.length == 0 || !user.username){
        next("/");
        document.title = tit;
        return;
    }
    if(user.type==1 && to.path != "/main/sms" && to.path != "/main/statistic" && to.path != "/main/pass"){
        next("/");
        document.title = tit;
        return;
    }
    
    tit += "-";
    if(to.path.indexOf("/main/user") == 0)
        tit += "用户管理";
    else if(to.path.indexOf("/main/org") == 0)
        tit += "机构管理";
    else if(to.path.indexOf("/main/type") == 0)
        tit += "短信类型管理";
    else if(to.path.indexOf("/main/channel") == 0)
        tit += "短信渠道管理";
    else if(to.path.indexOf("/main/template") == 0)
        tit += "短信模板管理";
    else if(to.path.indexOf("/main/sms") == 0)
        tit += "短信查询";
    else if(to.path.indexOf("/main/statistic") == 0)
        tit += "短信统计";
    else
        tit += "修改密码";
    document.title = tit;
    next();
});

Vue.component('CustomInput', require('../components/common/input.vue'));
Vue.component('CustomSelect', require('../components/common/select.vue'));
Vue.component('Page', require('../components/common/page.vue'));

Vue.filter('time', function (value) {
        return utils.time(value);
    })

new Vue(app);
