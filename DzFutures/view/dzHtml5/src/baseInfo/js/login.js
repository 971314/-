/**
 * Created by xiajing on 2016/9/14.
 */
import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'
import ReactDOM from 'react-dom';
import routes from '../../baseInfo/util/router/loginRouterConfig.js';
import {getStorageInfo,getSendMessageToNative}  from '../util/native.js'
//回调方法
window.callback = function (message) {
    var getInfo = getStorageInfo('gesturePassInfo');
    if(message){
        if(getInfo){
            var getInfoData = JSON.parse(getInfo);
            var msg = JSON.parse(message);
            if(msg.functionNO == 101001  && getInfoData.gestureFlag == '0'){//getInfoData == 0说明是注册的时候设置手势密码的标志设置成功后则要跳转到成功的提示页面
                window.location.href='../user/nav.html#/registerStepFour'
            }else if(msg.functionNO == 101001  && getInfoData.gestureFlag == '1'){
                //调取登录后原生的接口
                var suc = getStorageInfo("nativeRegisterSuc");
                if(suc){
                    var sucData = JSON.parse(suc)
                    var obj={loginName:sucData.loginName,
                        userId :sucData.userId, token :sucData.token,
                        tokenBeginTime: sucData.tokenBeginTime, tokenActiveTime :sucData.tokenActiveTime,
                        pwd :sucData.pwd, loginType : sucData.loginType }
                    console.log(obj)
                    getSendMessageToNative(obj);
                }
            }
        }
    }
}
ReactDOM.render(<Router routes={routes} history={hashHistory} />, document.getElementById('loginDiv'))