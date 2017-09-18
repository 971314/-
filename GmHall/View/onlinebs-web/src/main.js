/**
 * Created by xiajing on 2016/4/22.
 */
import './css/lib/bootstrap.min.css';
import './css/lib/offcanvas.css';
import './css/main.css';
import './css/keyboard.css';
import './lib/bootstrap.min.js';
import './css/lib/jquery-ui.min.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { configRouter } from './router-config';
//import footerInfo from './components/publicMethod/footer.vue';
import './util/browserInfo.js';
import './lib/virtualkeyboard/jquery.keyboard.js';
import './lib/virtualkeyboard/jquery.mousewheel.js';

import  {onlineGlobal,customerType,
    customerInfo,LoginState,outLoginType} from './util/config'
import navBar from './components/publicMethod/navbar.vue'
import {getCookie} from  './util/cookie.js';


Vue.use(VueRouter);//初始化
Vue.use(VueResource);
// create router
const router = new VueRouter({
    //history: true,
    //saveScrollPosition: true,
})


configRouter(router)

router.beforeEach(transition => {
    // 访问接口获取用户ID
    let userScape= getCookie("user");
    var flag=getCookie("flagData");
    if(transition.to.path=="/")
        transition.next();
    else if(flag == ""){
        transition.redirect('/');
    }
    else
    {
        let userScape = getCookie("userAccount");
        if (userScape != "") {
            let userInfo = JSON.parse(unescape(userScape));
            var account = userInfo.account;
            var token = userInfo.token;
            $.ajax({
                url: onlineGlobal,
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    func: LoginState,
                    type: outLoginType,
                    account:account,
                    token:token,
                    data:[{ }],
                }),
                success: function (data) {
                    if (data.retHead == 1) { //如果等于1说明是成功
                        transition.next();
                    } else {
                        $('#myModal').modal(myModal);
                        $("#outLoginInfo").click(function(){
                            transition.redirect('/');
                        })
                    }
                }, error: function (data) {
                    transition.redirect('/');
                }
            })
            //如果session过期  就直接跳转到登录页面
        } else {
            transition.redirect('/');
        }



    }




})
//router.redirect({
//    '*': '/components/index.html'
//})
  //const App = Vue.extend(require('./components/main.vue'));//根組件 目前有问题
const App = Vue.extend({});//根組件
router.start(App, '#app')
window.router = router;
//根据账户信息来判断  缓存信息是否存在如果不存在就直接跳转到登录
    let userScape= getCookie("user");
    var flag=getCookie("flagData");
    if(userScape == "" || flag == ""){
        router.go({path:'/'});
    }












