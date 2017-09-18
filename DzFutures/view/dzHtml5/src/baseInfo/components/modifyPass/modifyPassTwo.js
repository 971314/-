/**
 * Created by xiajing on 2016/8/12.
 */
import React from 'react';
import { Link } from 'react-router';
import titleNative from '../../util/titleNative.js'
import NavTitle from '../publicConponents/navTitle.js'
import {saveStorageInfo,getStorageInfo,showCircleView,hideCircleView,getDeviceJsonInfo,devicdId,orgNumber,OS,version,getSendMessageToNative,storePublicData} from '../../util/native.js';
import showImg from '../../image/showPass.png';
import hidePass from '../../image/hidePass.png';
import TipMsg from '../publicConponents/tipMsg.js';
import {dzHttpUrl,loginType,sysType,modifyPass} from '../../util/config.js';
import {getErrorMsg} from '../../util/errorMsg.js';
const modifyPassTwo = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState: function(){
        return {
            checked :false,
            btnChecked:false,
            confirmFlag:false
        };
    },
    componentDidMount:function(){
        //获取手机端的设备信息
        getDeviceJsonInfo();
    },
    handleChange:function(){
        var _this = this;
        var passWord = this.refs.passWordText.value;
        var confirmPassText =  this.refs.confirmPassText.value;
        if(passWord && confirmPassText){
            //如果手机号和密码不为空就直接显示下一步的按钮
            _this.setState({btnChecked:  true});
        }else{
            _this.setState({btnChecked:  false});
        }
        this.setState({passWord:passWord,confirmPass:confirmPassText});
    },
    handleClick : function(){
        this.setState({checked: !this.state.checked});
        //根据true false 来判断显示input框的类型
        if(this.state.checked){
            this.refs.passWordText.setAttribute("type", "password");
        }else{
            this.refs.passWordText.setAttribute("type", "text");
        }
    },
    confirmClick: function(){
        this.setState({confirmFlag: !this.state.confirmFlag});
        if(this.state.confirmFlag){
            this.refs.confirmPassText.setAttribute("type", "password");
        }else{
            this.refs.confirmPassText.setAttribute("type", "text");
        }
    },
    backClick:function(){
        this.props.history.goBack()
    },
    stepThreeClick:function(){
        var _this = this;
        if(this.state.confirmPass!=this.state.passWord){
            this.setState({tipMsg:"两次输入的密码不一致，请重新输入"})
            $('#tipMsgModal').modal(tipMsgModal)
            return;
        }
        //请求数据前先转圈加载
        showCircleView("处理中");
        var tokenInfo = getStorageInfo("modifyDzTokenInfo");
        var phoneInfo = getStorageInfo("modifyBaseInfoDz");
        if(tokenInfo && phoneInfo){
            var infoValue = JSON.parse(tokenInfo);
            var phoneValue = JSON.parse(phoneInfo);
        }
            $.ajax({
                url: dzHttpUrl,
                method: 'post',
                contentType: 'application/json',
                timeout: 30000,//30秒后没反应就超时
                data: JSON.stringify({
                    func: modifyPass,
                    type: sysType,
                    account:infoValue.account,
                    token:infoValue.token,
                    data: [
                        {
                            type: loginType,
                            phone:phoneValue.phone,
                            newPwd:_this.state.passWord,
                            os:OS,
                            deviceId:devicdId,
                            orgNumber:orgNumber,
                            version:version
                        }
                    ]
                }),success:function(data){
                    if(getErrorMsg(data) == 1){
                        //如果处理成功或失败把转圈圈的方法消失
                        hideCircleView();
                        //成功之后传值给原生
                        storePublicData('1');//设置为1来判断是否是游客
                        //需求变更 直接到登录页
                        $('#prefectLoginMsgModal').modal(prefectLoginMsgModal);
                        $("#confirmLoginPrefect").click(function(){
                            window.location.href='../user/nav.html'
                        })
                        //校验完成存信息 需求变更
                        //var obj={loginName :data.data[0].loginName, userId :data.data[0].userId, token : data.data[0].token,
                        //    tokenBeginTime :data.data[0].tokenBeginTime, tokenActiveTime :data.data[0].tokenActiveTime, pwd :_this.state.passWord, loginType : 1 }
                        //saveStorageInfo("modifyDzPassInfo",obj)
                        //getSendMessageToNative(obj);
                    }else{
                        //如果处理成功或失败把转圈圈的方法消失
                        hideCircleView();
                        _this.setState({tipMsg:data.desc})
                        $('#tipMsgModal').modal(tipMsgModal)
                        return;
                    }
                },error:function(){
                    //如果处理成功或失败把转圈圈的方法消失
                    hideCircleView();
                    _this.setState({tipMsg:"服务器异常!"})
                    $('#tipMsgModal').modal(tipMsgModal)
                    return;
                }
            })
    },
    render(){
        var nextStep = this.state.btnChecked ?   <RegisterNextBtn handleClick={this.stepThreeClick} /> : <RegisterInitBtn />;
        var initImg = this.state.checked ? showImg : hidePass;
        var confirmImg= this.state.confirmFlag ?showImg : hidePass;
        var  navBar = <NavTitle name="修改密码"  handleClick={this.backClick}/>
        document.body.style.paddingTop = '44px';
        return(
            <div>
                <TipMsg tipMsg={this.state.tipMsg}/>
                {navBar}
                <div className="modal dialog-info" id="prefectLoginMsgModal" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <p className="text-align">提示</p>
                            <div className="modal-header dialog-bottom">
                                您的密码已修改成功，请重新登录！
                            </div>
                            <div className="modal-body dialog-bottom" data-dismiss="modal" id="confirmLoginPrefect">
                                确认
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-ul">
                    <ul>
                        <li className="login-bottom liLineHeight">
                            <div className="registerLeft" style={{width:'78%'}}><input ref="passWordText" autocomplete="off"  style={{width:'100%'}} type="password" onChange={this.handleChange}   placeholder="设置登录密码" className="loginText tLineHeight" /></div>
                            <div className="div3" style={{width:'22%'}}> <img src={initImg}  onClick={this.handleClick} /></div>
                        </li>
                        <li>
                            <div className="registerLeft"  style={{width:'78%'}}><input ref="confirmPassText" autocomplete="off" type="password"   style={{width:'212px'}} onChange={this.handleChange}  placeholder="再次输入登录密码" className="loginText" /></div>
                            <div className="div3"  style={{width:'22%'}}> <img src={confirmImg}  onClick={this.confirmClick} /></div>
                        </li>
                    </ul>
                </div>
                <div className="btnDiv">
                    {nextStep}
                </div>
            </div>
        )
    }
})
var RegisterInitBtn = React.createClass({
    render(){
        return(
            <div><button   type="button" className="registerInitBtn" data-toggle="button"> 完成 </button> </div>
        )
    }
})
var RegisterNextBtn = React.createClass({
    render(){
        return(
            <div><button   type="button" className="btnSubmit" data-toggle="button" onClick={this.props.handleClick}>完成</button></div>
        )
    }
})
export default modifyPassTwo
