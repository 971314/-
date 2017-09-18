/**
 * Created by xiajing on 2016/8/15.
 */
import React from 'react';
import NavTitle from '../publicConponents/noBackNavTitle.js';
import titleNative from '../../util/titleNative.js';
import registerSuc from '../../image/registerSuc.png';
import { getSendMessageToNative,getStorageInfo,storePublicData} from '../../util/native.js'
const RegisterStepFour = React.createClass({
    backClick:function(){
        this.props.history.goBack()
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    confirmClick:function(){
        storePublicData('1');//设置为1来判断是否是游客(非游客)
        var suc = getStorageInfo("nativeSaveSuc");
        var prefect = getStorageInfo("perfectDSInfo")//获取登录状态返回2的时候返回的要完善信息的信息
        if(suc){
            var sucData = JSON.parse(suc)
            var obj={loginName:sucData.loginName,
                     userId :sucData.userId, token :sucData.token,
                     tokenBeginTime: sucData.tokenBeginTime, tokenActiveTime :sucData.tokenActiveTime,
                     pwd :sucData.pwd, loginType : sucData.loginType }
            console.log(obj)
            getSendMessageToNative(obj);
        }
        if(prefect){//完善信息
            var prefectData = JSON.parse(prefect)
            var obj={loginName:prefectData.loginName,
                userId :prefectData.userId, token :prefectData.token,
                tokenBeginTime: prefectData.tokenBeginTime, tokenActiveTime :prefectData.tokenActiveTime,
                pwd :prefectData.pwd, loginType : prefectData.loginType }
            console.log(obj)
            getSendMessageToNative(obj);
        }
    },
    render(){
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
                {navBar}
                <div className="sucBg">
                    <div className="stepFourDiv">
                        <img src={registerSuc} className="sucImgTop"/>
                    </div>
                    <div className="stepFourDiv span1">
                        注册成功
                    </div>
                    <div className="stepFourDiv span2">
                        您可以用手机号直接登录
                    </div>
                    <div className="btnDiv" style={{marginTop:'28px'}}>
                        <button   type="button" className="btnSubmit" onClick={this.confirmClick}    data-toggle="button">确定 </button>
                    </div>
                </div>

            </div>
        )
    }
})
export default RegisterStepFour