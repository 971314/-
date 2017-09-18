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
        <div class="input code">
            <span>验证码</span>
            <input type="text" v-model="code" :id="rand3" tabindex="3" maxlength="4" />
            <img :src="img" @click="changeCode"/>
        </div>
        <div style="margin-left:163px;">
            <div class="fc-red">{{msg}}</div>
            <button class="btn1" @click="login()">登录</button>
        </div>
    </div>
</template>
<script>    
//    var test = {
//        "column":"/main/column",
//        "column_info":"/main/info",
//        "gggl": "/main/gggl",
//        "func": "/main/func",
//        "download": "/main/download"
//    };
//    
//    function test2(url){
//        var m = url.match(/([^\/]+)\.html/);
//        return m?test[m[1]]:url;
//    }
    
     function initMenus(src, des){
         var m, m2, m3;
         for(var i=0;i<src.length;i++){
             m = src[i];
             m2 = {
                 i: m.id,
                 n: m.description
             };
             m.url && (m2.u=m.url, m2.t=m.urlopentype-0);
             if(m.children && m.children.length>0) {
                 m2.s = [];
                 initMenus(m.children, m2.s);
             }
             des.push(m2);
         }
     }
    
     function initPerms(src, des, f){
         f = f||[];
         var m, codes;
         for(var i=0;i<src.length;i++){
             m = src[i], codes = (m.funclabel&&m.funclabel.split("|"))||[];
             if(m.children && m.children.length>0) {
                 des[m.id] = f.concat(codes);
                 initPerms(m.children, des, des[m.id]);
             }else {
                 for(var j=0;j<codes.length;j++)
                     f.push(codes[j]);
             }
         }
     }
    
     module.exports = {
         data(){
             var rand = Date.now();
             return {
                 username:"",
                 password:"",
                 code:"",
                 msg:"",
                 rand,
                 rand2:++rand,
                 rand3:++rand,
                 img: config.code + "?" + rand
             }
         },
         methods:{
             changeCode(){
                 this.img = config.code + "?" + Date.now();
             },
             login () {
               var t = this;
               if(!t.username || !t.password) {
                   t.msg = "请输入用户名或密码";
                   return;
               }
               if(!t.code) {
                   t.msg = "请输入验证码";
                   return;
               }
               var user = this.$root.user;
               utils.post(600, {
					    username: t.username,
					    password: t.password,
                        captcha: t.code
                   },
                   res=>{
                      user.n = res.name;
                      user.i = res.uid;
                      user.t = res.usertype;
                      user.m = [];
                      if(user.t != 1) {
                          initMenus(res.menu, user.m);
                          var perms = {};
                          initPerms(res.funclist, perms);
                          utils.setPerms(perms);
                      }
                      utils.cookie(user);
                      if(user.t == 1) {
                          t.$router.push("/main/users");
                          return;
                      }
                      for(var i=0;i<user.m.length;i++){
                          var m = user.m[i];
                          if(m.u) {
                               t.$router.push(m.t?"/main":m.u);
                               return;
                           }
                           if(m.s)
                               for(var j=0;j<m.s.length;j++) {
                                   if(m.s[j].u) {
                                       t.$router.push(m.s[j].t?"/main":m.s[j].u);
                                       return;
                                   }
                               }
                       }
                   }, 
                   null,
                   msg=>{
                       t.msg = msg;
               });
           }  
         }
     }
</script>