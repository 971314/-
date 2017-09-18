<template>
    <div id="app">
        <router-view></router-view>
        <nav class="topNav">
            <div>
                <div class="r" v-show="$route.path != '/'">{{user.n}}<i></i>
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
//             window.App = this;
             return {
                 user: require("../js/utils.js"),
             }
         },
         methods:{
             logout(){
                 utils.post(601, {}, ()=>{
                     this.$router.push("/");
                     utils.clear();
                 });
             }
         }
     }
</script>