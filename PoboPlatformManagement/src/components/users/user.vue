<template>
    <div class="userView">
        <div class="title">{{$route.params.id==0?"增加":"修改"}}用户</div>
        <div class="edit">
            <div>
                <label>账户名称</label>
                <CustomInput name="name" v-if="$route.params.id==0"></CustomInput>
                <span v-else>{{data.name}}</span>
            </div>
            <template v-if="$route.params.id==0">
            <div>
                <label>账户密码</label>
                <CustomInput name="password" type="password"></CustomInput>
            </div>
            <div>
                <label>确认密码</label>
                <CustomInput name="password2" type="password"></CustomInput>
            </div>
            </template>
            <div>
                <label>选择角色</label>
                <textarea disabled :value="roles" style="height:34px;"></textarea>
                <a class="btn1" @click="showRole">选择</a>
            </div>
            <div>
                <label>用户状态</label>
                <select v-model="data.status">
                    <option value="1">正常</option>
                    <option value="2">停用</option>
                </select>
            </div>
            <div class="btns">
                <a class="btn1" @click="submit()">保 存</a>
                <a class="btn1" onclick="history.go(-1)">取 消</a>
            </div>
        </div>
        <Role ref="role" @load="get" @select="select" :checks="data.roleid"></Role>
    </div>
</template>
<script>
     module.exports = {
         mixins: [utils.editView],
         data(){
             this.func = {get:605, add:604, edit:604};
             this.defer = 1;
             return {
                 data:{
                     id:"",
                     roleid:[],
                     status:"1",
                     name:""
                 },
                 roles:""
             }
         },
         methods:{
             submit(){
                 var result = this.check(), chk;
                 if(this.$route.params.id == 0) {
                     chk = this.$refs.chks[2];
                     if(!chk.err && this.data.password != this.data.password2){
                         chk.err = "密码不一致";
                         result = false;
                     }
                 }
                 result && this.save();
             },
             showRole(){
                 this.$refs.role.show = true;
             },
             loaded(data){
                 data.password = "";
                 !data.roleid && (data.roleid=[]);
                 data.role && (this.roles = data.role.join(","));
                 this.data = data;
             },
             select(d){
                 var checks = [], roles = [];
                 for(var i=0;i<d.length;i++){
                     checks.push(d[i].roleid);
                     roles.push(d[i].role);
                 }
                 this.data.roleid = checks;
                 this.roles = roles.join(",");
             }
         },
         components:{
             Role: require("./role.vue")
         }
     }
</script>