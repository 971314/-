/**
 * Created by xiajing on 2016/10/31.
 */
import  React,{Component} from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import {outLogin,userHttpUrl, queryHttpUrl, summaryInfo, resourceNum,productTypeIOS,productTypeAndroid,productTypeAll } from '../util/config.js';
import {getStorage,getLocalStorage} from '../util/storageData.js';
import {contains} from '../util/operationJson.js';
import TipMsgInfo from './publicComponent/tipMsgInfo.jsx';
class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            menuFlagOne:true,
            titleValue:'',
            titleId:'',
            accountName:'',
            summaryTotal:'',
            editShow:true,
            orgName:''
        }
    }
    //点击菜单收缩显示
    menuClick(id){
        if(id == 1){
           // this.setState({menuFlagOne: !this.state.menuFlagOne})
        }
    }
    componentDidMount(){
        var _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var token = JSON.parse(tokenInfo);
            this.setState({accountName:token.account,orgName:token.orgName})//获取当前登录的用户名
            //获取版本未发布的信息记录
            $.ajax({
                url:httpsUrl+queryHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:summaryInfo,
                        id:token.id,
                        token:token.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                         //console.log(data.data)
                         var showFlag;
                        var attr = [];
                        for(var value in data.data){
                            showFlag = data.data[value].flag
                            attr.push(showFlag)
                        }
                        Array.prototype.contains = function (element) {
                            for (var i = 0; i < this.length; i++) {
                                if (this[i] == element) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        //console.log(attr)
                        if(attr.contains('2') || attr.contains('3')){//如果包含状态是正在编辑才显示  编辑模块的菜单否则不显示
                            _this.setState({editShow:true})
                        }else{
                            _this.setState({editShow:false})
                        }
                        _this.setState({summaryTotal:data.noPublishTotal})
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    //退出
    outLoginClick(){
        var _this = this;
        //_this.context.router.push("/");
       var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var token = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+userHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:outLogin,
                        id:token.id,
                        token:token.token,
                    })
                },success:function(data){
                    if(data.status == 0){
                        _this.context.router.push("/");
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(data){
                    console.log('服务器异常！')
                }
            })
        }
    }
    //根据版本信息判断显示对应的跳转
    appConfigClick(flag){
        //app配置
        var _this = this;
        var selectVer  = getStorage("versionInfo")
        if(selectVer !='' && selectVer != null){
            if(flag == 0){
                let versionName;
                var data = JSON.parse(selectVer);
                if(data.productID == productTypeAndroid){
                    versionName =  '安卓'
                }
                if(data.productID == productTypeIOS){
                    versionName = '苹果'
                }
                if(data.productID == productTypeAll){
                    versionName = '苹果/安卓'
                }
                this.context.router.push('indexEdit/4?title='+versionName);
            }
            if(flag == 1){
                _this.context.router.push("appConfig/7?title=配置修改");
            }
            if(flag == 2){
                _this.context.router.push("ResourceEdit/8?title=资源管理");
            }
            if(flag == 3){
                _this.context.router.push("VerifyRelease/9?title=编辑-预览/验证/发布");
            }
        }else{
            //如果没有版本信息就要去选择版本
             _this.context.router.push("EditType/3?title=编辑");
        }
    }
    //用户统计跳转
    //userUrlClick(type){
    //    if(type == 1){//用户统计
    //        $("#userTotal").attr('href',userTotalUrl);
    //        window.setTimeout(function () {
    //            $("#userTotal")[0].click();
    //        }, 1000)
    //    }else if(type == 2){//消息推送
    //        $("#messagePush").attr('href',userPushUrl);
    //        window.setTimeout(function () {
    //            $("#messagePush")[0].click();
    //        }, 1000)
    //        //window.location.href=userPushUrl;
    //    }else if(type == 3){//新闻编辑
    //        $("#newsEdit").attr('href',newsUrl);
    //        window.setTimeout(function () {
    //            $("#newsEdit")[0].click();
    //        }, 1000)
    //    }
    //}
    render(){
        //console.log(this.props.location.query.title)
       //  console.log(this.props.params.id)
        return(
            <div  >

                {
                    //<NavBar />
                    //  <NavTitle />
                }
                <NavBar titleValue={this.props.location.query.title} outLoginClick={this.outLoginClick.bind(this)}
                        accountName={this.state.accountName} summaryTotal={this.state.summaryTotal} orgName={this.state.orgName}/>
                <div className="contentIndex">
                    <div className="leftDiv">
                        <MenuList menuClick={this.menuClick.bind(this)} menuFlagOne = {this.state.menuFlagOne}
                                  menuFlagTwo = {this.state.menuFlagTwo} menuFlagThree= {this.state.menuFlagThree}
                                  titleId={this.props.params.id}
                                  appConfigClick={this.appConfigClick.bind(this)}
                                  editShow={this.state.editShow}/>
                    </div>
                    <div className="rightDiv treeResource">{this.props.children}  </div>
                </div>
                <div className="footer">上海澎博提供技术 Copyright  2016</div>
            </div>
        )
    }
}
class NavBar extends Component{
    render(){
        return(
            <nav className="navDiv">
                <div className="container indexTitle" >
                    <span className="spanOne">{this.props.orgName} &nbsp;&nbsp;&nbsp;博易App后台管理系统-{this.props.titleValue}</span>
                    <div className="spanTwo disIn">
                        <div className="tipMsgOne"></div>
                        <div className="tipMsgTwo">
                            <Link to="summaryInfo?title=概要信息"> <span>{this.props.summaryTotal}</span></Link>
                        </div>
                        <div className="dropdown disIn">
                            <button type="button" className="btn dropdown-toggle selectInfo" id="dropdownMenu1" data-toggle="dropdown">{this.props.accountName}
                                <span class="caret"></span>
                            </button>
                            <ul className="dropdown-menu menuInfo" role="menu" aria-labelledby="dropdownMenu1">

                                    <li role="presentation">
                                        <Link to="ModifyPwd/5?title=修改密码">   <a role="menuitem" tabindex="-1">修改密码</a>  </Link>
                                    </li>

                                <li role="presentation">
                                    <a role="menuitem" tabindex="-1" onClick={this.props.outLoginClick.bind(this)}>退出</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
class MenuList extends Component{
    render(){
        var editShowInfo = this.props.editShow ? <ul  className="menuOne">
                                                <Link to="EditType/3?title=编辑"  activeClassName='activeOneLink'><li onClick={this.props.menuClick.bind(this,1)}>编辑</li></Link>
                                                <ul className="menuTwo"  style={{display:this.props.menuFlagOne  ? "block" : "none"}}>
                                                    <Link  onClick={this.props.appConfigClick.bind(this,0)}   className={this.props.titleId == 4 ? 'activeTwoLink' : ' '}  activeClassName='activeTwoLink'><li>首页编辑</li></Link>
                                                    <Link  onClick={this.props.appConfigClick.bind(this,1)} className={this.props.titleId == 7 ? 'activeTwoLink' : ' '}  activeClassName='activeTwoLink'><li>配置修改</li></Link>
                                                    <Link  onClick={this.props.appConfigClick.bind(this,2)} className={this.props.titleId == 8 ? 'activeTwoLink' : ' '}  activeClassName='activeTwoLink'><li>资源管理</li></Link>
                                                    <Link onClick={this.props.appConfigClick.bind(this,3)}  className={this.props.titleId == 9 ? 'activeTwoLink' : ' '}  activeClassName='activeTwoLink'><li>预览/验证/发布</li></Link>
                                                </ul>
                                               </ul>: ''
        return(
                 <div className="topMenu">
                    <ul className="menuOne">
                        <Link to="summaryInfo?title=概要信息" className={this.props.titleId == 5 ? 'activeOneLink' : ' '} activeClassName='activeOneLink'> <li>概要信息</li></Link>
                    </ul>
                    <ul className="menuOne">
                        <Link to="nativeVerManage?title=原生版本管理" activeClassName='activeOneLink'><li>原生版本管理</li></Link>
                    </ul>
                    <ul className="menuOne">
                        <Link to="historyVerPvw?title=历史版本浏览" activeClassName='activeOneLink' className={this.props.titleId == 1 ? 'activeOneLink' : ' '}><li>历史版本浏览</li></Link>
                    </ul>
                    <ul className="menuOne">
                        <Link to="initNewVersion?title=初始化新版本" activeClassName='activeOneLink'><li>初始化新版本</li></Link>
                    </ul>
                    <ul className="menuOne">
                         <Link to="VerifyUserManage?title=验证用户管理" activeClassName='activeOneLink'><li>验证用户管理</li></Link>
                    </ul>
                     <ul className="menuOne">
                         <Link to="channelManage?title=下载渠道管理" activeClassName='activeOneLink'><li>下载渠道管理</li></Link>
                     </ul>
                    <ul className="menuOne">
                         <a  href="https://pbzx1.pobo.net.cn/NewsManage/Login.aspx"  target="_blank"><li>新闻公告编辑</li></a>
                    </ul>
                    <ul className="menuOne">
                         <a  href="https://pbuserstat.pobo.net.cn/PbUserStatistics/#/" target="_blank"><li>用户数据统计</li></a>
                    </ul>
                     <ul className="menuOne">
                         <a  href="https://notice.pobo.net.cn/notice/view/index.jsp"  target="_blank"><li>消息推送</li></a>
                     </ul>
                     {editShowInfo}
                     {
                         //<ul  className="menuOne">
                         //    <li onClick={this.props.menuClick.bind(this,2)}>启动广告管理</li>
                         //    <ul className="menuTwo"  style={{display:this.props.menuFlagTwo ? "block" : "none"}}>
                         //        <li>当前广告预览</li>
                         //        <li>编辑广告</li>
                         //    </ul>
                         //</ul>
                         //<ul  className="menuOne">
                         //<li onClick={this.props.menuClick.bind(this,3)}>升级管理</li>
                         //<ul className="menuTwo"  style={{display:this.props.menuFlagThree ? "block" : "none"}}>
                         //<li>升级历史</li>
                         //<li>升级</li>
                         //<li>实体机验证查看</li>
                         //</ul>
                         //</ul>
                     }
                 </div>
        )
    }
}
Index.contextTypes = {
    router: React.PropTypes.isRequired
}
export default Index