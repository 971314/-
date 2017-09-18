<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">资金转账</span>
        </div>
    </div>
    <div v-if="submitInfo" >
        <div class="panel panel-default linkmanInfo allDivWidth">
            <div class="panel-body">
                <form class=" top17 formTop" role="form" data-validate="parsley">
                    <div class="form-group">
                        <label    class="labelAll">转账类型：</label>

                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle selectBtn"
                                    data-toggle="dropdown">
                                银行转期货 <span class="caret" style="margin-left: 151px;"></span>
                            </button>
                            <ul class="dropdown-menu selectBtn" role="menu">
                                <li><a v-link="{path: '/main/bankFuture'}">银行转期货</a></li>
                                <li><a v-link="{path: '/main/futureBank'}">期货转银行</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label    class="labelAll">银行名称：</label>
                        <div class="spanCardNo">
                            <select type="text" style="display: inline;" v-model="cardName"     class="form-control form-text" id="firstname"
                                    v-if="cardInfo.data"
                                    @change="selectChange" >
                                <option   selected="true" disabled="true">请选择银行名称</option>
                                <option v-for="name in cardInfo.data"    value="{{name['217']}},{{name['219']}},{{name['214']}},{{name['215']}},{{name['51']}},{{name['56']}},{{name['353']}}">{{name['216']}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group" v-show="billPassFlag">
                        <label for="billPass" class="labelAll">资金密码：</label>
                        <div class="inputPosition">
                            <input type="password" class="form-control form-text" id="billPass" name="billPass"
                                   v-model="billPass" autocomplete="off"
                                   data-required="true"
                                   @focus="focusInfo"
                                   data-error-message="亲，请正确填写资金密码"
                                   data-error-container="#billPassResult"
                                   placeholder="请输入资金密码">
                        </div>
                    </div>
                    <span  id="billPassResult"  class="error-msg text-align"></span>
                    <div class="form-group" v-show="bankPassFlag">
                        <label for="bankPass" class="labelAll">银行密码：</label>
                        <div class="inputPosition">
                            <input type="password" class="form-control form-text" id="bankPass" name="bankPass"
                                   data-required="true" autocomplete="off"
                                   v-model="bankPass"
                                   @focus="focusInfo"
                                   data-error-message="亲，请正确填写银行密码"
                                   data-error-container="#bankPassResult"
                                   placeholder="请输入银行密码">
                        </div>
                    </div>
                    <span  id="bankPassResult"  class="error-msg text-align"></span>
                    <div class="form-group">
                        <label  class="labelAll">银行余额：</label>
                        <div class="inputPosition">
                            <input type="text" class="form-control form-text"
                                   id="bankMoney"
                                   value= '{{vavibleMoney}}'
                                   v-model="bankMoney" autocomplete="off"
                                   data-required="true" readonly
                                   style="width: 140px;"
                                   data-regexp="^[0-9\.]+$"
                                   data-error-message="亲，请正确填写银行余额"
                                   data-error-container="#bankMoneyResult">
                        </div>
                        <div class="msgCode"  v-if="bankBalance">
                            <button type="button" @click="searchMoney"  class="btn-style  btn-submit" data-toggle="button">查询余额
                            </button>
                        </div>
                        <div class="msgCode"  v-if="blockBtn">
                            <button type="button" class="blockBtn" data-toggle="button">查询余额
                            </button>
                        </div>
                    </div>
                    <span  id="bankMoneyResult"  class="error-msg text-align"></span>
                    <div class="form-group">
                        <label for="transMoney" class="labelAll">转账金额：</label>
                        <div class="inputPosition">
                            <input type="text" class="form-control form-text"   name="transMoney"
                                   data-required="true"
                                   @focus="billFocus" autocomplete="off"
                                   id="transMoney"
                                   onkeyup="this.value=this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3').replace(/[^\d.]/g,'')"
                                   v-model="transMoney"
                                   data-regexp="^[0-9\.]+$"
                                   data-error-container="#transMoneyResult"
                                   data-error-message="亲，请正确填写转账金额"
                                   placeholder="请输入转账金额">
                        </div>
                    </div>
                    <span  id="transMoneyResult"  class="error-msg text-align"></span>
                    <div class="form-group">
                        <label  class="labelAll">手机验证码：</label>
                        <div class="inputPosition">
                            <input type="text" class="form-control form-text"
                                   id="codeMsg" autocomplete="off"
                                   v-model="codeMsg"
                                   data-required="true"
                                   maxlength="6"  @focus="focusInfo"
                                   data-regexp="^[0-9]*$"
                                   data-error-message="亲，请输入纯数字的验证码"
                                   data-error-container="#codeResult"
                                   placeholder="请输入验证码" style="width: 140px;">
                        </div>
                        <div class="msgCode">
                            <button  v-if="fetchCodeMsg"  type="button" @click="fetchCodeClick" class="btn-style  btn-submit" data-toggle="button">获取验证码
                            </button>
                        <span  class="sendMsg"  v-else> {{timerCodeMsg}}
                        <!--<span  class="oneMsg">{{errorMessage}}</span>-->
                        </span>
                        </div>
                    </div>
                    <span id="codeResult" class="error-msg text-align"></span>
                    <span class="bankMsg">{{errorMessage}}</span>
                    <div class="form-group">
                        <div class="subLinkMan" v-if="initBtn"  style="margin-top:10px">
                            <button type="button" class=" btn-style  btn-submit" data-toggle="button" @click="submit">提交</button>
                        </div>
                        <div class="subLinkMan" v-if="blockSubmit">
                            <button type="button" class="submitLoadCCC" style="padding-left: 10px;">提交</button>
                        </div>
                        <div  v-if="loadingBtn" style="margin-top:10px">
                            <load-btn></load-btn>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--提交成功显示的提示页面-->
    <div v-else>
        <suc-info></suc-info>
    </div>
    <detail-bill></detail-bill>

    <div class="modal fade modal-top" id="monenyDetail" tabindex="-1" role="dialog" style="top:217px"
         aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" style="width: 400px">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close"
                            data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title text-center" id="myModalLabel">
                        提示
                    </h4>
                </div>
                <div class="modal-body modal-font" style="text-indent: 2em;">
                    余额请到资金明细里面查看
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" id="outLoginInfo"
                            data-dismiss="modal">确定
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../vuex/store';
    import sendCodes from '../../components/publicMethod/sendCodes.vue';
    import  {onlineGlobal,onlineGlobalOne,bankBlance,bankTurnSecurity,loginType,initMsgCode,outLoginType,checkSendMsgCode} from '../../util/config';
    import {searchCardNoInfo} from '../../vuex/action';
    import {getFundCardIno} from '../../vuex/getters';
    import sucInfo from '../../components/backResult/bankSuc.vue';
    import {getErrorMsg,flagLogin} from '../../util/errorMsg.js';
    import loadBtn from '../publicMethod/submitLoadBtn.vue';
    import {Base64} from '../../util/base64.js';
    import {getCookie}from '../../util/cookie.js';
    import detailBill from '../../components/publicMethod/detailBill.vue'
    export default{
        store:store,
        vuex:{
            getters:{
                cardInfo:getFundCardIno
            },
            actions:{
                searchCardNoInfo:searchCardNoInfo
            }
        },
        ready:function(){
            flagLogin();//判断登录状态
            //初始化加载银行列表的信息
            this.searchCardNoInfo()
            this.selectChange()

            //如果缓存不存在就直接到登录页面
            let user = getCookie("user")
            let userAccount=getCookie("userAccount");
            let flagData = getCookie("flagData");
            if(userAccount == '' || flagData == "" || user == ""){
                router.go({path:'/'});
            }

        },
        //短信验证码
        components:{
            sendCodes:sendCodes,
            sucInfo:sucInfo,
            loadBtn:loadBtn,
            detailBill:detailBill
        },
        data:function(){
           return{
               codeMsg:'',
               bankMoney:'',
               transMoney:'',
               errorMessage:'',
               fetchCodeMsg:true,
               timerCodeMsg:'',
               timerMsg:'',
               cardName:'',
               billPass:'',
               bankBalance:false,
               billPassFlag:false,
               bankPassFlag:false,
               submitInfo:true,
               bankPass:'',
               bankNo:'',
               bankCode:'',
               billAccount:'',
               currency:'',
               vavibleMoney:'',
               initBtn:true,
               loadingBtn:false,
               blockBtn:false,
               blockSubmit:false,
               bankNum:'',
           }
        },
        methods:{
            focusInfo:function(){
                this.errorMessage = ''
            },
            selectChange:function( ){
                   //字段217(银行余额查询银行密码标志)：0:不要求;1:要求;（废弃）3:不能查 4需要资金密码 5需要银行密码
                 // 6 资金密码银行密码均要 7银行密码 资金密码 均不要
                  var str = this.cardName;
                  var attr=str.split(",");
                  this.bankNo = attr[2];
                  this.bankCode = attr[3];
                  this.billAccount = attr[4];
                  this.currency = attr[5];//取出查询银行账号的信息然后存起来最后提交的时候用
                  this.bankNum = attr[6];
                  var _this = this;
                  if(attr[0] == 3){//3 不要银行余额查询
                       _this.bankBalance = false;
                  }
                  if(attr[0] == 4){
                      _this.billPassFlag =true//4 需要资金密码
                      _this.bankBalance = true;
                  }
                  if(attr[0] == 5){//5需要银行密码
                      _this.bankPassFlag = true;
                      _this.bankBalance = true;
                  }
                  if(attr[0] == 6){//资金密码银行密码均要
                      _this.billPassFlag = true;
                      _this.bankPassFlag = true;
                      _this.bankBalance = true;
                  }
                  if(attr[0] == 7){//资金密码银行密码均不要
                      _this.billPassFlag = false;
                      _this.bankPassFlag = false;
                      _this.bankBalance = true;
                  }
                 // 字段219银转期0:不要求;1:要求（废弃） 4需要资金密码 5需要银行密码 6 资金密码银行密码均要
                 // 7银行密码 资金密码 均不要
                if(attr[1] == 4){//4 需要资金密码
                    _this.billPassFlag =true
                    _this.bankBalance = true;
                }
                if(attr[1] == 5){//5需要银行密码
                    _this.bankPassFlag = true;
                    _this.bankBalance = true;
                }
                if(attr[1] == 6){//资金密码银行密码均要
                    _this.billPassFlag = true;
                    _this.bankPassFlag = true;
                    _this.bankBalance = true;
                }
                if(attr[1] == 7){//资金密码银行密码均不要
                    _this.billPassFlag = false;
                    _this.bankPassFlag = false;
                    _this.bankBalance = true;
                }
               },
              submit:function(){
                  //如果对应的输入框显示 才做判断
                  if(this.billPassFlag == true){
                      if(!$('#billPass' ).parsley('isValid')){
                          $('#billPass' ).parsley('validate')
                          return;
                      }
                  }
                   if(this.bankPassFlag == true){
                       if(!$('#bankPass' ).parsley('isValid')){
                           $('#bankPass' ).parsley('validate')
                           return;
                       }
                   }
//                  if(!$('#bankMoney' ).parsley('isValid')){
//                      $('#bankMoney' ).parsley('validate')
//                      return;
//                  }
//                  //如果用户点击了查询余额那就要查询此操作完成之后在执行下一步的提交操作,否则提醒
//                  if(this.blockBtn == true && !document.getElementById("bankMoney").value){
//                      this.errorMessage = "当前正在执行余额查询，不能进行转账操作！"
//                      return;
//                  }
                  if(!$('#transMoney' ).parsley('isValid')){
                      $('#transMoney' ).parsley('validate')
                      return;
                  }
//                  if( this.transMoney >  document.getElementById("bankMoney").value){
//                      this.errorMessage = '亲，转账金额不能大于银行金额'
//                      return;
//                  }
                  if(!$('#codeMsg' ).parsley('isValid')){
                      $('#codeMsg' ).parsley('validate')
                      return;
                  }
                  this.loadingBtn = true;
                  this.initBtn = false;
                  var _this = this;
                  var userScape=getCookie("userAccount");
                  if(userScape!=""){
                      let userInfo=JSON.parse(unescape(userScape));
                      var  account = userInfo.account;
                      var  token = userInfo.token;
                      $.ajax({
                          url:onlineGlobal,
                          type:'post',
                          dataType:'json',
                          data:JSON.stringify({ func:checkSendMsgCode,type:outLoginType,account:account,token:token,
                              data:[{16:_this.codeMsg}]}),
                          contentType:'application/json',
                          success:function(data){
                              if(data.retHead == 1){
                                  var b= new Base64();
                                  //银转期货
                                  $.ajax({
                                      url:onlineGlobal,
                                      type:'post',
                                      timeout: 30000,
                                      data:JSON.stringify({func:bankTurnSecurity,type:loginType,account:account,token:token,data:[{
                                          56: _this.currency,
                                          59: b.encode(_this.billPass),
                                          60: b.encode(_this.bankPass),
                                          214:_this.bankNo,
                                          215:_this.bankCode,
                                          220:_this.transMoney,
                                          353:_this.bankNum,//银行分中心代码
                                          51:_this.billAccount//资金账号
                                      }
                                      ]}),
                                      contentType:'application/json',
                                      success:function(data){
                                          if(getErrorMsg(data) == 1){
                                              //返回成功之后要根据  处理的状态来判断显示是否转账成功
                                              if(data.data[0]['222'].indexOf('成功') > 0){
                                                  if(_this.submitInfo == true) {//判断是否显示成功提示
                                                      _this.submitInfo = false
                                                  }else{
                                                      _this.submitInfo = true
                                                  }
                                              }else{
                                                  _this.errorMessage = data.data[0]['222']
                                              }
//                                              if(data.data[0]['210'] == '处理成功' || data.data[0]['210'] =='1'){
//                                                  if(_this.submitInfo == true) {//判断是否显示成功提示
//                                                      _this.submitInfo = false
//                                                  }else{
//                                                      _this.submitInfo = true
//                                                  }
//                                                  _this.errorMessage = data.data[0]['211']
//                                              }else if(data.data[0]['210'] == '处理中'){
//                                                  _this.errorMessage =  "请在交易时段执行转账操作！"
//                                              }
                                              _this.loadingBtn = false;
                                              _this.initBtn = true;

                                          }else{
                                              _this.loadingBtn = false;
                                              _this.initBtn = true;
                                              _this.errorMessage = data.desc
                                          }
                                      },error:function(data){
                                          _this.loadingBtn = false;
                                          _this.initBtn = true;
                                          _this.errorMessage = "请求超时，请稍后再操作"
                                      }
                                  })
                              }else{
                                  _this.loadingBtn = false;
                                  _this.initBtn = true;
                                  _this.errorMessage = data.desc;
                              }
                          },error:function(data){
                              _this.loadingBtn = false;
                              _this.initBtn = true;
                              this.errorMessage ="服务器异常";
                          }
                      })
                  }
              },
            //查询余额
            searchMoney:function(){
                var _this = this;
                if(this.billPassFlag == true){
                    if(!$('#billPass' ).parsley('isValid')){
                        $('#billPass' ).parsley('validate')
                        return;
                    }
                }
                if(this.bankPassFlag == true){
                    if(!$('#bankPass' ).parsley('isValid')){
                        $('#bankPass' ).parsley('validate')
                        return;
                    }
                }
                _this.bankBalance = false;
                _this.blockBtn = true;
                _this.blockSubmit = true;
                _this.initBtn = false;//如果我点击了查询余额的按钮 就想把提交的按钮灰掉
                var userScape=getCookie("userAccount");
                if(userScape != ""){
                    let userInfo=JSON.parse(unescape(userScape));
                    var account = userInfo.account;
                    var token = userInfo.token;
                    //调取查询余额的接口
                    var b= new Base64();
                    $.ajax({
                        url:onlineGlobal,
                        type:'post',
                        timeout: 30000,
                        data:JSON.stringify({func:bankBlance,type:loginType,account:account,token:token,
                            data:[{
                                56 : this.currency,
                                59 : b.encode(this.billPass),
                                60 : b.encode(this.bankPass),
                                214: _this.bankNo,
                                215: _this.bankCode,
                                51:_this.billAccount,//资金账号
                                353:_this.bankNum,//银行分中心代码
                            }]}),
                        contentType:'application/json',
                        success:function(data){
                            if(getErrorMsg(data) == 1){
                                //取出银行余额
                                document.getElementById("bankMoney").value = data.data[0]['224']
//                                _this.vavibleMoney = data.data[0]['224']
//                                if(data.data[0]['210'] == '处理成功'|| data.data[0]['210'] =='1'){
//                                    if(data.data[0]['220'] !='')
//                                        document.getElementById("bankMoney").value = data.data[0]['220']
//                                    else
//                                        $('#monenyDetail').modal(monenyDetail);
//                                }else if(data.data[0]['210'] == '处理失败'){
//                                    _this.errorMessage = data.data[0]['211']
//                                }else if(data.data[0]['210'] == '处理中'){
//                                    _this.errorMessage = "请在交易时段执行查询操作！"
//                                }
                                _this.bankBalance = true;
                                _this.blockBtn = false;
                                //如果查询余额成功或者就显示提交按钮
                                _this.blockSubmit = false;
                                _this.initBtn = true;
                            }else{
                                _this.bankBalance = true;
                                _this.blockBtn = false;
                                _this.errorMessage = data.desc
                                //如果查询余额成功或者就显示提交按钮
                                _this.blockSubmit = false;
                                _this.initBtn = true;
                            }
                        },error:function(data){
                            _this.bankBalance = true;
                            _this.blockBtn = false;
                            _this.errorMessage = "请求超时，请稍后再操作"
                            //如果查询余额成功或者就显示提交按钮
                            _this.blockSubmit = false;
                            _this.initBtn = true;
                        }
                    })
                }
            },
            billFocus:function(){
                this.errorMessage = ''
            },
            fetchCodeClick: function(){
                if(this.billPassFlag == true){
                    if(!$('#billPass' ).parsley('isValid')){
                        $('#billPass' ).parsley('validate')
                        return;
                    }
                }
                if(this.bankPassFlag == true){
                    if(!$('#bankPass' ).parsley('isValid')){
                        $('#bankPass' ).parsley('validate')
                        return;
                    }
                }
//                if(!$('#bankMoney' ).parsley('isValid')){
//                    $('#bankMoney' ).parsley('validate')
//                    return;
//                }
                if(!$('#transMoney' ).parsley('isValid')){
                    $('#transMoney' ).parsley('validate')
                    return;
                }
//                if(this.bankMoney < this.transMoney){
//                    this.errorMessage = '亲，转账金额不能大于银行金额'
//                    return;
//                }
                var _this= this;
                var userScape = getCookie("user");
                var accountScape = getCookie("userAccount");
                if(userScape != "" ||  accountScape != "") {
                    var userInfo=JSON.parse(unescape(userScape));
                    let accountInfo=JSON.parse(unescape(accountScape));

                    var phoneNo = userInfo.data[0]['30']
                    var account = accountInfo.account;
                    var token =accountInfo.token;
                    $.ajax({
                        url: onlineGlobal,
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            func: initMsgCode, type: outLoginType,
                            account: account, token: token, data: [{30: phoneNo}]
                        }),
                        success:function(data){
                            if(data.retHead == 1){
                                //点击获取验证码按钮 如果== true就让此隐藏 else 显示
                                if(_this.fetchCodeMsg == true ){
                                    _this.fetchCodeMsg = false//让获取验证码隐藏  并出现倒计时
                                    let sec =60;
                                    for(let  i=0; i<=60; i++){
                                        window.setTimeout(function(){
                                            if (sec != 0) {
                                                _this.timerCodeMsg =   sec + "秒后重发验证" ;
                                                sec--;
                                            } else {
                                                sec = 60;//如果倒计时结束就让  获取验证码显示出来
                                                _this.fetchCodeMsg = true
                                            }
                                        }, i * 1000)
                                    }
                                }else{
                                    _this.fetchCodeMsg = true
                                }
                            }else{
                                _this.errorMessage = data.desc
                            }
                        },error:function(data){
                            this.timerMsg= "服务器异常"
                            console.log("服务器异常");
                        }
                    })
                }
            }
        }
    }
</script>