/**
 * Created by xiajing on 2016/8/15.
 */

import React from 'react';
import titleNative from '../../util/titleNative.js';
import NavTitle from '../publicConponents/navTitle.js';
import {saveStorageInfo,getStorageInfo} from '../../util/native.js';
import {dzHttpUrl,applyAgentCode,loginType,phoneTest,twoType} from '../../util/config.js';
import {getErrorMsg} from '../../util/errorMsg.js';
import checkInit from '../../image/other/checkInit.png';
import checkClick from '../../image/other/checkClick.png';
import TipMsg from '../publicConponents/tipMsg.js';
import {showCircleView,hideCircleView,getAppCertifyInfo,getAppToken,getAppUserId} from '../../util/native.js';
const ApplyStepOne = React.createClass({
    getInitialState: function(){
        return {
            btnChecked:false,
            checkBoxImg:false,
            phoneValue:''
        };
    },
    componentDidMount:function(){
        var data = getStorageInfo("applyAgentInfo");
        if(data != '' || data != null){
            var dataValue = JSON.parse(data)
            this.setState({nameValue:dataValue.name,phoneTest:dataValue.phone,numberValue:dataValue.number,departmentValue:dataValue.department})
        }
        var phone = getAppCertifyInfo();
        if(phone) {
            this.setState({phoneValue: phone})
        }
    },
    handleClick:function(){
        this.setState({checkBoxImg: !this.state.checkBoxImg});
    },
    backClick:function(){
        this.props.history.goBack()
    },
    confirmClick:function(){
        var phone = getAppCertifyInfo();
        var tokenInfo = getAppToken();//获取token
        var userIdInfo = getAppUserId();
        var token;
        var account;
        if(tokenInfo){
            token = tokenInfo;
        }
        if(userIdInfo){
            account = userIdInfo;
        }
            var _this =this;
            //转圈圈加载功能
            showCircleView("处理中");
            $.ajax({
                url:dzHttpUrl,
                method: 'post',
                contentType:'application/json',
                dataType:'json',
                timeout:30000,
                data:JSON.stringify({
                    func:applyAgentCode,type:twoType, account:account, token:token,
                    data:[{101:this.state.numberValue,102:this.state.nameValue,
                        103:this.state.departmentValue,30:phone}]
                }),success:function(data){
                    if(getErrorMsg(data) == 1){
                        //去掉转圈圈功能
                        hideCircleView();
                        //成功之后下一步
                        _this.context.router.push('/applyStepThree')
                    }else{
                        //去掉转圈圈功能
                        hideCircleView();
                        _this.setState({tipMsg: data.desc})
                        $('#tipMsgModal').modal(tipMsgModal)
                        return;
                    }

                },error:function(data){
                    //去掉转圈圈功能
                    hideCircleView();
                    _this.setState({tipMsg: '服务器异常'})
                    $('#tipMsgModal').modal(tipMsgModal)
                    return;
                }
            })
    },
    contextTypes:{
        router: React.PropTypes.object
    },
    render(){
        var  navBar =  <NavTitle name="信息确认"  handleClick={this.backClick}/>
        document.body.style.paddingTop = '44px';
        //if(titleNative.getTitleNative(true)){
        //    var  navBar =  <NavTitle name="信息确认"  handleClick={this.backClick}/>
        //}else{
        //    titleNative.getTitleNative('信息确认')
        //}
        var initImg = this.state.checkBoxImg ? checkInit : checkClick;
        return(
            <div>
                <TipMsg tipMsg={this.state.tipMsg} />
                {navBar}
                <div className="divParent" style={{marginTop:'24px',marginBottom:'15px'}}>
                    <div className="divChildLeft">
                      提交信息&nbsp;&nbsp;
                    </div>
                    <div className="divChildRight" style={{height: '22px'}}>
                    </div>
                </div>
                <div className="divParent">
                    <div className="divChildLeft">
                        姓&nbsp; 名：
                    </div>
                    <div className="divChildRight">
                        <span>
                              {this.state.nameValue ? this.state.nameValue: '----'}
                        </span>
                    </div>
                </div>
                <div className="divParent">
                    <div className="divChildLeft">
                        手机号：
                    </div>
                    <div className="divChildRight">
                        {this.state.phoneValue ? this.state.phoneValue : '-----'}
                    </div>
                </div>
                <div className="divParent">
                    <div className="divChildLeft">
                        员工号：
                    </div>
                    <div className="divChildRight">
                        <span>
                             {this.state.numberValue ? this.state.numberValue: '----'}
                        </span>
                    </div>
                </div>
                <div className="divParent">
                    <div className="divChildLeft">
                        所在部门：
                    </div>
                    <div className="divChildRight">
                        <span>
                               {this.state.departmentValue ? this.state.departmentValue: '----'}
                        </span>
                    </div>
                </div>
                <div className="confirmDiv">
                    <div className="confirmDivLeft"><img src={initImg} onClick={this.handleClick}  className="checkBoxImg"/></div>
                    <div className="confirmDivRight">本人已阅读并同意<span className="deal">《经纪人协议》</span></div>
                </div>
                <div className="btnDiv">
                    <button   type="button" className="btnSubmit" data-toggle="button" onClick={this.confirmClick}>确定</button>
                </div>
            </div>
        )
    }
})

export default ApplyStepOne