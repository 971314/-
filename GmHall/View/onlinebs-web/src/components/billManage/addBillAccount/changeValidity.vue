<template>
    <div class="panel panel-default top10 allDivWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">添加结算账户</span>
        </div>
    </div>
    <div class="panel panel-default linkmanInfo allDivWidth">
        <div class="panel-body" style="height: 414px;">
            <div class="divImgOne">
                <div class="blue-round">1</div>
                <div class="fontOne">更改有效期</div>
                <div class="rightLine-blue"></div>
            </div>
            <div class="divImgAccountTwo">
                <div class="gray-round">2</div>
                <div class="fontTwo">上传扫描件</div>
                <div class="rightLine-grays"></div>
            </div>

            <div class="divImgAccountThree">
                <div class="gray-round">3</div>
                <div class="fontTwo">签署协议</div>
                <div class="rightLine-grays" style="margin-left: 393px;"></div>
            </div>
            <div class="divImgFour">
                <div class="gray-round">4</div>
                <div class="fontTwo">手机确认</div>
            </div>
            <form class="cardTop   formTop" role="form" data-validate="parsley" style="margin-top:39px">
                <div class="form-group">
                    <label  class="labelAll">银行名称：</label>
                    <div class="modifyPass">
                        <select type="text" class="form-control form-text" id="bankId" v-model="bankId">
                            <option value="1" selected="selected">浦发</option>
                            <option value="2">招商</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="bankNo" class="labelAll">银行账号：</label>
                    <div class="inputPosition">
                        <input type="text" class="form-control form-text"   name="bankNo"
                               id="bankNo"
                               v-model="bankAcc"
                               data-required="true" autocomplete="off"
                               data-regexp="^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$"
                               data-error-message="亲，请正确填写银行账号"
                               data-error-container="#bankNoResult"
                               placeholder="请输入银行账号">
                    </div>
                </div>
                <span  id="bankNoResult"  class="error-msg text-align"></span>
                <div class="form-group">
                    <label for="newBankNo" class="labelAll">确认银行账号：</label>
                    <div class="inputPosition">
                        <input type="text" class="form-control form-text" id="newBankNo" name="newBankNo"
                               v-model="confirmBankAcc"
                               data-required="true" autocomplete="off"
                               data-regexp="^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$"
                               data-error-message="亲，请正确填写确认银行账号"
                               data-error-container="#newBankNoResult"
                               placeholder="请输入确认银行账号">
                    </div>
                </div>
                <span  id="newBankNoResult"  class="error-msg text-align"></span>
                <div class="form-group">
                    <div class="subLinkMan" style="margin-top: 27px;">
                        <button type="button"   @click="nextOne" class=" btn-style  btn-submit" data-toggle="button">下一步</button>
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
    import {getCookie,setCookie}from '../../../util/cookie.js';
    export default {
        data:function(){
            return{
                bankId:'',
                bankAcc:'',
                confirmBankAcc:''
            }
        },
        methods:{
            nextOne:function(){
//                if(!$('#bankNo' ).parsley('isValid')){
//                    $('#bankNo' ).parsley('validate')
//                    return;
//                }
//                if(!$('#newBankNo' ).parsley('isValid')){
//                    $('#newBankNo' ).parsley('validate')
//                    return;
//                }
                var obj={bankId:this.bankId,bankAcc:this.bankAcc,confirmBankAcc:this.confirmBankAcc}
                setCookie("accountInfo",JSON.stringify(obj));
                router.go("/main/uploadPaperWork");
            }
        }
    }
</script>