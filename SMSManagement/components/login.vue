<template>
    <div class="loginView">
        <div class="tit">登录</div>
        <div class="input">
            <span>用户名</span>
        </div>
        <div class="input rel">
            <span>密&nbsp;&nbsp;&nbsp;码</span>
            <input type="password" v-model="password" :id="rand2" tabindex="2"/>
            <input type="hidden" :id="rand3" />
            <input type="text" v-model="username" :id="rand" style="position:absolute;left:63px;top:-77px;" tabindex="1"/>
        </div>
        <div style="margin-left:163px;">
            <div class="fc-red">{{msg}}</div>
            <button class="btn1" @click="login()">登录</button>
        </div>
    </div>
</template>
<script>
     module.exports = {
         data(){
             var rand = Date.now();
             return {
                 username:"",
                 password:"",
                 msg:"",
                 rand,
                 rand2:++rand,
                 rand3:++rand
             }
         },
         methods:{
             login () {
               var t = this;
               if(!t.username || !t.password) {
                   t.msg = "请输入用户名或密码";
                   return;
               }
               utils.post(501, {
					    loginname: t.username,
					    pwd: t.password
                   },
                   res=>{
                      user.username = res.loginname;
                      user.type = res.userType;
                      utils.cookie(user);
                      t.$router.push(res.userType==0?"/main/users":"/main/sms");
                   }, 
                   msg=>{
                       t.msg = msg;
               });
//               
           }  
         }
     }
</script>