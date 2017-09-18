<template>
    <div id="app">
        <nav id="topNav">
            <div class="rel">
      <span class="fs-20">{{current!=10?"资管管理后台":title}}</span>
      <a class="a" href="#!/appoints" :class="{active:current==1}" v-show="current>0&&current<10&&currentUser&&currentUser.group<3">预约信息</a>
      <a class="a" href="#!/products" :class="{active:current==2}" v-show="current>0&&current<10&&currentUser&&(currentUser.group==1||currentUser.group==3)">产品信息</a>
      <a class="a" href="#!/customers" :class="{active:current==3}" v-show="current>0&&current<10&&currentUser&&currentUser.group<3">客户信息</a>
      <a class="a" href="#!/intrests" :class="{active:current==4}" v-show="disabled.indexOf(4)==-1&& current>0&&current<10&&currentUser&&(currentUser.group==1||currentUser.group==4)">信息收集</a>
      <a class="pass" v-show="current>0&&current<10" href="#!/pass">修改密码</a>
      <i class="icon" v-show="current>0&&current<10" @click="logout()"></i>
      <i class="icon close" v-show="current==10" @click="goback()"></i>
    </div>
        </nav>
        <div class="mainContainer">
            <router-view></router-view>
        </div>
        <div class="mask" :class="{show:showMask}"></div>
    </div>
</template>
<script>
     module.exports = {
         data(){
             var uid = utils.cookie("uid");
             window.app = this;
             return {
                 current:0,
                 title:"",
                 currentUser: uid ? {uid:uid, group:utils.cookie("group")} : null,
                 showMask:false,
                 disabled:config.disabled
             }
         },
         methods: {
             logout () {
                 utils.post("admin/logout", {}, function(res){
                     utils.clear();
                     location.hash = "#!/";
                 });    
             },
             goback () {
                if(location.hash.indexOf("/product/")!=-1){
                    location.hash = this.prev||"#!/products";
                    return;
                }
                history.go(-1);
             }
         }
     }
</script>