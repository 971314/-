/**
 * Created by xiajing on 2016/8/12.
 */
import React from 'react';
import { Link } from 'react-router';
import titleNative from '../../util/titleNative.js';
import NavTitle from '../publicConponents/navTitle.js';
import {saveStorageInfo,showCircleView,hideCircleView,devicdId,orgNumber,OS,version,getSendMessageToNative} from '../../util/native.js';
import {phoneRegexp} from '../../util/validation.js';
import TipMsg from '../publicConponents/tipMsg.js';
import {dzHttpUrl,generalRegister,loginType,sysType,checkMsg,nativeGesturePass} from '../../util/config.js';
import {getErrorMsg} from '../../util/errorMsg.js';
import onlinePhone from '../../image/phone.png'
const RegisterStepOne = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState: function(){
        return {
            btnChecked : true,
            msgCodeFlag: true,
        };
    },
    componentDidMount:function(){
        //this.setState({msgCodeFlag: true,btnChecked: true})
    },
    handleChange:function(){
        var _this = this;
        var phone = this.refs.phoneTest.value;
        var msgCode = this.refs.msgCodeText.value;
        //console.log(msgCode.length)
        if(phone && msgCode && msgCode.length == 6){
            //如果手机号和密码不为空就直接显示下一步的按钮
            _this.setState({btnChecked:false});
        }else{
            _this.setState({btnChecked:true});
        }
        //将值存起来传给子组件
        this.setState({phone:phone,msgCode:msgCode})
    },
    //获取验证码
    fetchMsgClick: function(){
        //$("#nativeMsg").attr('href',nativeGesturePass);
        //window.setTimeout(function () {
        //    $("#nativeMsg")[0].click();
        //}, 1000)
        //return;
        var _this = this;
        var phone = this.refs.phoneTest.value;
        if(!phoneRegexp.test(phone)){
            this.setState({tipMsg:"请正确输入手机号！"})
            $('#tipMsgModal').modal(tipMsgModal)
            return;
        }
        $.ajax({
            url: dzHttpUrl,
            method: 'post',
            contentType:'application/json',
            timeout: 30000,//30秒后没反应就超时
            data:JSON.stringify({
                func:generalRegister,
                type:sysType,
                data:[
                    {
                        type:loginType,
                        phone:_this.state.phone,
                        os:OS,
                        deviceId:devicdId,
                        orgNumber:orgNumber,
                        version:version
                    }
                ]
            }),success:function(data){
                if(getErrorMsg(data) == 1){
                     //这里会存一些tooken的信息
                    //开始发短信的操作
                    _this.setState({msgCodeFlag:false})
                    let sec =60;
                    for(let  i=0; i<=60; i++) {
                        window.setTimeout(function () {
                            if (sec != 0) {
                                _this.setState({msgValue:sec + "秒后重发"})
                                sec--;
                            } else {
                                sec = 60;//如果倒计时结束就让  获取验证码显示出来
                                _this.setState({msgCodeFlag:true})
                            }
                        }, i * 1000)
                    }
                }else{
                    _this.setState({tipMsg:data.desc})
                    $('#tipMsgModal').modal(tipMsgModal)
                    return;
                }
            },error:function(data){
                _this.setState({tipMsg:"服务器异常"})
                $('#tipMsgModal').modal(tipMsgModal)
                return;
            }
        })
    },
    backClick:function(){
        this.props.history.goBack()
    },
    stepTwoClick:function(){
        //存普通用户注册的第一步信息
        let obj ={phone:this.state.phone,msgCode:this.state.msgCode}
        if(!phoneRegexp.test(this.state.phone)){
            this.setState({tipMsg:"请正确输入手机号！"})
            $('#tipMsgModal').modal(tipMsgModal)
            return;
        }
        saveStorageInfo('generalUserRegister',obj)
        //添加原生转圈的方法
        showCircleView("处理中");
        //首先校验验证码是否正确
        var _this = this;
        $.ajax({
            url: dzHttpUrl,
            method: 'post',
            contentType: 'application/json',
            timeout: 30000,//30秒后没反应就超时
            data: JSON.stringify({
                func: checkMsg,
                type: sysType,
                data: [
                    {
                        type: loginType,
                        phone: _this.state.phone,
                        captcha: _this.state.msgCode,
                        deviceId: devicdId
                    }
                ]
            }), success: function (data) {
                if (getErrorMsg(data) == 1) {
                    //如果处理成功或失败把转圈圈的方法消失
                    hideCircleView();
                    //console.log(data.data[0].account)
                    //console.log(data.data[0].token)
                    //校验完成存信息
                    var obj = {account:data.data[0].account,token:data.data[0].token}
                    saveStorageInfo("registerDataOne",obj)
                    _this.context.router.push('/registerStepTwo')
                }else{
                    _this.setState({tipMsg:data.desc})
                    $('#tipMsgModal').modal(tipMsgModal)
                    return;
                }

            },error:function(){
                //如果处理成功或失败把转圈圈的方法消失
                hideCircleView();
                _this.setState({tipMsg:"服务器异常"})
                $('#tipMsgModal').modal(tipMsgModal)
                return;
            }
        })
    },
    render(){
        var _this = this;
        var msgCode = _this.state.msgCodeFlag ? <InitMsgCode handleClick={this.fetchMsgClick}/> : <MsgCodeCount msg={this.state.msgValue}/>
        var nextStep = _this.state.btnChecked ? <RegisterInitBtn /> : <RegisterNextBtn handleClick={this.stepTwoClick}/>
        var  navBar =  <NavTitle name="注册"  handleClick={this.backClick}/>
        document.body.style.paddingTop = '44px';
        //if(titleNative.getTitleNative(true)){
        //    //titleNativePass(true) == true  就显示自己写的title 否则掉原生的title
        //    var  navBar =  <NavTitle name="注册"  handleClick={this.backClick}/>
        //}else{
        //    titleNative.getTitleNative('注册')
        //}
        return(
            <div>
                <a href="" id="nativeMsg"></a>
                <TipMsg tipMsg={this.state.tipMsg}/>
                {navBar}
                <div className="list-ul">
                    <ul>
                        <li className="login-bottom liLineHeight">
                            <div className="login-rightDiv" style={{width:'100%'}}><input type="text" maxLength="11"  autocomplete="off" ref="phoneTest" style={{width:'100%'}} onChange={this.handleChange} placeholder="请输入手机号" className="loginText tLineHeight" /></div>
                        </li>
                        <li>
                            <div className="login-rightDiv" style={{width:'67%'}} ><input autocomplete="off"  maxLength="6" ref="msgCodeText" type="text" onChange={this.handleChange}  style={{width:'212px'}}  placeholder="请输入手机验证码" className="loginText" /></div>
                            <div className="div3" style={{width:'33%'}}>
                                {msgCode}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="btnDiv">
                    {nextStep}
                </div>
                <div className="btnDiv2">
                    <ExitAccountLogin />
                </div>
                <div className="onlinePhone">
                    <img src={onlinePhone} className="onlinePhoneImg"/>
                </div>
            </div>
        )
    }
})
//短信验证码
var InitMsgCode = React.createClass({
     render(){
         return(
             <div>
                 <span className="initMsg" onClick={this.props.handleClick}>获取验证码</span>
             </div>
         )
     }
})
var MsgCodeCount = React.createClass({
    render(){
        return(
            <div>
                {this.props.msg}
            </div>
        )
    }
})
var RegisterInitBtn = React.createClass({
    render(){
        return(
            <div><button   type="button" className="registerInitBtn" data-toggle="button"> 下一步 </button> </div>
        )
    }
})
var RegisterNextBtn = React.createClass({
    render(){
        return(
            <div><button   type="button" className="btnSubmit" onClick={this.props.handleClick}  data-toggle="button">下一步 </button></div>
        )
    }
})
var ExitAccountLogin = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    render(){
        return(
            <div>
                {
                   // <div className="leftDiv">游客登录</div>
                }
                <div className="leftDiv" style={{height:'1px'}}> </div>
                {
                    //<div className="rightDiv" onClick={()=>this.context.router.push("/login")}>已有账号</div>
                }

            </div>
        )
    }
})
export default RegisterStepOne
