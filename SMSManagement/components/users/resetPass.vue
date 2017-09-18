<template>
    <div class="resetPassView">
        <div class="title"><span>重置密码</span></div>
        <div class="edit">
            <div>
                <label>用户名</label>
                <span>{{data.name}}</span>
            </div>
            <div>
                <label>密码</label>
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
             this.func = {edit:507};
             return {
                 data:{
                     name: this.$route.params.id
                 }
             }
         },
         methods:{
             submit(){
                 var result = this.check(), chk = this.$refs.chks[1];
                 if(chk.err == "" && this.data.newPwd != this.data.newPwd2){
                     chk.err = "密码不一致";
                     result = false;
                 }
                 if(result) {
                     this.save();
                 }
             }
         }
     }
</script>