<template>
    <div id="main" class="clearfix">
        <nav class="leftNav left">
            <template v-if="$root.user.type==0">
           <a href="#/main/users" :class="{bg2:$route.path.indexOf('/user')!=-1}">用户管理</a>
           <a href="#/main/orgs" :class="{bg2:$route.path.indexOf('/org')!=-1}">机构管理</a>
           <a href="#/main/types" :class="{bg2:$route.path.indexOf('/type')!=-1}">短信类型管理</a>
           <a href="#/main/channels" :class="{bg2:$route.path.indexOf('/channel')!=-1}">短信渠道管理</a>
           <a href="#/main/templates" :class="{bg2:$route.path.indexOf('/template')!=-1}">短信模板管理</a>
            </template>
            <template v-else>
           <a href="#/main/sms" :class="{bg2:$route.path.indexOf('/sms')!=-1}">短信查询</a>
           <a href="#/main/statistic" :class="{bg2:$route.path.indexOf('/statistic')!=-1}">短信统计</a>
           </template>
        </nav>
        <div class="left mr">
            <router-view></router-view>    
        </div>
    </div>
</template>
<script>
     module.exports = {
         
     }
</script>