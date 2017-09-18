/**
 * Created by xiajing on 2016/11/8.
 */
import React, {Component} from 'react';
import checkBoxOne from '../../images/checkBoxOne.png';
import checkBoxTwo from '../../images/checkBoxtwo.png';
import { appVersionHttpUrl,queryHttpUrl, queryNewVersion, createNewVer,
    editHttpUrl,historyType,productTypeIOS,productTypeAndroid,historyPvw,typeFive,productNone} from '../../util/config.js';
import { saveStorage, getStorage, saveLocalStorage, getLocalStorage} from '../../util/storageData.js';
import TipMsgInfo from '../publicComponent/tipMsgInfo.jsx';
class InitNewVersion extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkOne: false,
            checkTwo: false,
            newVersionList:[],
            productID:'',
            newVersionAndorid:'',
            newVersionIos:'',
            newVersion:'',
            errMsg:'',
            msg:'',
            productType:'',
            createBtnShow:true
        }
    }
    componentDidMount(){
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
                        _this.setState({createBtnShow:true})
                        if(data.data[0]){
                            //productID  newVersion 一开始给个默认值表示默认选中的版本
                            _this.setState({newVersionList:data.data,productID:data.data[0].productID,newVersion:data.data[0].appRecentVersion})
                        }else{
                            //如果data没有值就是没有版本信息要去原生版本管理里面添加版本号
                            $('#tipMsgDialog').modal(tipMsgDialog)
                            _this.setState({msg:'请到原生版本管理模块添加版本号！'})
                        }
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.setState({createBtnShow:true})
                        _this.context.router.push('/');
                    }else{
                        _this.setState({errMsg:data.msg,createBtnShow:false})
                    }
                },error:function(){
                    _this.setState({createBtnShow:true})
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
    checkBoxOneClick(productID,version){
        this.setState({checkOne:!this.state.checkOne,productID:productID,newVersionAndorid:version,productType:2})
        this.setState({errMsg:''})//清空信息
        //console.log(productID+"==="+version)
    }
    checkBoxTwoClick(productID,version){
        this.setState({checkTwo:!this.state.checkTwo,productID:productID,newVersionIos:version,productType:1})
       //console.log(productID+"==="+version)
        this.setState({errMsg:''})//清空信息
    }
    //创建新版本
    createNewVerInfo(){
        var _this = this;
        var productType = _this.state.productType;
        if(_this.state.checkOne == true && _this.state.checkTwo == true){
            productType =  3//全部
        }
        //console.log(productType)
        if(this.state.productID == ''){
            //如果data没有值就是没有版本信息要去原生版本管理里面添加版本号
            $('#tipMsgDialog').modal(tipMsgDialog)
            _this.setState({msg:'请到原生版本管理模块添加版本号！'})
        }else{
            if(this.state.checkOne == false  && this.state.checkTwo == false){
                _this.setState({errMsg:"请选择创建的版本！"})
                return;
            }
            var tokenInfo = getStorage("tokenInfo");
            if(tokenInfo !=null){
                var info = JSON.parse(tokenInfo);
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
                            appVersion1:_this.state.newVersionIos,//ios
                            appVersion2:_this.state.newVersionAndorid,//安卓
                            //productID:_this.state.productID,
                            flag:productType,//2：安卓 1：苹果 3：全部
                            type:historyType,
                            token:info.token
                        })
                    },
                    success:function(data){
                        if(data.status == 0){
                            //console.log(this.state.productID+"===="+this.state.newVersion)
                            //缓存版本信息
                            var obj = {productID:_this.state.productID,appVersion:data.appVersion,productType:data.flag}//缓存资源包的版本号
                            saveStorage("versionInfo",obj)
                            let versionName = _this.state.productID == productTypeAndroid ? '安卓':'苹果'
                            _this.context.router.push('indexEdit/4?title='+versionName);
                            location.reload();//重载页面
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
    }
     render(){
         var checkOne = this.state.checkOne ?  checkBoxTwo : checkBoxOne;
         var checkTwo = this.state.checkTwo ?  checkBoxTwo : checkBoxOne;
         var createBtnShow = this.state.createBtnShow ?   <button type="button" className="btnInfo"  onClick={this.createNewVerInfo.bind(this)}>创建</button> :''
         var _this = this;
         return(
             <div className="rightDivInfo">
                 <TipMsgInfo tipMsgClick={_this.tipMsgClick.bind(_this)} msg={this.state.msg}/>
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
                                     <span className="platSpanTwo">
                                         {data.productID == productTypeAndroid ? '安卓' :'苹果'}
                                     </span>
                                     <span>{data.appRecentVersion}</span>
                                 </div>
                             )
                         })
                     }
                     </div>
                     <div className="textCenter create">
                         {createBtnShow}
                     </div>
                     <div className="errMsgInfo">{this.state.errMsg}</div>
                 </div>
             </div>
         )
     }
}

InitNewVersion.contextTypes = {
    router: React.PropTypes.isRequired
}
export default InitNewVersion