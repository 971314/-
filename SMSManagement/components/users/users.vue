<template>
    <div class="usersView">
        <div class="search">
            <a class="btn1" href="#/main/user">新增用户</a>
        </div>
        <table class="list">
            <tr>
                <th>用户名</th>
                <th>用户类型</th>
                <th>所属机构</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.loginname}}</td>
                <td :class="{'fc-red':d.userType==0, 'fc-blue':d.userType==2}">{{d.userType==0?"超级用户":(d.userType==1?"查询用户":"发送用户")}}</td>
                <td>{{d.userType==2&&d.orgID==0&&"所有"||d.orgName}}</td>
                <td :class="{'fc-green':d.valid, 'fc-red':!d.valid}">{{d.valid?"有效":"禁用"}}</td>
                <td>
                    <a class="btn1" :href="'#/main/user/'+d.loginname" v-show="d.loginname != $root.user.username">重置密码</a>
                    <a class="btn1" @click="changeStatus(d)" v-show="d.loginname != $root.user.username">{{d.valid?'禁用':'启用'}}</a>
                    <a class="btn1" @click="del(d)" v-show="d.loginname != $root.user.username">删除</a>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
     module.exports = {
         mixins:[utils.listView2],
         created(){
             this.func = 505;  
             this.delFunc = 508;
         },
         methods:{
             changeStatus(d){
                 if(d.valid && !confirm("确定要禁用该用户吗？"))
                     return;
                 utils.post(504, {name:d.loginname, valid:!d.valid}, res=>{
                     d.valid = !d.valid;
                 });                     
             }
         }
     }
</script>