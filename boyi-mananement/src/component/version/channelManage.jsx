/**
 * Created by xiajing on 2016/11/24.
 */
import React,{Component} from 'react';
import {getStorage} from '../../util/storageData.js';
import {editHttpUrl,channelCode, queryUserManage, channelAddOrDel, historyType, delType,productTypeIOS,productTypeAndroid,productTypeAll } from '../../util/config.js';
import { phoneRegexp } from '../../util/verifyRegular.js';
import DelInfo from '../publicComponent/delInfo.jsx';
import NoneList from '../publicComponent/noneList.jsx';
import {clickTable} from '../../util/menuList.js'
class ChannelManage extends Component{
    constructor(props){
        super(props);
        this.state = {
            channelManageListInfo : [], //获取数据的存放数组
            userMsg:'',
            delPhone:'',
            androidBtnStyle:true,
            iosBtnStyle:false,
            productIDInfo:productTypeAndroid,//默认添加为安卓平台
            btnFlag:true,
            productId:'',
            channel:''
        }
    }
    androidClick(){
        this.setState({androidBtnStyle: true,iosBtnStyle:false,productIDInfo:productTypeAndroid})
    }
    iosClick(){
        this.setState({iosBtnStyle: true,androidBtnStyle:false,productIDInfo:productTypeIOS})
    }
    componentDidMount(){
      this.fetchChannelList()
    }
    fetchChannelList(){
        var _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+editHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:channelCode,
                        id:userInfo.id,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    console.log(data)
                    console.log(data.data)
                    if(data.status == 0){
                        _this.setState({channelManageListInfo:data.data})
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    //添加渠道号
    addUserClick(channel,url){
        var _this = this;
        console.log(channel,url)
        //if(!channel){
        //    _this.setState({userMsg:'请输入渠道号！'})
        //    return;
        //}
        if(!url){
            _this.setState({userMsg:'请输入下载的app地址！'})
            return;
        }
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+editHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:channelAddOrDel,
                        productID:_this.state.productIDInfo,
                        channel:channel,
                        url:url,
                        id:userInfo.id,
                        token:userInfo.token,
                        type:historyType
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        _this.fetchChannelList()
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }else{
                        _this.setState({userMsg:data.msg})
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    userFocus(){
        this.setState({userMsg:''})
        //this.refs.addUser = ''
    }
    //弹出删除提示框
    delUserInfo(productId,channel){
        this.setState({productId:productId,channel:channel})
        $('#delDialog').modal(delDialog)
    }
    //执行删除操作
    delBtn(){
        //alert(this.state.delPhone)
        var _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+editHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:channelAddOrDel,
                        productID:_this.state.productId,
                        channel:_this.state.channel,
                        type:delType,
                        id:userInfo.id,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        //console.log("add success!")
                        $('#delDialog').modal('hide')
                        _this.fetchChannelList()
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }else{
                        _this.setState({userMsg:data.msg})
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    render(){
        clickTable();
        return(
            <div className="rightDivInfo">
                <DelInfo delBtn={this.delBtn.bind(this)}/>
                <ChannelManageList channelManageListInfo={this.state.channelManageListInfo} delUserInfo={this.delUserInfo.bind(this)}/>
                {//如果没有数据就显示提示信息
                }
                {this.state.channelManageListInfo && this.state.channelManageListInfo.length !=0 ?  '': <NoneList /> }
               <SaveChannel  androidClick={this.androidClick.bind(this)}   iosClick={this.iosClick.bind(this)}
                             androidBtnStyle={this.state.androidBtnStyle} iosBtnStyle={this.state.iosBtnStyle}
                             userFocus={this.userFocus.bind(this)} addUserClick={this.addUserClick.bind(this)}
                             userMsg={this.state.userMsg} btnFlag={this.state.btnFlag}/>
            </div>
        )
    }
}
class SaveChannel extends Component{
    constructor(props){
        super(props)
        this.state = {
            channel:'',
            appUrl:''
        }
    }
    addChange(){
        this.setState({channel:this.refs.addChannel.value,appUrl:this.refs.addUrl.value})
    }
    render(){
        var androidBtn = this.props.androidBtnStyle ? 'blueManage' : 'blueManageTwo';
        var iosBtn = this.props.iosBtnStyle ? 'blueManageThree' : 'blueManageOne';
        var flagBtn = this.props.btnFlag ? <span class="addBtn"
                                                 onClick={this.props.addUserClick.bind(this,this.state.channel,this.state.appUrl)}>增加</span>
                                                          :  <span class="addBtnCCC">增加</span>

        return(
            <div className="summaryInfo" style={{marginTop:'77px'}}>
                <div className="nativeManage">平台选择</div>
                <div className="disBlock">
                    <span className={androidBtn} onClick={this.props.androidClick.bind(this)}>安卓</span>
                    <span className={iosBtn} onClick={this.props.iosClick.bind(this)}>苹果</span>
                </div>
                <div class="verDiv">
                    渠道号
                    <input type="text" onFocus={this.props.userFocus.bind(this)} onChange={this.addChange.bind(this)}  ref="addChannel" class="nativeVerInput"  placeholder="渠道号"/>
                    app下载地址
                    <input type="text" onFocus={this.props.userFocus.bind(this)} onChange={this.addChange.bind(this)}   ref="addUrl" class="nativeVerInput"  placeholder="app下载地址"/>
                    {flagBtn}
                </div>
                <div className="userMsg">{this.props.userMsg}</div>
            </div>
        )
    }
}
class ChannelManageList extends Component{
    render(){
        var _this = this;
        return(
            <div className="summaryTable" style={{border:'none'}}>
                <table class="channelTable">
                    <thead>
                    <tr className="bgTr">
                        <th>平台</th>
                        <th>下载渠道</th>
                        <th>地址</th>
                        <th>创建时间</th>
                        <th>操作员</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.channelManageListInfo.map(function(data){
                            return(
                                <tr>
                                    <td>
                                        {data.productID == productTypeAndroid ? '安卓':''}
                                        {data.productID == productTypeIOS ? '苹果':''}
                                        {data.productID == productTypeAll ? '苹果/安卓':''}
                                    </td>
                                    <td>{data.channel}</td>
                                    <td className="textOverFlow" style={{width:'221px'}} title={data.url}>{data.url}</td>
                                    <td>{data.createTime}</td>
                                    <td>{data.operatorName}</td>
                                    <td><span class="delBtn" onClick={_this.props.delUserInfo.bind(_this,data.productID,data.channel)}>删除</span></td>
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
ChannelManage.contextTypes = {
    router: React.PropTypes.isRequired
}
export default ChannelManage

