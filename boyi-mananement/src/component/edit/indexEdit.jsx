/**
 * Created by xiajing on 2016/11/7.
 */
import React, { Component } from 'react';
import splitImg from '../../images/splitLine.png';
import checkBoxOne from '../../images/checkBoxOne.png';
import checkBoxTwo from '../../images/checkBoxtwo.png';
import {editHttpUrl, queryConfigFile, model, queryDir, typeTwo, upFile, typeOne, delLisIimg, updateConfig, fileImg } from '../../util/config.js';
import { saveStorage, getStorage, getLocalStorage } from '../../util/storageData.js';
import { delData, addInfo, modifyInfo } from '../../util/operationJson.js';
import DelInfo from '../publicComponent/delInfo.jsx';
import TipMsgInfo from '../publicComponent/tipMsgInfo.jsx';
import TipConfirmMsgInfo from '../publicComponent/tipComfirmMsg.jsx';
import ModifyDialog from '../publicComponent/modifyDialog.jsx';
import { getFileType, allowtype,httpsType } from '../../util/verifyRegular.js';
import {clickTable} from '../../util/menuList.js'
class CurIndexPvw extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkOne: true,
            checkTwo: true,
            checkThree: true,
            checkFour: true,
            bannersList:[],//图片列表
            contractsList:[],//合约
            customsList:[],//功能区
            newsList:[],//新闻资讯
            curVersion:'',//原生版本号
            curProductId:'',
            curResourceVersion:'',//资源版本号
            tokenInfoID:'',
            tokenInfoToken:'',
            saveNewsId:'',
            delIndex:'',
            delFlag:'',
            imgListArray:[],//图片列表
            pathImg:'',
            filePath:'',
            msg:'',//提示
            MSGName:'',//资讯区的修改
            MSGCode:'',
            MSGIndex:'',
            MSGCount:'',
            allArray:{},//将所有模块修改、删除的信息组装成对象传到服务器（除了图片列表）
            bannerIsShow:{},//广告区块的是否有效勾选显示
            contractsListIsShow:{},//指数区间的是否有效勾选显示
            customsListIsShow:{},//功能区间的是否有效勾选显示
            newsListIsShow:{},//新闻资讯区间的是否有效勾选显示
            banners:[],
            fetchPreviewImg:'',
            imgMsg:'点击左边图片预览',
            selectVersion:'',
            showVersion:true,
            editMsg:'',
            upFileBtnFlag:true,
            saveAllBtn:true,
            productType:'',
            funcShow:true,
            funcHide:false,
            constantTypeHot:'',
            constantTypeSelf:'',
            constantTypeUseHistory:'',
            operatorName:'',
            funObject:{}

        }
    }
    checkBoxOneClick(id){
        //console.log(this.state.bannerIsShow)
        var _this =this;
        if(id == 1){//广告页面修改
            //console.log("1=="+this.state.bannerIsShow.isShow)
            if(this.state.bannerIsShow.isShow == true){

                _this.state.bannerIsShow.isShow = false;
                _this.setState({bannerIsShow:_this.state.bannerIsShow})

            }else if(this.state.bannerIsShow.isShow == false){

                _this.state.bannerIsShow.isShow = true;
                _this.setState({bannerIsShow:_this.state.bannerIsShow})
            }
        }
        if(id == 2){//功能区是否显示
            if(this.state.customsListIsShow.isShow == true){
                _this.state.customsListIsShow.isShow = false;
                _this.setState({customsListIsShow:_this.state.customsListIsShow})
            }else{
                _this.state.customsListIsShow.isShow = true;
                _this.setState({customsListIsShow:_this.state.customsListIsShow})
            }
        }
        if(id == 3){//指数区是否显示
            if(this.state.contractsListIsShow.isShow == true){
                _this.state.contractsListIsShow.isShow = false;
                _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
            }else{
                _this.state.contractsListIsShow.isShow = true;
                _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
            }
        }
        if(id == 4){//咨询区是否显示
            if(this.state.newsListIsShow.isShow == true){
                _this.state.newsListIsShow.isShow = false;
                _this.setState({newsListIsShow:_this.state.newsListIsShow})
            }else{
                _this.state.newsListIsShow.isShow = true;
                _this.setState({newsListIsShow:_this.state.newsListIsShow})
            }
        }
    }
    goBack(){
        this.props.router.goBack()
    }
    componentDidMount(){
        //console.log(this.props.location.query.showInfo)
        var tokenValue;
        var tokenIdValue;
        var productType;
        var _this =this;
        var info;
         var tokenInfo = getStorage("tokenInfo");
         if(tokenInfo != null) {
             info = JSON.parse(tokenInfo);
             tokenValue = info.token;
             tokenIdValue = info.id;
         }
        _this.setState({tokenInfoToken:info.token,tokenInfoID:info.id})
            var selectVer  = getStorage("versionInfo")
            if(selectVer !='' && selectVer != null){
                let data = JSON.parse(selectVer);
                productType = data.productType;
                _this.setState({curVersion:data.appVersion,curProductId:data.productID,
                    curResourceVersion:data.sourceVersion,productType:data.productType})//当前的版本信息
            }
        this.fetchAllManage(tokenValue,tokenIdValue,productType);
        this.featchImgLIst(tokenValue,tokenIdValue,productType);
    }
    //查询整个模块的接口
    fetchAllManage(tokenValue,tokenIdValue,productType){
        var _this =this;
        //获取模块信息
        $.ajax({
            url:httpsUrl+editHttpUrl,
            method:'post',
            dataType:'json',
            xhrFields:{withCredentials: true},
            crossDomain:true,
            data:{
                json:JSON.stringify({
                    func:queryConfigFile,
                    type:typeOne,
                    flag:productType,
                    id:tokenIdValue,
                    token:tokenValue
                })
            },
            success:function(data){
                if(data.status == 0){
                    if(!data.cfg){
                        _this.setState({msg:data.msg})
                        $('#tipConfirmMsgDialog').modal(tipConfirmMsgDialog)
                    }else{
                        var cfgData = JSON.parse(data.cfg);
                        _this.state.allArray = cfgData
                        console.log(cfgData)
                        //console.log(cfgData.banners.isShow)
                        _this.setState({bannerIsShow:cfgData.banners,
                            contractsListIsShow:cfgData.contracts,
                            customsListIsShow:cfgData.customs,
                            newsListIsShow:cfgData.news,//以上是对应isShow显示
                            bannersList:cfgData.banners.data,//广告页面修改
                            contractsList:cfgData.contracts.data,//指数区间
                            customsList:cfgData.customs.contents,//功能区
                            newsList:cfgData.news.data,//新闻资讯
                            constantTypeHot:cfgData.contracts.hot,
                            constantTypeSelf:cfgData.contracts.self,
                            constantTypeUseHistory:cfgData.contracts.useHistory,
                        })

                        //指数区的类型
                        //constantType.push(cfgData.contracts.hot);
                        //constantType.push(cfgData.contracts.self);
                        //constantType.push(cfgData.contracts.useHistory);
                       // console.log(cfgData.contracts)

                        //console.log(cfgData)
                        //console.log(cfgData.banners)//广告页面修改
                        //console.log(cfgData.contracts)//指数区间
                        //console.log(cfgData.customs)//customs 功能区
                        //console.log(cfgData.my)//指数区
                        //console.log(cfgData.news)//新闻
                    }
                }else if(data.status == '-2' || data.status == '-9'){
                    _this.context.router.push('/');
                }else{
                    _this.setState({msg:"获取模块信息："+data.msg})
                    $('#tipMsgDialog').modal(tipMsgDialog)
                }
            },error:function(){
                console.log("服务器异常！")
            }
        })
    }
    tipConfirmMsgClick(){
        this.context.router.push("ResourceEdit/8?title=资源编辑");
    }
    //查询图片列表
    featchImgLIst(tokenValue,tokenIdValue,productType){
        var _this =this;
        //获取图片列表
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
                    type:typeTwo,
                    flag:productType,
                    token:tokenValue
                })
            },
            success:function(data){
                if(data.status == 0){
                    console.log(data)
                    _this.setState({pathImg:data.path,operatorName:data.operatorName})
                    // console.log(data.dir)
                    //var cfgData = JSON.parse(data.cfg);
                    //console.log(cfgData)
                    _this.setState({imgListArray:data.dir})//广告页面修改
                }
                else if(data.status == '-2' || data.status == '-9'){
                    _this.context.router.push('/');
                }
            },error:function(){
                console.log("服务器异常！")
            }
        })
    }
    //广告模块、功能区、指数区的删除提示框
    delManageSize(index,flag,filePath){
        this.setState({delIndex:index-1,delFlag:flag,filePath:filePath})
        $('#delDialog').modal(delDialog)
    }
    //此删除仅仅是逻辑删除
    delBtn(){
        var _this =this;
        //console.log(_this.state.pathImg+_this.state.filePath)
        var flag = this.state.delFlag;
        //alert(flag)
        if(flag == 0){//删除图片列表的记录物理删除
                //获取图片列表
                $.ajax({
                    url:httpsUrl+editHttpUrl,
                    method:'post',
                    dataType:'json',
                    xhrFields:{withCredentials: true},
                    crossDomain:true,
                    data:{
                        json:JSON.stringify({
                            func:delLisIimg,
                            id:_this.state.tokenInfoID,
                            //type:typeTwo,
                            filePath:_this.state.pathImg+_this.state.filePath,
                            flag:_this.state.productType,
                            token:_this.state.tokenInfoToken
                        })
                    },
                    success:function(data){
                        $('#delDialog').modal('hide')
                        if(data.status == 0){
                            _this.featchImgLIst(_this.state.tokenInfoToken,_this.state.tokenInfoID,_this.state.productType)
                        }else if(data.status == '-2' || data.status == '-9'){
                            _this.context.router.push('/');
                        }else{
                            _this.setState({msg:data.msg})
                            $('#tipMsgDialog').modal(tipMsgDialog)
                        }
                    },error:function(){
                        console.log("服务器异常！")
                    }
                })
        }
        if(flag == 1){//删除广告页的记录
            delData(this.state.bannersList,this.state.delIndex);
            this.setState({bannersList:this.state.bannersList})
            //console.log(_this.state.allArray.banners)

            $('#delDialog').modal('hide')
        }
        if(flag == 2){//删除功能区的记录
            delData(this.state.customsList,this.state.delIndex);
            this.setState({customsList:this.state.customsList})
            $('#delDialog').modal('hide')
            //如果改变值时就要将小版本号自动往上递增
            //console.log("小版本号"+_this.state.customsListIsShow.checkedVer)
            //需求修改 如果是删除或者编辑或者添加 只将version + 0.01
            var value= (_this.state.customsListIsShow.version  + 0.01).toFixed(2);
            _this.state.customsListIsShow.version =  parseFloat(value)
            //_this.state.customsListIsShow.checkedVer = 0
            // console.log("version版本号++:"+  _this.state.customsListIsShow.version)
            _this.setState({customsListIsShow:_this.state.customsListIsShow})
        }
        if(flag == 3){//删除指数区的记录
            delData(this.state.contractsList,this.state.delIndex);
            this.setState({contractsList:this.state.contractsList})
            $('#delDialog').modal('hide')
        }
    }
    //提交图片列表的信息
    btnUpImg(){
        //  $("#uploadForm").submit();
        var _this = this;
        //console.log($("#urlShow").val())
        let fileName =  $("#urlShow").val()
        if(!fileName){
            _this.setState({msg:'请选择上传的图片！'})
            $("#tipMsgDialog").modal(tipMsgDialog)
            return;
        }
            var fileType =  getFileType(fileName)
            if(fileName!="") {
                if ($.inArray(fileType, allowtype) == -1) {
                    _this.setState({msg: '图片格式为："JPG","GIF","PNG","BMP"！'})
                    $("#tipMsgDialog").modal(tipMsgDialog)
                    return false;
                }
                _this.setState({upFileBtnFlag:false})
                var formData = new FormData();
                formData.append('func', upFile);
                formData.append('id', _this.state.tokenInfoID);
                formData.append('type', typeOne);
                formData.append('path', _this.state.pathImg);
                formData.append('appVersion', _this.state.curVersion);
                formData.append('sourceVersion', _this.state.curResourceVersion);
                formData.append('flag', _this.state.productType);
                formData.append('productID', _this.state.curProductId);
                formData.append('source', $('#file')[0].files[0]);
                formData.append('token', _this.state.tokenInfoToken);
                $.ajax({
                    url: httpsUrl+editHttpUrl,
                    method: 'post',
                    dataType: 'json',
                    xhrFields: {withCredentials: true},
                    crossDomain: true,
                    cache: false,
                    processData: false,
                    contentType: false,
                    data: formData,
                    success: function (data) {
                        _this.setState({upFileBtnFlag:true})
                        if (data.status == 0) {
                            $("#urlShow").val("");
                            _this.featchImgLIst( _this.state.tokenInfoToken, _this.state.tokenInfoID,_this.state.productType)
                        }else if(data.status == '-2' || data.status == '-9'){
                            _this.context.router.push('/');
                        } else {
                            _this.setState({msg: data.msg})
                            $("#tipMsgDialog").modal(tipMsgDialog)
                        }
                    }, error: function () {
                        _this.setState({upFileBtnFlag:true})
                        console.log("服务器异常！")
                    }
                })
            }
    }
    //添加区块的信息
    addManageInfo(img,url,flag,name,functionName){
        var _this = this;
        if(flag == 1){//banner区块
            $("#functionImgName").val('');
            $("#titleName").val('');
            $("#functionImgURL").val('');
            $("#functionName").val('');
            $("#marketName").val('');
            $("#codeName").val('');
            $("#name").val('');
            if(!img){
                _this.setState({msg:'请填写图片名称！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            //if(url){
            //   if(httpsType.indexOf(url) == -1){//如果没有找到对应的字段则返回-1
            //       _this.setState({msg:'URL地址必须是https://或者http://格式'})
            //       $("#tipMsgDialog").modal(tipMsgDialog)
            //       return;
            //   }
            //}
            //if(!url){
            //    _this.setState({msg:'请填写url！'})
            //    $("#tipMsgDialog").modal(tipMsgDialog)
            //    return;
            //}
            addInfo(this.state.bannersList,{img:img,url:url})
            this.setState({bannersList:this.state.bannersList})
            _this.setState({msg: "新增成功！"})
            $("#tipMsgDialog").modal(tipMsgDialog)
            $("#bannerImgName").val('');
            $("#bannerImgURL").val('');
        }
        if(flag == 2){//功能区块的添加
            $("#bannerImgName").val('');
            $("#bannerImgURL").val('');
            $("#marketName").val('');
            $("#codeName").val('');
            $("#name").val('');
            //customsList
            var idRep;
            if(!img){
                _this.setState({msg:'请填写图片名称！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            if(!name){
                _this.setState({msg:'请填写名称！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            if(!functionName){
                _this.setState({msg:'请填写功能名称！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            var attr = [];
            //console.log("gonggao")
            $.each(this.state.customsList,function(key,value){
                //console.log(value.id.replace(/\"/g, ""))
                attr.push(value.id.replace(/\"/g, ""))
            })
            Array.prototype.contains = function (element) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == element) {
                        return true;
                    }
                }
                return false;
            }
            if(attr.contains(functionName)){
                _this.setState({msg:'功能名称不能重复填写！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            if(!url){
                _this.setState({msg:'请填写url！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            //console.log(name)
            //console.log(functionName)
            addInfo(this.state.customsList,{image1:img,title:name,url:url,id:functionName,checked:"0"})
            // console.log(this.state.customsList)
            this.setState({customsList:this.state.customsList})
            //如果改变值时就要将小版本号自动往上递增
            //_this.state.customsListIsShow.checkedVer = _this.state.customsListIsShow.checkedVer + 0.01
            //需求修改 如果是删除或者编辑或者添加 只将version + 0.01
          //  console.log(_this.state.customsListIsShow.version)
            var value= (_this.state.customsListIsShow.version  + 0.01).toFixed(2);
            _this.state.customsListIsShow.version =  parseFloat(value)
            _this.setState({customsListIsShow:_this.state.customsListIsShow})

            _this.setState({msg: "新增成功！"})
            $("#tipMsgDialog").modal(tipMsgDialog)

            $("#functionImgName").val('');
            $("#titleName").val('');
            $("#functionImgURL").val('');
            $("#functionName").val('');

        }
        if(flag == 3){//指数区块的添加
            $("#bannerImgName").val('');
            $("#bannerImgURL").val('');
            $("#functionImgName").val('');
            $("#titleName").val('');
            $("#functionImgURL").val('');
            $("#functionName").val('');
            if(!img){
                _this.setState({msg:'请填写市场！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            if(!url){
                _this.setState({msg:'请填写代码！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            if(!name){
                _this.setState({msg:'请填写名称！'})
                $("#tipMsgDialog").modal(tipMsgDialog)
                return;
            }
            addInfo(this.state.contractsList,{market:img,code:url,name:name})
            // console.log(this.state.contractsList)
            this.setState({contractsList:this.state.contractsList})
            _this.setState({msg: "新增成功！"})
            $("#tipMsgDialog").modal(tipMsgDialog)

            $("#marketName").val('');
            $("#codeName").val('');
            $("#name").val('');
        }
    }
    //信息提示框
    tipMsgClick(){
        $("#tipMsgDialog").modal('hide')
    }
    //资讯修改的弹出框
    MSGEditClick(index,name,code,count){
        //console.log(index,name,code)
        //this.setState({MSGName:name,MSGCode:code,MSGIndex:index,MSGCount:count})
        //$("#modifyDia").modal(modifyDia)
    }
    //让input可编辑状态
    inputChange(title,image1,url){
         //console.log(title,image1,url)
        this.state.funObject.title=title;
        this.state.funObject.image1=image1;
        this.state.funObject.url=url;
        this.setState({funObject:this.state.funObject});
    }
    editBtn(){//逻辑上的编辑功能区块的编辑
        //alert(this.state.funObject.title)
        if(!this.state.funObject.title){
           this.setState({editMsg:'名称不能为空！'})
            return;
        }
        if(!this.state.funObject.image1){
            this.setState({editMsg:'图片名不能为空！'})
            return;
        }
        if(!this.state.funObject.url){
            this.setState({editMsg:'URL不能为空！'})
            return;
        }
        modifyInfo(this.state.customsList,this.state.funObject.index,
            {
                title:this.state.funObject.title,
                checked:this.state.funObject.checked,
                image1:this.state.funObject.image1,
                image2:this.state.funObject.image2,
                url:this.state.funObject.url,
                id:this.state.funObject.id
            }
        )
        //console.log(this.state.newsList)
        this.setState({customsList:this.state.customsList})

        //如果改变值时就要将小版本号自动往上递增
        //console.log("小版本号"+_this.state.customsListIsShow.checkedVer)
        //this.state.customsListIsShow.checkedVer = this.state.customsListIsShow.checkedVer + 0.01
        //console.log("小版本号++:"+  _this.state.customsListIsShow.checkedVer)
        //需求修改 如果是删除或者编辑或者添加 只将version + 0.01
        var value= (this.state.customsListIsShow.version  + 0.01).toFixed(2);
        this.state.customsListIsShow.version =  parseFloat(value)
        this.setState({customsListIsShow:this.state.customsListIsShow})

        $("#modifyDia").modal('hide')
        this.setState({msg: "编辑成功！"})
        $("#tipMsgDialog").modal(tipMsgDialog)

    }
    editFocusClick(){//清空信息
        this.setState({editMsg:''})
    }
    //updateAllInfo 更新所有信息
    updateAllInfo(){
        console.log(this.state.allArray)
        //console.log(this.state.bannerIsShow)
        //this.state.allArray.banners = this.state.banners;
        //console.log(this.state.allArray)
        var _this =this;
        _this.setState({saveAllBtn:false})
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
                        type:typeOne,
                        flag:_this.state.productType,
                        cfg:_this.state.allArray,
                        id:_this.state.tokenInfoID,
                        token:_this.state.tokenInfoToken
                    })
                },
                success:function(data){
                    _this.setState({saveAllBtn:true})
                    if(data.status == 0){
                        _this.setState({msg:'更新成功！'})
                        $("#tipMsgDialog").modal(tipMsgDialog)
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }else{
                        _this.setState({msg:data.msg})
                        $("#tipMsgDialog").modal(tipMsgDialog)
                    }
                },error:function(){
                    _this.setState({saveAllBtn:true})
                    console.log("服务器异常！")
                }
            })
    }
    //图片列表中 图片预览功能
    previewClcik(filePath){
        var _this =this;
            var str = JSON.stringify({
                func: fileImg ,
                id: _this.state.tokenInfoID,
                type:typeOne,
                flag:_this.state.productType,
                path: _this.state.pathImg + filePath,
                token: encodeURIComponent( _this.state.tokenInfoToken)
            })
            var url= httpsUrl+editHttpUrl+'?json='+str;
            _this.setState({imgMsg:''})
            //console.log(url)
            _this.setState({fetchPreviewImg:url})
    }
    upFileChange(e){
        var fileName = e.currentTarget.files[0].name;
        $("#urlShow").val(fileName)
    }
    //功能区的显示隐藏
    modifyFucShow(index,showOrHidden,checked,image1,url,title,id){
        var _this = this;
        //console.log("当前索引"+index)
        if(showOrHidden == 0){//隐藏 btn
            modifyInfo(this.state.customsList,index,{checked:'0',image1:image1,title:title,url:url,id:id})
            this.setState({customsList:this.state.customsList})
            //如果改变值时就要将小版本号自动往上递增
            //console.log("小版本号"+_this.state.customsListIsShow.checkedVer)
            _this.state.customsListIsShow.checkedVer = _this.state.customsListIsShow.checkedVer + 0.01
            //console.log("小版本号++:"+  _this.state.customsListIsShow.checkedVer)
            _this.setState({customsListIsShow:_this.state.customsListIsShow})
        }
        if(showOrHidden == 1){//显示btn
            modifyInfo(this.state.customsList,index,{checked:'1',image1:image1,title:title,url:url,id:id})
            this.setState({customsList:this.state.customsList})

            //如果改变值时就要将小版本号自动往上递增
            //console.log("小版本号"+_this.state.customsListIsShow.checkedVer)
            _this.state.customsListIsShow.checkedVer = _this.state.customsListIsShow.checkedVer + 0.01
            //console.log("小版本号++:"+  _this.state.customsListIsShow.checkedVer)
            _this.setState({customsListIsShow:_this.state.customsListIsShow})
        }
    }
    //功能区块里面的类型选择
    indexModelTypeCha(){
        var _this = this;
        var dataOption = $("#indexFuncType").val();
        var textValue = $("#indexFuncType").find("option:selected").text();
        //alert(dataOption)
        if(dataOption == 1){
            _this.state.contractsListIsShow.showType = 1;
            _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        }
        if(dataOption == 2){
            _this.state.contractsListIsShow.showType = 2;
            _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        }
        if(dataOption == 3){
            _this.state.contractsListIsShow.showType = 3;
            _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        }
        //console.log(dataOption+"=======sss====="+textValue)
        //if(dataOption == 0){
        //    _this.state.contractsListIsShow.hot = false;
        //    _this.state.contractsListIsShow.useHistory = false;
        //    _this.state.contractsListIsShow.self = false;
        //    _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        //}
        //if(dataOption == "true" && textValue == "热炒合约"){
        //    _this.state.contractsListIsShow.hot = false;
        //    _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        //}else if(dataOption == "false" && textValue == "热炒合约"){
        //    _this.state.contractsListIsShow.hot = true;
        //    _this.state.contractsListIsShow.useHistory = false;
        //    _this.state.contractsListIsShow.self = false;
        //    _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        //}
        //if(dataOption == "true" && textValue == "最新浏览"){
        //    _this.state.contractsListIsShow.useHistory = false;
        //    _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        //}else if(dataOption == "false" && textValue == "最新浏览"){
        //    _this.state.contractsListIsShow.useHistory = true;
        //    _this.state.contractsListIsShow.hot = false;
        //    _this.state.contractsListIsShow.self = false;
        //    _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        //}
        //if(dataOption == "true" && textValue == "自选股"){
        //    _this.state.contractsListIsShow.self = false;
        //    _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        //}else if(dataOption == "false" && textValue == "自选股"){
        //    _this.state.contractsListIsShow.self = true;
        //    _this.state.contractsListIsShow.hot = false;
        //    _this.state.contractsListIsShow.useHistory = false;
        //    _this.setState({contractsListIsShow:_this.state.contractsListIsShow})
        //}
    }
    //功能区的修改
    funcEditInfo(index,title,image1,image2,url,checked,id){
        //data.title,data.image1,data.image2,data.url,data.checked,data.id
        this.state.funObject.index = index;
        this.state.funObject.title = title;
        this.state.funObject.image1 = image1;
        this.state.funObject.image2 = image2;
        this.state.funObject.url = url;
        this.state.funObject.checked = checked;
        this.state.funObject.id = id;
        this.setState({funObject:this.state.funObject})
        $("#modifyDia").modal(modifyDia)
    }
    render(){
        clickTable();
        return(
            <div className="rightDivInfo">
                <ModifyDialog editBtn={this.editBtn.bind(this)}
                              funObject={this.state.funObject}
                              inputChange={this.inputChange.bind(this)}
                              editMsg={this.state.editMsg}
                              editFocusClick={this.editFocusClick.bind(this)}/>
                <TipConfirmMsgInfo msg={this.state.msg}
                                   tipConfirmMsgClick={this.tipConfirmMsgClick.bind(this)}/>
                <TipMsgInfo   msg={this.state.msg}
                              tipMsgClick={this.tipMsgClick.bind(this)}/>
                <DelInfo delBtn={this.delBtn.bind(this)}/>
                <CurPvwTitle    goBack={this.goBack.bind(this)}
                                curVersion={this.state.curVersion}
                                selectVersion={this.state.selectVersion}
                                showVersion={this.state.showVersion}
                                curResourceVersion={this.state.curResourceVersion}/>
                <CurPvwImgList  imgListArray={this.state.imgListArray}
                                pathImg={this.state.pathImg}
                                btnUpImg={this.btnUpImg.bind(this)}
                                delManageSize={this.delManageSize.bind(this)}
                                previewClcik={this.previewClcik.bind(this)}
                                fetchPreviewImg={this.state.fetchPreviewImg}
                                imgMsg={this.state.imgMsg}
                                upFileChange={this.upFileChange.bind(this)}
                                upFileBtnFlag={this.state.upFileBtnFlag}
                                operatorName={this.state.operatorName}/>
                <div className="splitLine"></div>
                <BannerEdit     checkBoxOneClick={this.checkBoxOneClick.bind(this)}
                                checkOne={this.state.checkOne}
                                bannersList={this.state.bannersList}
                                delManageSize={this.delManageSize.bind(this)}
                                addManageInfo={this.addManageInfo.bind(this)}
                                bannerIsShow={this.state.bannerIsShow}/>
                <div className="splitLine"></div>
                <FunctionEdit     checkBoxOneClick={this.checkBoxOneClick.bind(this)}
                                  checkTwo={this.state.checkTwo}
                                  customsList={this.state.customsList}
                                  delManageSize={this.delManageSize.bind(this)}
                                  addManageInfo={this.addManageInfo.bind(this)}
                                  customsListIsShow={this.state.customsListIsShow}
                                  modifyFucShow={this.modifyFucShow.bind(this)}
                                  funcShow={this.state.funcShow}
                                  funcHide={this.state.funcHide}
                                  funcEditInfo={this.funcEditInfo.bind(this)}
                    />
                <div className="splitLine"></div>
                <IndexEdit checkBoxOneClick={this.checkBoxOneClick.bind(this)}
                           checkThree={this.state.checkThree}
                           contractsList={this.state.contractsList}
                           delManageSize={this.delManageSize.bind(this)}
                           addManageInfo={this.addManageInfo.bind(this)}
                           contractsListIsShow={this.state.contractsListIsShow}
                           constantTypeHot={this.state.constantTypeHot}
                           constantTypeSelf={this.state.constantTypeSelf}
                           constantTypeUseHistory={this.state.constantTypeUseHistory}
                           indexModelTypeCha={this.indexModelTypeCha.bind(this)}/>
                <div className="splitLine"></div>
                <MSGEdit checkBoxOneClick={this.checkBoxOneClick.bind(this)}
                         checkFour={this.state.checkFour}
                         newsList={this.state.newsList}
                         saveNewsId={this.state.saveNewsId}
                         newsListIsShow={this.state.newsListIsShow}
                         MSGEditClick={this.MSGEditClick.bind(this)}
                         updateAllInfo={this.updateAllInfo.bind(this)}
                         saveAllBtn={this.state.saveAllBtn}
                         //inputChange={this.inputChange.bind(this)}
                         MSGName={this.state.MSGName}
                         MSGCode={this.state.MSGCode}/>
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
                {
                   // <span className="curPvwTwo">资源版本
                   //       <span className="curLeft">{this.props.curResourceVersion}</span>
                   //</span>
                    //<span className="curPvwTwo">资源版本</span>
                    //<span className="curPvwTwo">模块名称</span>

                }
                <span className="curPvwOne goBack"  style={{float:'right'}} onClick={this.props.goBack.bind(this)}>返回>></span>
            </div>
        )
    }
}
class CurPvwImgList extends Component{
    render(){
        var _this = this;
        var showBTn= this.props.upFileBtnFlag ?    <button type="button" class="upBtn" onClick={this.props.btnUpImg.bind(this)}>上传</button> :  <button type="button" class="upBtnCCC">上传</button>
        return(
            <div className="indexEditLine">
                <div className="pvwImgList">
                    <img src={splitImg}/><span className="pvwImgTitle">图片列表</span>
                </div>
                <div className="tableDIv">
                    <table class="table tableList">
                        <thead>
                        <tr className="bgTr">
                            <th>序号</th>
                            <th>图片名称</th>
                            <th>上传时间</th>
                            <th>操作人</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            //className="previewTd"
                            this.props.imgListArray.map(function(data,index){
                                return(
                                    <tr onClick={_this.props.previewClcik.bind(_this,data.filePath)}>
                                        <td>{index+1}</td>
                                        <td >{data.fileName}</td>
                                        <td>{data.fileUpdateTime}</td>
                                        <td>{_this.props.operatorName}</td>
                                        <td><span class="delBtn" onClick={_this.props.delManageSize.bind(_this,index+1,0,data.filePath)}>删除</span></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="pvwImgRight">
                    <img src={this.props.fetchPreviewImg} className="imgPreview" />
                    <div className="imgPosition">{this.props.imgMsg}</div>
                </div>
                <div className="widthOne">
                    <div className="pvwDivTwo"><span>选择图片</span>
                        <input type="text" className="pvwInputText" id="urlShow"  placeholder="路径"/>
                        <span className="urlFile"><input type="file" onChange={this.props.upFileChange.bind(this)} id="file" name="source"/></span>
                        {showBTn}

                    </div>
                </div>
            </div>
        )
    }
}
class BannerEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            bannerImgName:'',
            bannerImgURL:'',
        }
    }
    bannerCha(){
        var _this = this;
        this.setState({bannerImgName:_this.refs.bannerImgName.value,bannerImgURL:_this.refs.bannerImgURL.value})
        // this.props.bannerChange(this.refs.bannerImgName.value,this.refs.bannerImgURL.value);
    }
    render(){
        var _this = this;
        var checkOne =  this.props.bannerIsShow.isShow == true ?  checkBoxTwo : checkBoxOne;
        return(
            <div className="indexEditLine">
                <div className="pvwImgList widthOne">
                    <img src={splitImg}/><span className="pvwImgTitle">广告页面修改</span>
                    <div className="flagValid">
                        <span className="pvwImgTitle">是否有效</span>
                        <img src={checkOne} onClick={this.props.checkBoxOneClick.bind(this,1)}/>
                    </div>
                </div>
                <div className="tableDIv">
                    <table class="table tableList">
                        <thead>
                        <tr className="bgTr">
                            <th>序号</th>
                            <th>图片名称</th>
                            <th>地址</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.bannersList.map(function(data,index){
                                return(
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{data.img}</td>
                                        <td>{data.url}</td>
                                        <td><span class="delBtn" onClick={_this.props.delManageSize.bind(_this,index+1,1)}>删除</span></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="widthOne">
                    <div class="pvwDiv bannerDivOne"><span>图片名称</span><input type="text" id="bannerImgName" onChange={this.bannerCha.bind(this)} ref="bannerImgName" className="pvwInputText" placeholder="图片名称"/></div>
                    <div class="pvwDivTwo bannerDivTwo"><span>URL</span>
                        <input type="text" className="pvwInputText" ref="bannerImgURL" id="bannerImgURL" onChange={this.bannerCha.bind(this)} placeholder="路径"/>
                        <button type="button" class="upBtn" onClick={_this.props.addManageInfo.bind(_this,_this.state.bannerImgName,_this.state.bannerImgURL,1)}>增加</button>
                    </div>
                </div>
            </div>
        )
    }
}
class FunctionEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            functionImgName:'',
            functionImgURL:'',
            titleName:'',
            functionName:''
        }
    }
    handleChg() {
        this.setState({functionImgName:this.refs.functionImgName.value,functionImgURL:this.refs.functionImgURL.value,titleName:this.refs.titleName.value,functionName:this.refs.functionName.value})
    }
    render(){
        var _this = this;
        var checkTwo = this.props.customsListIsShow.isShow ?  checkBoxTwo : checkBoxOne;
        var funcShow = this.props.funcShow ? 'hideManage' : 'hideManageTwo'
        var funcHide = this.props.funcHide ? 'hideManageThree' : 'hideManageOne'
        return(
            <div className="indexEditLine" style={{height:'347px'}}>
                <div className="pvwImgList widthOne">
                    <img src={splitImg}/><span className="pvwImgTitle">功能区修改</span>
                    <div className="flagValid">
                        <span className="pvwImgTitle">是否有效</span>
                        <img src={checkTwo} onClick={this.props.checkBoxOneClick.bind(this,2)}/>
                    </div>
                </div>
                <div className="tableDIv" style={{height:'187px'}}>
                    <table class="funcTable">
                        <thead>
                        <tr className="bgTr">
                            <th>序号</th>
                            <th>图片名称</th>
                            <th>名称</th>
                            <th>地址</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.customsList.map(function(data,index){
                                return(
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{data.image1}</td>
                                        <td>{data.title}</td>
                                        <td className="textOverFlow" title={data.url}>{data.url}</td>
                                        <td style={{width:'215px'}}>
                                            <span className="delBtn" onClick={_this.props.delManageSize.bind(_this,index+1,2)}>删除</span>
                                            <span class="editBtn" onClick={_this.props.funcEditInfo.bind(_this,index+1,data.title,data.image1,data.image2,data.url,data.checked,data.id)} style={{marginLeft: '12px',width: '45px'}}>编辑</span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {
                            //<span className={data.checked == 1 ? 'hideManage' : 'hideManageTwo' } onClick={_this.props.modifyFucShow.bind(_this,index+1,1,data.checked,data.image1,data.url,data.title,data.id)}>显示</span>
                            //<span className={data.checked == 1 ? 'hideManageOne' : 'hideManageThree' } onClick={_this.props.modifyFucShow.bind(_this,index+1,0,data.checked,data.image1,data.url,data.title,data.id)}>隐藏</span>
                        }
                        </tbody>
                    </table>
                </div>
                <div className="widthOne">
                    <div class="pvwDiv"><span>图片名称</span><input type="text" onChange={this.handleChg.bind(this)} ref="functionImgName" id="functionImgName" className="pvwInputText" placeholder="图片名称"/></div>
                    <div class="pvwDivOne"><span>名称</span><input type="text"  onChange={this.handleChg.bind(this)} ref="titleName" id="titleName"  className="pvwInputText" placeholder="名称"/> </div>
                    <div class="pvwDivTwo"><span>功能名称</span>
                        <input type="text" ref="functionName" id="functionName" className="pvwInputText" onChange={this.handleChg.bind(this)}  placeholder="名称的拼写"/>
                    </div>
                </div>
                <div className="clearBothDiv"></div>
                <div className="widthOne">
                    <div>
                        <span className="funUrl">URL</span>
                        <input type="text"  style={{width:'651px',marginLeft:'14px'}} ref="functionImgURL" id="functionImgURL" className="pvwInputText" onChange={this.handleChg.bind(this)}  placeholder="路径"/>
                        <button type="button" class="upBtn" onClick={_this.props.addManageInfo.bind(_this,_this.state.functionImgName,_this.state.functionImgURL,2,_this.state.titleName,_this.state.functionName)}>增加</button>
                    </div>
                </div>
                {
                    //<div className="widthOne">
                    //    <div class="pvwDiv bannerDivOne"><span>图片名称</span><input  onChange={this.handleChg.bind(this)} ref="functionImgName" type="text" className="pvwInputText" placeholder="图片名称"/></div>
                    //    <div class="pvwDivTwo bannerDivTwo"><span>URL</span>
                    //        <input type="text" className="pvwInputText" onChange={this.handleChg.bind(this)}  ref="functionImgURL" placeholder="路径"/>
                    //        <button type="button" class="upBtn"  onClick={_this.props.addManageInfo.bind(_this,_this.state.functionImgName,_this.state.functionImgURL,2)}>增加</button>
                    //    </div>
                    //</div>
                }
            </div>
        )
    }
}
class IndexEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            marketName:'',
            codeName:'',
            name:''
        }
    }
    handleChg(){
        this.setState({marketName:this.refs.marketName.value,codeName:this.refs.codeName.value,name:this.refs.name.value})
    }
    //indexModelCha(){
    //  this.props.indexModelTypeCha(this.refs.indexType.value)
    //}showType：1：浏览历史，2：自选，3：热抄（主力合约）
    render(){
        var _this = this;
        var checkThree = this.props.contractsListIsShow.isShow ?  checkBoxTwo : checkBoxOne;
        //console.log("showtype===="+_this.props.contractsListIsShow.showType)
        return(
            <div className="indexEditLine" style={{height:'100px'}}>
                <div className="pvwImgList widthOne">
                    <img src={splitImg}/><div className="pvwImgTitle">指数区修改</div>
                    <div className="flagIndex">
                         <span className="pvwImgTitle" style={{color:'#333',marginRight:'10px'}}>请选择类型</span>
                        <select className="selectType" id="indexFuncType" ref="indexType" onChange={this.props.indexModelTypeCha.bind(this)} >
                            {this.props.contractsListIsShow.showType == 1 ? <option value='1' selected="true" >最新浏览</option> : <option value='1'>最新浏览</option>}
                            {this.props.contractsListIsShow.showType == 2 ? <option value='2' selected="true" >自选股</option> : <option value='2'>自选股</option>}
                            {this.props.contractsListIsShow.showType == 3 ? <option value='2' selected="true" >热炒合约</option> : <option value='3'>热炒合约</option>}
                        </select>
                        <span className="pvwImgTitle">是否有效</span>
                        <img src={checkThree} onClick={this.props.checkBoxOneClick.bind(this,3)} style={{marginLeft: '10px',marginTop:'-8px'}}/>
                    </div>
                </div>
                {
                    //<div className="tableDIv">
                    //    <table class="table tableList">
                    //        <thead>
                    //        <tr className="bgTr">
                    //            <th>序号</th>
                    //            <th>市场</th>
                    //            <th>名称</th>
                    //            <th>代码</th>
                    //            <th>操作</th>
                    //        </tr>
                    //        </thead>
                    //        <tbody>
                    //        {
                    //            this.props.contractsList.map(function(data,index){
                    //                return(
                    //                    <tr>
                    //                        <td>{index+1}</td>
                    //                        <td>{data.market}</td>
                    //                        <td>{data.name}</td>
                    //                        <td>{data.code}</td>
                    //                        <td><span class="delBtn" onClick={_this.props.delManageSize.bind(_this,index+1,3)}>删除</span></td>
                    //                    </tr>
                    //                )
                    //            })
                    //        }
                    //        </tbody>
                    //    </table>
                    //</div>
                    //<div className="widthOne">
                        //    <div class="pvwDiv"><span>市场</span><input type="text" onChange={this.handleChg.bind(this)} ref="marketName"  id="marketName" className="pvwInputText" placeholder="市场"/></div>
                        //    <div class="pvwDivOne"><span>代码</span><input type="text"  onChange={this.handleChg.bind(this)} ref="codeName" id="codeName" className="pvwInputText" placeholder="代码"/> </div>
                        //    <div class="pvwDivTwo"><span>名称</span>
                        //        <input type="text" ref="name" id="name" className="pvwInputText"  onChange={this.handleChg.bind(this)} placeholder="名称"/>
                        //        <button type="button" class="upBtn" onClick={_this.props.addManageInfo.bind(_this,_this.state.marketName,_this.state.codeName,3,_this.state.name)} style={{marginLeft:'36px'}}>增加</button>
                        //    </div>
                        //</div>
                }


            </div>
        )
    }
}
class MSGEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            newsNum:'',
            name:''
        }
    }
    inputCha(index) {
         let name = $("#newsName-"+index).val();
         let code = $("#MSGCode-"+index).val().split(",");
         let count = parseInt($("#countNum-"+index).val());
         modifyInfo(this.props.newsList,index+1,{name:name,ids:code,count:count})
        this.setState({newsList:this.props.newsList})
    }
    render(){
        var checkFour = this.props.newsListIsShow.isShow ?  checkBoxTwo : checkBoxOne;
        var _this = this;
        var showBtn = this.props.saveAllBtn ?   <button type="button" class="verifyBgBtn" onClick={this.props.updateAllInfo.bind(this)}>保存</button> :   <button type="button" class="verifyBgBtnCCC">保存</button>
        return(
            <div className="indexEditLine">
                <div className="pvwImgList widthOne">
                    <img src={splitImg}/><span className="pvwImgTitle">资讯区修改</span>
                    {
                        <div className="flagValid msgLeft">
                            <span className="pvwImgTitle">是否有效</span>
                            <img src={checkFour} onClick={this.props.checkBoxOneClick.bind(this,4)}/>
                        </div>
                    }
                </div>
                {
                    this.props.newsList.map(function(data,index){
                        return(
                            <div className="msgInfo" >
                                <span className="rightMarginOne">第{index+1}资讯</span>
                                <span className="rightMarginTwo">
                                    <input type="text" className="newsInfo"  onChange={_this.inputCha.bind(_this,index)} id={'newsName-' + (index)} ref='MSGName' placeholder="显示名称" defaultValue={data.name} /></span>
                                <span style={{marginRight:'20px'}}>
                                  新闻编号：    <input type="text"  onChange={_this.inputCha.bind(_this,index)} id={'MSGCode-' + (index)}    placeholder="新闻编号" className="newsInfo"  defaultValue={data.ids}/>
                                </span>
                                <span>新闻数量：<input type="text" id="newsCount" onChange={_this.inputCha.bind(_this,index)} id={'countNum-' + (index )}    placeholder="新闻数量" className="newsInfo"  defaultValue={data.count}/></span>
                            </div>
                        )
                    })
                }
                <div className="splitLine NESLine"></div>
                <div style={{width:'381px'}}>
                    {showBtn}
                    {//   <div className="splitLine NESLine"></div>
                        // <button type="button" class="verifyBtn">预览</button>
                        //<button type="button" class="verifyBtn">真机验证</button>
                    }
                </div>
            </div>
        )
    }
}
CurIndexPvw.contextTypes = {
    router: React.PropTypes.isRequired
}
export default CurIndexPvw