<template>
        <div class="panel panel-default top10 titleWidth">
            <div class="panel-body panel-title" >
                <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">重置密码</span>
            </div>
        </div>
                <div class="panel panel-default allDivWidth linkmanInfo" style="height: 574px;">
                    <div class="panel-body">
                            <div class="blue-round">1</div>
                            <div class="fontOne">选择密码类型</div>
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
                                     <input type="file" class="upFile" @change="uploadCardFront" id="cardFront">
                                     <button type="button" style="margin-top: -50px;" class="btn-style uploadBtn btn-submit"  data-toggle="button">上传</button>
                                 </span>
                                 <span class="spanCardUploadTwo">
                                   <input type="file"  class="upFile" @change="uploadCardUnFront" id="cardUnFront">

                                   <button type="button" class="btn-style uploadBtn  btn-submit"  style="margin-top: -55px;" data-toggle="button">上传</button>
                                 </span>
                            </div>
                            <span class="error-msg">{{errorMsg}}</span>
                            <div class="uploadDivStep">
                                <span class="spanCardStepOne"><button  v-link="{path: '/resetPassInfo'}"  type="button" class="btn-style  btn-submit"  data-toggle="button">上一步</button></span>
                                <span class="spanCardUploadTwo" style="margin-left: 358px;"><button type="button"  @click="submit" style="margin-top: 9px;" class="btn-style   btn-submit"  data-toggle="button">下一步</button></span>
                            </div>
                        </div>
                    </div>
                </div>
        <div class="panel panel-default allDivWidth">
            <div class="panel-body panel-bgcolor">
                业务须知：
                <div>
                    提交变更申请后，我们客服人员会对新号码进行电话回访，回访后新手机号正式生效。
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../../vuex/store';
    import  uploadComponents  from '../../publicMethod/uploadFile.vue';
    import {saveInfo} from '../../../vuex/action';
    import {getSaveInfo} from '../../../vuex/getters';
    import {getFileType,fileType,fileTypeMsg} from '../../../util/config'
    import {getCookie,setCookie}from '../../../util/cookie.js';
    import cardFront from '../../../image/index/cardFront.png'
    import cardUnfront from '../../../image/index/cardUnfront.png'
    export default{
        components:{
            uploadComponents:uploadComponents
        },
        data:function(){
         return{
             billAccount:'',
             errorMsg:'',
             cardFronts:'',
             cardUnFronts:'',
             cardFront: cardFront,
             cardUnfront:cardUnfront,
             fileOne:'',
             fileTwo:'',
             frontCardName:'',//身份证名称
             unFrontCardName:'',
         }
    },
        store:store,
        vuex:{
            actions:{
                saveInfo:saveInfo
            },
            getters:{
                saveInfoData:getSaveInfo,
            }
        },
            methods:{
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
                uploadCardFront: function(e){
                    this.errorMsg =""
                    var _this=this;
                    var file=e.target.files[0];
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    _this.fileTwo = file;
                    reader.onload = function(e) {
                        _this.cardFront = e.target.result;

                        //缓存每一步的信息 免得返回上一步信息丢失
                        var fileFront = document.getElementById("cardFront").value;
                        var stepInfoObj = {frontCard:e.target.result,fileFront:fileFront};
                        sessionStorage.setItem("restPassCardFront", escape(JSON.stringify(stepInfoObj)));
                        _this.frontCardName =fileFront.substring(fileFront.lastIndexOf('\\')+1);
                        _this.checkImgInfoFront(fileFront)//校验图片

                    }

                },
                //上传身份证反面
                uploadCardUnFront:function(e){
                    this.errorMsg =""
                    var _this=this;
                    var file=e.target.files[0];
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    _this.fileTwo = file;
                    reader.onload = function(e){
                        _this.cardUnfront = e.target.result;

                        var fileUnFront = document.getElementById("cardUnFront").value;
                        var stepInfoObj = {unFrontCard:e.target.result,fileUnFront:fileUnFront};
                        sessionStorage.setItem("restPassCardUnFront", escape(JSON.stringify(stepInfoObj)));
                        _this.unFrontCardName = fileUnFront.substring(fileUnFront.lastIndexOf('\\')+1);
                        _this.checkImgInfoFront(fileUnFront)//校验图片
                    }
                },
                submit:function(){
                    var _this = this;
                    var stepFile = unescape(sessionStorage.getItem("restPassCardFront"));
                    var stepFileData =JSON.parse(stepFile);
                    if(stepFileData == null) {//如果缓存每一步的信息为空就要提示上传文件
                        var fileFront =document.getElementById("cardFront").value;
                        if(fileFront == ''){
                            this.errorMsg='请上传身份证正面';
                            return;
                        }
                    }else{
                        var _this =this;
                        var  cardFrontType= getFileType(stepFileData.fileFront);
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

                    var stepUnFile =unescape(sessionStorage.getItem("restPassCardUnFront"));
                    var stepUnFileData = JSON.parse(stepUnFile)
                    if(stepUnFileData == null) {//如果缓存每一步的信息为空就要提示上传文件
                        var fileUnFile =document.getElementById("cardUnFront").value;
                        if(fileUnFile== ''){
                            this.errorMsg='请上传身份证反面';
                            return;
                        }
                    }else{
                        var _this =this;
                        var  cardFrontType= getFileType(stepUnFileData.fileUnFront );
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

                    var stepResult = sessionStorage.getItem("resetPassInfo");
                    if(stepResult != ""){
                        let data =unescape(stepResult);
                        let dataInfo = JSON.parse(data);
                        var obj={83:_this.frontCardName,84:_this.unFrontCardName,81:_this.cardFront.substring(_this.cardFront.lastIndexOf(",")+1),
                            82:_this.cardUnfront.substring(_this.cardUnfront.lastIndexOf(",")+1)}
                        //遍历对象并将第一步和第二步的信息合并为一个对象
                        for(let tem in obj){
                            dataInfo[tem] = obj[tem];
                        }
                        sessionStorage.setItem("resetPassInfo",escape(JSON.stringify(dataInfo)));
                        router.go({path: '/resetPassInfo/resetPassThree'})
                    }
                }
            },
          ready:function(){
             //缓存信息是为了下一步操作点击上一步的时候缓存不消失
              var _this = this;
              var stepFile = unescape(sessionStorage.getItem("restPassCardFront"));
              var stepUnFile =unescape(sessionStorage.getItem("restPassCardUnFront"));
              var dataFront = JSON.parse(stepFile);
              var dataUnFront = JSON.parse(stepUnFile);
              if(dataFront != null){
                  _this.frontCardName = dataFront.fileFront.substring(dataFront.fileFront.lastIndexOf('\\')+1)
                  // console.log("获取已经存在的"+_this.frontCardName)
                  if(dataFront.frontCard){
                      _this.cardFront = dataFront.frontCard;
                  }
              }
              if(dataUnFront !=null){
                  _this.unFrontCardName = dataUnFront.fileUnFront.substring(dataUnFront.fileUnFront.lastIndexOf('\\')+1)
                  //console.log("获取已经存在的反"+_this.unFrontCardName)
                  if(dataUnFront.unFrontCard){
                      _this.cardUnfront = dataUnFront.unFrontCard;
                  }
              }
          }
    }
</script>