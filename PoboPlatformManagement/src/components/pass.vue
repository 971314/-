<template>
    <div>
        <div class="title">修改密码</div>
        <div class="main">
            <div class="edit">
            <div>
                <label>原密码</label>
                <CustomInput name="password" type="password"></CustomInput>
            </div>
            <div>
                <label>新密码</label>
                <CustomInput name="newpassword" type="password"></CustomInput>
            </div>
            <div>
                <label>确认密码</label>
                <CustomInput name="newpassword2" type="password"></CustomInput>
            </div>
            <div class="btns">
                <a class="btn1" @click="submit()">保 存</a>
                <a class="btn1" onclick="history.go(-1)">取 消</a>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
     module.exports = {
         mixins: [utils.editView],
         data(){
             this.func = {edit:602};
             return {
                 data:{
                 }
             }
         },
         methods:{
             submit(){
                 var result = this.check(), chk = this.$refs.chks[2];
                 if(!chk.err && this.data.newpassword != this.data.newpassword2){
                     chk.err = "密码不一致";
                     result = false;
                 }
                 result && this.save();
             }
         }
     }
</script>