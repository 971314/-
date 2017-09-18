<template>
    <div class="panel panel-default top10 allDivWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">身份证有效期变更</span>
        </div>
    </div>
    <div class="panel panel-default linkmanInfo allDivWidth" style="height: 574px;">
        <div class="panel-body">
            <div class="blue-round">1</div>
            <div class="fontOne">更改有效期</div>
            <div class="rightLine-blue"></div>

            <div class="divImgTwo">
                <div class="blue-round">2</div>
                <div class="fontOne">上传扫描件</div>
                <div class="rightLine-blue"></div>
            </div>

            <div class="divImgThree">
                <div class="gray-round">3</div>
                <div class="fontTwo">手机确认</div>
            </div>
            <div class="top-step cardTop">
                <span class="spanCardOne">身份证正面</span>
                <span class="spanCardTwo">身份证反面</span>
                <div class="divCardImgOne">
                    <img  :src="cardFront"  class="cardFront">
                    <!--   <img src="../../../image/index/cardFront.png" class="cardFront"> -->
                </div>
                <div class="divCardImgTwo">
                    <img :src="cardUnfront" class="cardFront">
                </div>
                <div class="uploadDiv">
                     <span class="spanCardOne">
                         <input type="file" class="upFile" @change="uploadCardFront" v-model="cardFrontValue" id="cardFront">
                         <button type="button" style="margin-top: -50px;" class="btn-style uploadBtn btn-submit"  data-toggle="button">上传</button>
                     </span>
                     <span class="spanCardUploadTwo">
                       <input type="file"  class="upFile" @change="uploadCardUnFront" id="cardUnFront">

                       <button type="button" class="btn-style uploadBtn  btn-submit"  style="margin-top: -55px;" data-toggle="button">上传</button>
                     </span>
                </div>
                <!--<upload-components></upload-components>-->
                <span class="error-msg">{{errorMsg}}</span>
                <div class="uploadDivStep">
                    <span class="spanCardStepOne"><button  v-link="{path: '/main/stepFirst'}"  type="button" class="btn-style  btn-submit"  data-toggle="button">上一步</button></span>
                    <span class="spanCardUploadTwo" style="margin-left: 358px;"><button type="button"  @click="nextStep" @focus="fSubmit"  style="margin-top: 9px;" class="btn-style   btn-submit"  data-toggle="button">下一步</button></span>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default allDivWidth">
        <div class="panel-body panel-bgcolor">
            <p>业务须知： </p>
            <p>  1、新上传的身份证正反面扫描件必须完整且内容清晰。 </p>
            <p>  2、上传文件不超过1M。 </p>
        </div>
    </div>
