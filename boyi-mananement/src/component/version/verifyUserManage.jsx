/**
 * Created by xiajing on 2016/11/9.
 */
import React, { Component } from 'react';
import PageComponent from '../publicComponent/pageComponent.jsx';
import {getStorage} from '../../util/storageData.js';
import { userHttpUrl, queryUserManage, pageNum, pageSize, addUserManage, historyType, delType } from '../../util/config.js';
import { phoneRegexp } from '../../util/verifyRegular.js';
import DelInfo from '../publicComponent/delInfo.jsx';
import NoneList from '../publicComponent/noneList.jsx';
import {clickTable} from '../../util/menuList.js'
class VerifyUserManage extends Component{
    constructor(props){
        super(props);
        this.state = {
            userManageList : [], //获取数据的存放数组
            totalNum:'',//总记录数
            totalData:{},
            current: pageNum, //当前页码
            pageSize:pageSize, //每页显示的条数5条
            goValue:'',
            totalPage:'',//总页数
            userMsg:'',
            delPhone:''
        }
    }
    componentDidMount(){
        var _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+userHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:queryUserManage,
                        begin:pageNum,
                        size:pageSize,
                        id:userInfo.id,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    console.log(data.data)
                    if(data.status == 0){
                        _this.setState({totalNum:data.count})
                        //计算总页数= 总记录数 / 每页显示的条数
                        let totalPage =Math.ceil( _this.state.totalNum / _this.state.pageSize);
                        _this.setState({totalPage:totalPage,userManageList:data.data,totalNum:data.count})
                       // _this.pageClick(1);
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
                url:httpsUrl+userHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:queryUserManage,
                        begin:pageNum,
                        size:pageSize,
                        id:userInfo.id,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        //计算总页数= 总记录数 / 每页显示的条数
                        let totalPage =Math.ceil( _this.state.totalNum / _this.state.pageSize);
                        _this.setState({totalPage:totalPage,userManageList:data.data,totalNum:data.count})
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
    //新增用户
    addUserClick(){
        var _this = this;
        var user = _this.refs.addUser.value;
        if(!user){
            _this.setState({userMsg:'请输入用户手机号！'})
            return;
        }
        if(!phoneRegexp.test(user)){
            _this.setState({userMsg:'请正确输入手机号！'})
            return;
        }
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+userHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:addUserManage,
                        id:userInfo.id,
                        token:userInfo.token,
                        account:user,
                        type:historyType
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        //console.log("add success!")
                        _this.pageClick(1);
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
    delUserInfo(phone){
        this.setState({delPhone:phone})
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
                url:httpsUrl+userHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:addUserManage,
                        id:userInfo.id,
                        token:userInfo.token,
                        account:this.state.delPhone,
                        type:delType
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        //console.log("add success!")
                        _this.pageClick(1);
                        $('#delDialog').modal('hide')
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
               <VerifyManageList userManageList={this.state.userManageList} delUserInfo={this.delUserInfo.bind(this)}/>
                {//如果没有数据就显示提示信息
                }
                {this.state.userManageList && this.state.userManageList.length !=0 ?  <PageComponent total={this.state.totalNum}
                                                                                                        current={this.state.current}
                                                                                                        totalPage={this.state.totalPage}
                                                                                                        goValue={this.state.goValue}
                                                                                                        pageClick={this.pageClick.bind(this)}
                                                                                                        goPrev={this.goPrevClick.bind(this)}
                                                                                                        goNext={this.goNext.bind(this)}
                                                                                                        switchChange={this.goSwitchChange.bind(this)}/>: <NoneList /> }
                <div class="summaryInfo" style={{marginTop:'30px'}}>
                    <div class="verDiv userInfo">
                        用户手机号
                        <input type="text" onFocus={this.userFocus.bind(this)} maxLength="11" ref="addUser" class="nativeVerInput"  placeholder="用户手机号"/>
                        <span class="addBtn" onClick={this.addUserClick.bind(this)}>增加</span>
                    </div>
                    <div className="userMsg">{this.state.userMsg}</div>
                </div>
            </div>
        )
    }
}
class VerifyManageList extends Component{
    render(){
        var _this = this;
        return(
            <div className="summaryTable">
                <table class="table summaryTableWidth">
                    <thead>
                    <tr className="bgTr">
                        <th>用户</th>
                        <th>创建日期</th>
                        <th>操作员</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.userManageList.map(function(data){
                            return(
                                <tr>
                                    <td>{data.loginName}</td>
                                    <td>{data.createTime}</td>
                                    <td>{data.operatorName}</td>
                                    <td><span class="delBtn" onClick={_this.props.delUserInfo.bind(_this,data.loginName)}>删除</span></td>
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
VerifyUserManage.contextTypes = {
    router: React.PropTypes.isRequired
}
export default VerifyUserManage
