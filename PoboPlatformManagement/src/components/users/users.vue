<template>
    <div class="usersView">
       <div class="title">用户管理</div>
        <div class="main rel">
            <table class="list" style="width:910px">
            <tr>
                <th style="width:90px">序号</th>
                <th style="width:140px">用户名</th>
                <th>角色</th>
                <th style="width:120px">状态</th>
                <th style="width:260px">操作</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.id}}</td>
                <td>{{d.name}}</td>
                <td>{{d.role}}</td>
                <td :class="{'fc-red':d.status==2}">{{d.status==1?"正常":"停用"}}</td>
                <td>
                    <a class="btn1" :href="'#/main/user/'+d.id">修改</a>
                    <a class="btn1" @click="resetPass(d)">重置密码</a>
                    <a class="btn1" @click="del(d)">删除</a>
                </td>
            </tr>
            </table>
            <a class="btn1 btn2 abs" href="#/main/user/0">增加</a>
        </div>
        <div class="mask" :class="{show:show}">
            <div class="popup">
                <div class="tit">重置密码提示</div>
                <div style="margin:38px 0 45px 50px;">
                    用户 {{name}} 的密码<br>
                    已经被重置为：123456
                </div>
                <div class="center"><a class="btn1" @click="show=false">确认</a></div>
            </div>
        </div>
    </div>
</template>
<script>
     module.exports = {
         mixins:[utils.listView],
         data(){
             this.func = 603;  
             this.delFunc = 607;
             return {
                 data:{
                     pagecount:"10000",
                     currentindex:"1",
                     name:""
                 },
                 name:"",
                 show:false
             }
         },
         methods:{
             resetPass(d){
                 if(confirm("确定重置用户 "+d.name+" 的密码吗？")) {
                     utils.post(608,{userid:d.id,newpassword:"123456"},()=>{
                         this.name = d.name;
                         this.show = true;
                     })
                 }
             }
         }
     }
</script>