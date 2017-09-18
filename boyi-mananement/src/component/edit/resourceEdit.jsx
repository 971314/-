/**
 * Created by xiajing on 2016/11/9.
 */
import React, {Component} from 'react';
import {data} from '../../util/data.js';
import {editHttpUrl, queryDir, typeOne, model, upResourceFiled, upResourceHttpUrl, upAssignFile, fileImg, typeTwo, delLisIimg } from '../../util/config.js';
import { saveStorage, getStorage, getLocalStorage } from '../../util/storageData.js';
import TipMsgInfo from '../publicComponent/tipMsgInfo.jsx';
import { backRelease } from '../../util/verifyRegular.js';
import { getFileType, allowZipType, allowFileType } from '../../util/verifyRegular.js';
import downImg from '../../images/down.png';
import rightImg from '../../images/right.png';
import {initMenuList} from '../../util/menuList.js'
class ResourceEdit extends Component{
    constructor(props){
        super(props);
        this.state = {menuList:[],msg:"",filePath:'',upFilePath:'',
            curVersion:'',//原生版本号
            curProductId:'',
            curResourceVersion:'',//资源版本号
            tokenInfoID:'',
            tokenInfoToken:'',
            upBtnFlag:true,
            upBtnFlagOne:true,
            upBtnFlagTwo:true,
            productType:'',
            showUpUrl:'当前路径,服务器上传路径',
            imgShow:true
        }
    }
    componentDidMount() {
        //console.log(data)
        // console.log(data.children[0].children[0].name)
        //this.setState({menuList: data.dir})
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
            productType = data.productType;
            _this.setState({curVersion:data.appVersion,curProductId:data.productID,
                curResourceVersion:data.sourceVersion,tokenInfoToken:info.token,tokenInfoID:info.id,productType:productType})//当前的版本信息
        }
        this.featchDirList(tokenValue,tokenIdValue,productType);
    }
    //查询目录结构
    featchDirList(tokenValue,tokenIdValue,productType){
        var _this =this;
        $.ajax({
            url:httpsUrl+editHttpUrl,
            method:'post',
            dataType:'json',
            xhrFields:{withCredentials: true},
            crossDomain:true,
            data:{
                json:JSON.stringify({
                    func:queryDir,
                    id:tokenIdValue,
                    type:typeOne,
                    flag:productType,
                    token:tokenValue
                })
            },
            success:function(data){
                if(data.status == 0){
                    console.log(data)
                    _this.setState({menuList: data.dir,filePath:data.path})
                    initMenuList();
                }else{

                }
            },error:function(){
                console.log("服务器异常！")
            }
        })
    }
    menuClick(e){
        console.log(e)
    }
    OnMenuClick(path,type,e){
        //this.refs.upFileCur.value=path
        this.setState({upFilePath:path,upFileModule:path})
        //let node = $(e.target);
        //let subMenu = node.next("ul");
        //console.log(subMenu)
        //subMenu.css("display",subMenu.css('display') == "none" ? "block" : "none");
        if(type == 1){
            this.setState({showUpUrl:path})
        }
    }
    /*
     递归生成菜单
     */
    menuListInfo(menuListObj){
        let vdom = [];
        if(menuListObj instanceof Array){
            let list = [];
            for(var item of menuListObj){
                list.push(this.menuListInfo(item))
            }
            vdom.push(
                <ul key="single">
                    {list}
                </ul>
            )
        }else{
            vdom.push(
                <li key={menuListObj.type}>
                    <a onClick={this.OnMenuClick.bind(this,menuListObj.filePath,menuListObj.type)}>
                        {
                            //  menuListObj.type == 1 ? <span><img  src={rightImg} /></span> :''
                        }
                        {menuListObj.fileName}
                        {
                            menuListObj.type == 1 ?'' :
                                <div className="treeDivInfo">
                                    <span className="delBtn treesSpan" onClick={this.delMenuClick.bind(this,menuListObj.filePath)}>删除</span>
                                    <span className="editBtn" onClick={this.downMenuClick.bind(this,menuListObj.filePath)}>下载</span>
                                </div>
                        }
                    </a>
                    {this.menuListInfo((menuListObj.childs))}
                </li>
            )
        }
        return vdom;
    }
    //delMenuClick 删除资源树中的文件
    delMenuClick(filePath){
        var _this =this;
        $.ajax({
            url:httpsUrl+editHttpUrl,
            method:'post',
            dataType:'json',
            xhrFields:{withCredentials: true},
            crossDomain:true,
            data:{
                json:JSON.stringify({
                    func:delLisIimg,
                    type:typeOne,
                    flag:_this.state.productType,
                    filePath:_this.state.filePath + filePath,
                    id:_this.state.tokenInfoID,
                    token:_this.state.tokenInfoToken
                })
            },
            success:function(data){
                if(data.status == 0){
                    _this.featchDirList(_this.state.tokenInfoToken,_this.state.tokenInfoID,_this.state.productType)
                    _this.setState({msg:'删除成功！'})
                    $("#tipMsgDialog").modal(tipMsgDialog)
                    // initMenuList();
                    location.reload();//重载页面是为了解决菜单的样式
                }else if(data.status == '-2' || data.status == '-9'){
                    _this.context.router.push('/');
                }else{
                    _this.setState({msg:data.msg})
                    $("#tipMsgDialog").modal(tipMsgDialog)
                }
            },error:function(){
                _this.setState({msg:"服务器异常！"})
                $("#tipMsgDialog").modal(tipMsgDialog)
            }
        })
    }
    //downMenuClick 下载资源树中的文件
    downMenuClick(filePath){
        var _this = this;
        console.log(_this.state.filePath+filePath)
        var str = JSON.stringify({
            func: fileImg ,
            id: _this.state.tokenInfoID,
            type:typeTwo,
            path: _this.state.filePath + filePath,
            flag:_this.state.productType,
            token:encodeURIComponent( _this.state.tokenInfoToken)
        })
        let url= httpsUrl+editHttpUrl+'?json='+str;
        $("#downUrl").attr('href',url);
        $("#downUrl").attr('download',url);
        window.setTimeout(function () {
            $("#downUrl")[0].click();
        }, 1000)
      //  window.location.href= editHttpUrl+'?json='+str;
    }
    //显示上传的名称
    resourceFileChange(value,e){
        var _this = this;
        var fileName = e.currentTarget.files[0].name;
        if(value == 1){
            _this.refs.shoResFile.value = fileName;
        }
        if(value == 2){
            _this.refs.upFileModule.value = fileName;
        }
        if(value == 3){
            _this.refs.upFileCur.value = fileName;
        }
    }
    //上传资源包
    upResourceFiledClick(){
        var _this = this;
        // console.log(this.refs.shoResFile.value)
        if(!this.refs.shoResFile.value){
            _this.setState({msg:'请选择上传的资源包！'})
            $("#tipMsgDialog").modal(tipMsgDialog)
            return;
        }
        var fileType =  getFileType(this.refs.shoResFile.value)
        if(this.refs.shoResFile.value!="") {
            if ($.inArray(fileType, allowZipType) == -1) {
                _this.setState({msg: '请上传zip压缩文件！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return false;
            }
        }
        var formData = new FormData();
        formData.append('func',upResourceFiled);
        formData.append('flag',_this.state.productType);
        //formData.append( 'appVersion',_this.state.curVersion);
        //formData.append( 'sourceVersion',_this.state.curResourceVersion);
        //formData.append( 'productID',_this.state.curProductId);
        formData.append('token', _this.state.tokenInfoToken);
        formData.append('id',_this.state.tokenInfoID);
        formData.append('source', $('#fileResource')[0].files[0]);
        _this.setState({upBtnFlag:false});//按钮置灰
        $.ajax({
            url:httpsUrl+upResourceHttpUrl,
            method:'post',
            dataType:'json',
            xhrFields:{withCredentials: true},
            crossDomain:true,
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
            success:function(data){
                _this.setState({upBtnFlag:true});
                if(data.status == 0){
                    _this.featchDirList(_this.state.tokenInfoToken,_this.state.tokenInfoID,_this.state.productType)
                    _this.setState({msg:'上传成功！'})
                    $("#tipMsgDialog").modal(tipMsgDialog)
                    location.reload();//重载页面
                }else if(data.status == '-2' || data.status == '-9'){
                    _this.context.router.push('/');
                }else{
                    _this.setState({msg:data.msg})
                    $("#tipMsgDialog").modal(tipMsgDialog)
                }
            },error:function(){
                _this.setState({upBtnFlag:true});
                _this.setState({msg:'服务器异常！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
            }
        })
    }
    //上传指定文件
    upAssignFileClick(flag){
        var _this = this;
        if(flag == 1){
            if(!this.refs.upFileModule.value){
                _this.setState({msg:'请选择上传本地模块路径、压缩文件！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            var fileType =  getFileType(this.refs.upFileModule.value)
            if(this.refs.upFileModule.value!="") {
                if ($.inArray(fileType, allowZipType) == -1) {
                    _this.setState({msg: '请上传zip压缩文件！'})
                    $("#tipMsgDialog").modal(tipMsgDialog)
                    return false;
                }
            }
        }else if(flag == 2){
            if(!this.refs.upFileCur.value){
                _this.setState({msg:'请选择上传文件的路径！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            //if(_this.refs.upFileCur.value == _this.state.upFilePath){
            //    _this.setState({msg:'请选择上传文件的路径！'})
            //    $("#tipMsgDialog").modal(tipMsgDialog)
            //    return;
            //}
            //var fileType =  getFileType(this.refs.upFileCur.value)
            //if(this.refs.upFileCur.value!="") {
            //    if ($.inArray(fileType, allowFileType) == -1) {
            //        _this.setState({msg: '不支持图片格式及其它，请选择文件！'})
            //        $("#tipMsgDialog").modal(tipMsgDialog)
            //        return false;
            //    }
            //}
        }
        var formData = new FormData();
        formData.append('func',upAssignFile);
        formData.append('flag',_this.state.productType);
        formData.append('token', _this.state.tokenInfoToken);
        formData.append('id',_this.state.tokenInfoID);
        if(flag == 1){
            formData.append('path',_this.state.upFileModule);
            formData.append('source', $('#upFileModule')[0].files[0]);
            formData.append('type',typeTwo);
        }
        if(flag == 2){
            formData.append('path',_this.state.upFilePath);
            formData.append('source', $('#upFileURL')[0].files[0]);
            formData.append('type',typeOne);
        }
        if(flag == 1){
            _this.setState({upBtnFlagOne:false});
        }
        if(flag == 2){
            _this.setState({upBtnFlagTwo:false});
        }
        $.ajax({
            url:httpsUrl+editHttpUrl,
            method:'post',
            dataType:'json',
            xhrFields:{withCredentials: true},
            crossDomain:true,
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
            success:function(data){
                _this.setState({upBtnFlagOne:true,upBtnFlagTwo:true})
                if(data.status == 0){
                    _this.setState({msg:'上传成功！'})
                    $("#tipMsgDialog").modal(tipMsgDialog)
                    _this.featchDirList(_this.state.tokenInfoToken,_this.state.tokenInfoID,_this.state.productType)
                    window.location.reload();//重载页面
                }else if(data.status == '-2' || data.status == '-9'){
                    _this.context.router.push('/');
                }else{
                    _this.setState({msg:data.msg})
                    $("#tipMsgDialog").modal(tipMsgDialog)
                }
            },error:function(){
                _this.setState({upBtnFlagOne:true,upBtnFlagTwo:true})
                _this.setState({msg:'服务器异常！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
            }
        })

    }
    tipMsgClick(){
        $("#tipMsgDialog").modal('hide')
    }
    goBack(){
        this.props.router.goBack()
    }
    render(){
        var upBtnFlag = this.state.upBtnFlag ?  <button type="button" class="upBtn" onClick={this.upResourceFiledClick.bind(this)}>上传</button> :  <button type="button" class="upBtnCCC">上传</button>
        var upBtnFlagOne = this.state.upBtnFlagOne ? <button type="button" class="upBtn" onClick={this.upAssignFileClick.bind(this,1)}>上传</button>:  <button type="button" class="upBtnCCC">上传</button>
        var upBtnFlagTwo = this.state.upBtnFlagTwo ?  <button type="button" class="upBtn" onClick={this.upAssignFileClick.bind(this,2)}>上传</button>:  <button type="button" class="upBtnCCC">上传</button>
        //var showUpUrl = this.state.showUpUrl ? '当前路径,服务器上传路径' : ''
        //var imgShowWay = this.state.imgShow ? rightImg : downImg
        return(
            <div  className="rightDivInfo">
                <a id="downUrl"   className="downUrl" rel="nofollow"></a>
                <CurPvwTitle    goBack={this.goBack.bind(this)}
                                curVersion={this.state.curVersion}
                                curResourceVersion={this.state.curResourceVersion}/>
                <TipMsgInfo   msg={this.state.msg}
                              tipMsgClick={this.tipMsgClick.bind(this)}/>
                <div  className="menuListCss"  id="tree">
                    <div className="treeTitle">
                        <span className="treeTitleOne">文件树 </span>
                        <span className="treeTitleTwo">操作</span>
                    </div>
                    {
                        this.menuListInfo(this.state.menuList)
                    }
                </div>
                <div className="upMarginBottom">
                    <span className="resourceFile">资源包</span>
                    <span className="resFileSpan"><input type="text" ref="shoResFile" id="showResourceFile" placeholder="本地资源包路径，压缩文件"/></span>
                    <span className="upResourceFile"><input type="file" onChange={this.resourceFileChange.bind(this,1)} id="fileResource"/></span>
                    {upBtnFlag}
                    <span className="resourceTipMsg">*注意：资源包必须是压缩文件且只能上传在根目录！</span>
                </div>
                <div className="upMarginBottom">
                    <span className="resourceFile">模块</span>
                    <span className="resFileSpan"><input type="text" ref="upFileModule" placeholder="本地模块路径，压缩文件"/></span>
                    <span className="upResourceFile"><input type="file" onChange={this.resourceFileChange.bind(this,2)} id="upFileModule"/></span>
                    {upBtnFlagOne}
                </div>
                <div>
                    <span className="resourceFileOne">{this.state.showUpUrl}</span>
                    <span className="resFileSpan"><input type="text" ref="upFileCur" placeholder="文件路径" style={{width:'585px'}}/></span>
                    <span className="upResourceFile" style={{left:'-605px'}}><input onChange={this.resourceFileChange.bind(this,3)} type="file" id="upFileURL" style={{width:'590px'}}/></span>
                    {upBtnFlagTwo}
                </div>
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
ResourceEdit.contextTypes = {
    router: React.PropTypes.isRequired
}
export default ResourceEdit