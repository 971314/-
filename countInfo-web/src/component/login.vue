<template>
    <div class="container logoDIv">
        <div class="form-signin">
            <h3 class="form-signin-heading">登录</h3>
            <div style="margin-top: 33px;">
                <label for="name" class="sr-only">请输入用户名</label>
                <input type="text" maxlength="11"  id="name" class="form-control" @focus="focusValue" v-model="name" placeholder="请输入用户名">
                <label for="password" class="sr-only">请输入密码</label>
                <input type="password" id="password" class="form-control"  @focus="focusValue" v-model="password" placeholder="请输入密码" >
                <div v-if="divMsg" class="errorMsgInfo">{{errorMsg}}</div>
                <button @click="btnSubmit" class="btn btn-lg btn-primary btn-block" type="submit" style="margin-top: 35px;">登录</button>
            </div>
        </div>
    </div> <!-- /container -->
</template>
<script>
    import { loginUrl } from '../util/config.js'
export default{
    data:function(){
       return{
           name:'',
           password:'',
           errorMsg:'',
           divMsg:false
       }
    },
    methods:{
        btnSubmit:function(){
            var _this = this;
            if(!this.name){
                this.divMsg = true;
                this.errorMsg = '请输入用户名'
                return;
            }
            if(!this.password){
                this.divMsg = true;
                this.errorMsg = '请输入密码';
                return;
            }
            //登录
            $.ajax({
                url:loginUrl,
                type: 'post',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    username:this.name,
                    password:this.password
                },
                success:function(data){
                        if(data.retrunFlag == 0){
                            var obj = {orgNumber: data.orgNumber}
                            sessionStorage.setItem("orgInfo",JSON.stringify(obj));
                            router.go({path:'/orgDetailManageList'});
                        }else{
                            _this.divMsg = true;
                            _this.errorMsg = data.info;
                        }
                },error:function(){
                    _this.divMsg = true;
                    _this.errorMsg = '服务器异常！'
                }
            })
        },
        focusValue:function(){
            this.divMsg = false;
        }
    }
}
</script>