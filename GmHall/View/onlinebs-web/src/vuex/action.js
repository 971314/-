/**
 * Created by xiajing on 2016/4/29.
 */
import Vue from 'vue'
import  {onlineGlobal,loginType,currentMoneyInfo,
    currentBill,
    fiveDayBill,
    customerType,
    customerInfo,
    detailBill,
    currentPosit,
    currentTrust,
    curretnTrans,
    searchCardNo,bankTransSeq,tranSeq} from '../util/config'
import {getErrorMsg} from '../util/errorMsg.js'
import {getCookie,setCookie}from '../util/cookie.js';
export const requestMyInfo = function ({dispatch}) {
    myInfo();
    function myInfo(){
        var userScape=getCookie("userAccount");
        if(userScape != ""){
            let userInfo=JSON.parse(unescape(userScape));
            var account = userInfo.account;
            var token = userInfo.token;
            $.ajax({
                url:onlineGlobal,
                method: 'post',
                contentType:'application/json',
                data:JSON.stringify({func:customerInfo,type:customerType,account:account,token:token,data:[{}]}),
                success:function(data){
                    if(getErrorMsg(data) == 1){
                        setCookie("user",escape(JSON.stringify(data)));
                        //将账户信息存放到本地session里面
                        //console.log(data.data[0])
                        dispatch('MY_INFO_LIST', data);
                    }
                },error:function(data){

                }
            })
        }
        //Vue.http({
        //    url:  onlineGlobal+'/i/user/info.json?acc='+unescape(userScape),
        //    method: 'post',
        //    //data:{ acc:unescape(userScape)}
        //}).then(function(response){
        //       setCookie("user",escape(JSON.stringify(response.data) ) );
        //       //将账户信息存放到本地session里面
        //       dispatch('MY_INFO_LIST', response.data);
        //})
        //业务流水查询
        //Vue.http({
        //    url: onlineGlobal +'/i/wf/query.json?acc=88005770&from=20160101&to=20160517&type=0',
        //    method: 'post',
        //
        //}).then(function(response){
        //    console.log(response.data)
        //    dispatch('TRANS_SEQ_INFO',response.data);
        //})
     }
}
export const fetchCode = function({dispatch}){
    dispatch('FETCH_CODE')
}
export const detailInfo = function({dispatch}){
    var userScape=getCookie("userAccount");
    if(userScape != ""){
        let userInfo=JSON.parse(unescape(userScape));
        var  account =  userInfo.account;
        var token =userInfo.token;
        $.ajax({
            url:onlineGlobal,
            type:'post',
            contentType:'application/json',
            data:JSON.stringify({func:bankTransSeq,type:tranSeq,account:account,token:token,data:[{49:currentBill}]}),
            success:function(data){
                if(getErrorMsg(data) == 1){
                    //console.log(data);
                    dispatch('DETAIL_INFO',data)
                }
            },error:function(data){

            }
        })
    }

}
export const fiveBillInfo = function({dispatch}){
    var userScape=getCookie("userAccount");
    if(userScape != ""){
        let userInfo=JSON.parse(unescape(userScape));
        var  account =  userInfo.account;
        var token =userInfo.token;
        $.ajax({
            url:onlineGlobal,
            type:'post',
            contentType:'application/json',
            data:JSON.stringify({func:detailBill,type:customerType,account:account,token:token,data:[{49:fiveDayBill}]}),
            success:function(data){
                if(getErrorMsg(data) == 1){
                    //console.log(data);
                    dispatch('FIVE_DAY_INFO',data)
                }
            },error:function(data){

            }
        })
    }
}
//存储重置密码的步骤信息
export const saveInfo = function({dispatch},saveInfo){
         dispatch('SVAE_INFO',saveInfo)
}
//获取首页中业务流水的列表信息
export const  transSeq =  function({dispatch},transSeq){
                $.ajax({
                url:onlineGlobal,
                type:'post',
                data:transSeq,
                contentType:'application/json',
                success:function(data){
                    if(getErrorMsg(data) == 1){
                         //alert("总记录数"+data.data.length)
                        // console.log(data.data)
                        //取出所有数据
                         dispatch('TRANS_SEQ',data);
                        //过滤前5条
                         dispatch('FIVE_TRANS_SEQ',data);
                        //取出总记录数
                         dispatch('NUM_SIZE_TRANS_SEQ',data);
                    }
                },error:function(data){
                }
            })
}
//正在办理业务
export const  loadTransSeq =  function({dispatch},loadTrans){

    $.ajax({
        url:onlineGlobal,
        type:'post',
        data:loadTrans,
        contentType:'application/json',
        success:function(data){
            if(getErrorMsg(data) == 1){
                //console.log(data)
                dispatch('LOAD_TRANS',data);
                //过滤前5条
                dispatch('FIVE_LOAD_TRANS',data);
                //取出总记录数
                dispatch('NUM_SIZE_LOAD_TRANS',data);
            }else{
            }
        },error:function(data){
        }
    })
}
//查询当日资金列表信息
export const  currentBillInfo =  function({dispatch}){
    var userScape=getCookie("userAccount");
    if(userScape != ""){
        let userInfo=JSON.parse(unescape(userScape));
        var  account =  userInfo.account;
        var token = userInfo.token;
        $.ajax({
            url:onlineGlobal,
            type:'post',
            data:JSON.stringify({func:currentMoneyInfo,account:account,token:token,type:loginType,data:[{ }]}),
            contentType:'application/json',
            success:function(data){
                if(getErrorMsg(data) == 1){
                    dispatch('CURRENT_BILL',data);
                }
            }
        })
    }
}
//查询当日持仓列表信息
export const currentPositInfo = function({dispatch}){
    var userScape=getCookie("userAccount");
    if(userScape != ""){
        let userInfo=JSON.parse(unescape(userScape));
        var  account =  userInfo.account;
        var token =userInfo.token;
        $.ajax({
            url:onlineGlobal,
            type:'post',
            data:JSON.stringify({func:currentPosit,type:loginType,account:account,token:token,data:[{ }]}),
            contentType:'application/json',
            success:function(data){
                if(getErrorMsg(data) == 1){
                    //取出所有数据的状态
                    dispatch('CURRENT_POSIT',data);
                    //取出前5条数据的状态
                    dispatch('FIVE_CURRENT_POSIT',data);
                }
            }
        })
    }
}
//查询当日委托的列表信息
export const currentTrustInfo = function({dispatch}){
    var userScape=getCookie("userAccount");
    if(userScape != ""){
        let userInfo=JSON.parse(unescape(userScape));
        var  account =  userInfo.account;
        var token =userInfo.token;
        $.ajax({
            url:onlineGlobal,
            type:'post',
            data:JSON.stringify({func:currentTrust,type:loginType,token:token,account:account,data:[{ }]}),
            contentType:'application/json',
            success:function(data){
                if(getErrorMsg(data) == 1){
                    //console.log(data.data)
                    dispatch('CURRENT_TRUST',data);
                    //取出前5条数据的状态
                    dispatch('FIVE_CURRENT_TRUST',data);
                }
            }
        })
    }
}
//查询当日成交的列表信息
export const currentTransInfo = function({dispatch}){
    var userScape=getCookie("userAccount");
    if(userScape != ""){
        let userInfo=JSON.parse(unescape(userScape));
        var  account =  userInfo.account;
        var token =userInfo.token;
        $.ajax({
            url:onlineGlobal,
            type:'post',
            data:JSON.stringify({func:curretnTrans,type:loginType,account:account,token:token,data:[{}]}),
            contentType:'application/json',
            success:function(data){
                if(getErrorMsg(data) == 1){
                    //console.log(data.data)
                    dispatch('CURRENT_TRANS',data);
                    //取出前5条数据的状态
                    dispatch('FIVE_CURRENT_TRANS',data);
                }
            }
        })
    }
}
//结算账户变更查询的列表信息
export const billAccountChange =function({dispatch}){

}
//查询银行账号信息
export const searchCardNoInfo = function({dispatch}){
    var userScape=getCookie("userAccount");
    if(userScape != ""){
        let userInfo=JSON.parse(unescape(userScape));
        var  account =  userInfo.account;
        var token = userInfo.token;
        $.ajax({
            url:onlineGlobal,
            type:'post',
            data:JSON.stringify({func:searchCardNo,type:loginType,account:account,token:token,data:[{ }]}),
            contentType:'application/json',
            success:function(data){
                if(getErrorMsg(data) == 1){
                    //console.log(data)
                    dispatch('SEARCH_CARD_NO',data);
                }
                //if(data.retHead == 1){
                //    console.log(data)
                //    dispatch('SEARCH_CARD_NO',data);
                //    //将数据缓存起来
                //   // setCookie("bankInfo",escape(JSON.stringify(data)));
                //}else if(data.retHead == '-1001'){
                //    router.go("/")
                //}else if(data.retHead == '-3002'){
                //    router.go("/")
                //}
            }
        })
    }
}



