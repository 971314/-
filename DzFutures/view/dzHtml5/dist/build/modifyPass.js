webpackJsonp([6],{0:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var i=a(1),n=l(i),s=a(13),d=a(38),c=l(d),o=a(156),r=l(o);c.default.render(n.default.createElement(s.Router,{routes:r.default,history:s.hashHistory}),document.getElementById("modifyPass"))},12:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(1),n=l(i),s=a(14),d=l(s),c=n.default.createClass({displayName:"NavTitle",render:function(){return n.default.createElement("div",null,n.default.createElement("nav",{className:"navbar navInfo navbar-fixed-top"},n.default.createElement("div",{className:"titleBack initHeight"},n.default.createElement("img",{src:d.default,onClick:this.props.handleClick})),n.default.createElement("div",{className:"login-nav"}," ",this.props.name," ")))}});t.default=c},14:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMWRlMzg5Zi1kOWZlLTAwNGQtYTczYi1hMGFhNzE2ZmFmZmIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTE2OTQ5RThGNTZFMTFFNTk4MjJCNjEzMkFGOTZEQTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTE2OTQ5RTdGNTZFMTFFNTk4MjJCNjEzMkFGOTZEQTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJmNmNiODc1LWFhYzgtOTg0ZS05NjVmLTlhNDA5NGY4OWUzMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpmMWRlMzg5Zi1kOWZlLTAwNGQtYTczYi1hMGFhNzE2ZmFmZmIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7fAk9AAAAA20lEQVR42qSUuwrCQBBFxyRGiIWFWIiVf6MW0dR+maWCipEE8dfEGLVY78ospHCzDy8cNgzhMMwOS0IIaiEGqeGfLxHpE4MSCHAlQ6IWyZnPJVkk0kiOoA9S8PARdcEBDMECVGSZpigEezACcxdJUxRyJ2Mwc5UokZTswIQ7uZNHpGgDpiy5kWcCvh15M2/6Ix25vThzkICVz3yUSO1O0VjA2lekZBdZ486erjNSeYGMv0sWe4mIu8j4NgsXWfCjVrOsB062skBTr3hOA7C1asnwYCVgbfOwfQQYAJ7JlLo5v57ZAAAAAElFTkSuQmCC"},15:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(1),n=l(i),s=n.default.createClass({displayName:"TipMsg",render:function(){return n.default.createElement("div",null,n.default.createElement("div",{className:"modal dialog-info",id:"tipMsgModal"},n.default.createElement("div",{className:"modal-dialog"},n.default.createElement("div",{className:"modal-content"},n.default.createElement("p",{className:"text-align"},"提示"),n.default.createElement("div",{className:"modal-header dialog-bottom"},this.props.tipMsg),n.default.createElement("div",{className:"modal-body dialog-bottom","data-dismiss":"modal"},"确认")))))}});t.default=s},19:function(e,t){"use strict";function a(e){if(1==e.retHead)return e.retHead}Object.defineProperty(t,"__esModule",{value:!0}),t.getErrorMsg=a},30:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.phoneRegexp=/^(13|15|18|14|17)[0-9]{9}$/,t.cardNoRegexp=/^(([1-9][0-9]{5}(19[0-9]{2}|200[0-9]|201[1-3])(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[01])[0-9]{3}[0-9xX]))$/,t.psdRegexp=/[a-zA-Z0-9]{6,20}/},56:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAQCAYAAAABOs/SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZCM0NFN0JENUY3MTExRTZBOTg0RTg4NUEzNzFFNDNFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZCM0NFN0JFNUY3MTExRTZBOTg0RTg4NUEzNzFFNDNFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkIzQ0U3QkI1RjcxMTFFNkE5ODRFODg1QTM3MUU0M0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkIzQ0U3QkM1RjcxMTFFNkE5ODRFODg1QTM3MUU0M0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7UBGdzAAADT0lEQVR42pyVO2gVQRSGd2Z3b1A0aeIjYIhgFA2iYBo1WlkEkTRKLEyVTm1EEC0iFlEsDARMoYWdpZrKVwpJER9FbnHTSKJiILkBFY1RFCR3d2f9zu5O7iPxQQZm58ycf85rzjmr8vkJh1FnjOlibVPK6Y/jGFI5dqgy6QhPcSCrMY6jtargqwzjVA3hgz/N9wd3n3C04LERnkbxfRGWy/nDCHsdV9wWUvbprDakeqRGab2M4QaBuZ0Qrm4BsqBTBfEvrfUlIcMwulNWEmeeGSeudWMltbH1UCVTIoBcOb9sjBjljCkVz4osbQGuq25gzYcoMgeYZ3RitnKi6N8Ka0LKHZM8gwzubw6C6IqIQ2avxWp5Izs9z93PGoShucXlQ2nonFWN9J4YHo0hR7uuO4Bj00rpJAq6DFQ2d3xRiJXPCc+x1SjOkm99GIZjOLCd/U+UXrQGydQWKIBSKZiFnAJ0XZh4/gjlA0DW/K8BmdJOPH1DbhxG1jzH65A1qCqE6OxdNpRK0Vth5HLeQULRxzwrPAy6gIB3mQG7/2JAA9HqBvsQJSPgm5DxjOfbxtqP9+eJ4jVbciqfL7Rx+ApgA6W0D2CBvc3QXRjVB6/H1q/UIOs05s7FcbJfy3EL/B3pnQQ3gzLxcCgJK/mD0ntUTDc6zvm+HvIQ2ol+lHpHABTi2GTlkGTeJB7cjaKwB3oUoSJ8C2ftYNpFSVpyFu9Mkc07Ce8DHBiS7E7fVDm+750EOxoE4U0pazU+XhBGM+VUrGwQ6Vs59bz7d+hJhLVl/FbcaoJ+LHvOT7F8hJ6G/kr5DBsTHa+r81u59762EeH1S86fWsVL3UYKXQASHkAv8K6D8DTDmhNeWoMJ71NSAr63SRqM8DwvKZXc4mKwCGzG9/2tVrHIT/NJJVhd249FKJZLt+olVB2E7Cpnc7YMsqqTELvSActtUll+iTsnuN/CEw2WFZZ7faLPepz1bFsSPglWAjOPR4217VLgJMsXoX3fbSyz1VK/JiIT5Mtez/M2wv+cRjF1TLqaZ69IIlQIjgjZUbpMMcvcpZ9AxfD/UMlJOOlUXax7kPst/ck4S/1bhrfSr0+eGtBItbJlPbt+pb+T9ZpRxLti9nNYNn4LMAAeEP+7gqU3CQAAAABJRU5ErkJggg=="},58:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAARCAYAAADOk8xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZCOTRBRUQ3NUY3MTExRTY4M0IyQjc4Q0Y1QUE4MjgzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZCOTRBRUQ4NUY3MTExRTY4M0IyQjc4Q0Y1QUE4MjgzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkI5NEFFRDU1RjcxMTFFNjgzQjJCNzhDRjVBQTgyODMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkI5NEFFRDY1RjcxMTFFNjgzQjJCNzhDRjVBQTgyODMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5d+8Z8AAAEKklEQVR42oyVXYhVVRTH99nn4577MRcHRrGcSZ+UqAQFy8IyfUjCj3nJlFEoVAR9KUSoIAuhoOxBlJBAB0lRDIKEZASpKTDQAeshdV5MAnGIDPHe+bjn3PPpb517jk6DkRv23efsvfZ//dda/3WuMTR0QRmGoUolV5mmqeI4VlprFUUh75bsrbZte5tSaoBpyFmSJCpN0+yeTB5Z1Y12u32I/UFs/DhOwQozLNu2lO/7KggCpdWMIUAybdvZWSqV7jB/5H0L8xJkPgqC9kthGPYCPgfHC6Io6k+S6GvO5rqu+2W5XPa0Ng8YRuqmaTITXhnTI5SVsYKLpy3L6gOswfw4DKMTpqkbco4zxVmWDeiRiUhJNPKutbEam/2O46wQoFZragtnpx3HUhB8GKFElCSxwvBQtVq9yFZfq9UaAKybKA4TQcP3PbHrdpzSQVJ8Dac3SfmvRLMPMpBNhcwwdi97nv8KEd+qVrtOuW5pCHhLfMjIH7IIz5C+TeR6aGpqaoC8N227nLHyPE/IPIWzX4iir0i7RMz+Utb1zWZzZRD4nuuW5ewiOPMdJzniOPauNLVv8L4Y8hNanNVqtUEi2wSz94lsLQyaUmxxJimDjF2r1TNnhWCm1xuHyyjDWa0t0ptkqZb7pHF3q+Vt4HlBvV6/SWZ6NIYbcLhtfHz84MTE+OfCulOfDiARKITwpmWZmbNHDVE2dq9VKtXnLcvOSegMhzvfNxr3lpH62bNmdf+uK5XKSSL5CzZ7pBbFSJI0XxOJ4FX1P6NDVL8otZTnOI7y9kkkU1eazcZG9p8gWrNO2m6LgbCSVMjsRPgAz1GPMYjM6KS7I8JCHxI1e9/iZ0y32/5hxEANKtvztshSIVNexTkXRx7DnfxcMwwzc0IfF3czLDRwGWXP05OTk+9Qgwv1etcxVLpX0iA1kZSKsQgHhZ1iLyginzkEMAjCUbB+4MOQ3RMMmQTRgwZ+Q/UvULb3dJ7vNfTQOQT0BTUdBuPJQjAoS5w2MV7Jfrv4nHXqpornO7TOOkkj4NmHQe6zvo0g/wFjCWQ24+OALtLGhfX032ccrsLpGALYIVEKe4iIzWUcP0sdaOS0gauI+TcgJ2ilRZD7E+ljJ8pM55Gt4Wq1clx6j/PF3PtGyD3IUd43H8BkOfUYxclRmvYuNjtgaokxl/7AwVpmd5rGXaxzmW/JJ1DuQ+5pzE6Wy+5tCKzy/fanntfqAe9qUY5/FSX/JxihHs9QNyJMUpr+KM5D+vAsgG/gu1dsceTngnhOas/+VdQ4ytxKJr7j/kKIfCgyKEqQfdoe1U+dj3QwKH81AL7O+7us/Y5j9he9Kc6EYAEGt4AMfcL7Vyh/TFqhUOn0Yf2XyAswwM8TzXmee4l0HUfLOeuFgMFZiBKvE8nPAP/EOilCm05k5rgvwADIiI1l2SrRNQAAAABJRU5ErkJggg=="},143:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(23),n=l(i),s=a(1),d=l(s),c=(a(13),a(8)),o=(l(c),a(12)),r=l(o),u=a(9),m=a(30),g=a(15),f=l(g),p=a(18),h=a(19),M=a(14),A=l(M),b=d.default.createClass({displayName:"ModifyPassOne",contextTypes:{router:d.default.PropTypes.object},getInitialState:function(){return{btnChecked:!0,msgCodeFlag:!0}},handleChange:function(){var e=this,t=this.refs.phoneTest.value,a=this.refs.msgCodeText.value;t&&a&&6==a.length?e.setState({btnChecked:!1}):e.setState({btnChecked:!0}),this.setState({phone:t,msgCode:a})},fetchMsgClick:function(){var e=this,t=this.refs.phoneTest.value;return m.phoneRegexp.test(t)?void $.ajax({url:p.dzHttpUrl,method:"post",contentType:"application/json",timeout:3e4,data:(0,n.default)({func:p.modifyPassId,type:p.sysType,data:[{type:p.loginType,phone:e.state.phone,deviceId:u.devicdId}]}),success:function(t){if(1!=(0,h.getErrorMsg)(t))return e.setState({tipMsg:t.desc}),void $("#tipMsgModal").modal(tipMsgModal);var a;!function(){a={userId:t.data[0].userId},(0,u.saveStorageInfo)("dzPassUserId",a),e.setState({msgCodeFlag:!1});for(var l=60,i=0;i<=60;i++)window.setTimeout(function(){0!=l?(e.setState({msgValue:l+"秒后重发"}),l--):(l=60,e.setState({msgCodeFlag:!0}))},1e3*i)}()},error:function(t){e.setState({tipMsg:"服务器异常"}),$("#tipMsgModal").modal(tipMsgModal)}}):(this.setState({tipMsg:"请正确输入手机号！"}),void $("#tipMsgModal").modal(tipMsgModal))},backClick:function(){this.props.history.goBack()},stepTwoClick:function(){var e={phone:this.state.phone,msgCode:this.state.msgCode};if((0,u.saveStorageInfo)("modifyBaseInfoDz",e),!m.phoneRegexp.test(this.state.phone))return this.setState({tipMsg:"请正确输入手机号！"}),void $("#tipMsgModal").modal(tipMsgModal);(0,u.showCircleView)("处理中");var t=(0,u.getStorageInfo)("dzPassUserId");if(t)var a=JSON.parse(t);var l=this;$.ajax({url:p.dzHttpUrl,method:"post",contentType:"application/json",timeout:3e4,data:(0,n.default)({func:p.checkMsg,type:p.sysType,data:[{type:p.loginType,phone:l.state.phone,captcha:l.state.msgCode,deviceId:u.devicdId,userId:a.userId}]}),success:function(e){if(1!=(0,h.getErrorMsg)(e))return l.setState({tipMsg:e.desc}),void $("#tipMsgModal").modal(tipMsgModal);(0,u.hideCircleView)();var t={account:e.data[0].account,token:e.data[0].token};(0,u.saveStorageInfo)("modifyDzTokenInfo",t),l.context.router.push("/modifyPassTwo")},error:function(){(0,u.hideCircleView)(),l.setState({tipMsg:"服务器异常"}),$("#tipMsgModal").modal(tipMsgModal)}})},render:function(){var e=this,t=e.state.msgCodeFlag?d.default.createElement(I,{handleClick:this.fetchMsgClick}):d.default.createElement(v,{msg:this.state.msgValue}),a=e.state.btnChecked?d.default.createElement(E,null):d.default.createElement(N,{handleClick:this.stepTwoClick});return d.default.createElement(r.default,{name:"验证手机号",handleClick:this.backClick}),document.body.style.paddingTop="44px",d.default.createElement("div",null,d.default.createElement("a",{href:"",id:"nativeMsg"}),d.default.createElement(f.default,{tipMsg:this.state.tipMsg}),d.default.createElement("nav",{className:"navbar navInfo navbar-fixed-top"},d.default.createElement("div",{className:"titleBack initHeight"},d.default.createElement("a",{href:"goBack"},d.default.createElement("img",{src:A.default}))),d.default.createElement("div",{className:"login-nav"}," 验证手机号 ")),d.default.createElement("div",{className:"list-ul"},d.default.createElement("ul",null,d.default.createElement("li",{className:"login-bottom"},d.default.createElement("div",{className:"login-rightDiv liLineHeight",style:{width:"100%"}},d.default.createElement("input",{type:"text",maxLength:"11",autocomplete:"off",ref:"phoneTest",style:{width:"100%"},onChange:this.handleChange,placeholder:"请输入手机号",className:"loginText tLineHeight"}))),d.default.createElement("li",null,d.default.createElement("div",{className:"login-rightDiv",style:{width:"67%"}},d.default.createElement("input",{autocomplete:"off",maxLength:"6",ref:"msgCodeText",type:"text",onChange:this.handleChange,style:{width:"212px"},placeholder:"请输入手机验证码",className:"loginText"})),d.default.createElement("div",{className:"div3",style:{width:"33%"}},t)))),d.default.createElement("div",{className:"btnDiv"},a))}}),I=d.default.createClass({displayName:"InitMsgCode",render:function(){return d.default.createElement("div",null,d.default.createElement("span",{className:"initMsg",onClick:this.props.handleClick},"获取验证码"))}}),v=d.default.createClass({displayName:"MsgCodeCount",render:function(){return d.default.createElement("div",null,this.props.msg)}}),E=d.default.createClass({displayName:"RegisterInitBtn",render:function(){return d.default.createElement("div",null,d.default.createElement("button",{type:"button",className:"registerInitBtn","data-toggle":"button"}," 下一步 ")," ")}}),N=d.default.createClass({displayName:"RegisterNextBtn",render:function(){return d.default.createElement("div",null,d.default.createElement("button",{type:"button",className:"btnSubmit",onClick:this.props.handleClick,"data-toggle":"button"},"下一步 "))}});t.default=b},144:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(23),n=l(i),s=a(1),d=l(s),c=(a(13),a(8)),o=(l(c),a(12)),r=l(o),u=a(9),m=a(58),g=l(m),f=a(56),p=l(f),h=a(15),M=l(h),A=a(18),b=a(19),I=d.default.createClass({displayName:"modifyPassTwo",contextTypes:{router:d.default.PropTypes.object},getInitialState:function(){return{checked:!1,btnChecked:!1,confirmFlag:!1}},componentDidMount:function(){(0,u.getDeviceJsonInfo)()},handleChange:function(){var e=this,t=this.refs.passWordText.value,a=this.refs.confirmPassText.value;t&&a?e.setState({btnChecked:!0}):e.setState({btnChecked:!1}),this.setState({passWord:t,confirmPass:a})},handleClick:function(){this.setState({checked:!this.state.checked}),this.state.checked?this.refs.passWordText.setAttribute("type","password"):this.refs.passWordText.setAttribute("type","text")},confirmClick:function(){this.setState({confirmFlag:!this.state.confirmFlag}),this.state.confirmFlag?this.refs.confirmPassText.setAttribute("type","password"):this.refs.confirmPassText.setAttribute("type","text")},backClick:function(){this.props.history.goBack()},stepThreeClick:function(){var e=this;if(this.state.confirmPass!=this.state.passWord)return this.setState({tipMsg:"两次输入的密码不一致，请重新输入"}),void $("#tipMsgModal").modal(tipMsgModal);(0,u.showCircleView)("处理中");var t=(0,u.getStorageInfo)("modifyDzTokenInfo"),a=(0,u.getStorageInfo)("modifyBaseInfoDz");if(t&&a)var l=JSON.parse(t),i=JSON.parse(a);$.ajax({url:A.dzHttpUrl,method:"post",contentType:"application/json",timeout:3e4,data:(0,n.default)({func:A.modifyPass,type:A.sysType,account:l.account,token:l.token,data:[{type:A.loginType,phone:i.phone,newPwd:e.state.passWord,os:u.OS,deviceId:u.devicdId,orgNumber:u.orgNumber,version:u.version}]}),success:function(t){return 1!=(0,b.getErrorMsg)(t)?((0,u.hideCircleView)(),e.setState({tipMsg:t.desc}),void $("#tipMsgModal").modal(tipMsgModal)):((0,u.hideCircleView)(),(0,u.storePublicData)("1"),$("#prefectLoginMsgModal").modal(prefectLoginMsgModal),void $("#confirmLoginPrefect").click(function(){window.location.href="../user/nav.html"}))},error:function(){(0,u.hideCircleView)(),e.setState({tipMsg:"服务器异常!"}),$("#tipMsgModal").modal(tipMsgModal)}})},render:function(){var e=this.state.btnChecked?d.default.createElement(E,{handleClick:this.stepThreeClick}):d.default.createElement(v,null),t=this.state.checked?g.default:p.default,a=this.state.confirmFlag?g.default:p.default,l=d.default.createElement(r.default,{name:"修改密码",handleClick:this.backClick});return document.body.style.paddingTop="44px",d.default.createElement("div",null,d.default.createElement(M.default,{tipMsg:this.state.tipMsg}),l,d.default.createElement("div",{className:"modal dialog-info",id:"prefectLoginMsgModal"},d.default.createElement("div",{className:"modal-dialog"},d.default.createElement("div",{className:"modal-content"},d.default.createElement("p",{className:"text-align"},"提示"),d.default.createElement("div",{className:"modal-header dialog-bottom"},"您的密码已修改成功，请重新登录！"),d.default.createElement("div",{className:"modal-body dialog-bottom","data-dismiss":"modal",id:"confirmLoginPrefect"},"确认")))),d.default.createElement("div",{className:"list-ul"},d.default.createElement("ul",null,d.default.createElement("li",{className:"login-bottom liLineHeight"},d.default.createElement("div",{className:"registerLeft",style:{width:"78%"}},d.default.createElement("input",{ref:"passWordText",autocomplete:"off",style:{width:"100%"},type:"password",onChange:this.handleChange,placeholder:"设置登录密码",className:"loginText tLineHeight"})),d.default.createElement("div",{className:"div3",style:{width:"22%"}}," ",d.default.createElement("img",{src:t,onClick:this.handleClick}))),d.default.createElement("li",null,d.default.createElement("div",{className:"registerLeft",style:{width:"78%"}},d.default.createElement("input",{ref:"confirmPassText",autocomplete:"off",type:"password",style:{width:"212px"},onChange:this.handleChange,placeholder:"再次输入登录密码",className:"loginText"})),d.default.createElement("div",{className:"div3",style:{width:"22%"}}," ",d.default.createElement("img",{src:a,onClick:this.confirmClick}))))),d.default.createElement("div",{className:"btnDiv"},e))}}),v=d.default.createClass({displayName:"RegisterInitBtn",render:function(){return d.default.createElement("div",null,d.default.createElement("button",{type:"button",className:"registerInitBtn","data-toggle":"button"}," 完成 ")," ")}}),E=d.default.createClass({displayName:"RegisterNextBtn",render:function(){return d.default.createElement("div",null,d.default.createElement("button",{type:"button",className:"btnSubmit","data-toggle":"button",onClick:this.props.handleClick},"完成"))}});t.default=I},156:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={childRoutes:[{path:"/",indexRoute:{component:a(143).default}},{path:"modifyPassTwo",component:a(144).default}]}}});