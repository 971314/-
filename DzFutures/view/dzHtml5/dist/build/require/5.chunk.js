webpackJsonp([5],{270:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(227),n=s(i),r=a(1),l=s(r),o=(a(30),a(230)),d=(s(o),a(246)),c=s(d),u=a(226),f=a(264),p=s(f),g=a(265),h=s(g),m=a(251),v=s(m),k=a(231),y=a(248),C=a(257),S=l.default.createClass({displayName:"registerStepTwo",contextTypes:{router:l.default.PropTypes.object},getInitialState:function(){return{checked:!1,btnChecked:!1,confirmFlag:!1,lowPass:""}},componentDidMount:function(){(0,u.getDeviceJsonInfo)()},handleChange:function(){var e=this,t=this.refs.passWordText.value,a=this.refs.confirmPassText.value;t&&a?e.setState({btnChecked:!0}):e.setState({btnChecked:!1}),this.setState({passWord:t,confirmPass:a})},handleClick:function(){this.setState({checked:!this.state.checked}),this.state.checked?this.refs.passWordText.setAttribute("type","password"):this.refs.passWordText.setAttribute("type","text")},confirmClick:function(){this.setState({confirmFlag:!this.state.confirmFlag}),this.state.confirmFlag?this.refs.confirmPassText.setAttribute("type","password"):this.refs.confirmPassText.setAttribute("type","text")},backClick:function(){this.props.history.goBack()},stepThreeClick:function(){var e=this,t=this.refs.passWordText.value;if(!C.psdRegexp.test(t))return e.setState({tipMsg:"密码设置规则为：6-20位字母和数字组合！"}),void $("#tipMsgModal").modal(tipMsgModal);var a=(0,u.getStorageInfo)("generalUserRegister");if(""!=a)var s=JSON.parse(a);var i={passWord:this.state.passWord,confirmPass:this.state.confirmPass};for(var r in i)s[r]=i[r];if((0,u.saveStorageInfo)("generalUserRegister",s),this.state.confirmPass!=this.state.passWord)return this.setState({tipMsg:"两次输入的密码不一致，请重新输入"}),void $("#tipMsgModal").modal(tipMsgModal);(0,u.showCircleView)("处理中");var l=(0,u.getStorageInfo)("registerDataOne"),o=(0,u.getStorageInfo)("generalUserRegister");if(l&&o){var d,c=JSON.parse(l),f=JSON.parse(o),p=(0,u.getStorageInfo)("flagLowPass");if(p){var g=JSON.parse(p);d=g.flag}$.ajax({url:k.dzHttpUrl,method:"post",contentType:"application/json",timeout:3e4,data:(0,n.default)({func:k.modifyPass,type:k.sysType,account:c.account,token:c.token,data:[{type:k.loginType,phone:f.phone,newPwd:e.state.passWord,oldPwd:d,os:u.OS,deviceId:u.devicdId,orgNumber:u.orgNumber,version:u.version}]}),success:function(t){if(1!=(0,y.getErrorMsg)(t))return(0,u.hideCircleView)(),e.setState({tipMsg:t.desc}),void $("#tipMsgModal").modal(tipMsgModal);var a={flag:e.state.passWord};(0,u.saveStorageInfo)("flagLowPass",a),(0,u.hideCircleView)();var a={loginName:t.data[0].loginName,userId:t.data[0].userId,token:t.data[0].token,tokenBeginTime:t.data[0].tokenBeginTime,tokenActiveTime:t.data[0].tokenActiveTime,pwd:e.state.passWord,loginType:1};(0,u.saveStorageInfo)("nativeSaveSuc",a),e.context.router.push("/registerStepThree")},error:function(){(0,u.hideCircleView)(),e.setState({tipMsg:"服务器异常!"}),$("#tipMsgModal").modal(tipMsgModal)}})}},render:function(){var e=this.state.btnChecked?l.default.createElement(M,{handleClick:this.stepThreeClick}):l.default.createElement(b,null),t=this.state.checked?p.default:h.default,a=this.state.confirmFlag?p.default:h.default,s=l.default.createElement(c.default,{name:"注册",handleClick:this.backClick});return document.body.style.paddingTop="44px",l.default.createElement("div",null,l.default.createElement(v.default,{tipMsg:this.state.tipMsg}),s,l.default.createElement("div",{className:"list-ul"},l.default.createElement("ul",null,l.default.createElement("li",{className:"login-bottom liLineHeight"},l.default.createElement("div",{className:"registerLeft",style:{width:"83%"}},l.default.createElement("input",{ref:"passWordText",autocomplete:"off",style:{width:"100%"},type:"password",onChange:this.handleChange,placeholder:"设置登录密码（6-20位字母和数字组合）",className:"loginText tLineHeight"})),l.default.createElement("div",{className:"div3",style:{width:"17%",paddingLeft:"3px"}}," ",l.default.createElement("img",{src:t,onClick:this.handleClick}))),l.default.createElement("li",null,l.default.createElement("div",{className:"registerLeft",style:{width:"78%"}},l.default.createElement("input",{ref:"confirmPassText",autocomplete:"off",style:{width:"212px"},type:"password",onChange:this.handleChange,placeholder:"再次输入登录密码",className:"loginText"})),l.default.createElement("div",{className:"div3",style:{width:"22%"}}," ",l.default.createElement("img",{src:a,onClick:this.confirmClick}))))),l.default.createElement("div",{className:"btnDiv"},e))}}),b=l.default.createClass({displayName:"RegisterInitBtn",render:function(){return l.default.createElement("div",null,l.default.createElement("button",{type:"button",className:"registerInitBtn","data-toggle":"button"}," 下一步 ")," ")}}),M=l.default.createClass({displayName:"RegisterNextBtn",render:function(){return l.default.createElement("div",null,l.default.createElement("button",{type:"button",className:"btnSubmit","data-toggle":"button",onClick:this.props.handleClick},"下一步"))}});t.default=S}});