/**
 * Created by xiajing on 2016/8/12.
 */
import React from 'react';
import { Link } from 'react-router';
import titleNative from '../../util/titleNative.js'
import NavTitle from '../publicConponents/navTitle.js'
import {saveStorageInfo,getStorageInfo,showCircleView,hideCircleView} from '../../util/native.js';
import {dzHttpUrl,recommendId,twoType,loginType,phoneTest,nativeGesturePass} from '../../util/config.js';
import TipMsg from '../publicConponents/tipMsg.js';
import {getErrorMsg} from '../../util/errorMsg.js';
import backImg  from '../../image/back.png'

const RegisterStepThree = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState: function () {
        return {checked: true};
    },
    backClick: function () {
        this.props.history.goBack()
    },

    componentDidMount: function () {
        // window.location.href='../user/nav.html#/registerStepFour'
    },
    handleChange: function () {
        var genPeopleId = this.refs.genPeopleId.value;
        this.setState({genPeopleId: genPeopleId})
        if (genPeopleId) {
            this.setState({checked: false});
        } else {
            this.setState({checked: true});
        }
    },


    confirmClick: function (value) {
        var _this = this;
        var getStepTwo = getStorageInfo("generalUserRegister");
        var baseInfo = getStorageInfo("registerDataOne");//获取注册时的正常流程的缓存信息
        var prefect = getStorageInfo("perfectDSInfo")//获取登录状态返回2的时候返回的要完善信息的信息

        var tokenInfo;
        var accountInfo;
        var phoneInfo;
        var peopleId = _this.state.genPeopleId
        if (value == 2) {//如果等于2说明是填写了推荐人要校验
            if (!_this.state.genPeopleId) {
                _this.setState({tipMsg: "请正确填写推荐人！"})
                $('#tipMsgModal').modal(tipMsgModal)
                return;
            }
        } else {
            $("#genPeopleId").val('')
            _this.handleChange();
            peopleId=_this.state.genPeopleId;
            //_this.refs.genPeopleId.value == ''
        }
        if (prefect != null && prefect!="") {//取完善信息的数据
            var prefectData = JSON.parse(prefect);
            tokenInfo = prefectData.token;
            accountInfo = prefectData.userId;
            phoneInfo = prefectData.phone;
            if (!peopleId) {
                peopleId = "";
            }
        }
        else if (getStepTwo!=null && baseInfo!=null && getStepTwo != "" && baseInfo != "") {//取正常注册流程的数据
            var baseData = JSON.parse(baseInfo);
            var dataValue = JSON.parse(getStepTwo);
            tokenInfo = baseData.token;
            accountInfo = baseData.account;
            phoneInfo = dataValue.phone;
            if (!peopleId) {
                peopleId = "";
            }
            //alert(dataValue.passWord)
        }

        //请求数据前先转圈加载
        showCircleView("处理中");
        $.ajax({
            url: dzHttpUrl,
            method: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                func: recommendId, type: twoType, account: accountInfo,
                token: tokenInfo,
                data: [{105: peopleId, 30: phoneInfo}]
            }), success: function (data) {
                console.log(data);
                if (getErrorMsg(data) == 1) {
                    //如果处理成功或失败把转圈圈的方法消失
                    hideCircleView();
                    ////存放临时信息 便于后面手势密码回调成功判断跳转的对应页面
                    var objPass = {gestureFlag: 0}
                    saveStorageInfo("gesturePassInfo", objPass);
                    //成功之后下一步 就要到原生的手势密码页面
                    $("#nativeMsg").attr('href', nativeGesturePass);
                    window.setTimeout(function () {
                        $("#nativeMsg")[0].click();
                    }, 1000)
                    //  _this.context.router.push('/registerStepFour')

                } else {
                    //如果处理成功或失败把转圈圈的方法消失
                    hideCircleView();
                    _this.setState({tipMsg: data.desc})
                    $('#tipMsgModal').modal(tipMsgModal)
                    return;
                }
            }, error: function (data) {
                //如果处理成功或失败把转圈圈的方法消失
                hideCircleView();
                _this.setState({tipMsg: '服务器异常'})
                $('#tipMsgModal').modal(tipMsgModal)
                return;
            }
        })
    },
    render(){
        var nextStep = this.state.checked ? <RegisterInitBtn /> :
            <RegisterNextBtn genPeopleId={this.state.genPeopleId} handleClick={this.confirmClick.bind(this)}/>;
        //var  navBar =  <NavTitle name="绑定推荐人"  handleClick={this.backClick}/>
        document.body.style.paddingTop = '44px';
        //if(titleNative.getTitleNative(true)){
        //    //titleNativePass(true) == true  就显示自己写的title 否则掉原生的title
        //    var  navBar =  <NavTitle name="绑定推荐人"  handleClick={this.backClick}/>
        //}else{
        //    titleNative.getTitleNative('绑定推荐人')
        //}
        return (
            <div>
                <a href="" id="nativeMsg"></a>
                <TipMsg tipMsg={this.state.tipMsg}/>
                <nav className="navbar navInfo navbar-fixed-top">
                    <div className="titleBack initHeight"><img src={backImg} onClick={this.backClick}/></div>
                    <div className="login-nav"> 绑定推荐人</div>
                    <div className="nextStepBind"><a onClick={this.confirmClick.bind(this,1)}>跳过</a></div>
                </nav>
                <div className="list-ul" style={{height:'43px'}}>
                    <ul>
                        <li>
                            <div className="registerLeft liLineHeight" style={{width:'100%'}}><input ref="genPeopleId"
                                                                                                     id="genPeopleId"
                                                                                                     style={{lineHeight: '13px',height:'38px',width: '100%'}}
                                                                                                     onChange={this.handleChange}
                                                                                                     type="text"
                                                                                                     placeholder="请输入您的推荐人工号"
                                                                                                     className="loginText tLineHeight"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="btnDiv">
                    {nextStep}
                </div>
                <div className="btnDiv3">

                    {
                        // 跳过绑定，进入<span className="textUnderLine"><a onClick={this.confirmClick}>下一步</a></span>
                        //跳过绑定，进入<span className="textUnderLine"><a   href= {nativeGesturePass}>下一步</a></span>
                    }
                </div>
                <div className="btnDiv2" style={{color:'#808086',fontSize: '12px',marginTop:'-43px',padding: '6px'}}>
                    <p>温馨提示：</p>
                    <p className="pTipOne">1：绑定推荐人，使他 / 她成为您的专属投资服务顾问；</p>
                    <p>2：如跳过绑定，系统将自动分配服务专员。</p>
                </div>
            </div>
        )
    }
})

var RegisterInitBtn = React.createClass({
    render(){
        return (
            <div>
                <button type="button" className="registerInitBtn" data-toggle="button"> 确定</button>
            </div>
        )
    }
})
var RegisterNextBtn = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    render(){
        //首先取出普通用户的第一、二步存储信息然后遍历在将第三步的信息存进去
        //var getStepTwo = getStorageInfo("generalUserRegister");
        //var obj = {genPeopleId:this.props.genPeopleId}
        //for(let temp in obj){
        //    getStepTwo[temp] = obj[temp]
        //}
        //saveStorageInfo("generalUserRegister", getStepTwo)
        return (
            <div>
                <button type="button" className="btnSubmit" onClick={this.props.handleClick.bind(this,2)}
                        data-toggle="button">确定
                </button>
            </div>
        )
    }
})
export default RegisterStepThree
