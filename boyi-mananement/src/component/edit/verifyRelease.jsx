/**
 * Created by xiajing on 2016/11/9.
 */
import React, {Component} from 'react';
import {editHttpUrl, fetchSourceModule, verifyInfo, releaseInfo, validateHttpUrl, typeOne,downHttpUrl,downFile } from '../../util/config.js';
import { saveStorage, getStorage, getLocalStorage } from '../../util/storageData.js';
import NoneList from '../publicComponent/noneList.jsx';
import TipMsgInfo from '../publicComponent/tipMsgInfo.jsx';
import { phoneRegexp } from '../../util/verifyRegular.js';
import {clickTable} from '../../util/menuList.js'
class VerifyRelease extends Component{
    constructor(props){
       super(props);
        this.state = {
            resourceList : [],
            msg:'',
            tipMsg:'',
            curVersion:'',//原生版本号
            curProductId:'',
            curResourceVersion:'',//资源版本号
            tokenInfoID:'',
            tokenInfoToken:'',
            checkBtnFlag:true,
            releaseBtnFlag:true,
            productType:'',
            createDate:'',
            operatorName:'',
            releaseValue:'',
            fullRadioValue:0,//默认0:增量, 1:全量

        }
    }
    componentDidMount(){
        var _this =this;
        var selectVer  = getStorage("versionInfo");
        var tokenInfo = getStorage("tokenInfo");
        console.log(selectVer)
        if(selectVer !='' && selectVer != null){
            let data = JSON.parse(selectVer);
            var info = JSON.parse(tokenInfo);
            _this.setState({curVersion:data.appVersion,curProductId:data.productID,
                curResourceVersion:data.sourceVersion,tokenInfoToken:info.token,tokenInfoID:info.id, productType:data.productType})//当前的版本信息
            $.ajax({
                url:httpsUrl+editHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:fetchSourceModule,
                        id:info.id,
                        flag:data.productType,
                        token:info.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        console.log(data)
                        //console.log(data.createTime)
                        //console.log(data.data[1].modifyTime)
                        //if(data.createTime == data.data[1].modifyTime){
                        //    alert("否")
                        //}else{
                        //    alert("是")
                        //}
                        _this.setState({resourceList: data.data,createDate:data.createTime,operatorName:data.operatorName})
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    //验证和发布
    handleInfoClick(value){
        this.setState({releaseValue:value})
        var _this =this;
            if(value == 1){//验证
                let releaseWay = _this.refs.releaseWay.value;
                let descRefs = _this.refs.descRefs.value;
                if(!releaseWay){
                    _this.setState({tipMsg:'请选择升级方式！'})
                    return;
                }
                if(!descRefs){
                    _this.setState({tipMsg:'请输升级说明！'})
                    return;
                }
                _this.setState({checkBtnFlag:false})
                $.ajax({
                    url:httpsUrl+validateHttpUrl,
                    method:'post',
                    dataType:'json',
                    xhrFields:{withCredentials: true},
                    crossDomain:true,
                    data:{
                        json:JSON.stringify({
                            func:verifyInfo,
                            id:_this.state.tokenInfoID,
                            flag:_this.state.productType,
                            fullupdate:_this.state.fullRadioValue,
                            para:{
                                comment:descRefs,
                                type:releaseWay
                            },
                            token:_this.state.tokenInfoToken
                        })
                    },
                    success:function(data){
                        _this.setState({checkBtnFlag:true})
                        if(data.status == 0){
                            _this.setState({msg:'验证成功！'})
                            $("#tipMsgDialog").modal(tipMsgDialog)
                        }else if(data.status == '-2' || data.status == '-9'){
                            _this.context.router.push('/');
                        }else{
                            _this.setState({msg:data.msg})
                            $("#tipMsgDialog").modal(tipMsgDialog)
                        }
                    },error:function(){
                        _this.setState({checkBtnFlag:true})
                        _this.setState({msg:'服务器异常！'})
                        $("#tipMsgDialog").modal(tipMsgDialog)
                    }
                })
            }else if(value == 2){
                //let nativeUrl = _this.refs.nativeUrl.value;
                let releaseWay = _this.refs.releaseWay.value;
                let descRefs = _this.refs.descRefs.value;
               // let versionRefs = _this.refs.versionRefs.value;
                //let phone = _this.refs.phone.value;
                //let array = phone.split(",");
                //var phoneValue;
                //for(var value in array){//如果手机号为多个就循环取出
                //    phoneValue= array[value]
                //}
               // let releaseNum = _this.refs.releaseNum.value;

                //if(!nativeUrl){
                //    _this.setState({tipMsg:'请输入url地址！'})
                //    return;
                //}
                if(!releaseWay){
                    _this.setState({tipMsg:'请选择升级方式！'})
                    return;
                }
                //if(!versionRefs){
                //    _this.setState({tipMsg:'请输入版本号！'})
                //    return;
                //}
                //if(!phone){
                //    _this.setState({tipMsg:'请输入手机号！'})
                //    return;
                //}
                ////if(!phoneRegexp.test(phoneValue)){
                ////    _this.setState({tipMsg:'请正确输入手机号！'})
                ////    return;
                ////}
                //if(!releaseNum){
                //    _this.setState({tipMsg:'请输入允许升级的最大次数！'})
                //    return;
                //}
                if(!descRefs){
                    _this.setState({tipMsg:'请输升级说明！'})
                    return;
                }
                _this.setState({releaseBtnFlag:false})
                $.ajax({
                    url:httpsUrl+validateHttpUrl,
                    method:'post',
                    dataType:'json',
                    xhrFields:{withCredentials: true},
                    crossDomain:true,
                    data:{
                        json:JSON.stringify({
                            func:releaseInfo,
                            id:_this.state.tokenInfoID,
                            flag:_this.state.productType,
                            fullupdate:_this.state.fullRadioValue,
                            para:{
                                comment:descRefs,
                                type:releaseWay
                            },
                            token:_this.state.tokenInfoToken
                        })
                    },
                    success:function(data){
                        _this.setState({releaseBtnFlag:true})
                        if(data.status == 0){
                            _this.setState({msg:'发布成功！'})
                            $("#tipMsgDialog").modal(tipMsgDialog)
                            //要把版本信息清空
                            sessionStorage.removeItem("versionInfo")
                        }else if(data.status == '-2' || data.status == '-9'){
                            _this.context.router.push('/');
                        }else{
                            _this.setState({msg:data.msg})
                            $("#tipMsgDialog").modal(tipMsgDialog)
                        }
                    },error:function(){
                        _this.setState({releaseBtnFlag:true})
                        _this.setState({msg:'服务器异常！'})
                        $("#tipMsgDialog").modal(tipMsgDialog)
                    }
                })
            }else if(value == 0){//预览
                _this.context.router.push('/historyPvw/1?title=预览&flag='+_this.state.productType+'');
            }else if(value == 3){//下载
                var _this = this;
                var url= httpsUrl+downHttpUrl + '?type=' + typeOne + '&func='+downFile+'&flag='+_this.state.productType+'&id='+_this.state.tokenInfoID+'&token='+encodeURIComponent( _this.state.tokenInfoToken);
                $("#downUrl").attr('href',url);
                $("#downUrl").attr('download',url);
                window.setTimeout(function () {
                    $("#downUrl")[0].click();
                }, 1000)
               // window.location.href = downHttpUrl + '?type=' + typeOne + '&func='+downFile+'&flag='+_this.state.productType+'&id='+_this.state.tokenInfoID+'&token='+encodeURIComponent( _this.state.tokenInfoToken);
            }
    }
    tipMsgClick(){
        $("#tipMsgDialog").modal('hide')
        if(this.state.releaseValue == 2){//发布
            this.context.router.push('/summaryInfo?title=概要信息');
            window.location.reload();//重载页面
        }
    }
    focusClick(){
        this.setState({tipMsg:''})
    }
    goBack(){
        this.props.router.goBack()
    }
    fullRadioClick(flag){
        this.setState({fullRadioValue:flag})
    }
    render(){
        clickTable();
        var checkBtnFlag = this.state.checkBtnFlag ?   <button type="button" class="verifyBgBtn" onClick={this.handleInfoClick.bind(this,1)}>验证</button> :   <button type="button" class="verifyBgBtnCCC">验证</button>;
        var releaseBtnFlag =  this.state.releaseBtnFlag ?   <button type="button" class="verifyBtn"   onClick={this.handleInfoClick.bind(this,2)}>发布</button> :  <button type="button" class="verifyBtnCCC">发布</button>;
        return(
            <div className="rightDivInfo">
                <a id="downUrl" className="downUrl"  rel="nofollow"></a>
                <CurPvwTitle    goBack={this.goBack.bind(this)}
                                curVersion={this.state.curVersion}
                                curResourceVersion={this.state.curResourceVersion}/>
                <TipMsgInfo   msg={this.state.msg}
                              tipMsgClick={this.tipMsgClick.bind(this)}/>
                {this.state.resourceList && this.state.resourceList.length != 0 ? <VerifyList resourceList={this.state.resourceList}
                                                                                              createDate={this.state.createDate}
                                                                                              operatorName={this.state.operatorName}/> : ''}
              <div>

                  {
                      //  <button type="button" class="verifyBgBtn" onClick={this.handleInfoClick.bind(this,1)}>验证</button>
                      //<button type="button" class="verifyBtn">下载</button>
                  }
              </div>
              <div className="releaseDiv">
                  <div style={{marginLeft:'89px'}}>
                      {
                          //<div className="relInfo">
                          //    <div className="refInfoLeft">
                          //        <span className="relName">原生url地址：</span>
                          //        <input type="text" onFocus={this.focusClick.bind(this)} ref="nativeUrl" className="refInput"/>
                          //    </div>
                          //</div>
                      }
                      <div className="relInfo">
                          <div className="refInfoLeft">
                              <span className="relName">升级方式：</span>
                              <select className="refSelect" ref="releaseWay">
                                  <option>静默</option>
                                  <option>强制</option>
                              </select>
                          </div>
                      </div>
                      <div className="relInfoText">
                          <span className="relName"> 资源全量更新：</span>
                          <label className="radioLab" for="full_0">
                              <input type="radio"   onClick={this.fullRadioClick.bind(this,0)}   name="fullupdate" defaultChecked/> 增量
                          </label>
                          <label for="full_1">
                              <input type="radio"   onClick={this.fullRadioClick.bind(this,1)}   name="fullupdate" /> 全量
                          </label>
                      </div>
                      {
                          /*<div className="relInfo">
                           <div className="refInfoLeft">
                           <span className="relName">版本号：</span>
                           <input type="text"   onFocus={this.focusClick.bind(this)} ref="versionRefs" className="refInput"/>
                           </div>
                           </div>
                           <div className="relInfo">
                           <div className="refInfoLeft">
                           <span className="relName">手机号：</span>
                           <input type="text" ref="phone"   onFocus={this.focusClick.bind(this)} className="refInput"/>
                           <span className="refMorePhone">*手机号可以为多个,请以逗号分割输入！</span>
                           </div>
                           </div>
                           <div className="relInfo" style={{marginTop:'-13px'}}>
                           <div className="refInfoLeft">
                           <span className="relName" style={{width: '146px', marginLeft: '-46px'}}> 允许最大升级人次：</span>
                           <input type="text"   onFocus={this.focusClick.bind(this)} ref="releaseNum" className="refInput"/>
                           </div>
                           </div>*/
                      }
                      <div className="relInfoText">
                          <span className="relName"> 升级说明：</span>
                          <textarea ref="descRefs" className="textarea" onFocus={this.focusClick.bind(this)}></textarea>
                      </div>
                      <div className="divOne">
                          <button type="button" class="verifyBgBtn" onClick={this.handleInfoClick.bind(this,0)}>预览</button>
                          {checkBtnFlag}
                          {releaseBtnFlag}
                          <button type="button" class="verifyBtn" onClick={this.handleInfoClick.bind(this,3)}>下载</button>
                      </div>
                      <div className="tipMsgRed">{this.state.tipMsg}</div>
                  </div>
              </div>
            </div>
        )
    }
}
class VerifyList extends Component{
    render(){
        var _this = this;
        return(
            <div className="summaryTable">
                <table class="table summaryTableWidth">
                    <thead>
                    <tr className="bgTr">
                        <th>模块名称</th>
                        <th>是否修改</th>
                        <th>变更日期</th>
                        <th>操作员</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.resourceList.map(function(data){
                            return(
                                <tr>
                                    <td>{data.comment}</td>
                                    <td>{_this.props.createDate == data.modifyTime ? '否' : '是'}</td>
                                    <td>{data.modifyTime}</td>
                                    <td>{_this.props.operatorName}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
class CurPvwTitle extends Component{
    render(){
        return(
            <div className="curPvwTitle">
                <span className="curPvwOne">当前版本信息
                   <span className="curLeft">{this.props.curVersion}</span>
                </span>
                <span className="curPvwOne goBack"  style={{float:'right'}} onClick={this.props.goBack.bind(this)}>返回>></span>
            </div>
        )
    }
}
VerifyRelease.contextTypes = {
    router: React.PropTypes.isRequired
}
export default VerifyRelease