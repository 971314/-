<template>
    <div class="loginView passView">
        <div class="tit">修改密码</div>
        <div class="input">
            <span>原密码</span>
            <input type="password" v-model="oldPass"/>
        </div>
        <div class="input">
            <span>新密码</span>
            <input type="password" v-model="newPass"/>
        </div>
        <div class="input">
            <span>确认新密码</span>
            <input type="password" v-model="newPass2"/>
        </div>
        <div style="margin-left:124px;">
            <div class="fc-red">{{msg}}</div>
            <button class="btn-blue" v-on:click="change()">确认</button>
        </div>
    </div>
</template>
<script>
     module.exports = {
         data(){
             app.current = 10;
             app.title = "修改密码";
             return {
                 oldPass:"",
                 newPass:"",
                 newPass2:"",
                 msg:""
             }
         },
         methods: {
             change () {
                 var t = this;
                 if(!t.oldPass) {
                     t.msg = "请输入原密码";
                     return;
                 }
                 if(!t.newPass) {
                     t.msg = "请输入新密码";
                     return;
                 }
                 if(!t.newPass2) {
                     t.msg = "请输入确认新密码";
                     return;
                 }
                 if(t.newPass != t.newPass2) {
                     t.msg = "新密码不一致";
                     return;
                 }
                 utils.post("admin/changepwd", {
                     newpassword: t.newPass,
					 password: t.oldPass
                 }, ()=>{
                     alert("密码修改成功！请重新登录！");
                     utils.cookie({uid:"", group:""});
                     app.currentUser = null;
                     t.$router.go("/");
                 }, msg=>{
                     t.msg = msg;
                 })
             }
         }
     }
</script>