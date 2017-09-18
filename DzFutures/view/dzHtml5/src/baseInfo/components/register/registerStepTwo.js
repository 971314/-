/**
 * Created by xiajing on 2016/8/12.
 */
import React from 'react';
import { Link } from 'react-router';
import titleNative from '../../util/titleNative.js'
import NavTitle from '../publicConponents/navTitle.js'
import {saveStorageInfo,getStorageInfo,showCircleView,hideCircleView,getDeviceJsonInfo,devicdId,orgNumber,OS,version} from '../../util/native.js';
import showImg from '../../image/showPass.png';
import hidePass from '../../image/hidePass.png';
import TipMsg from '../publicConponents/tipMsg.js';
import {dzHttpUrl,loginType,sysType,modifyPass} from '../../util/config.js';
import {getErrorMsg} from '../../util/errorMsg.js';
import {psdRegexp} from '../../util/validation.js'
const registerStepTwo = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState: function(){
        return {
            checked :false,
            btnChecked:false,
            confirmFlag:false,
            lowPass:''
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
        var passWordValue = this.refs.passWordText.value;
        if(!psdRegexp.test(passWordValue)){
            _this.setState({tipMsg:"密码设置规则为：6-20位字母和数字组合！"})
            $('#tipMsgModal').modal(tipMsgModal)
            return;
        }
        //首先取出普通用户的第一步存储信息然后遍历在将第二步的信息存进去
        var getStepOne = getStorageInfo("generalUserRegister");
        if(getStepOne != ''){
            var getStepData = JSON.parse(getStepOne);
        }
        var obj = {passWord:this.state.passWord,confirmPass:this.state.confirmPass}
        for(let temp in obj){
            getStepData[temp] = obj[temp]
        }
        saveStorageInfo("generalUserRegister", getStepData)
        if(this.state.confirmPass!=this.state.passWord){
            this.setState({tipMsg:"两次输入的密码不一致，请重新输入"})
            $('#tipMsgModal').modal(tipMsgModal)
            return;
        }
        //请求数据前先转圈加载
        showCircleView("处理中");
        var baseInfo = getStorageInfo("registerDataOne");
        var phoneInfo = getStorageInfo("generalUserRegister");
        if(baseInfo &&　phoneInfo){
            var baseData = JSON.parse(baseInfo);
            var phoneData = JSON.parse(phoneInfo);
            //原密码
            //var oldPwd = phoneData.passWord;
            var lowPass =  getStorageInfo("flagLowPass");//缓存密码临时保存，初始化的时候原密码设置为null或空，如果回退就把原密码赋值为初始密码
            var lowData;
            if(lowPass){
                 var lowValue = JSON.parse(lowPass);
                 lowData =  lowValue.flag;
            }
            $.ajax({
                url: dzHttpUrl,
                method: 'post',
                contentType: 'application/json',
                timeout: 30000,//30秒后没反应就超时
                data: JSON.stringify({
                    func: modifyPass,
                    type: sysType,
                    account:baseData.account,
                    token:baseData.token,
                    data: [
                        {
                            type: loginType,
                            phone:phoneData.phone,
                            newPwd:_this.state.passWord,
                            oldPwd:lowData,
                            os:OS,
                            deviceId:devicdId,
                            orgNumber:orgNumber,
                            version:version
                        }
                    ]
                }),success:function(data){
                    //_this.setState({flag:1});//设置个标志位来判断密码传值情况，第一次传空，第二次传原密码
                    //alert(_this.state.flag)
                    if(getErrorMsg(data) == 1){
                        var obj = {flag:_this.state.passWord}//保存初始密码
                        saveStorageInfo("flagLowPass",obj)
                        //如果处理成功或失败把转圈圈的方法消失
                        hideCircleView();
                        //保存信息 方便后面注册传给原生
                        var obj={loginName :data.data[0].loginName, userId :data.data[0].userId, token : data.data[0].token,
                            tokenBeginTime :data.data[0].tokenBeginTime, tokenActiveTime :data.data[0].tokenActiveTime, pwd :_this.state.passWord, loginType : 1 }
                        saveStorageInfo("nativeSaveSuc",obj);
                        _this.context.router.push('/registerStepThree')
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
        }
    },
    render(){
        var nextStep = this.state.btnChecked ?   <RegisterNextBtn handleClick={this.stepThreeClick} /> : <RegisterInitBtn />;
        var initImg = this.state.checked ? showImg : hidePass;
        var confirmImg= this.state.confirmFlag ?showImg : hidePass;
        var  navBar = <NavTitle name="注册"  handleClick={this.backClick}/>
        document.body.style.paddingTop = '44px';
        //if(titleNative.getTitleNative(true)){
        //    //titleNativePass(true) == true  就显示自己写的title 否则掉原生的title
        //    var  navBar = <NavTitle name="注册"  handleClick={this.backClick}/>
        //}else{
        //    titleNative.getTitleNative('注册')
        //}
        return(
            <div>
                <TipMsg tipMsg={this.state.tipMsg}/>
                {navBar}
                <div className="list-ul">
                    <ul>
                        <li className="login-bottom liLineHeight">
                            <div className="registerLeft" style={{width:'83%'}}><input ref="passWordText" autocomplete="off"    style={{width:'100%'}}  type="password" onChange={this.handleChange}   placeholder="设置登录密码（6-20位字母和数字组合）" className="loginText tLineHeight" /></div>
                            <div className="div3" style={{width:'17%', paddingLeft:'3px'}}> <img src={initImg}  onClick={this.handleClick} /></div>
                        </li>
                        <li>
                            <div className="registerLeft" style={{width:'78%'}}><input ref="confirmPassText" autocomplete="off"     style={{width:'212px'}}  type="password" onChange={this.handleChange}  placeholder="再次输入登录密码" className="loginText" /></div>
                            <div className="div3" style={{width:'22%'}}> <img src={confirmImg}  onClick={this.confirmClick} /></div>
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
            <div><button   type="button" className="registerInitBtn" data-toggle="button"> 下一步 </button> </div>
        )
    }
})
var RegisterNextBtn = React.createClass({
    render(){
        return(
            <div><button   type="button" className="btnSubmit" data-toggle="button" onClick={this.props.handleClick}>下一步</button></div>
        )
    }
})
export default registerStepTwo
