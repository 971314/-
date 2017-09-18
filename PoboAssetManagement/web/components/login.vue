<template>
    <div class="loginView">
        <div class="tit">登录</div>
        <div class="input">
            <span>账号</span>
        </div>
        <div class="input rel">
            <span>密码</span>
            <input type="password" v-model="password" :id="rand2" tabindex="2"/>
            <input type="text" v-model="username" :id="rand" style="position:absolute;left:85px;top:-54px;" tabindex="1"/>
        </div>
        <div class="input code">
            <span>验证码</span>
            <input type="text" v-model="code" maxlength="4" :id="rand3" tabindex="3"/>
            <img :src="img" v-on:click="change()" />
        </div>
        <div style="margin-left:80px;">
            <div class="fc-red">{{msg}}</div>
            <button class="btn-blue" v-on:click="login()">登录</button>
        </div>
    </div>
</template>
<script>
     module.exports = {
         data(){
             this.$root.current = 0;
             var rand = Date.now();
             return {
                 img: config.api + "captcha/gen?" + rand,
                 username:"",
                 password:"",
                 code:"",
                 msg:"",
                 rand,
                 rand2:++rand,
                 rand3:++rand
             }
         },
         methods:{
             change () {
                 this.img = config.api + "captcha/gen?" + Date.now();
             },
             login () {
               var t = this;
               if(!t.username) {
                   t.msg = "请输入账号！";
                   return;
               }
               if(!t.password) {
                   t.msg = "请输入密码！";
                   return;
               }
               if(!t.code) {
                   t.msg = "请输入验证码！";
                   return;
               }
               if(!utils.codeReg.test(t.code)) {
                   t.msg = "验证码不正确！";
                   return;
               }
               utils.post("admin/login", {
					    username: t.username,
					    password: t.password,
					    captcha: t.code
                   },
                   res=>{
                       res = res[0];
                       utils.cookie(t.$root.currentUser = res);
                       t.$router.go(res.group==3?"/products":(res.group==4?"/intrests":"/appoints"));
                   }, 
                   msg=>{
                       t.msg = msg;
               });

           }  
         }
     }
</script>