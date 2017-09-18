webpackJsonp([4],{9:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(1),s=l(n),i=a(13),d=l(i),o=s["default"].createClass({displayName:"NavTitle",render:function(){return s["default"].createElement("div",null,s["default"].createElement("nav",{className:"navbar navInfo navbar-fixed-top"},s["default"].createElement("div",{className:"titleBack initHeight"},s["default"].createElement("img",{src:d["default"],onClick:this.props.handleClick})),s["default"].createElement("div",{className:"login-nav"}," ",this.props.name," ")))}});t["default"]=o},149:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(23),s=l(n),i=a(1),d=l(i),o=(a(14),a(7)),r=(l(o),a(9)),c=l(r),u=a(10),p=a(30),f=a(15),m=l(f),g=a(18),h=a(19),v=a(294),C=l(v),M=d["default"].createClass({displayName:"RegisterStepOne",contextTypes:{router:d["default"].PropTypes.object},getInitialState:function(){return{btnChecked:!0,msgCodeFlag:!0}},componentDidMount:function(){},handleChange:function(){var e=this,t=this.refs.phoneTest.value,a=this.refs.msgCodeText.value;t&&a&&6==a.length?e.setState({btnChecked:!1}):e.setState({btnChecked:!0}),this.setState({phone:t,msgCode:a})},fetchMsgClick:function(){var e=this,t=this.refs.phoneTest.value;return p.phoneRegexp.test(t)?void $.ajax({url:g.dzHttpUrl,method:"post",contentType:"application/json",timeout:3e4,data:(0,s["default"])({func:g.generalRegister,type:g.sysType,data:[{type:g.loginType,phone:e.state.phone,os:u.OS,deviceId:u.devicdId,orgNumber:u.orgNumber,version:u.version}]}),success:function(t){return 1!=(0,h.getErrorMsg)(t)?(e.setState({tipMsg:t.desc}),void $("#tipMsgModal").modal(tipMsgModal)):void!function(){e.setState({msgCodeFlag:!1});for(var t=60,a=0;a<=60;a++)window.setTimeout(function(){0!=t?(e.setState({msgValue:t+"秒后重发"}),t--):(t=60,e.setState({msgCodeFlag:!0}))},1e3*a)}()},error:function(t){e.setState({tipMsg:"服务器异常"}),$("#tipMsgModal").modal(tipMsgModal)}}):(this.setState({tipMsg:"请正确输入手机号！"}),void $("#tipMsgModal").modal(tipMsgModal))},backClick:function(){this.props.history.goBack()},stepTwoClick:function(){var e={phone:this.state.phone,msgCode:this.state.msgCode};if(!p.phoneRegexp.test(this.state.phone))return this.setState({tipMsg:"请正确输入手机号！"}),void $("#tipMsgModal").modal(tipMsgModal);(0,u.saveStorageInfo)("generalUserRegister",e),(0,u.showCircleView)("处理中");var t=this;$.ajax({url:g.dzHttpUrl,method:"post",contentType:"application/json",timeout:3e4,data:(0,s["default"])({func:g.checkMsg,type:g.sysType,data:[{type:g.loginType,phone:t.state.phone,captcha:t.state.msgCode,deviceId:u.devicdId}]}),success:function(e){if(1!=(0,h.getErrorMsg)(e))return t.setState({tipMsg:e.desc}),void $("#tipMsgModal").modal(tipMsgModal);(0,u.hideCircleView)();var a={account:e.data[0].account,token:e.data[0].token};(0,u.saveStorageInfo)("registerDataOne",a),t.context.router.push("/registerStepTwo")},error:function(){(0,u.hideCircleView)(),t.setState({tipMsg:"服务器异常"}),$("#tipMsgModal").modal(tipMsgModal)}})},render:function(){var e=this,t=e.state.msgCodeFlag?d["default"].createElement(E,{handleClick:this.fetchMsgClick}):d["default"].createElement(y,{msg:this.state.msgValue}),a=e.state.btnChecked?d["default"].createElement(N,null):d["default"].createElement(b,{handleClick:this.stepTwoClick}),l=d["default"].createElement(c["default"],{name:"注册",handleClick:this.backClick});return document.body.style.paddingTop="44px",d["default"].createElement("div",null,d["default"].createElement("a",{href:"",id:"nativeMsg"}),d["default"].createElement(m["default"],{tipMsg:this.state.tipMsg}),l,d["default"].createElement("div",{className:"list-ul"},d["default"].createElement("ul",null,d["default"].createElement("li",{className:"login-bottom liLineHeight"},d["default"].createElement("div",{className:"login-rightDiv",style:{width:"100%"}},d["default"].createElement("input",{type:"text",maxLength:"11",autocomplete:"off",ref:"phoneTest",style:{width:"100%"},onChange:this.handleChange,placeholder:"请输入手机号",className:"loginText tLineHeight"}))),d["default"].createElement("li",null,d["default"].createElement("div",{className:"login-rightDiv",style:{width:"67%"}},d["default"].createElement("input",{autocomplete:"off",maxLength:"6",ref:"msgCodeText",type:"text",onChange:this.handleChange,style:{width:"212px"},placeholder:"请输入手机验证码",className:"loginText"})),d["default"].createElement("div",{className:"div3",style:{width:"33%"}},t)))),d["default"].createElement("div",{className:"btnDiv"},a),d["default"].createElement("div",{className:"btnDiv2"},d["default"].createElement(k,null)),d["default"].createElement("div",{className:"onlinePhone"},d["default"].createElement("img",{src:C["default"],className:"onlinePhoneImg"})))}}),E=d["default"].createClass({displayName:"InitMsgCode",render:function(){return d["default"].createElement("div",null,d["default"].createElement("span",{className:"initMsg",onClick:this.props.handleClick},"获取验证码"))}}),y=d["default"].createClass({displayName:"MsgCodeCount",render:function(){return d["default"].createElement("div",null,this.props.msg)}}),N=d["default"].createClass({displayName:"RegisterInitBtn",render:function(){return d["default"].createElement("div",null,d["default"].createElement("button",{type:"button",className:"registerInitBtn","data-toggle":"button"}," 下一步 ")," ")}}),b=d["default"].createClass({displayName:"RegisterNextBtn",render:function(){return d["default"].createElement("div",null,d["default"].createElement("button",{type:"button",className:"btnSubmit",onClick:this.props.handleClick,"data-toggle":"button"},"下一步 "))}}),k=d["default"].createClass({displayName:"ExitAccountLogin",contextTypes:{router:d["default"].PropTypes.object},render:function(){return d["default"].createElement("div",null,d["default"].createElement("div",{className:"leftDiv",style:{height:"1px"}}," "))}});t["default"]=M}});