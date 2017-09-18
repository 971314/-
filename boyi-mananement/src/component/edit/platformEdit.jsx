/**
 * Created by xiajing on 2016/11/8.
 */
import React, {Component} from 'react';
import checkBoxOne from '../../images/checkBoxOne.png'
import checkBoxTwo from '../../images/checkBoxtwo.png'
import BackTitle from '../publicComponent/backTitle.jsx'
import { getStorage,saveStorage } from '../../util/storageData.js'
import {createNewVer, historyType, editHttpUrl, typeTwo,productTypeAndroid,appVersionHttpUrl,queryNewVersion} from '../../util/config.js'
import TipMsgInfo from '../publicComponent/tipMsgInfo.jsx';
class PlatFormEdit extends Component{
    constructor(props){
        super(props);
        this.state = { checkOne: false, checkTwo: false,productId:'',version:'',errMsg:'',
            newVersionList:[],
            versionType:'',
            productID:'',
            newVersionAndorid:'',
            newVersionIos:'',
            productType:'',msg:''
        }
    }
    componentDidMount(){
        var _this = this;
        //previewEditInfo
        var info = getStorage("modifyVersionInfo");
        if(info != null || info !=''){
            var data = JSON.parse(info);
            //alert(data.productId)
            _this.setState({productId:data.productID,version:data.appVersion,sourceVersion:data.sourceVersion})
        }
        var _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var info = JSON.parse(tokenInfo);
            //查询最新应用的版本
            $.ajax({
                url:httpsUrl+appVersionHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:queryNewVersion,
                        id:info.id,
                        token:info.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        if(data.data[0]){
                            //productID  newVersion 一开始给个默认值表示默认选中的版本
                            _this.setState({newVersionList:data.data,productID:data.data[0].productID,newVersion:data.data[0].appRecentVersion})
                        }else{
                            //如果data没有值就是没有版本信息要去原生版本管理里面添加版本号
                            $('#tipMsgDialog').modal(tipMsgDialog)
                            _this.setState({msg:'请到原生版本管理模块添加版本号！'})
                        }
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }else{
                        _this.setState({errMsg:data.msg})
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    //跳转到原生模块 添加版本号
    tipMsgClick(){
        $('#tipMsgDialog').modal('hide')
        this.context.router.push("/nativeVerManage?title=原生版本管理");
    }
    //确定
    btnConfirm(){
            var _this = this;
            var productType = _this.state.productType;
            if(_this.state.checkOne == true && _this.state.checkTwo == true){
                productType =  3//全部
            }
            var tokenInfo = getStorage("tokenInfo");
            if(tokenInfo !=null){
                var info = JSON.parse(tokenInfo);
                if( _this.state.checkOne == false &&  _this.state.checkTwo == false){
                    _this.setState({errMsg:"请选择创建新资源的平台！"})
                    return;
                }
                $.ajax({
                    url:httpsUrl+editHttpUrl,
                    method:'post',
                    dataType:'json',
                    xhrFields:{withCredentials: true},
                    crossDomain:true,
                    data:{
                        json:JSON.stringify({
                            func:createNewVer,
                            id:info.id,
                            fromAppVersion:_this.state.version,
                            fromSourceVersion:_this.state.sourceVersion,
                            fromProductID:_this.state.productId,
                            flag:productType,
                            appVersion1:_this.state.newVersionIos,//ios
                            appVersion2:_this.state.newVersionAndorid,//安卓
                            type:typeTwo,
                            token:info.token
                        })
                    },
                    success:function(data){
                        if(data.status == 0){
                            console.log("success")
                            let versionName = _this.state.productId == productTypeAndroid ? '安卓':'苹果'
                            _this.context.router.push('indexEdit/4?title='+versionName+'&showInfo=4');
                            var obj = {productID:_this.state.productID,appVersion:data.appVersion,productType:data.flag}//缓存资源包的版本号
                            saveStorage("versionInfo",obj)
                            if(obj){
                                window.location.reload();//重载页面
                            }
                        }else if(data.status == '-2' || data.status == '-9'){
                            _this.context.router.push('/');
                        }else{
                            _this.setState({errMsg:data.msg})
                        }
                    },error:function(){
                        console.log("服务器异常！")
                    }
                })
            }
    }
    checkBoxOneClick(productId,version){
        this.setState({checkOne:!this.state.checkOne,newVersionAndorid:version,productID:productId,errMsg:'',productType:2})
        //this.setState({checkTwo:false})
    }
    checkBoxTwoClick(productId,version){
        this.setState({checkTwo:!this.state.checkTwo,newVersionIos:version,productID:productId,errMsg:'',productType:1})
        //this.setState({checkOne: false})
    }
    backClick(){
       //console.log(this)
        this.props.router.goBack()
    }
    render(){
        var checkOne = this.state.checkOne ?  checkBoxTwo : checkBoxOne;
        var checkTwo = this.state.checkTwo ?  checkBoxTwo : checkBoxOne;
        var _this = this;
        return(
            <div className="rightDivInfo">
                <TipMsgInfo   msg={this.state.msg}
                              tipMsgClick={this.tipMsgClick.bind(this)}/>
                    <BackTitle backClick={this.backClick.bind(this)}/>
                    <div className="loginDiv" style={{height:'400px'}}>
                        <span className="loginName">请选择需要创建新资源库的平台</span>
                        <div style={{marginTop:'52px'}}>
                        {
                            this.state.newVersionList.map(function(data){
                                return(
                                    <div className="platEdDiv">
                                        <span className="platSpanOne">
                                         {data.productID == productTypeAndroid ? <img src={checkOne} onClick={_this.checkBoxOneClick.bind(_this,data.productID,data.appRecentVersion)}/>
                                             : <img src={checkBoxOne} src={checkTwo} onClick={_this.checkBoxTwoClick.bind(_this,data.productID,data.appRecentVersion)}/>}
                                        </span>
                                        <span className="platSpanTwo"> {data.productID == productTypeAndroid ? '安卓' :'苹果'}</span>
                                        <span>{data.appRecentVersion}</span>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className="textCenter">
                            <button type="button" className="btnInfoConfirm" onClick={this.btnConfirm.bind(this)}>确定</button>
                            <button type="button" className="btnInfoCancel" onClick={()=>this.props.router.goBack()}>取消</button>
                        </div>
                        <div className="errMsgInfo">{this.state.errMsg}</div>
                    </div>
            </div>
        )
    }
}
PlatFormEdit.contextTypes = {
    router: React.PropTypes.isRequired
}
export default PlatFormEdit