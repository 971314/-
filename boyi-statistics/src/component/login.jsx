import  React,{Component} from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router';
class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            err:""
        }
    }
    nextLogin(){
        var _this = this;
        if($('#boyiname').val().length == 0 || $('#pwd').val().length == 0){
            alert('用户名或账号不能为空')
        }else{
            var data = {
                "func": 101,
                "data": {
                    "name" : $('#boyiname').val(),
                    "pwd" : $('#pwd').val()
                }
            };
            $.ajax({
                url:''+url+'/UserStatistics/WebService',
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data:JSON.stringify(data),
                success: function (data) {
                    if(data.retHead == 0){
                        var obj = {sessionId:data.data.sessionId,name:data.data.name,orgName:data.data.orgName};
                        sessionStorage.setItem("sessionInfo",JSON.stringify(obj));
                        _this.context.router.push('/outline');
                    }else if(data.retHead == -4){
                        _this.setState({
                            err:'用户名或密码输入不正确'
                        })
                    }
                }, error: function (data) {
                    console.log("服务器异常");
                }
            })
        }
    }
    render(){
        return(
            <div>
                <nav className="navDiv pl13 lh67 navbc">
                    <img src={logo} className="pr13"/>博易APP后台管理系统
                </nav>
                <Login nextLogin={this.nextLogin.bind(this)} err={this.state.err}/>
                <footer className="footer h40 lh40 navbc center">上海澎博提供技术 Copyright 2016</footer>
            </div>
        )
    }
}
class Login extends Component{
    render(){
        return(
            <div className="body backgroundw">
                <div className="login backgroundw">
                    <span className="bodytop center block font26">登录</span>
                    <div>
                        <span className="name bblock"><span className="pr25">用户名</span><input type="text" className="w260 border" id="boyiname"/></span>
                        <span className="pwd bblock"><span className="pr25">密<span className="w20 block"></span>码</span><input type="password" className="w260 border" id="pwd"/></span>
                        <span className="err">{this.props.err}</span>
                        <span className="bblock"><Link onClick={this.props.nextLogin.bind(this)} className="block center deng button a w260 d">登录</Link></span>
                    </div>
                </div>
            </div>
        )
    }
}
Index.contextTypes = {
    router: React.PropTypes.isRequired
};
export default Index