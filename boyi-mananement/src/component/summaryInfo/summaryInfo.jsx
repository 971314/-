/**
 * Created by xiajing on 2016/11/1.
 */
import  React,{ Component } from 'react';
import {queryHttpUrl, summaryInfo, resourceNum,productTypeIOS,productTypeAndroid,productTypeAll,summaryDel,editHttpUrl} from '../../util/config.js';
import { getStorage,saveStorage } from '../../util/storageData.js'
import NoneList from '../publicComponent/noneList.jsx';
import LoadingImg from '../publicComponent/loadingImg.jsx';
import {orderBy} from '../../util/operationJson.js';
import {clickTable} from '../../util/menuList.js'
class SummaryInfo extends Component{
    constructor(props){
        super(props)
        this.state = {summaryList:[],resourceNum:[],
            loadingImgFlag:true //转圈圈预加载的显示
          }
    }
    fetchSummary(){
        var _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var info = JSON.parse(tokenInfo);
            //获取版本信息
            $.ajax({
                url:httpsUrl+queryHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:summaryInfo,
                        id:info.id,
                        token:info.token
                    })
                },
                success:function(data){
                    _this.setState({loadingImgFlag:false})
                    if(data.status == 0){
                        //console.log(data.data)
                        _this.setState({summaryList:data.data})
                    }else if(data.status == '-2' || data.status == '-9'){
                        //alert("====获取列表："+JSON.stringify(data))
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
                        id:info.id,
                        token:info.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        //console.log(data.data)
                        _this.setState({resourceNum:data.data})
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    componentDidMount(){

        this.fetchSummary();
    }
    //删除
    summaryDelClick(productId){
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
                        flag:productId,
                        id:info.id,
                        token:info.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                       //  _this.fetchSummary();
                        window.location.reload();//重载页面
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    //summaryEdit编辑
    summaryEdit(flag,productID,appVersion,sourceVersion,productType){
        var _this = this;
        var obj={productID:productID,appVersion:appVersion,productType:productID}
        saveStorage("versionInfo",obj);
        _this.context.router.push("/indexEdit/4?title=首页编辑");
    }
    render(){
        var showLoad = this.state.loadingImgFlag ?  <LoadingImg /> : '';
        return(
            <div>
                <div className="rightDivInfo">
                    <SummaryTable summaryList={this.state.summaryList}
                                  summaryEdit={this.summaryEdit.bind(this)}
                                  summaryDelClick={this.summaryDelClick.bind(this)}/>
                    {
                    //如果没有数据就显示提示信息
                    }
                    {showLoad}
                    {this.state.summaryList && this.state.summaryList.length !=0 ? '': <NoneList /> }
                    <SummaryInfoNum resourceNum={this.state.resourceNum} />
                </div>
             </div>

        )
    }
}
class SummaryTable extends Component{
   render(){
       var _this = this;
       clickTable();
       return(
           <div className="summaryTable">
               <table class="table summaryTableWidth">
                   <thead>
                   <tr className="bgTr">
                       <th>平台</th>
                       <th>原生版本</th>
                       <th>资源版本</th>
                       <th>目前状态</th>
                       <th>操作日期</th>
                       <th>操作员</th>
                       <th>操作</th>
                   </tr>
                   </thead>
                   <tbody>
                   {
                       this.props.summaryList.sort(orderBy('createTime')).map(function(data){
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
                                   <td>{data.updateTime ? data.updateTime : '---'}</td>
                                   <td>{data.operatorName}</td>
                                   <td>
                                       {data.flag !=4 ?  <span class="editBtn" style={{marginRight: '13px',width: '45px'}} onClick={_this.props.summaryEdit.bind(_this,1,data.productID,data.appVersion,data.sourceVersion,data.type )}>编辑</span>: ''}
                                       {data.flag !=4 ?  <span class="delBtn" onClick={_this.props.summaryDelClick.bind(_this,data.productID)}>删除</span> : ''}
                                   </td>
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
class SummaryInfoNum extends Component{
    render(){
        return(
           <div>
               {
                   this.props.resourceNum.map(function(data){
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
SummaryInfo.contextTypes = {
    router: React.PropTypes.isRequired
}
export default SummaryInfo