/**
 * Created by xiajing on 2016/11/7.
 */
import React, {Component} from 'react';
import {appVersionHttpUrl,nativeVersion,pageNum,pageSize,delAppliactionVer,addAlllicationVer,productTypeIOS,productTypeAndroid,productTypeAll } from '../../util/config.js';
import {getStorage} from '../../util/storageData.js';
import PageComponent from '../publicComponent/pageComponent.jsx';
import MockApi from '../../util/mockApi.js';
import NoneList from '../publicComponent/noneList.jsx';
import DelInfo from '../publicComponent/delInfo.jsx';
import LoadingImg from '../publicComponent/loadingImg.jsx';
import {clickTable} from '../../util/menuList.js';
import { verRegexp, androidApk, iosIpa, getFileType } from '../../util/verifyRegular.js';
class NativeVerManage extends Component{
    constructor(props){
        super(props);
        this.state = {androidBtnStyle:true,iosBtnStyle:false,
            nativeVerList : [], //获取数据的存放数组
            totalNum:'',//总记录数
            totalData:{},
            current: pageNum, //当前页码
            pageSize:pageSize, //每页显示的条数5条
            goValue:'',
            totalPage:'',//总页数
            productID:'',
            appVersion:'',
            productIDInfo:productTypeAndroid,//默认添加为安卓平台
            userMsg:'',
            btnFlag:true,
            saveBtnFlag:true,
            loadingImgFlag:true,//转圈圈预加载的显示，
            sourceFile:'',
            androidOrIosApk:0,//0:代表校验android  1:代表校验ios
        }
    }
    androidClick(){
        this.setState({androidBtnStyle: true,iosBtnStyle:false,productIDInfo:productTypeAndroid,androidOrIosApk:0,userMsg:""})
        //console.log( "android点击"+$("#upFileModule").val())
        $("#upFileModule").val('');
        $("#versionNum").val("");

        //var file = $("#upFile");
        //file.after(file.clone().val(""));
        //file.remove();
    }
    iosClick(){
        this.setState({iosBtnStyle: true,androidBtnStyle:false,productIDInfo:productTypeIOS,androidOrIosApk:1,userMsg:''})
        //console.log( "ios点击"+$("#upFileModule").val())
        $("#upFileModule").val('')
        $("#versionNum").val("");

        //var file = $("#upFile");
        //file.after(file.clone().val(""));
        //file.remove();
    }
    componentDidMount(){
        var _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+appVersionHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:nativeVersion,
                        begin:pageNum,
                        size:pageSize,
                        id:userInfo.id,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    _this.setState({loadingImgFlag:false})
                    console.log(data.data)
                    if(data.status == 0){
                        _this.setState({totalNum:data.count})
                        _this.setState({nativeVerList:data.data})
                        //计算总页数= 总记录数 / 每页显示的条数
                        let totalPage =Math.ceil( _this.state.totalNum / _this.state.pageSize);
                        _this.setState({totalPage:totalPage})
                        //_this.pageClick(1);
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    _this.setState({loadingImgFlag:false})
                    console.log("服务器异常！")
                }
            })
        }
    }
    //点击翻页
    pageClick(pageNum){
        let _this = this;
        if(pageNum != _this.state.current){
            _this.state.current = pageNum
        }
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+appVersionHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:nativeVersion,
                        begin:pageNum,
                        size:pageSize,
                        id:userInfo.id,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        //计算总页数= 总记录数 / 每页显示的条数
                        let totalPage =Math.ceil( _this.state.totalNum / _this.state.pageSize);
                        _this.setState({nativeVerList:data.data,totalNum:data.count,totalPage:totalPage})
                    }
                    //清空信息
                    $("#upFileModule").val('');
                    $("#versionNum").val("")
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    //上一步
    goPrevClick(){
        var _this = this;
        let cur = this.state.current;
        if(cur > 1){
            _this.pageClick( cur - 1);
        }
    }
    //下一步
    goNext(){
        var _this = this;
        let cur = _this.state.current;
        if(cur < _this.state.totalPage){
            _this.pageClick(cur + 1);
        }
    }
    //跳转到指定页
    goSwitchChange(e){
        var _this= this;
        _this.setState({goValue : e.target.value})
        var value = e.target.value;
        //alert(value+"==="+_this.state.totalPage)
        if(!/^[1-9]\d*$/.test(value)){
            alert('页码只能输入大于1的正整数');
        }else if(parseInt(value) > parseInt(_this.state.totalPage)){
            alert('没有这么多页');
        }else{
            _this.pageClick(value);
        }
    }
    //弹出删除提示框
    delNativeInfo(productID,appVersion){
        this.setState({productID:productID,appVersion:appVersion})
        $('#delDialog').modal(delDialog)
    }
    //执行删除操作
    delBtn(){
        //alert(this.state.productID+"===="+this.state.appVersion)
        var _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+appVersionHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:delAppliactionVer,
                        productID:_this.state.productID,
                        appVersion:_this.state.appVersion,
                        id:userInfo.id,
                        token:userInfo.token
                    })
                },
                success:function(data){
                    if(data.status == 0){
                        //console.log("add success!")
                        _this.pageClick(1);
                        $('#delDialog').modal('hide')
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    //新增应用版本
    addVerClick(){
        var _this = this;
        console.log(this.state.androidOrIosApk)

        var tokenInfo = getStorage("tokenInfo");
        var appVersion= $("#versionNum").val();
        if(!appVersion){
            _this.setState({userMsg:'请输入版本号！'})
            return;
        }
        if(!verRegexp.test(appVersion)){
            _this.setState({userMsg:'请输入版本号，例如规则为1.0.0，最大版本号为99.99.999'})
            return;
        }
        if(!_this.sourceFile){
            _this.setState({userMsg:'请上传安装包！'})
            return;
        }
        if(_this.state.androidOrIosApk == 0){//校验android上传的文件
            //this.sourceFile
            if(androidApk.indexOf(getFileType(_this.sourceFile)) == -1){
                _this.setState({userMsg:'请正确上传android安装包！'})
                return;
            }
        }else{
            //ios  *.ipa
            if(iosIpa.indexOf(getFileType(_this.sourceFile)) == -1){
                _this.setState({userMsg:'请正确上传ios安装包！'})
                return;
            }
        }
        // console.log(appVersion+'.0')
        ////校验版本号 前端校验只能是 1.0.1这种格式，传给后端时再不加一个0
        if(tokenInfo !=null){
            var userInfo = JSON.parse(tokenInfo);
            _this.setState({btnFlag:false})//将按钮置灰避免重复点击
            var formData = new FormData();
            formData.append('func',addAlllicationVer);
            formData.append('productID',_this.state.productIDInfo);
            formData.append('appVersion',appVersion+'.0');
            formData.append('source',$('#upFile')[0].files[0]);
            formData.append('id',userInfo.id);
            formData.append('token',userInfo.token);
            $.ajax({
                url:httpsUrl+appVersionHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                cache: false,
                processData: false,
                contentType: false,
                data:formData,
                success:function(data){
                    _this.setState({btnFlag:true})
                    if(data.status == 0){
                        //console.log("add success!")
                        _this.pageClick(1);
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }else{
                        _this.setState({userMsg:data.msg})
                    }
                },error:function(){
                    _this.setState({btnFlag:true})
                    console.log("服务器异常！")
                }
            })
        }
    }
    resourceFileChange(e){
        //if(this.state.androidOrIosApk == 0){
             this.sourceFile = e.currentTarget.files[0].name;
             //console.log("====="+this.sourceFile)
             $("#upFileModule").val(this.sourceFile)
        //}
        this.setState({userMsg:''})
    }
    userFocus(){
        this.setState({userMsg:''})
    }
    render(){
        clickTable();
        //console.log(this.state.nativeVerList.length)
        var showLoad = this.state.loadingImgFlag ?  <LoadingImg /> : '';
        return(
            <div className="rightDivInfo">
                <DelInfo delBtn={this.delBtn.bind(this)}/>
                <NativeManageList nativeVerList={this.state.nativeVerList} delNativeInfo={this.delNativeInfo.bind(this)}/>
                {showLoad}
                {//如果没有数据就显示提示信息
                }
                {this.state.nativeVerList && this.state.nativeVerList.length != 0 ?  <PageComponent total={this.state.totalNum}
                                                                                                    current={this.state.current}
                                                                                                    totalPage={this.state.totalPage}
                                                                                                    goValue={this.state.goValue}
                                                                                                    pageClick={this.pageClick.bind(this)}
                                                                                                    goPrev={this.goPrevClick.bind(this)}
                                                                                                    goNext={this.goNext.bind(this)}
                                                                                                    switchChange={this.goSwitchChange.bind(this)}/>: <NoneList /> }

                <NativeInfo androidClick={this.androidClick.bind(this)}   iosClick={this.iosClick.bind(this)}
                            androidBtnStyle={this.state.androidBtnStyle} iosBtnStyle={this.state.iosBtnStyle}
                            addVerClick={this.addVerClick.bind(this)} userFocus={this.userFocus.bind(this)}
                            userMsg={this.state.userMsg} btnFlag={this.state.btnFlag}
                            resourceFileChange={this.resourceFileChange.bind(this)}/>
            </div>
        )
    }
}
class NativeManageList extends Component{
    render(){
        var _this = this;
        return(
            <div className="summaryTable">
                <table class="table summaryTableWidth">
                    <thead>
                    <tr className="bgTr">
                        <th>平台</th>
                        <th>原生版本</th>
                        <th>资源数</th>
                        <th>操作日期</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.nativeVerList.map(function(data){
                            return(
                                <tr>
                                    <td>{data.productID == productTypeAndroid ? '安卓':''}
                                        {data.productID == productTypeIOS ? '苹果':''}
                                        {data.productID == productTypeAll ? '苹果/安卓':''}</td>
                                    <td>{data.appVersion}</td>
                                    <td>{data.total}</td>
                                    <td>{data.createTime}</td>
                                    <td>
                                        {data.total == 0 ?  <span class="delBtn" onClick={_this.props.delNativeInfo.bind(_this,data.productID,data.appVersion)}>删除</span> : '' }
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
class NativeInfo extends Component{
    render(){
        var androidBtn = this.props.androidBtnStyle ? 'blueManage' : 'blueManageTwo';
        var iosBtn = this.props.iosBtnStyle ? 'blueManageThree' : 'blueManageOne';
        //按钮
        var flagBtn = this.props.btnFlag ? <span class="addBtn" onClick={this.props.addVerClick.bind(this)}>增加</span> :  <span class="addBtnCCC">增加</span>
        //
        return(
            <div class="summaryInfo" style={{marginTop:'77px'}}>
                <div class="nativeManage">平台选择</div>
                <div class="disBlock">
                    <span class={androidBtn} onClick={this.props.androidClick.bind(this)}>安卓</span>
                    <span class={iosBtn} onClick={this.props.iosClick.bind(this)}>苹果</span>
                </div>
                <div class="verDiv">
                    <div className="verRight">
                        版本号
                        <input type="text" onFocus={this.props.userFocus.bind(this)} style={{width:'186px'}} id="versionNum"  class="nativeVerInput" placeholder="版本号"/>
                    </div>
                    安装包
                    <span className="add"><input type="text" id="upFileModule" placeholder="上传安装包"/></span>
                    <span className="addTwo" style={{marginTop:'-23px'}}><input type="file" onChange={this.props.resourceFileChange.bind(this)} id="upFile"/></span>
                    {flagBtn}
                </div>
                <div className="userMsg">{this.props.userMsg}</div>
            </div>
        )
    }
}
NativeVerManage.contextTypes = {
    router: React.PropTypes.isRequired
}
export default NativeVerManage