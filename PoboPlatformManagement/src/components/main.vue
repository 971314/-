<template>
    <div id="main">
        <nav class="leftNav">
            <div v-if="$root.user.t==1">
                <a @click="permOpen=!permOpen"><i class="icon" :class="{collapse:!permOpen}"></i>权限管理</a>
                <div class="subs" v-show="permOpen">
                    <a href="#/main/users" :class="{bg2:!$route.path.indexOf('/main/user')}">用户管理</a>
                </div>
            </div> 
            <template v-else>
               <div v-for="(m, i) in menus">
               <a :class="{bg2:!$route.path.indexOf(m.u)}" @click="open(m)"><i class="icon" :class="{collapse:!m.open}" v-if="m.open!=undefined"></i>{{m.n}}</a>
               <div class="subs" v-if="m.open!=undefined" v-show="m.open">
                   <a v-for="(mm, j) in m.s" :class="{bg2:!$route.path.indexOf(mm.u)}" @click="open(mm)">{{mm.n}}</a>
               </div>
               </div>
            </template>
        </nav>
        <div class="mr">
            <router-view></router-view>    
        </div>
        <a ref="a" target="_blank"></a>
    </div>
</template>
<script>
     module.exports = {
         data(){
             var user = this.$root.user;
             var menus = user.m;
             for(var i=0;i<menus.length;i++){
                 menus[i].s && menus[i].s.length>0 && this.$set(menus[i], "open", true);
             }
             return {
                 menus,
                 permOpen:true
             }  
         },
         methods:{
             open(m){ 
                 m.open!=undefined && (m.open=!m.open);
                 if(!m.u)
                     return;
                 if(m.t){
                     this.$refs.a.href = m.u;
                     this.$refs.a.click();
                 }else if(this.$route.path != m.u)
                     this.$router.push(m.u);
             }
         }
     }
</script>