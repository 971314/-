<template>
    <div class="editView customerView">
        <div class="box">
            <div class="tit" data-toggle="collapse" data-target="#bd">
                基本信息<span class="fc-gray">（最近更新时间 {{data.time}}）</span><a class="icon"></a>
            </div>
            <div class="bd in" id="bd">
              <div style="border-top:1px solid #b0b0b0;height:14px;"></div>
              <div class="clearfix">
                <div class="left">
                    <div class="input">
                        <span>客户姓名</span>
                        <input type="text" disabled v-model="data.name"/>
                    </div>
                    <div class="input">
                        <span>联系方式</span>
                        <input type="text" v-model="data.phone"/>
                    </div>
                    <div class="input">
                        <span><i>*</i> 身份证号</span>
                        <input type="text" v-model="data.idnum" maxlength="18"/>
                        <em>{{err.code}}</em>
                    </div>
                    <div class="input">
                        <span>客户经理</span>
                        <input type="text" placeholder="选填" v-model="data.manager"/>
                    </div>
                </div>
                <div class="left" style="padding-top:39px;">
                    <div class="input">
                        <span>注册时手机号</span>
                        <input type="text" v-model="data.mobile" disabled/>
                    </div>
                    <div class="input" style="margin-top:43px;">
                        <span>所属部门</span>
                        <input type="text" placeholder="选填" v-model="data.mdepart"/>
                    </div>
                </div>
              </div>
              <div class="input">
                  <span>联系地址</span>
                  <input type="text" placeholder="选填" v-model="data.address"/>
              </div>
              <div class="input">
                  <span>注册日期</span>
                  <input type="text" style="width:200px;" v-model="data.rtime" disabled/>
              </div> 
              <div class="input">
                  <span>备注</span>
                  <textarea placeholder="选填" v-model="data.remark"></textarea>
              </div>
              <br><br><br>    
            </div>
        </div>
        <div class="btns">
            <a class="btn-white" onclick="history.go(-1)">返回</a>
            <a class="btn-blue" v-on:click="save()">保存</a>
        </div>
    </div>
</template>
<script>
    var t;
    module.exports = {
        data(){
            app.current = 10;
            app.title = "客户资料";
            t = this;
            return {
                data:{},
                err:{code:""}
            }
        },
        methods:{
            save () {
                if(!t.data.idnum) {
                    t.err.code = "请填写身份证号";
                    return;
                }
                if(!utils.identityCodeValid(t.data.idnum)) {
                    t.err.code = "格式不正确";
                    return;
                }
                t.err.code = "";
                utils.post("customer/update", t.data, res=>{
                    t.data.time = res[0].modifytime;
                    alert("保存成功！"); 
                });
            }  
        },
        ready(){
            utils.post("customer/getinfo", {id:t.$route.params.id}, res=>{
                t.data = res[0].customer;
            }) 
        }
     }
     
</script>