/**
 * Created by xiajing on 2016/8/12.
 */
import React from 'react';
import {Link , router} from 'react-router';
import titleNative from '../util/titleNative.js'
import NavTitle from '../components/publicConponents/navBackTitle.js';
import TipMsg from '../components/publicConponents/tipMsg.js';
import {dzHttpUrl,loginCode,loginType,nativeGesturePass,sysType} from '../util/config.js';
import {getErrorMsg} from '../util/errorMsg.js';
import showImg from '../image/showPass.png';
import hidePass from '../image/hidePass.png';
import {phoneRegexp} from '../util/validation.js';
import {showCircleView,hideCircleView,saveStorageInfo,devicdId,orgNumber,OS,version,getSendMessageToNative,getDeviceJsonInfo,storePublicData} from '../util/native.js';
import browser from '../util/browser.js';
import onlinePhone from '../image/phone.png'

const Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState: function(){
        return {checked :false};
    },
    handleClick : function(){
        this.setState({checked: !this.state.checked});
        //根据true false 来判断显示input框的类型
        if(this.state.checked){
            this.refs.password.setAttribute("type", "password");
        }else{
            this.refs.password.setAttribute("type", "text");
        }
    },
    componentDidMount:function(){
        //获取手机端的设备信息
        getDeviceJsonInfo();
    },
    loginClick: function(){
      //  this.context.router.push("/");
        var _this =this;
         var phone = this.refs.phoneText.value;
         var passwordValue = this.refs.password.value;
         if(!phone){
            this.setState({tipMsg:"手机号不能为空！"})
             $('#tipMsgModal').modal(tipMsgModal)
             return;
         }
        if(!phoneRegexp.test(phone)){
            this.setState({tipMsg:"请正确输入手机号！"})
            $('#tipMsgModal').modal(tipMsgModal)
            return;
        }
          if(!passwordValue){
            this.setState({tipMsg:"密码不能为空！"})
            $('#tipMsgModal').modal(tipMsgModal)
            return;
        }

        //请求数据前先转圈加载
        showCircleView("处理中");
        //登录接口
        $.ajax({
            url: dzHttpUrl,
            method: 'post',
            contentType:'application/json',
            timeout: 30000,//30秒后没反应就超时
            data:JSON.stringify({
                func:loginCode,
                type:sysType,
                data:[
                    {
                        type:loginType,
                        phone:phone,
                        pwd:passwordValue,
                        os:OS,
                        deviceId:devicdId,
                        orgNumber:orgNumber,
                        version:version,
                    }
                ]
            }),
            success:function(data){
                if(getErrorMsg(data) == 1){
                    //处理正确的操作
                    //这里会去先判断用户是否是忘记了手势密码，如果getState = 0 就是忘记手机密码就要去设置手势密码
                    var gestuerState = browser.GetUrlArgStr("geststate");
                    if(gestuerState == 0) {
                        //如果处理成功或失败把转圈圈的方法消失
                        hideCircleView();
                        //存放临时信息 便于后面手势密码回调成功判断跳转的对应页面
                        var objPass = {gestureFlag: 1}
                        saveStorageInfo("gesturePassInfo", objPass);
                        //成功之后传值给原生
                        storePublicData('1');//设置为1来判断是否是游客
                        var obj={loginName :data.data[0].loginName, userId :data.data[0].userId, token : data.data[0].token,
                            tokenBeginTime :data.data[0].tokenBeginTime, tokenActiveTime :data.data[0].tokenActiveTime, pwd :passwordValue, loginType : 1 }
                        console.log(obj)
                        saveStorageInfo("nativeRegisterSuc",obj);
                        //调出手势密码的页面
                        $("#nativeMsg").attr('href', nativeGesturePass);
                        window.setTimeout(function () {
                            $("#nativeMsg")[0].click();
                        }, 1000)
                    }else{
                        //如果处理成功或失败把转圈圈的方法消失
                        hideCircleView();
                       //成功之后传值给原生
                        storePublicData('1');//设置为1来判断是否是游客
                        var obj={loginName :data.data[0].loginName, userId :data.data[0].userId, token : data.data[0].token,
                            tokenBeginTime :data.data[0].tokenBeginTime, tokenActiveTime :data.data[0].tokenActiveTime, pwd :passwordValue, loginType : 1 }
                        console.log(obj)
                        saveStorageInfo("nativeRegisterSuc",obj);
                        getSendMessageToNative(obj);
                    }
                        //this.context.router.push("/dzIndex");
                }else if(data.retHead  == 2) {//如果==2说明是认证过但是得锁没有注册因此要去完善信息只需跳转到resisterStepThree.js绑定推荐人这里
                    //处理正确的操作
                    //这里会去先判断用户是否是忘记了手势密码，如果getState = 0 就是忘记手机密码就要去设置手势密码
                    var gestuerState = browser.GetUrlArgStr("geststate");
                    if(gestuerState == 0) {
                        //如果处理成功或失败把转圈圈的方法消失
                        hideCircleView();
                        //存放临时信息 便于后面手势密码回调成功判断跳转的对应页面
                        var objPass = {gestureFlag: 1}
                        saveStorageInfo("gesturePassInfo", objPass);
                        //成功之后传值给原生
                        storePublicData('1');//设置为1来判断是否是游客
                        var obj={loginName :data.data[0].loginName, userId :data.data[0].userId, token : data.data[0].token,account:data.data[0].account,
                            tokenBeginTime :data.data[0].tokenBeginTime, tokenActiveTime :data.data[0].tokenActiveTime, pwd :passwordValue, loginType : 1 ,
                            phone:phone}
                        saveStorageInfo("perfectDSInfo",obj);
                        //调出手势密码的页面
                        $("#nativeMsg").attr('href', nativeGesturePass);
                        window.setTimeout(function () {
                            $("#nativeMsg")[0].click();
                        }, 1000)
                    }else{
                        //如果处理成功或失败把转圈圈的方法消失
                        hideCircleView();
                        //成功之后传值给原生
                        storePublicData('1');//设置为1来判断是否是游客
                        var obj={loginName :data.data[0].loginName, userId :data.data[0].userId, token : data.data[0].token,account:data.data[0].account,
                            tokenBeginTime :data.data[0].tokenBeginTime, tokenActiveTime :data.data[0].tokenActiveTime, pwd :passwordValue, loginType : 1 ,
                            phone:phone}
                        saveStorageInfo("perfectDSInfo",obj);
                        window.location.href='../user/nav.html#/registerStepThree'//完善信息
                    }
                }else {
                    //如果处理成功或失败把转圈圈的方法消失
                    hideCircleView();
                    _this.setState({tipMsg:data.desc})
                    $('#tipMsgModal').modal(tipMsgModal)
                    return;
                }
            },error:function(data){
                //如果处理成功或失败把转圈圈的方法消失
                hideCircleView();
                _this.setState({tipMsg:"服务器异常!"})
                $('#tipMsgModal').modal(tipMsgModal)
                return;
            }
        })
    },
    handleBtn: function(){
        this.context.router.push("/RegisterStepOne");
    },
    backClick:function(){
        this.props.history.goBack()
    },
  render(){
        var initImg = this.state.checked ?  showImg   :  hidePass ;
        var  navBar =  <NavTitle name="登录"  handleClick={this.backClick}/>
        document.body.style.paddingTop = '44px';
        //if(titleNative.getTitleNative(true)){
        //    //titleNativePass(true) == true  就显示自己写的title 否则掉原生的title
        //    var  navBar =  <NavTitle name="登录"  handleClick={this.backClick}/>
        //}else{
        //    titleNative.getTitleNative('登录')
        //}
        return(
            <div>
                <a href="" id="nativeMsg"></a>
                <TipMsg tipMsg={this.state.tipMsg}/>
                {navBar}
                <div className="list-ul">
                  <ul>
                     <li className="login-bottom liLineHeight">
                         <div className="login-rightDiv"  style={{width:'100%'}}><input type="text" maxLength="11"   autocomplete="off"    style={{width:'100%'}} placeholder="请输入手机号" ref="phoneText" className="loginText tLineHeight" /></div>
                     </li>
                      <li>
                          <div className="login-rightDiv" style={{width:'78%'}} ><input  autocomplete="off" style={{width: '212px' }} type="password" ref="password"  placeholder="请输入登录密码" className="loginText" /></div>
                          <div className="div3" style={{width:'22%'}}> <img src={initImg}  onClick={this.handleClick} /></div>
                      </li>
                  </ul>
                </div>
                <div className="modifyOne"><a href="../user/modifyPass.html">忘记密码</a></div>
                <div className="btnDiv" style={{marginTop:'42px'}}>
                    <button  onClick={this.loginClick}  type="button" className="btnSubmit" data-toggle="button">
                        登录
                    </button>
                </div>
                <div className="registerDiv">
                    <button   type="button"  onClick={()=>this.context.router.push('/registerStepOne')}    className="btnRegister" data-toggle="button">
                        注册
                    </button>
                </div>
                <div className="onlinePhone">
                  <img src={onlinePhone} className="onlinePhoneImg"/>
                </div>
                <TipMsgInfo />
            </div>
        )
  }
})
//提示
const TipMsgInfo = React.createClass({
    render(){
        return(
            <div className="tipMsg">
             <p>为保障您的投资安全</p>
             <p>首次使用需要注册</p>
            </div>
        )
    }
})
//Login.contextTypes = {
//    router: React.PropTypes.func.isRequired
//}

export default Login