<template>
   <div class="main">
       <router-view></router-view>
       <div class="menus">
    <el-menu :default-openeds="opened" theme="dark" ref="menu" router>
      <el-submenu v-for="m in menus" :index="m.url" >
          <template slot="title">{{m.description}}</template>
          <el-menu-item v-for="mm in m.children" :index="mm.url">{{mm.description}}</el-menu-item>
<!--
          <el-menu-item index="/msg/0">审核中</el-menu-item>
          <el-menu-item index="/msg/2">审核未通过</el-menu-item>
          <el-menu-item index="/msg/1">定时发送中</el-menu-item>
          <el-menu-item index="/msg/4">已发送</el-menu-item>
          <el-menu-item index="/msg/5">发送失败</el-menu-item>
          <el-menu-item index="/group">分组管理</el-menu-item>
-->
      </el-submenu>
    </el-menu>
    </div>
    </div>
</template>
<script>
    var t;
    module.exports = {
        el:"#app",
        data(){
            t = this;
            return {
                opened: [0,1,2],
                menus:[]
            }
        },
        watch:{
            $route(to){
                 t.$refs.menu.activedIndex = to.path;
            }
        },
        mounted(){
            var token = location.search.match(/token=([^&]*)/);
            var uid = location.search.match(/uid=([^&]*)/);
            if(!token||!uid) {
                t.$error("用户未登录");
                return;
            }
            t.uid = uid[1];
            t.$post(2000, {token:token[1]}, res=>{
                res = res.children;
                if(res.length==0)
                    return;
                var m;
                for(var i=0;i<res.length;i++) {
                   res[i].url = i;
                   if(!m && res[i].children.length>0)
                       m = res[i].children[0].url;
                }
                t.menus = res;
                m && t.$router.push(t.$refs.menu.activedIndex=m);
            });
        }
    }
</script>