/**
 * Created by xiajing on 2016/11/1.
 */
import  React,{Component} from 'react';
import {editHttpUrl, fetchSourceModule, typeTwo, downHttpUrl, downFile,configUpdate, queryConfigFile, updateConfig,model} from '../../util/config.js';
import { saveStorage, getStorage, getLocalStorage } from '../../util/storageData.js';
import NoneList from '../publicComponent/noneList.jsx';
import {formatJson,isJsonFormat} from '../../util/operationJson.js';
import { Link } from 'react-router';
import TipMsgInfo from '../publicComponent/tipMsgInfo.jsx';
import {clickTable} from '../../util/menuList.js'
class AppConfig extends Component{
    constructor(props){
        super(props);
        this.state = {
            resourceList : [],
            configInfoShow:'',
            msg:'',
            orShow:true,
            tipMsg:'',
            moduleInfo:'',
            curVersion:'',//原生版本号
            curProductId:'',
            curResourceVersion:'',//资源版本号
            tokenInfoID:'',
            tokenInfoToken:'',
            productType:'',
            orJSONFormat:'',
            updateFlag:''

        }
    }
    componentDidMount(){
        var _this = this;
        var tokenValue;
        var tokenIdValue;
        var productType;
        var selectVer  = getStorage("versionInfo");
        var tokenInfo = getStorage("tokenInfo");
        if(selectVer !='' && selectVer != null){
            let data = JSON.parse(selectVer);
            var info = JSON.parse(tokenInfo);
            tokenValue=info.token;
            tokenIdValue=info.id;
            productType=data.productType
            _this.setState({curVersion:data.appVersion,curProductId:data.productID,
                curResourceVersion:data.sourceVersion,tokenInfoToken:info.token,tokenInfoID:info.id,productType:productType})//当前的版本信息
        }
      this.fetchList(tokenValue,tokenIdValue,productType);
    }
    fetchList(tokenValue,tokenIdValue,productType){
        var _this =this;
            $.ajax({
                url:httpsUrl+editHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:configUpdate,
                        flag:productType,
                        id:tokenIdValue,
                        token:tokenValue
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        console.log(data)
                        _this.setState({resourceList: data.data})
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
    }
    //下載
    downFileClick(module){
        var _this = this;
        var url=httpsUrl+downHttpUrl + '?type=' + typeTwo + '&func='+downFile+'&flag='+_this.state.productType+'&model='+module+'&id='+_this.state.tokenInfoID+'&token='+encodeURIComponent( _this.state.tokenInfoToken);
        $("#downUrl").attr('href',url);
        $("#downUrl").attr('download',url);
        window.setTimeout(function () {
            $("#downUrl")[0].click();
        }, 1000)
        //window.location.href = downHttpUrl + '?type=' + typeTwo + '&func='+downFile+'&flag='+_this.state.productType+'&model='+module+'&id='+_this.state.tokenInfoID+'&token='+encodeURIComponent( _this.state.tokenInfoToken);
    }
    //編輯
    editFileClick(module){
        var _this =this;
        _this.setState({moduleInfo:module})
            $.ajax({
                url:httpsUrl+editHttpUrl,
                method: 'post',
                dataType: 'json',
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data: {
                    json: JSON.stringify({
                        func: queryConfigFile,
                        id: _this.state.tokenInfoID,
                        type:typeTwo,
                        flag:_this.state.productType,
                        path:module,
                        token: _this.state.tokenInfoToken
                    })
                },
                success: function (data) {
                    if (data.status == 0) {
                        //console.log(data)
                        //console.log(data.isJSON)//0：JSON格式 1：非JSON格式
                        var cfgData = data.cfg;
                        _this.setState({orShow:true,orJSONFormat:data.isJSON})
                        $(".preCode").css('display','block');
                        if(data.isJSON == 0){//0：JSON格式要做转换
                            $("#contentPreCode").css('display','block')
                            $("#contentPreCode").val(formatJson( JSON.parse(data.cfg)))
                            _this.setState({msg:''})//清空
                        }else{//1：不用转换直接显示
                            $("#contentPreCode").css('display','block')
                            $("#contentPreCode").val(cfgData)
                            _this.setState({msg:''})//清空
                        }
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    } else {
                        $("#contentPreCode").css('display','block')
                        _this.setState({msg:data.msg})
                        $("#contentPreCode").val('')//清空
                        $(".preCode").css('display','none');
                    }
                }, error: function () {
                    console.log("服务器异常！")
                }
            })
    }
    cancelClick(){//取消 让div处于不可编辑的状态
        this.setState({orShow:true})
        $('#contentPreCode').attr("disabled",true);
        //$("#contentEdit").val();
        //var status=document.getElementById('contentEdit');
        //status.contentEditable=false;
    }
    //根据状态显示对应的按钮
    editFlagClick(){
        let btnValue =$("#contentPreCode").html()
        //if(!btnValue){
        //    this.setState({tipMsg:'请选择您要编辑的文件!'})
        //    $("#tipMsgDialog").modal(tipMsgDialog)
        //    return;
        //}
        $("#contentPreCode").css('display','block')
        $('#contentPreCode').attr("disabled",false);
         this.setState({orShow:false})
         //var status=document.getElementById('contentEdit');
         //status.contentEditable=true;//让文本框处理可编辑的状态
    }
    tipMsgClick(){
        if(this.state.updateFlag == true){
            $('#contentPreCode').attr("disabled",true);
            this.setState({orShow:true})//编辑成功将保存按钮隐藏  编辑按钮显示
        }
        $("#tipMsgDialog").modal('hide')
    }
    //更新
    saveClick(){
      //  console.log(this.state.orJSONFormat)
        var _this =this;
        let btnValue =$("#contentPreCode").val()
        //console.log(btnValue)
        //console.log(JSON.parse(btnValue))
        if(this.state.orJSONFormat == 0){//json格式要去校验是否正确
            try{
                var obj = JSON.parse(btnValue);
                var isJson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
                if(isJson == false){
                    _this.setState({tipMsg:'配置文件格式不正确，请正确编写！'})
                    $("#tipMsgDialog").modal(tipMsgDialog)
                    return;
                }
            }catch(e){
                _this.setState({tipMsg:"JSON数据格式不正确:\n"+e.message})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
        }
            //获取模块信息
            $.ajax({
                url:httpsUrl+editHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:updateConfig,
                        id:_this.state.tokenInfoID,
                        path:_this.state.moduleInfo,
                        type:typeTwo,
                        cfg:btnValue,
                        flag:_this.state.productType,
                        token:_this.state.tokenInfoToken
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        _this.setState({tipMsg:'更新成功!',updateFlag:true})
                        $("#tipMsgDialog").modal(tipMsgDialog)
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }else{
                        _this.setState({tipMsg:data.msg})
                        $("#tipMsgDialog").modal(tipMsgDialog)
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
    }
    goBack(){
        this.props.router.goBack()
    }
    render(){
        clickTable();
        var show = this.state.orShow == true ?  <div>
            <button type="button" class="verifyBtn" onClick={this.editFlagClick.bind(this)}>编辑</button>
        </div>
            :  <div>
            <button type="button" class="verifyBtn" onClick={this.saveClick.bind(this)}>保存</button>
            <button type="button"  onClick={this.cancelClick.bind(this)} class="verifyBgBtn">取消</button>
        </div>
        return(
            <div className="rightDivInfo">
                <a id="downUrl" className="downUrl"></a>
                <CurPvwTitle    goBack={this.goBack.bind(this)}
                                curVersion={this.state.curVersion}
                                curResourceVersion={this.state.curResourceVersion}/>
                <TipMsgInfo   msg={this.state.tipMsg}
                              tipMsgClick={this.tipMsgClick.bind(this)}/>
                {this.state.resourceList && this.state.resourceList.length != 0 ? <AppConfigList resourceList={this.state.resourceList}
                                                                                                 downFileClick={this.downFileClick.bind(this)}
                                                                                                 editFileClick={this.editFileClick.bind(this)} /> : ''}
                <EditConfig  configInfoShow={this.state.configInfoShow} msg={this.state.msg}/>
                {show}
            </div>
        )
    }
}
class CurPvwTitle extends Component{
    render(){
        return(
            <div className="curPvwTitle">
                <span className="curPvwOne">当前版本信息
                   <span className="curLeft">{this.props.curVersion}</span>
                </span>
                <span className="curPvwOne goBack"  style={{float:'right'}} onClick={this.props.goBack.bind(this)}>返回>></span>
            </div>
        )
    }
}
class AppConfigList extends Component{
    render(){
        var _this = this;
        return(
        <div className="summaryTable">
            <table class="table summaryTableWidth">
                <thead>
                <tr className="bgTr">
                    <th>配置类型</th>
                    <th>备注</th>
                    <th>操作时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.resourceList.map(function(data){
                        return(
                            <tr>
                                <td>{data.model}</td>
                                <td>{data.comment}</td>
                                <td>{data.modifyTime}</td>
                                <td>
                                    <span class="delBtn appMargin" onClick={_this.props.downFileClick.bind(_this,data.model)}>下载</span>
                                    <span class="editBtn" onClick={_this.props.editFileClick.bind(_this,data.path)}>编辑</span>
                                </td>
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
class EditConfig extends Component{
    render(){
        return(
            <div className="summaryTable editSummaryInfo" style={{height:'500px'}}>
                <div className="treeTitle" style={{paddingLeft:'29px'}}>
                    配置文件编辑框
                </div>
                <div className="editDivMsg">{this.props.msg}</div>
                <div className="contentDivEdit">
                   <textarea   disabled="disabled" id="contentPreCode" className="textJson"></textarea>
                </div>
            </div>
        )
    }
}
AppConfig.contextTypes = {
    router: React.PropTypes.isRequired
}
export default AppConfig