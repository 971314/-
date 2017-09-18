/**
 * Created by xiajing on 2016/8/15.
 */

import React from 'react';
import titleNative from '../../util/titleNative.js';
import NavTitle from '../publicConponents/navGoBackTitle.js';
import { Link } from 'react-router';
import  leftImg from '../../image/other/leftInit.png';
import {baseInfo} from '../../util/config.js'
const JoinDZ = React.createClass({
    componentDidMount:function(){
        //$.ajax({
        //    url: dzHttpUrl,
        //    method: 'post',
        //    contentType:'application/json',
        //    data:JSON.stringify({
        //        func:baseInfo,
        //        type:loginType,
        //        account:'',
        //        token:'',
        //        data:[{30:'13411111111'} ]
        //    }),
        //    success:function(data){
        //
        //    },error:function(data){
        //
        //    }
        //})
    },
    backClick:function(){
        this.props.history.goBack()
    },
      render(){
          //if(titleNative.getTitleNative(true)){
          //    var  navBar =  <NavTitle name="我的"  handleClick={this.backClick}/>
          //}else{
          //    titleNative.getTitleNative('我的')
          //}
          var  navBar =  <NavTitle name="我的"  handleClick={this.backClick}/>
          document.body.style.paddingTop = '44px';
          return(
              <div className="myInfoDiv">
                  {navBar}
                  <div className="list-ul" style={{height:'135px',marginTop:'10px'}}>
                      <ul>
                          <Link to="/applyStepOne">
                              <li className="login-bottom">
                                  <div className="myInfo-rightDiv widthDiv">申请经纪人</div>
                                  <div className="div3Left"><img src={leftImg} className="imgLeft"/></div>
                              </li>
                          </Link>
                          <Link to="/applyBillStepOne">
                              <li className="login-bottom">
                                  <div className="myInfo-rightDiv widthDiv">申请理财师</div>
                                  <div className="div3Left"><img src={leftImg} className="imgLeft"/></div>
                              </li>
                          </Link>
                          <li >
                              <div className="myInfo-rightDiv widthDiv">东证招聘</div>
                              <div className="div3Left"><img src={leftImg} className="imgLeft"/></div>
                          </li>
                      </ul>
                  </div>
              </div>
          )
      }
})

export default JoinDZ
