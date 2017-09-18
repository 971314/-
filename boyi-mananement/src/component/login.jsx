/**
 * Created by xiajing on 2016/11/2.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import logo from '../images/logo.png';
import {userHttpUrl,loginType,webSocketlogin} from '../util/config.js';
import {saveStorage} from '../util/storageData.js';
import TipMsgInfo from './publicComponent/tipMsgInfo.jsx';
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {errMsg:'',btnFlag:true,msg:''}
    }
    loginBtn(){
        var _this = this;
        var name = this.refs.name.value;
        var password = this.refs.password.value;
        if(!name){
           this.setState({errMsg:'请输入用户名！'})
            return;
        }
        if(!password){
            this.setState({errMsg:'请输入密码！'})
            return;
        }
      // this.context.router.push("/summaryInfo?title=概要信息");
        _this.setState({btnFlag:false})
        $.ajax({
            url:httpsUrl+userHttpUrl,
            method:'post',
            dataType:'json',
            xhrFields:{withCredentials: true},
            crossDomain:true,
            data:{
                json:JSON.stringify({
                        func:loginType,
                        org:'',
                        account:name,
                        pwd:password
                })
            },
            success:function(data){
                _this.setState({btnFlag:true})
                if(data.status == 0){
                    //成功要缓存token信息
                    //成功要缓存token信息
                    var orgNameInfo;
                    if(!data.orgName){
                        orgNameInfo = data.org;
                    }else{
                        orgNameInfo = data.orgName;
                    }
                    var obj={token:data.token,id:data.id,account:name,orgName:orgNameInfo };
                    saveStorage("tokenInfo",obj);
               //  _this.context.router.push("/summaryInfo?title=概要信息");
                    var webSocket=new WebSocket(webSocketUrl);
                    webSocket.onopen = function() {
                        webSocket.send(JSON.stringify({
                            method: '2001',
                            token:data.token,
                            id:data.id
                        }));
                    };
                    webSocket.onmessage = function(message) {
                        var data = JSON.parse(message.data);
                        if (data.method == '2001' && data.status == '0') {
                            _this.context.router.push("/summaryInfo?title=概要信息");
                        } else if (data.method == '2005') {
                           // _this.setState({msg:data.msg})
                            $("#socketValue").html(data.msg)
                            $("#socketDialog").modal(socketValue)
                        }
                    };
                }else{
                    //失败
                    _this.setState({errMsg: data.msg})
                }
            },error:function(){
                _this.setState({btnFlag:true})
                _this.setState({errMsg:"服务器异常！"})
            }
        })
    }
    clearInfo(){
        this.setState({errMsg:''})
    }

    render(){
        var btnFlag = this.state.btnFlag ?  <button type="button" className="btnInfo" onClick={this.loginBtn.bind(this)}>登录</button> :   <button type="button" className="btnInfoCC">登录</button>
        return(
            <div>
                <nav className="navDivLogin">
                  <span className="loginSpan"><img src={logo}/></span>
                  <span className="title">  博易App后台管理系统</span>
                </nav>
                <div className="contentLogin">
                    <div className="loginDiv">
                        <span className="loginName">登录</span>
                        <div className="divInput btnBottom">
                           <label className="labelInfo"> 用户名 </label><input type="text" ref="name" onFocus={this.clearInfo.bind(this)} placeholder="请输入用户名" className="inputText"/>
                        </div>
                        <div className="divInput">
                            <label className="labelInfo">密码</label><input type="password" ref="password" onFocus={this.clearInfo.bind(this)} placeholder="请输入用密码" className="inputText"/>
                        </div>
                        <div className="btnDiv but">
                            {btnFlag}
                        </div>
                        <div className="errMsgInfo">{this.state.errMsg}</div>
                    </div>
                </div>
                <div className="loginfooter">上海澎博提供技术 Copyright  2016</div>
            </div>
        )
    }
}
Login.contextTypes = {
    router: React.PropTypes.isRequired
}
export default Login

