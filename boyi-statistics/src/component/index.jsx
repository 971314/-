/**
 * Created by xiajing on 2016/10/31.
 */
import  React,{Component} from 'react';
import { Link,browserHistory } from 'react-router';
import bottom from '../images/bottom.png';

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:false,
            orgName:'',
            name:'',
            menu:'',
            sessionId:'',
            dayReg:''
        };
    }
    componentDidMount(){
        this.setState({
            menu:$('.selected').text()
        });
        var _this = this;
        var sessionData = sessionStorage.getItem("sessionInfo");
        if(sessionData != null && sessionData != ''){
            var dat = JSON.parse(sessionData);
            _this.setState({orgName:dat.orgName,name:dat.name,sessionId:dat.sessionId});
            var data = {
                "func": 201,
                "data": {
                    "name": dat.name,
                    "sessionId": dat.sessionId
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
                        _this.setState({
                            dayReg:data.data.dayReg
                        })
                    }
                }, error: function (data) {
                    console.log("服务器异常");
                }
            })
        }else{
            _this.context.router.push('/');
        }
    }
    userClick(){
        this.setState({user:!this.state.user})
    }
    historicalClick(){
        this.setState({menu:'历史用户统计'})
    }
    detailsClick(){
        this.setState({menu:'详情用户信息'})
    }
    outlineClick(){
        this.setState({menu:'概要信息'})
    }
    signOutClick(){
        var _this = this;
        var data = {
            "func": 104,
            "data": {
                "name":this.state.name,
                "sessionId":this.state.sessionId
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
                    _this.context.router.push('/');
                }else if(data.retHead == -6){
                    alert('请先登录')
                }
            }, error: function (data) {
                console.log("服务器异常");
            }
        });
    }
    versionClick(){
        this.setState({menu:'客户端版本统计'})
    }
    modifyPwdClick(){
        $('.revisions').css("display",'block');
    }
    sucPwdClick(){
        var _this = this;
        if($('#newpwd').val() == $('#reppwd').val()){
            var data = {
                "func": 102,
                "data": {
                    "name": $('#boyiname').val(),
                    "pwd": $('#oldpwd').val(),
                    "newPwd": $('#newpwd').val(),
                    "sessionId": this.state.sessionId
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
                        alert('密码修改成功');
                        $('.revisions').css('display','none')
                    }else if(data.retHead == -6){
                        alert('请先登录');
                        _this.context.router.push('/');
                    }
                }, error: function (data) {
                    console.log("服务器异常");
                }
            });
        }else{
            alert('两次密码输入不一致')
        }

    }
    gobackClick(){
        $('.revisions').css('display','none');
    }
    render(){
        return(
            <div>
               <nav className="navDiv pl13 lh67 navbc">
                   <span className="iname">{this.state.orgName}</span>
                   <span className="pr13">公司</span>
                   博易App后台用户统计 - <span>{this.state.menu}</span>
                   <div className="floatr loginiffrom lh67 h67">
                       <span className="inform block center lh67"><span className="news block">{this.state.dayReg}</span></span>
                       <span className="user block center floatr cursor" onClick={this.userClick.bind(this)}>{this.state.name} <img src={bottom}/>
                           <span className={this.state.user?'rempwd absolute backgroundw':'rempwd absolute backgroundw hidden'}>
                               <span className="center bblock"  onClick={this.modifyPwdClick.bind(this)}>修改密码</span>
                               <span className="center bblock" onClick={this.signOutClick.bind(this)}>退出</span>
                           </span>
                       </span>
                   </div>
               </nav>
                <div className="backgroundw body">
                    <div className="marginauto border" style={{width:'1360'}}>
                        <div className="leftDiv pt13 h">
                            <Link to="/outline" className="w266 block a" activeClassName="selected" onClick={this.outlineClick.bind(this)}>概要信息</Link>
                            <Link to="/historical" className="a w266 block" activeClassName="selected" onClick={this.historicalClick.bind(this)}>历史用户统计</Link>
                            <Link to="/details" className="a w266 block" activeClassName="selected"  onClick={this.detailsClick.bind(this)}>详情用户信息</Link>
                            <Link to="/version" className="a w266 block" activeClassName="selected"  onClick={this.detailsClick.bind(this)}>客户端版本统计</Link>
                        </div>
                        <div className="rightDiv pt13">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <footer className="footer h40 lh40 navbc center">上海澎博提供技术 Copyright 2016</footer>
                <div className="revisions">
                        <div className="login backgroundw rpwd">
                            <span className="bodytop center block font26">修改密码</span>
                            <div>
                                <span className="name bblock"><span className="pr25">用<span className="block ml-6"></span>户<span className="block ml-6"></span>名</span><input type="text" className="w260 border" id="boyiname"  value={this.state.name}disabled/></span>
                                <span className="pwd bblock"><span className="pr25">旧<span className="block ml-6"></span>密<span className="block ml-6"></span>码</span><input type="password" className="w260 border" id="oldpwd" /></span>
                                <span className="pwd bblock"><span className="pr25">新<span className="block ml-6"></span>密<span className="block ml-6"></span>码</span><input type="password" className="w260 border" id="newpwd"/></span>
                                <span className="pwd bblock"><span className="pr25">确认密码</span><input type="password" className="w260 border" id="reppwd"/></span>
                                <span className="err">{this.props.err}</span>
                                <span className="bblock">
                                    <span className="block center deng button a w137 dm" onClick={this.sucPwdClick.bind(this)}>修改密码</span>
                                    <span className="block center button a w137 goback" onClick={this.gobackClick.bind(this)}>返回</span>
                                </span>
                            </div>
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