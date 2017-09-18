<template>
    <div class="panel panel-default top10 allDivWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">身份证有效期变更</span>
        </div>
    </div>
    <div class="panel panel-default linkmanInfo allDivWidth" style="height: 428px;">
        <div class="panel-body"  v-show="stepFirstDiv">
              <div class="blue-round">1</div>
              <div class="fontOne">更改有效期</div>
              <div class="rightLine-blue"></div>

           <div class="divImgTwo">
               <div class="gray-round">2</div>
               <div class="fontTwo">上传扫描件</div>
               <div class="rightLine-grays"></div>
           </div>

            <div class="divImgThree">
                <div class="gray-round">3</div>
                <div class="fontTwo">手机确认</div>
            </div>
            <form class="cardTop formTop" role="form" data-validate="parsley">
                <div class="form-group">
                    <label    class="labelAll">身份证号码：</label>
                    <div  class="spanCardNo" style="margin-left: 10px;">
                        {{idNo}}
                    </div>
                </div>
                <div class="form-group">
                    <label  class="labelAll">原证件到期日：</label>
                    <div class="inputPosition" style="margin-left: 448px;">
                       {{dateFormat(validity)}}
                    </div>
                </div>
                <span  id="newPhoneNoResult"  class="error-msg text-align"></span>
                <div class="form-group">
                    <label   class="labelAll"  >新证件有效期：</label>
                    <div class=" inputPosition">
                              <span style="margin-left: 10px;"><input class="searchInput" id="startDate" type="text"></span>
                              <span style="margin-left:6px" v-show="validShow">至</span>
                              <span v-show="validShow"><input style="margin-left: 8px;" id="endDate" class="searchInput form-text" type="text"></span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="inputPosition checkboxInfo">
                        <!--<input type="checkbox" @click="validClick">-->
                        <img   :src="orValidSrc" class="validInfo" @click="validClick">
                        <label> 长期有效 </label>
                    </div>
                    <span class="errorMsg">{{errorMessage}}</span>
                </div>
                <span  id="confirmPhoneNoResult"  class="error-msg text-align"></span>
                <div class="form-group">
                    <div class="subLinkMan"  style="margin-top:27px">
                        <button type="button"  @click="submitInfo" class=" btn-style  btn-submit" data-toggle="button">下一步</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="panel-body"  v-else>
            <div class="contextTitle">
               <img src="../../../image/index/warn.png"> <span class="tipMsg">无法申请身份证有效期变更业务，请先激活！</span>
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
   import {initDatePicker} from '../../../util/datePicker';
   import moment from 'moment';
   import {YMD,yymmdd} from '../../../util/dateFormat.js';
   import {flagLogin} from '../../../util/errorMsg.js';
   import {getCookie,setCookie}from '../../../util/cookie.js';
   import valid from '../../../image/valid.png'
   import orvalid from '../../../image/orvalid.png'
    export default{
        data:function(){
            return {
                orValid: false,
                validShow:true,
                idNo:'',
                validity:'',
                stepFirstDiv:'',
                errorMessage:""
            }
        },
         ready: function(){
             flagLogin();//判断登录状态
             initDatePicker();

             $("#endDate").datepicker({
                 onSelect:function(dateText,inst){
                     $("#startDate").datepicker("option","maxDate",dateText);
                 }
             });
             //根据缓存的信息判断显示结果
//             var getValid = JSON.parse(localStorage.getItem("flagValid"));
//             alert("缓存："+getValid.valid)
//             if(getValid !=null){
//                 if(getValid.orValid == true){
//                     return   '../dist/image/orvalid.png'
//                 }else{
//                     return   '../dist/image/valid.png'
//                 }
//             }
              // this.stepFirstDiv = true
             let userScape=getCookie("user")
             if(userScape !=""){
                 let userInfo=JSON.parse(unescape(userScape))
                 var _this = this;
                 this.idNo = userInfo.data[0][36]
                 this.validity = userInfo.data[0][86]
                 if(this.validity){
                     _this.stepFirstDiv = true//显示
                 }else{
                     //说明无权限要去激活账户
                     _this.stepFirstDiv = false//隐藏
                 }
             }else{
                     router.go({path:'/'});
             }
             //如果缓存不存在就直接到登录页面
             let userAccount=getCookie("userAccount");
             let flagData = getCookie("flagData");
             if(userAccount == '' || flagData == ""){
                 router.go({path:'/'});
             }
         },
       computed:{
           //利用vue 中的computed 计算函数处理是否显示
           orValidSrc:function(){
               if(this.orValid){
                  return   orvalid
               }else{
                   return  valid
               }
           }
       },
       methods:{
           dateFormat: function (date) {
               return moment(date).format(YMD);
           },
           validClick:function(){
               this.orValid = !this.orValid
               if(this.validShow == true){
                  this.validShow =false
//                   //缓存信息
//                   var obj = {valid: true};
//                   localStorage.setItem("flagValid",JSON.stringify(obj));
               }else{
//                   initDatePicker()
                   this.validShow =true
//                   //缓存信息
//                   var obj = {valid: false};
//                   localStorage.setItem("flagValid",JSON.stringify(obj));
               }
           },
           submitInfo:function(){
               var startDate =  $("#startDate").val();
               var endDateV =  $("#endDate").val();
               var endDateResult;
               if(endDateV !=null){
                     endDateResult =endDateV.replace(/\-/g,"");
               }





               //如果结束日期隐藏的话 就代表是长期有效 就要把结束日期 累加300年
               if(this.validShow == false){




                   var endD1=new Date(endDateV);
                   var endD2=new Date(endD1);
                   endD2.setFullYear(endD2.getFullYear()+300);
                   endDateResult=moment(endD2).format(yymmdd)
               }
               else
               {
                   var endrr = endDateV.split("-");
                   var endtime = moment(endDateV,"YYYY-MM-DD");
                   //var current = new Date();
                   //console.log(moment(endtime).format('YYYYMMDD'));
                   if(parseInt(moment(endtime).format(yymmdd))<parseInt(moment().format(yymmdd)))
                   {
                       this.errorMessage ="有效期结束日期不能小于当前日期";
                       return;
                   }
               }
              // alert(endDateResult);
               var obj={52:startDate.replace(/\-/g,""),53:endDateResult}
               sessionStorage.setItem("cardNoInfo",escape(JSON.stringify(obj)));
               router.go('/main/stepTwo')
           }
       }
    }
</script>
