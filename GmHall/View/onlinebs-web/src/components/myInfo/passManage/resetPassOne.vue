<template>
        <div class="panel panel-default top10 titleWidth">
            <div class="panel-body panel-title" >
                <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">重置密码</span>
            </div>
        </div>
        <div class="panel panel-default allDivWidth linkmanInfo" style="height: 521px;">
            <div class="panel-body" >
                <div class="blue-round">1</div>
                <div class="fontOne">选择密码类型</div>
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
                <div class="form-group" style="margin-top: 23px;">
                    <label   class="labelAll">密码类型：</label>
                    <div class="modifyPass">
                        <input type="checkbox"  @focus="focusPass" checked="checked" id="billPassValue" value="2" /><span class="checkBoxText">资金密码</span>
                        <input type="checkbox"  @focus="focusPass" style="margin-left: 17px;"  id="transPassValue" value="1" /><span class="checkBoxText">交易密码</span>
                        <!--<select type="text" class="form-control form-text" v-model="selectType">-->
                        <!--<option value="21" selected>资金密码</option>-->
                        <!--<option value="20">交易密码</option>-->
                        <!--</select>-->
                    </div>
                </div>
                <form class="top44" role="form" data-validate="parsley" style="margin-top: 19px;">
                    <!--<div class="form-group">-->
                        <!--<label    class="labelAll">切换交易系统：</label>-->
                        <!--<div class="modifyPass">-->
                            <!--<select type="text" v-model="newSys" class="form-control form-text" id="firstname">-->
                                <!--<option selected="selected" value="1">金仕达</option>-->
                                <!--<option value="2">CTP</option>-->
                                <!--<option value="9">其他</option>-->
                            <!--</select>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="form-group">
                        <label   class="labelAll"  >资金账号：</label>
                        <div class=" inputPosition">
                            <input type="text" class="form-control form-text"
                                   v-model="billAccount"  autocomplete="off"
                                   id="billAccount"  @focus="focusPass"
                                   data-required="true"  maxlength="11"
                                   data-error-message="亲，请正确填写资金账号"
                                   data-error-container="#billAccountResult"
                                   placeholder="请输入资金账号">
                        </div>
                    </div>
                    <span  id="billAccountResult"  class="error-msg text-align"></span>
                    <div class="form-group">
                        <label   class="labelAll"  >姓名：</label>
                        <div class=" inputPosition">
                            <input type="text" class="form-control form-text"
                                   id="name"
                                   v-model="name"  autocomplete="off" @focus="focusPass"
                                   data-required="true"  maxlength="11"
                                   data-error-message="亲，请正确填写姓名"
                                   data-error-container="#nameResult"
                                   placeholder="请输入姓名">
                        </div>
                    </div>
                    <span  id="nameResult"  class="error-msg text-align"></span>
                    <div class="form-group">
                        <label   class="labelAll"  >手机号码：</label>
                        <div class=" inputPosition">
                            <input type="text" class="form-control form-text"
                                   id="phone" @focus="phoneInfo"
                                   v-model="phone"  autocomplete="off"
                                   data-required="true"  maxlength="11"
                                   data-regexp="^(13|15|18|14|17)[0-9]{9}$"
                                   data-error-message="亲，请正确填写手机号"
                                   data-error-container="#phoneResult"
                                   placeholder="请输入手机号码">
                        </div>
                    </div>
                    <span  id="phoneResult" class="msgBottom" style="margin-left: 6px;text-align: center">{{errorMessage}}</span>
                    <div class="form-group">
                        <div class="subLinkMan"  v-if="initBtn" style="margin-top: 62px">
                            <button type="button" @click="submitInfo"  class=" btn-style  btn-submit" data-toggle="button" style="margin-left: 30px;">下一步</button>
                        </div>
                        <div  v-if="loadingBtn"  style="margin-top: 62px;margin-left: 33px;">
                            <load-btn></load-btn>
                        </div>
                    </div>
                </form>
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
</template>
<script>
    import store from '../../../vuex/store'
    import {saveInfo} from '../../../vuex/action';
    import {onlineGlobal,resetPass,customerType} from '../../../util/config';
    import loadBtn from '../../publicMethod/submitLoadBtn.vue';
    import {getCookie,setCookie}from '../../../util/cookie.js';
    export default{
        components:{
            loadBtn:loadBtn
        },
        data:function(){
            return{
                errorMessage:'',
                resetShow: true,
                name:'',
                phone:'',
                selectType:'',
                billAccount:'',
//                newSys:'',
                initBtn:true,
                loadingBtn:false,
                selectType:''
            }
        },
        store:store,
        vuex:{
             actions:{
                 saveInfo:saveInfo
             },
        },
        methods:{
//            phoneBlur: function(){
//              $("#phoneResult").html('')
//            },
            phoneInfo:function(){
                this.errorMessage = ''
            },
            focusPass:function(){
                this.errorMessage = ''
            },
            submitInfo:function(){
               // router.go({path:'/resetPassInfo/resetPassTwo'});
                var _this = this;
                var billPassValue = document.getElementById('billPassValue');
                var transPassValue = document.getElementById('transPassValue');
                if(billPassValue.checked == false && transPassValue.checked == false){
                    _this.errorMessage = '请选择密码类型！';
                    return;
                }
                if(billPassValue.checked && transPassValue.checked){
                    _this.selectType = billPassValue.value+";"+ transPassValue.value;
                }else if(billPassValue.checked){
                    _this.selectType = billPassValue.value;
                }else if(transPassValue.checked){
                    _this.selectType = transPassValue.value;
                }
                if(!$('#billAccount' ).parsley('isValid')){
                    $('#billAccount' ).parsley('validate')
                    return;
                }
                if(!$('#name' ).parsley('isValid')){
                    $('#name' ).parsley('validate')
                    return;
                }
                if(!$('#phone' ).parsley('isValid')){
                    $('#phone' ).parsley('validate')
                    return;
                }
                this.loadingBtn = true;
                this.initBtn = false;

                var  stepOneRestObj = {account:this.billAccount,name:this.name,phone:this.phone,selectType:this.selectType}
                sessionStorage.setItem("stepOneRestPass",escape(JSON.stringify(stepOneRestObj)))

//                var obj={21:_this.billAccount,24:_this.name,30:_this.phone,74:selectType}
//                sessionStorage.setItem("resetPassInfo",escape(JSON.stringify(obj)));
//                router.go({path:'/resetPassInfo/resetPassTwo'});
                    //首先校验 客户号 手机号 姓名是否正确
                    $.ajax({
                        url:onlineGlobal,
                        type:'post',
                        dataType:'json',
                        contentType:'application/json',
                        data:JSON.stringify({
                            func:resetPass,
                            type:customerType,token:"",account:this.billAccount,
                            data:[{
                                24:this.name,30:this.phone
                            }]
                        }),
                        success:function(data){
                            if(data.retHead == 1){
                                //如果校验成功才可以进入下一步
                                var obj={21:_this.billAccount,24:_this.name,30:_this.phone,74:_this.selectType}
                                sessionStorage.setItem("resetPassInfo",escape(JSON.stringify(obj)));
                                console.log(_this.selectType)
                                router.go({path:'/resetPassInfo/resetPassTwo'});
                            }else{
                                _this.loadingBtn = false;
                                _this.initBtn = true;
                                _this.errorMessage = data.desc;
                            }
                        },error:function(data){
                            _this.loadingBtn = false;
                            _this.initBtn = true;
                            this.errorMessage = '服务器异常'
                        }
                    })
//                }
            }
        },
        ready:function(){
            //缓存里面获取之前填写的信息 如果存在就直接显示
            var getStepOne =  unescape(sessionStorage.getItem("stepOneRestPass"));
            var getStepOneData = JSON.parse(getStepOne);
            if(getStepOneData !=null){
                this.billAccount = getStepOneData.account;
                this.name = getStepOneData.name;
                this.phone = getStepOneData.phone;
//                alert(getStepOneData.selectType)
                this.selectType = getStepOneData.selectType;
                var billPassValue = document.getElementById('billPassValue');
                var transPassValue = document.getElementById('transPassValue');
                //根据值显示选中状态
                if(this.selectType == 2){
                    billPassValue.checked = true;
                    transPassValue.checked = false;
                }else if(this.selectType == 1){
                    billPassValue.checked = false;
                    transPassValue.checked = true;
                }else if(this.selectType == '2;1'){
                    billPassValue.checked = true;
                    transPassValue.checked = true;
                }
            }
        }

    }
</script>