<template>
    <div>
        <div class="title"><span>修改密码</span></div>
        <div class="edit">
            <div>
                <label>原密码</label>
                <CustomInput name="pwd" type="password"></CustomInput>
            </div>
            <div>
                <label>新密码</label>
                <CustomInput name="newPwd" type="password"></CustomInput>
            </div>
            <div>
                <label>确认密码</label>
                <CustomInput name="newPwd2" type="password"></CustomInput>
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
             this.func = {add:502};
             return {
                 data:{
                 }
             }
         },
         methods:{
             submit(){
                 var result = this.check(), chk = this.$refs.chks[2];
                 if(chk.err == "" && this.data.newPwd != this.data.newPwd2){
                     chk.err = "密码不一致";
                     result = false;
                 }
                 if(result)
                     this.save();
             }
         }
     }
</script>