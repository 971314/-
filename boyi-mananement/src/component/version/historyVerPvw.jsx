/**
 * Created by xiajing on 2016/11/7.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import {historyPvw,queryHttpUrl,typeOne,pageNum,pageSize,historyType,summaryDel,resourceNum,typeZero,model, productTypeIOS,productTypeAndroid,productTypeAll,previewInfo,queryConfigFile,downHttpUrl,downFile,productNone,editHttpUrl} from '../../util/config.js';
import PageComponent from '../publicComponent/pageComponent.jsx';
import {getStorage,saveStorage} from '../../util/storageData.js';
import NoneList from '../publicComponent/noneList.jsx';
import LoadingImg from '../publicComponent/loadingImg.jsx';
import TipMsgInfo from '../publicComponent/tipMsgInfo.jsx';
import {clickTable} from '../../util/menuList.js'
class HistoryVerPvw extends Component{
    constructor(props) {
        super(props);
        this.state = {
            resourceNumList:[],
            historyList : [], //获取数据的存放数组
            totalNum:'',//总记录数
            totalData:{},
            current: pageNum, //当前页码
            pageSize:pageSize, //每页显示的条数5条
            goValue:'',
            totalPage:'',//总页数
            loadingImgFlag:true,//转圈圈预加载的显示
            msg:'',
            productId:'',
            versionFlag:''
        }
    }
    componentDidMount(){
        var _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+queryHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:historyPvw,
                        begin:pageNum,
                        size:pageSize,
                        id:userInfo.id,
                        type:typeZero,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    console.log(data.data)
                    _this.setState({loadingImgFlag:false})
                    if(data.status == 0){
                        _this.setState({totalNum:data.count})
                        _this.setState({historyList:data.data})
                        //计算总页数= 总记录数 / 每页显示的条数
                        let totalPage =Math.ceil( _this.state.totalNum / _this.state.pageSize);
                        _this.setState({totalPage:totalPage})
                       // _this.pageClick(1);
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    _this.setState({loadingImgFlag:false})
                    console.log("服务器异常！")
                }
            })
            //获取统计信息
            $.ajax({
                url:httpsUrl+queryHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:resourceNum,
                        id:userInfo.id,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        //console.log(data.data)
                        _this.setState({resourceNumList:data.data})
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    //点击翻页
    pageClick(pageNum){
        let _this = this;
        if(pageNum != _this.state.current){
            _this.state.current = pageNum
        }
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+queryHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:historyPvw,
                        begin:pageNum,
                        size:pageSize,
                        id:userInfo.id,
                        type:typeZero,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        _this.setState({historyList:data.data})
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    //上一步
    goPrevClick(){
        var _this = this;
        let cur = this.state.current;
        if(cur > 1){
            _this.pageClick( cur - 1);
        }
    }
    //下一步
    goNext(){
        var _this = this;
        let cur = _this.state.current;
        if(cur < _this.state.totalPage){
            _this.pageClick(cur + 1);
        }
    }
    //跳转到指定页
    goSwitchChange(e){
        var _this= this;
        _this.setState({goValue : e.target.value})
        var value = e.target.value;
        //alert(value+"==="+_this.state.totalPage)
        if(!/^[1-9]\d*$/.test(value)){
            alert('页码只能输入大于1的正整数');
        }else if(parseInt(value) > parseInt(_this.state.totalPage)){
            alert('没有这么多页');
        }else{
            _this.pageClick(value);
        }
    }
    //预览信息首先缓存信息historyPvw取
    previewShowClick(productId,appVersion,sourceVersion,flag,date,operatorName){
        var obj = {productId:productId,appVersion:appVersion,sourceVersion:sourceVersion,flag:flag,date:date,operatorName:operatorName}
        saveStorage("previewShowInfo",obj);
        this.context.router.push("/historyPvw/1?title=预览");
    }
    //文件下载
    downFileClick(productId,appVersion,sourceVersion){
        var tokenInfo = getStorage("tokenInfo");
        if( tokenInfo != null) {
            var info = JSON.parse(tokenInfo);
           var url= httpsUrl+downHttpUrl + '?type=' + typeOne + '&func='+downFile+'&productID='+productId+ '&appVersion='
                +appVersion+ '&sourceVersion=' +sourceVersion+'&model='+model+'&id='+info.id+'&token='+encodeURIComponent(info.token);
            $("#downUrl").attr('href',url);
            $("#downUrl").attr('download',url);
            window.setTimeout(function () {
                $("#downUrl")[0].click();
            }, 1000)
        }
    }
    //editPreviewInfo编辑信息
    editPreviewInfo(productId,appVersion,sourceVersion){
        var _this = this;
        var obj = {productID:productId,appVersion:appVersion,sourceVersion:sourceVersion}
        saveStorage("modifyVersionInfo",obj);
        _this.setState({productId:productId})
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null) {
            var info = JSON.parse(tokenInfo);
            //如果前面已经有了全部选择的版本，则不允许再编辑，提示"请先删除正在编辑的版本再创建新的版本"
            $.ajax({
                url:httpsUrl+editHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:productNone,
                        id:info.id,
                        token:info.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        _this.setState({versionFlag:data.flag})
                        console.log(data.flag)
                        if(data.flag == 3){
                            _this.setState({msg:'您已经有尚未发布的版本，是否确定覆盖！'})
                            $("#tipMsgDialog").modal(tipMsgDialog)
                        }else{
                            _this.context.router.push("/platFormEdit/1?title=编辑");//编辑页面
                        }
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    tipMsgClick(){
        //删除操作
        var _this = this;
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
                        func:summaryDel,
                        flag:_this.state.versionFlag,
                        id:info.id,
                        token:info.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        _this.context.router.push("/platFormEdit/1?title=编辑");//覆盖页面
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
        $("#tipMsgDialog").modal('hide')
    }
    render(){
        clickTable();
        var showLoad = this.state.loadingImgFlag ?  <LoadingImg /> : '';
        return(
            <div class="rightDivInfo">
                <a id="downUrl" className="downUrl" rel="nofollow"></a>
                <TipMsgInfo   msg={this.state.msg}
                              tipMsgClick={this.tipMsgClick.bind(this)}/>
                <HistoryListInfo historyList={this.state.historyList}
                                 previewShowClick={this.previewShowClick.bind(this)}
                                 downFileClick={this.downFileClick.bind(this)}
                                 editPreviewInfo={this.editPreviewInfo.bind(this)}/>
                {showLoad}
                {//如果没有数据就显示提示信息
                }
                {this.state.historyList && this.state.historyList.length !=0 ?   <PageComponent total={this.state.totalNum}
                                                                                                current={this.state.current}
                                                                                                totalPage={this.state.totalPage}
                                                                                                goValue={this.state.goValue}
                                                                                                pageClick={this.pageClick.bind(this)}
                                                                                                goPrev={this.goPrevClick.bind(this)}
                                                                                                goNext={this.goNext.bind(this)}
                                                                                                switchChange={this.goSwitchChange.bind(this)}/>: <NoneList /> }

                <HistoryInfoNum resourceNumList={this.state.resourceNumList}/>
            </div>
        )
    }
}
class HistoryListInfo extends Component{
     render(){
         var _this = this;
         return(
             <div className="summaryTable">
                 <table class="table summaryTableWidth">
                     <thead>
                     <tr className="bgTr">
                         <th>平台</th>
                         <th>原生版本</th>
                         <th>资源版本</th>
                         <th>状态</th>
                         <th>创建日期</th>
                         <th>操作员</th>
                         <th>操作</th>
                     </tr>
                     </thead>
                     <tbody>
                     {
                         this.props.historyList.map(function(data){
                             return(
                                 <tr>
                                     <td>{data.productID == productTypeAndroid ? '安卓':''}
                                         {data.productID == productTypeIOS ? '苹果':''}
                                         {data.productID == productTypeAll ? '苹果/安卓':''}
                                     </td>
                                     <td>{data.appVersion}</td>
                                     <td>{data.sourceVersion}</td>
                                     <td>
                                         {data.flag == 3 ? <span class="newReleasePvw">已验证</span>: ''}
                                         {data.flag == 4 ? <span class="newRelease">已发布</span>: ''}
                                         {data.flag == 2 ? <span class="loadingEdit">正在编辑</span>: ''}
                                         {data.flag == 1 ? <span class="newReleaseRed">初始化</span>: ''}
                                     </td>
                                     <td>{data.createTime}</td>
                                     <td>{data.operatorName}</td>
                                     <td>
                                         <Link onClick={_this.props.editPreviewInfo.bind(this,data.productID,data.appVersion,data.sourceVersion)}><span class="editBtnOne" style={{width:'80px'}}>创建新版本</span></Link>
                                         <Link><span class="delBtn pvwSpan" onClick={_this.props.previewShowClick.bind(this,data.productID,data.appVersion,data.sourceVersion,data.flag,data.createTime,data.operatorName)}>预览</span></Link>
                                         <span class="editBtn" rel="nofollow"  onClick={_this.props.downFileClick.bind(_this,data.productID,data.appVersion,data.sourceVersion)}>下载</span>
                                     </td>
                                 </tr>
                             )
                         })
                     }
                     {
                         // <span class="editBtn" rel="nofollow"  onClick={_this.props.downFileClick.bind(_this,data.productID,data.appVersion,data.sourceVersion)}>下载</span>
                     }
                     </tbody>
                 </table>
             </div>
         )
     }
}
class HistoryInfoNum extends Component{
    render(){
        return(
            <div style={{marginTop:'69px'}}>
                {
                    this.props.resourceNumList.map(function(data){
                        return(
                            <div class="summaryInfo">
                                <span class="sumSpanOne">
                                    {data.productID == productTypeAndroid ? '安卓':''}
                                    {data.productID == productTypeIOS ? '苹果':''}
                                    {data.productID == productTypeAll ? '苹果/安卓':''}
                                </span>
                                <span class="sumSpanTwo">原生版本数：{data.appVersionCounts}</span>
                                <span>发布资源：{data.sourceCounts}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
HistoryVerPvw.contextTypes = {
    router: React.PropTypes.isRequired
}
export default HistoryVerPvw