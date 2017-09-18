/**
 * Created by xiajing on 2016/7/6.
 */
import  {onlineGlobal,outLoginType,outlogin} from '../util/config';
import {setCookie,getCookie,clearCookie} from '../util/cookie.js';
export function getErrorMsg(data){
    if(data.retHead == 1){//如果等于1说明是成功
        return data.retHead;
    }else if(data.retHead == '-1001'){//客户未登录
        //router.go({path:'/'})
        //弹出提示信息  账号不能同时登录
        $('#myModal').modal(myModal)
        $("#outLoginInfo").click(function(){
            router.go({path:'/'});
        })
        //clearCookie();
        //outLogin()
    }else if(data.retHead == '-108'){//token错误
        outLogin();
    }
}
//要执行下退出的方法
export function outLogin(){
    let userScape=getCookie("userAccount")
    if(userScape != null){
        let userInfo=JSON.parse(unescape(userScape))
        var account = userInfo.account;
        var token = userInfo.token;
        $.ajax({
            url: onlineGlobal,
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({func:outlogin,type:outLoginType,account:account,token:token,data:[]}),
            success: function (data) {
                if (data.retHead == 1) {
                    //$("#myModalLabel").click(function(){
                    //    router.go({path:'/'});
                    //})
                    router.go({path:'/'});
                } else {
                }
            }, error: function (data) {
            }
        })
    }
}

//根据账户信息来判断  缓存信息是否存在如果不存在就直接跳转到登录
export function flagLogin(){
    //let userScape= getCookie("user");
    //if(userScape == ""){
    //   router.go({path:'/'});
    //}
    //如果缓存不存在就直接到登录页面
    let user = getCookie("user")
    let userAccount=getCookie("userAccount");
    let flagData = getCookie("flagData");
    if(userAccount == '' || flagData == "" || user == ""){
        clearCookie();
        //30分钟后超时的提示信息
        $('#timeOutModal').modal(timeOutModal)
        $("#timeOutClose").click(function(){
            router.go({path:'/'});
        })
        //router.go({path:'/'});
    }

}
