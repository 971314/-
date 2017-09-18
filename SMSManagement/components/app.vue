<template>
    <div id="app">
        <router-view></router-view>
        <nav class="topNav">
           <div class="rel">
               博易短信后台管理系统
                <div class="r" v-show="$route.path != '/'">{{user.username}}<i></i>
                    <div>
                        <a href="#/main/pass">修改密码</a>
                        <a @click="logout()">退出</a>
                    </div>
                </div>
            </div>
        </nav>
        <footer>上海澎博提供技术 Copyright 2017</footer>
    </div>
</template>
<script>
     export default {
         el:"#app",
         data(){
             window.App = this;
             return {
                 user
             }
         },
         methods:{
             logout(){
                 utils.post(506, {}, res=>{
                     this.$router.push("/");
                     utils.clear();
                 });
             }
         }
     }
</script>