</template>
<script>
    import  uploadComponents  from '../../publicMethod/uploadFile.vue';
    import {getFileType,fileType,fileTypeMsg} from '../../../util/config';
    import {flagLogin} from '../../../util/errorMsg.js';
    import {getCookie,setCookie}from '../../../util/cookie.js';
    import cardFront from '../../../image/index/cardFront.png'
    import cardUnfront from '../../../image/index/cardUnfront.png'
   export default{
            data:function(){
                return{
                    errorMsg:'',
                    cardFronts:'',
                    cardUnFronts:'',
                    cardFront: cardFront,
                    cardUnfront: cardUnfront,
                    fileOne:'',
                    fileTwo:'',
                    cardFrontValue:'',
                    frontCardName:'',//身份证名称
                    unFrontCardName:''
                }
            },
            ready:function(){
                flagLogin();//判断登录状态
                //缓存信息是为了下一步操作点击上一步的时候缓存不消失
                var _this = this;
                var stepFile = unescape(localStorage.getItem("stepUpFileInfo"));
                var stepUnFile =unescape(localStorage.getItem("stepUpUnFileInfo"));
                var dataFront = JSON.parse(stepFile);
                var dataUnFront = JSON.parse(stepUnFile);
                if(dataFront != null){
                    _this.frontCardName = dataFront.fileFront.substring(dataFront.fileFront.lastIndexOf('\\')+1)
                    if(dataFront.frontCard){
                        _this.cardFront = dataFront.frontCard;
                    }
                }
                if(dataUnFront !=null){
                    _this.unFrontCardName = dataUnFront.fileUnFront.substring(dataUnFront.fileUnFront.lastIndexOf('\\')+1)
                    if(dataUnFront.unFrontCard){
                        _this.cardUnfront = dataUnFront.unFrontCard;
                    }
                }
            },
            components:{
                uploadComponents:uploadComponents
            },
             methods: {
                 //校验图片身份证大小方法
                 checkImgInfoFront: function(fileData){
                     var _this =this;
                     var  cardFrontType= getFileType(fileData);
                     if($.inArray(cardFrontType,fileType) == -1){
                         this.errorMsg = fileTypeMsg;
                         return;
                     }
                     var size = Math.floor(_this.fileTwo.size/1024);
                     if (size >1024) {
                         this.errorMsg = "上传文件不能超过1M!";
                         return;
                     }
                 },
                 nextStep: function () {
                     var _this= this;
                     var stepFile = unescape(localStorage.getItem("stepUpFileInfo"));
                     var stepFileData =JSON.parse(stepFile);
                     if(stepFileData == null){//如果缓存每一步的信息为空就要提示上传文件
                         var fileFront = document.getElementById("cardFront").value;
                         if (fileFront == '') {
                             this.errorMsg = '请上传身份证正面';
                             return;
                         }
                     }else{
                         var _this =this;
                         var  cardFrontType= getFileType(stepFileData.fileFront);//校验图片
                         if($.inArray(cardFrontType,fileType) == -1){
                             this.errorMsg = fileTypeMsg;
                             return;
                         }
                         var size = Math.floor(_this.fileTwo.size/1024);
                         if (size >1024) {
                             this.errorMsg = "上传文件不能超过1M!";
                             return;
                         }
                     }
                     var stepUnFile =unescape(localStorage.getItem("stepUpUnFileInfo"));
                     var stepUnFileData = JSON.parse(stepUnFile)
                     if(stepUnFileData == null){//如果缓存每一步的信息为空就要提示上传文件
                         var fileUnFile = document.getElementById("cardUnFront").value;
                         if (fileUnFile == '') {
                             this.errorMsg = '请上传身份证反面';
                             return;
                         }
                     }else{
                         var _this =this;
                         var  cardFrontType= getFileType(stepUnFileData.fileUnFront);//校验图片
                         if($.inArray(cardFrontType,fileType) == -1){
                             this.errorMsg = fileTypeMsg;
                             return;
                         }
                         var size = Math.floor(_this.fileTwo.size/1024);
                         if (size >1024) {
                             this.errorMsg = "上传文件不能超过1M!";
                             return;
                         }
                     }
                     var stepResult = sessionStorage.getItem("cardNoInfo");
                     if(stepResult != ""){
                         var data = unescape(stepResult);
                         var dataInfo = JSON.parse(data);
                         var obj = {81: _this.cardFront.substring(_this.cardFront.lastIndexOf(",")+1),
                             82:_this.cardUnfront.substring(_this.cardUnfront.lastIndexOf(",")+1),
                             83:_this.frontCardName, 84: _this.unFrontCardName}
                         //遍历对象并将第一步和第二步的信息合并为一个对象
                         for (let tem in obj) {
                             dataInfo[tem] = obj[tem];
                         }
                         sessionStorage.setItem("cardNoInfo", escape(JSON.stringify(dataInfo)));
                         router.go( '/main/stepThree')
                     }
                 },
                 fSubmit: function () {
                     this.errorMsg = '';
                 },
                 //上传身份证正面
                 uploadCardFront:function(e)
                    {
                        localStorage.removeItem("stepUpFileInfo");//清空缓存的信息
                        this.errorMsg = ""
                        var _this = this;
                        var file = e.target.files[0];
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        _this.fileTwo = file;
                        reader.onload = function (e) {
                            _this.cardFront = e.target.result;
                            //缓存每一步的信息 免得返回上一步信息丢失
                            var fileFront = document.getElementById("cardFront").value;
                            var stepInfoObj = {frontCard:e.target.result,fileFront:fileFront};
                            localStorage.setItem("stepUpFileInfo", escape(JSON.stringify(stepInfoObj)));
                            _this.frontCardName =fileFront.substring(fileFront.lastIndexOf('\\')+1);
                            _this.checkImgInfoFront(fileFront)//校验图片
                        }
                    },
                        //上传身份证反面
                        uploadCardUnFront:function(e)
                        {
                            localStorage.removeItem("stepUpUnFileInfo");//清空缓存的信息
                            this.errorMsg = ""
                            var _this = this;
                            var file = e.target.files[0];
                            var reader = new FileReader();
                            reader.readAsDataURL(file);
                            _this.fileTwo = file;
                            reader.onload = function (e) {
                                _this.cardUnfront = e.target.result;
                                var fileUnFront = document.getElementById("cardUnFront").value;
                                var stepInfoObj = {unFrontCard:e.target.result,fileUnFront:fileUnFront};
                                localStorage.setItem("stepUpUnFileInfo", escape(JSON.stringify(stepInfoObj)));
                                _this.unFrontCardName = fileUnFront.substring(fileUnFront.lastIndexOf('\\')+1);
                                _this.checkImgInfoFront(fileUnFront)//校验图片
                            }
                            //计算文件大小
//                            this.fileTwo = file;
//                            var size = Math.floor(file.size/1024);
//                            if (size > 1024 ) {
//                                this.errorMsg =  "上传身份证反面不能超过1M!"
//                            }
                        }
    }
   }
</script>
