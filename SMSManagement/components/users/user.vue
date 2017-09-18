<template>
    <div class="userView">
        <div class="title"><span>新增用户</span></div>
        <div class="edit">
            <div>
                <label>用户名</label>
                <CustomInput name="name"></CustomInput>
            </div>
            <div>
                <label>密码</label>
                <CustomInput name="pwd" type="password"></CustomInput>
            </div>
            <div>
                <label>确认密码</label>
                <CustomInput name="pwd2" type="password"></CustomInput>
            </div>
            <div>
                <label>用户类型</label>
                <select v-model="data.userType">
                    <option value="1">查询用户</option>
                    <option value="2">发送用户</option>
                </select>
            </div>
            <div v-show="data.userType==2">
                <label>所属机构</label>
                <CustomSelect name="orgID" type="org" all="1"></CustomSelect>
            </div>
            <div class="btns">
                <button class="btn1" @click="submit()">保 存</button>
                <a class="btn1 btn2" onclick="history.go(-1)">取 消</a>
            </div>
        </div>
    </div>
</template>
<script>
     module.exports = {
         mixins: [utils.editView],
         data(){
             this.func = {add:503};
             this.$route.params.id = 0;
             return {
                 data:{
                     userType:1,
                     orgID:0
                 }
             }
         },
         methods:{
             submit(){
                 var result = this.check(), chk = this.$refs.chks[2];
                 if(chk.err == "" && this.data.pwd != this.data.pwd2){
                     chk.err = "密码不一致";
                     result = false;
                 }
                 var data = this.data;
                 if(data.userType == 1)
                     data.orgID = 0;
                 if(result) {
                     data.userType -= 0;
                     data.orgID -= 0;
                     this.save();
                 }
             }
         }
     }
</script>