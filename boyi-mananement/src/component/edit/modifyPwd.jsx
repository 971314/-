/**
 * Created by xiajing on 2016/11/10.
 */
import React,{Component} from 'react';
import BackTitle from '../publicComponent/backTitle.jsx';
import {modifyPwd, userHttpUrl } from '../../util/config.js';
import { getStorage } from '../../util/storageData.js';
import TipMsgInfo from '../publicComponent/tipMsgInfo.jsx';
class ModifyPwd extends Component{
    constructor(props){
       super(props);
       this.state = {errMsg:'',msg:''}
    }
    backClick(){
        this.props.router.goBack()
    }
    modifyPwdClick(){
        var _this = this;
        let oldPwd = this.refs.oldPwd.value;
        let newsPwd = this.refs.newsPwd.value;
        if(!oldPwd){
          _this.setState({errMsg:'请输入旧密码！'})
          return;
        }
        if(!newsPwd){
            _this.setState({errMsg:'新密码不能为空！'})
            return;
        }
        let tokenInfo = getStorage("tokenInfo");
        if(tokenInfo != null && tokenInfo != ''){
            var info = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+userHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:modifyPwd,
                        account:info.account,
                        oldpwd:oldPwd,
                        newpwd:newsPwd,
                        id:info.id,
                        token:info.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        _this.setState({msg:'修改成功！'})
                        $("#tipMsgDialog").modal(tipMsgDialog)
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }else{
                        _this.setState({errMsg:data.msg})
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    focusClick(){
        this.setState({errMsg:''})
    }
    tipMsgClick(){
        $("#tipMsgDialog").modal('hide')
    }
     render(){
         return(
             <div className="rightDivInfo">
                 <TipMsgInfo   msg={this.state.msg}
                               tipMsgClick={this.tipMsgClick.bind(this)}/>
                 <BackTitle backClick={this.backClick.bind(this)}/>
                 <div className="loginDiv">
                     <span className="loginName">修改密码</span>
                     <div className="platEdDiv" style={{marginTop:'46px'}}>
                         <span className="platSpanTwo modifyPas">旧密码</span>
                         <span><input type="password" ref="oldPwd" className="editPas" onFocus={this.focusClick.bind(this)}/></span>
                     </div>
                     <div className="platEdDiv" style={{marginTop:'-8px'}}>
                         <span className="platSpanTwo modifyPas">新密码</span>
                         <span><input type="password" ref="newsPwd" className="editPas" onFocus={this.focusClick.bind(this)}/></span>
                     </div>
                     <div className="textCenter" style={{marginLeft:'74px'}}>
                         <button type="button" className="btnInfoConfirm" onClick={this.modifyPwdClick.bind(this)}>确定</button>
                         <button type="button" className="btnInfoCancel" onClick={()=>this.props.router.goBack()}>取消</button>
                     </div>
                     <div className="errMsgInfo">{this.state.errMsg}</div>
                 </div>
             </div>
         )
     }
}
ModifyPwd.contextTypes = {
    router: React.PropTypes.isRequired
}
export default ModifyPwd