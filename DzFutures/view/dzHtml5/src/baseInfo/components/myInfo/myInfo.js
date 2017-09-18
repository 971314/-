/**
 * Created by xiajing on 2016/8/15.
 */
import React from 'react';
import { Link } from 'react-router'
import titleNative from '../../util/titleNative.js';
import NavTitle from '../publicConponents/navTitle.js';
import leftInit from '../../image/other/leftInit.png'
import photo from '../../image/other/photo.png'
import jewelInit from '../../image/other/jewelInit.png'
import myData from '../../image/myInfo/myData.png'
import myBill from '../../image/myInfo/myBill.png'
import myFeture from '../../image/myInfo/myFeture.png'
import myMake from '../../image/myInfo/myMake.png'
import mySimulat from '../../image/myInfo/mySimulat.png'
import linkMan from '../../image/myInfo/linkMan.png'
import myBillAccount from '../../image/myInfo/myBillAccount.png'
import myBank from '../../image/myInfo/myBank.png'
import order from '../../image/myInfo/order.png'
import linkManBill from '../../image/myInfo/linkManBill.png'
import myAccount from '../../image/myInfo/myAccount.png'
import inviteAccount from '../../image/myInfo/inviteAccount.png'
import joinDZ from '../../image/myInfo/joinDZ.png'
import help from '../../image/myInfo/help.png'
import feedback from '../../image/myInfo/feedback.png'
import setting from '../../image/myInfo/setting.png'
import {storePublicData,getAppCertifyInfo} from '../../util/native.js'
import {indexPageId} from '../../util/nativeConfig.js'
const MyInfo = React.createClass({
    outLoginClick:function(){
    //退出登录到首页
        storePublicData('0');
        window.location.href='pobo:user/index.html?pageId=900001';
    },
    getInitialState:function(){
       return{ phoneValue:''}
    },
    componentDidMount:function(){
        var phone = getAppCertifyInfo();
        if(phone){
           this.setState({phoneValue:phone})
        }
    },
       render(){
           if(titleNative.getTitleNative(true)){
               //titleNativePass(true) == true  就显示自己写的title 否则掉原生的title
               var  navBar =  <NavTitle name="我的"  handleClick={this.backClick}/>
           }else{
               titleNative.getTitleNative('我的')
           }
           document.body.addEventListener('touchstart', function () { });
               return(
               <div className='myInfoDiv'>
                   {navBar}
                   <div className="list-ul" style={{height:'158.5px',marginTop:'0px'}}>
                       <ul>
                           <li className="login-bottom" style={{height:'67.5px'}}>
                               <div className="myPhotoLeft"><img src={photo} className="photoImg"/></div>
                               <div className="login-rightDiv"><span id="phoneShow">----</span>
                                   <div className="photoBox">
                                        <div className="pDiv1"><img src={jewelInit}/></div>
                                        <div className="splitLine"></div>
                                        <div className="pDiv2">普通会员</div>
                                   </div>
                               </div>
                           </li>
                           <a  className="clickChange" href="pobo:fuwu.html?pageId=900004&title=我的资料">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgOne" src={myData}/></div>
                                   <div className="myInfo-rightDiv">我的资料</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a >
                           <a  className="clickChange" href="pobo:fuwu.html?pageId=900004&title=资产">
                               <li>
                                   <div className="myInfo-leftDiv"><img className="myInfoImgTwo" src={myBill}/></div>
                                   <div className="myInfo-rightDiv">资产</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                       </ul>
                   </div>
                   <div className="list-ul" style={{height:'180px',marginTop:'10px'}}>
                       <ul>
                           <a    className="clickChange" href="pobo:fuwu.html?pageId=900004&title=期货">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgOne" src={myFeture}/></div>
                                   <div className="myInfo-rightDiv">期货</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <a   className="clickChange" href="pobo:fuwu.html?pageId=900004&title=我的预约">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgThree" src={myMake}/></div>
                                   <div className="myInfo-rightDiv">我的预约</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <a   className="clickChange" href="pobo:fuwu.html?pageId=900004&title=我的仿真">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgOne" src={mySimulat}/></div>
                                   <div className="myInfo-rightDiv">我的仿真</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <a   className="clickChange" href="pobo:pageId=800007&tel=4008859999">
                               <li>
                                   <div className="myInfo-leftDiv"><img className="myInfoImgTwo" src={linkMan}/></div>
                                   <div className="myInfo-rightDiv">联系客户经理</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                       </ul>
                   </div>

                   <div className="list-ul" style={{height:'180px',marginTop:'10px'}}>
                       <ul>
                           <a   className="clickChange" href="pobo:fuwu.html?pageId=900004&title=我的财富账号">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgThree" src={myBillAccount}/></div>
                                   <div className="myInfo-rightDiv">我的财富账号</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <a   className="clickChange" href="pobo:fuwu.html?pageId=900004&title=我的银行卡">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgOne" src={myBank}/></div>
                                   <div className="myInfo-rightDiv">我的银行卡</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <a   className="clickChange" href="pobo:fuwu.html?pageId=900004&title=订单">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgOne" src={order}/></div>
                                   <div className="myInfo-rightDiv">订单</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <a   className="clickChange" href="pobo:pageId=800007&tel=4008859999">
                               <li>
                                   <div className="myInfo-leftDiv"><img className="myInfoImgTwo" src={linkManBill}/></div>
                                   <div className="myInfo-rightDiv">联系理财师</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                       </ul>
                   </div>

                   <div className="list-ul" style={{height:'135px',marginTop:'10px'}}>
                       <ul>
                           <a className="clickChange" href="pobo:fuwu.html?pageId=900004&title=我的客户">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgOne" src={myAccount}/></div>
                                   <div className="myInfo-rightDiv">我的客户</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <a href="pobo:fuwu.html?pageId=900004&title=邀请客户" className="clickChange">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgOne" src={inviteAccount}/></div>
                                   <div className="myInfo-rightDiv">邀请客户</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <li>
                               {
                                   //<Link to="pobo:user/my.html#/join?pageId=900005">
                                   //<a href="pobo:user/joinDz.html?pageId=900005">
                                   // <a href="../user/joinDz.html">
                               }
                               <a  href="pobo:user/joinDz.html?pageId=900005" className="clickChange">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgTwo" src={joinDZ}/></div>
                                   <div className="myInfo-rightDiv">加入东证</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </a>
                           </li>
                       </ul>
                   </div>

                   <div className="list-ul" style={{height:'225px',marginTop:'10px'}}>
                       <ul >
                           <a  className="clickChange" href="pobo:fuwu.html?pageId=900004&title=帮助中心">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgTwo" src={help}/></div>
                                   <div className="myInfo-rightDiv">帮助中心</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <a  className="clickChange" href="pobo:fuwu.html?pageId=900004&title=意见反馈">
                               <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgOne" src={feedback}/></div>
                                   <div className="myInfo-rightDiv">意见反馈</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </li>
                           </a>
                           <a  className="clickChange" href="pobo:fuwu.html?pageId=900004&title=交易设置">
                               <li className="login-bottom">
                                   <a href="pobo:pageId=805006">
                                       <div className="myInfo-leftDiv"><img className="myInfoImgTwo" src={setting}/></div>
                                       <div className="myInfo-rightDiv">交易设置</div>
                                       <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                                   </a>
                               </li>
                           </a>
                               <a  className="clickChange" href="pobo:pageId=805007">
                                   <li className="login-bottom">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgTwo" src={setting}/></div>
                                   <div className="myInfo-rightDiv">系统设置</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                                   </li>
                               </a>

                           <li>
                               <a  className="clickChange" href="pobo:pageId=805009">
                                   <div className="myInfo-leftDiv"><img className="myInfoImgTwo" src={joinDZ}/></div>
                                   <div className="myInfo-rightDiv">版本说明</div>
                                   <div className="div3Left"><img src={leftInit} className="imgLeft"/></div>
                               </a>
                           </li>
                       </ul>
                   </div>


                   <div className="outLogin">
                         <div style={{lineHeight:'43px'}} onClick={this.outLoginClick}>安全退出</div>
                   </div>
               </div>
           )
       }
})
export default MyInfo
