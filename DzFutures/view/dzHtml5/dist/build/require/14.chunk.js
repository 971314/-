webpackJsonp([14],{150:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(25),s=l(n),i=a(1),o=l(i),d=(a(13),a(8)),r=(l(d),a(11)),c=l(r),u=a(12),p=a(30),g=a(17),m=l(g),f=a(21),h=a(22),v=a(135),C=l(v),M=o["default"].createClass({displayName:"RegisterStepOne",contextTypes:{router:o["default"].PropTypes.object},getInitialState:function(){return{btnChecked:!0,msgCodeFlag:!0}},componentDidMount:function(){},handleChange:function(){var e=this,t=this.refs.phoneTest.value,a=this.refs.msgCodeText.value;t&&a&&6==a.length?e.setState({btnChecked:!1}):e.setState({btnChecked:!0}),this.setState({phone:t,msgCode:a})},fetchMsgClick:function(){var e=this,t=this.refs.phoneTest.value;return p.phoneRegexp.test(t)?void $.ajax({url:f.dzHttpUrl,method:"post",contentType:"application/json",timeout:3e4,data:(0,s["default"])({func:f.generalRegister,type:f.sysType,data:[{type:f.loginType,phone:e.state.phone,os:u.OS,deviceId:u.devicdId,orgNumber:u.orgNumber,version:u.version}]}),success:function(t){return 1!=(0,h.getErrorMsg)(t)?(e.setState({tipMsg:t.desc}),void $("#tipMsgModal").modal(tipMsgModal)):void!function(){e.setState({msgCodeFlag:!1});for(var t=60,a=0;a<=60;a++)window.setTimeout(function(){0!=t?(e.setState({msgValue:t+"秒后重发"}),t--):(t=60,e.setState({msgCodeFlag:!0}))},1e3*a)}()},error:function(t){e.setState({tipMsg:"服务器异常"}),$("#tipMsgModal").modal(tipMsgModal)}}):(this.setState({tipMsg:"请正确输入手机号！"}),void $("#tipMsgModal").modal(tipMsgModal))},backClick:function(){this.props.history.goBack()},stepTwoClick:function(){var e={phone:this.state.phone,msgCode:this.state.msgCode};if(!p.phoneRegexp.test(this.state.phone))return this.setState({tipMsg:"请正确输入手机号！"}),void $("#tipMsgModal").modal(tipMsgModal);(0,u.saveStorageInfo)("generalUserRegister",e),(0,u.showCircleView)("处理中");var t=this;$.ajax({url:f.dzHttpUrl,method:"post",contentType:"application/json",timeout:3e4,data:(0,s["default"])({func:f.checkMsg,type:f.sysType,data:[{type:f.loginType,phone:t.state.phone,captcha:t.state.msgCode,deviceId:u.devicdId}]}),success:function(e){if(1!=(0,h.getErrorMsg)(e))return t.setState({tipMsg:e.desc}),void $("#tipMsgModal").modal(tipMsgModal);(0,u.hideCircleView)();var a={account:e.data[0].account,token:e.data[0].token};(0,u.saveStorageInfo)("registerDataOne",a),t.context.router.push("/registerStepTwo")},error:function(){(0,u.hideCircleView)(),t.setState({tipMsg:"服务器异常"}),$("#tipMsgModal").modal(tipMsgModal)}})},render:function(){var e=this,t=e.state.msgCodeFlag?o["default"].createElement(y,{handleClick:this.fetchMsgClick}):o["default"].createElement(E,{msg:this.state.msgValue}),a=e.state.btnChecked?o["default"].createElement(b,null):o["default"].createElement(k,{handleClick:this.stepTwoClick}),l=o["default"].createElement(c["default"],{name:"注册",handleClick:this.backClick});return document.body.style.paddingTop="44px",o["default"].createElement("div",null,o["default"].createElement("a",{href:"",id:"nativeMsg"}),o["default"].createElement(m["default"],{tipMsg:this.state.tipMsg}),l,o["default"].createElement("div",{className:"list-ul"},o["default"].createElement("ul",null,o["default"].createElement("li",{className:"login-bottom liLineHeight"},o["default"].createElement("div",{className:"login-rightDiv",style:{width:"100%"}},o["default"].createElement("input",{type:"text",maxLength:"11",autocomplete:"off",ref:"phoneTest",style:{width:"100%"},onChange:this.handleChange,placeholder:"请输入手机号",className:"loginText tLineHeight"}))),o["default"].createElement("li",null,o["default"].createElement("div",{className:"login-rightDiv",style:{width:"67%"}},o["default"].createElement("input",{autocomplete:"off",maxLength:"6",ref:"msgCodeText",type:"text",onChange:this.handleChange,style:{width:"212px"},placeholder:"请输入手机验证码",className:"loginText"})),o["default"].createElement("div",{className:"div3",style:{width:"33%"}},t)))),o["default"].createElement("div",{className:"btnDiv"},a),o["default"].createElement("div",{className:"btnDiv2"},o["default"].createElement(N,null)),o["default"].createElement("div",{className:"onlinePhone"},o["default"].createElement("img",{src:C["default"],className:"onlinePhoneImg"})))}}),y=o["default"].createClass({displayName:"InitMsgCode",render:function(){return o["default"].createElement("div",null,o["default"].createElement("span",{className:"initMsg",onClick:this.props.handleClick},"获取验证码"))}}),E=o["default"].createClass({displayName:"MsgCodeCount",render:function(){return o["default"].createElement("div",null,this.props.msg)}}),b=o["default"].createClass({displayName:"RegisterInitBtn",render:function(){return o["default"].createElement("div",null,o["default"].createElement("button",{type:"button",className:"registerInitBtn","data-toggle":"button"}," 下一步 ")," ")}}),k=o["default"].createClass({displayName:"RegisterNextBtn",render:function(){return o["default"].createElement("div",null,o["default"].createElement("button",{type:"button",className:"btnSubmit",onClick:this.props.handleClick,"data-toggle":"button"},"下一步 "))}}),N=o["default"].createClass({displayName:"ExitAccountLogin",contextTypes:{router:o["default"].PropTypes.object},render:function(){return o["default"].createElement("div",null,o["default"].createElement("div",{className:"leftDiv",style:{height:"1px"}}," "))}});t["default"]=M}});