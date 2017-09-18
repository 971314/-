/**
 * Created by xiajing on 2016/11/7.
 */
import React, {Component} from 'react';
import BackTitle from '../publicComponent/backTitle.jsx'
import {queryHttpUrl, summaryInfo,previewInfo,typeOne, queryDir, editHttpUrl, model,productTypeIOS,productTypeAndroid,productTypeAll  } from '../../util/config.js';
import { saveStorage, getStorage, getLocalStorage } from '../../util/storageData.js';
import { backRelease , showFile ,getFileType} from '../../util/verifyRegular.js';
import {initMenuList} from '../../util/menuList.js'
class  HistoryPvw extends Component{
    constructor(props){
        super(props);
        this.state = {
            operationDate:'',
            platForm:'',
            version:'',
            curStatue:'',
            operationPeople:'',
            menuList:[],
            showUrl:''
        }
    }
    componentDidMount(){
        //console.log(this)
        //console.log(this.props.location.query.flag)
        var previewShowInfo = getStorage("previewShowInfo")
        if(previewShowInfo != null && previewShowInfo != ''){
            var data = JSON.parse(previewShowInfo);
            this.setState({
                operationDate:data.date,
                platForm:data.productId,
                version:data.appVersion,
                curStatue:data.flag,
                operationPeople:data.operatorName
            })
        }
        this.featchDirList();
        this.fetchSummary();
    }
    //查询目录结构
    featchDirList(){
        var _this =this;
        var tokenInfo = getStorage("tokenInfo");
        var previewShowInfo = getStorage("previewShowInfo")
        //var version = getStorage("versionInfo");
        var info;
        var data;
        var appVersion;
        var sourceVersion;
        var productId;
        if( tokenInfo != null){
           info = JSON.parse(tokenInfo);
        }
        if(previewShowInfo != null){
            data = JSON.parse(previewShowInfo);
            appVersion = data.appVersion;
            sourceVersion = data.sourceVersion;
            productId = data.productId;
        }
        $.ajax({
            url:httpsUrl+editHttpUrl,
            method:'post',
            dataType:'json',
            xhrFields:{withCredentials: true},
            crossDomain:true,
            data:{
                json:JSON.stringify({
                    func:queryDir,
                    id:info.id,
                    type:typeOne,
                    model:model,
                    flag:_this.props.location.query.flag,
                    appVersion:appVersion,
                    sourceVersion:sourceVersion,
                    productID:productId,
                    token:info.token
                })
            },
            success:function(data){
                if(data.status == 0){
                    console.log(data)
                    //移除不必要展示的文件
                   // $.inArray(getFileType(menuListObj.fileName), showFile) == -1 ? '' : menuListObj.fileName
                    _this.setState({menuList: data.dir})
                    initMenuList()
                }else if(data.status == '-2' || data.status == '-9'){
                    _this.context.router.push('/');
                }
            },error:function(){
                console.log("服务器异常！")
            }
        })
    }
    fetchSummary() {
        var _this = this;
        if(this.props.location.query.flag){//从验证发布预览里面获取的基本信息
            var tokenInfo = getStorage("tokenInfo");
            if (tokenInfo != null) {
                var info = JSON.parse(tokenInfo);
                //获取版本信息
                $.ajax({
                    url: httpsUrl+queryHttpUrl,
                    method: 'post',
                    dataType: 'json',
                    xhrFields: {withCredentials: true},
                    crossDomain: true,
                    data: {
                        json: JSON.stringify({
                            func: summaryInfo,
                            id: info.id,
                            token: info.token
                        })
                    },
                    success: function (data) {
                        console.log(data)
                        if (data.status == 0) {
                            var productId;
                            var flag;
                            for(var  value in data.data){
                                productId = data.data[value].productID,
                                flag = data.data[value].flag;
                                if(productId == _this.props.location.query.flag && flag !=4){
                                    _this.setState({
                                        operationDate:data.data[value].createTime,
                                        platForm:productId,
                                        version:data.data[value].appVersion,
                                        curStatue:flag,
                                        operationPeople:data.data[value].operatorName
                                    })
                                }
                                //console.log(productId+"===="+flag)
                            }
                            //_this.setState({summaryList: data.data})
                        } else if (data.status == '-2' || data.status == '-9') {
                            _this.context.router.push('/');
                        }
                    }, error: function () {
                        _this.setState({loadingImgFlag: false})
                        console.log("服务器异常！")
                    }
                })
         }
        }
    }
    /*
     递归生成菜单
     */
    menuListInfo(menuListObj){
        let vdom = [];
        if(menuListObj instanceof Array){
            let list = [];
            for(var item of menuListObj){
                list.push(this.menuListInfo(item))
            }
            vdom.push(
                <ul key="single">
                    {list}
                </ul>
            )
        }else{
             if(menuListObj.type ==2){
              if($.inArray(getFileType(menuListObj.fileName), showFile) != -1 ){
              //if(showFile.indexOf(getFileType(menuListObj.fileName)) != -1){
                    vdom.push(
                        <li key={menuListObj.type}>
                            <a onClick={this.OnMenuClick.bind(this,menuListObj.type,menuListObj.filePath)}>
                                {
                                    menuListObj.fileName
                                    //$.inArray(getFileType(menuListObj.fileName), showFile) == -1 ? '' : menuListObj.fileName
                                }
                            </a>
                            {this.menuListInfo((menuListObj.childs))}
                        </li>
                    )
              }
            }else{
                 vdom.push(
                     <li key={menuListObj.type}>
                         <a onClick={this.OnMenuClick.bind(this,menuListObj.type,menuListObj.filePath)}>
                             {
                                 menuListObj.fileName
                                 //$.inArray(getFileType(menuListObj.fileName), showFile) == -1 ? '' : menuListObj.fileName
                             }
                         </a>
                         {this.menuListInfo((menuListObj.childs))}
                     </li>
                 )
             }
        }
        return vdom;
    }
    OnMenuClick(type,filePath,e){
        var _this = this;
        //console.log(filePath.replace(backRelease))
        //let node = $(e.target);
        //let subMenu = node.next();
       // subMenu.css("display",subMenu.css('display') == "none" ? "block" : "none");
        if(type == 2){//如果type==2代表的是文件
            var previewShowInfo = getStorage("previewShowInfo")
            var tokenInfo = getStorage("tokenInfo");
            var info;
            var data;
            var sourceVersion;
            var appVersion;
            var productId;
            if(tokenInfo != null) {
                      info = JSON.parse(tokenInfo);
            }
            if(previewShowInfo!= null){
                data = JSON.parse(previewShowInfo)
                sourceVersion = data.sourceVersion;
                appVersion = data.appVersion;
                productId = data.productId;
            }
            $.ajax({
                url: httpsUrl+queryHttpUrl,
                method: 'post',
                dataType: 'json',
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data: {
                    json: JSON.stringify({
                        func: previewInfo,
                        id: info.id,
                        type:typeOne,
                        appVersion:appVersion,
                        sourceVersion:sourceVersion,
                        productID:productId,
                        flag:_this.props.location.query.flag,
                        token: info.token
                    })
                },
                success: function (data) {
                    if (data.status == 0) {
                        $("#hisCheckView").html("")//清空提示信息
                        $("#nativeMsg").attr('src',data.url+filePath);
                        window.setTimeout(function () {
                            $("#nativeMsg")[0].click();
                        }, 1000)
                        console.log(data)
                    } else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                }, error: function () {
                    console.log("服务器异常！")
                }
            })
        }
    }
    backClick(){
        this.props.router.goBack()
    }
   render(){
       return(
           <div class="rightDivInfo">
                <BackTitle backClick={this.backClick.bind(this)}/>
               <div style={{marginTop:'34px'}}>
                   <div class="hisPvwLeft">
                       <span className="hisPvwSpan">当前版本信息</span>
                       <div className="hisLeftDiv" style={{marginTop:'-26px'}}>
                           <span className="hisPvwDisplay">操作日期：</span>
                           <span>{this.state.operationDate ? this.state.operationDate : ''}</span>
                       </div>
                       <div className="hisLeftDiv">
                           <span className="hisPvwDisplay">选择平台：</span>
                           <span>
                               {this.state.platForm == productTypeAndroid ? '安卓':''}
                               {this.state.platForm == productTypeIOS ? '苹果':''}
                               {this.state.platForm == productTypeAll ? '苹果/安卓':''}
                           </span>
                       </div>
                       <div className="hisLeftDiv">
                           <span className="hisPvwDisplay">版本：</span>
                           <span>{this.state.version ? this.state.version : ''}</span>
                       </div>
                       <div className="hisLeftDiv">
                           <span className="hisPvwDisplay">目前状态：</span>
                               {this.state.curStatue == 1 ? <span class="newReleaseRed">初始化</span>:''}
                               {this.state.curStatue == 2 ? <span class="loadingEdit">正在编辑</span>:''}
                               {this.state.curStatue == 3 ? <span class="newReleasePvw">已验证</span>:''}
                               {this.state.curStatue == 4 ? <span class="newRelease">已发布</span>:''}
                       </div>
                       <div className="hisLeftDiv">
                           <span className="hisPvwDisplay">操作员：</span>
                           <span>{this.state.operationPeople ? this.state.operationPeople : ''}</span>
                       </div>
                       <div className="hisLeftDiv">
                           文件目录检索
                       </div>
                       <div className="fileCheck"  id="tree">
                           {
                               this.menuListInfo(this.state.menuList)
                           }
                       </div>
                   </div>
               </div>
                <div class="hisPvwRight">
                    <div className="hisCheckView" id="hisCheckView">
                        <p>点击文件目录检索相关信息</p>
                        <p className="hisCheckViewP">1：图片</p>
                        <p className="hisCheckViewP">2：网页</p>
                    </div>
                    <iframe className="iframeDiv"  src="" id="nativeMsg">
                    </iframe>
                </div>
           </div>
       )
   }
}
HistoryPvw.contextTypes = {
    router: React.PropTypes.isRequired
}
export default  HistoryPvw