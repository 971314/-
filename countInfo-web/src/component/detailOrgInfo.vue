<template>
    <nav class="navBg navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                 <a class="navbar-brand navFont" v-link="{path: '/orgManageList'}">机构客户管理</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                <li><a class="navFont">|</a></li>
                <li><a class="navFont" style="font-size: 15px;">详情</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                <li><a class="navFont" v-link="{path: '/'}" >退出</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="panel panel-default orgDIv">
        <a v-show="orgListShow" v-link="{path: '/orgManageList'}"><span class="onlinePeople">返回>></span> </a>
        <a v-show="orgDetailShow" v-link="{path: '/orgDetailManageList'}"><span class="onlinePeople">返回>></span> </a>
        <div class="orgSelect">
            <!--<select class="form-control selectDate" @change="changeList()" id="selectValue">-->
                <!--<option value="1" selected="true" >近一个月 </option>-->
                <!--<option value="3">近三个月 </option>-->
                <!--<option value="6">近六个月 </option>-->
            <!--</select>-->
        </div>
        <div class="panel-body">
            <table class="table table-bordered orgTable" v-if="detailList.infos">
                <thead>
                <tr class="orgTableTr">
                    <th>用户名</th>
                    <th>登录时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="data in detailList.infos" class="activeTr">
                    <td>{{data.userName}}</td>
                    <td>{{data.loginDate}}</td>
                </tr>
                </tbody>
            </table>
            <template v-if="detailList.infos && detailList.infos.length !=0">
                <div class="limitDiv">
                    <page-limit :cur.sync="cur" :count.sync="account" @btn-click="btnOrgSeqListen"></page-limit>
                </div>
            </template>
            <template  v-if="detailList.infos && detailList.infos.length ==0">
                <span class="noneCenterData">暂无交易记录！</span>
            </template>
        </div>
    </div>
</template>
<script>
    import { detailUrl, pageNum, pageSize } from '../util/config.js'
    import pageLimit from '../component/pageLimit.vue';
    export default{
        components:{
            pageLimit:pageLimit
        },
        data:function(){
            return{
                cur: 1,//当前页码
                detailList:{},
                total:'',
                orgListShow:false,
                orgDetailShow:false
            }
        },
        methods:{
//            back:function(){
//                router.go(window.history.back())
//            },
            //点击翻页
            btnOrgSeqListen:function(pageNum){
                // 点击翻页
                if(pageNum != this.cur){
                    this.cur = pageNum
                }
                var _this = this;
                var userId = this.$route.query.userId;//获取地址栏的userId
//                console.log(this.$route.query.userId)
                var orgInfo =  sessionStorage.getItem("orgInfo");
                var orgData = JSON.parse(orgInfo)
                if(orgInfo != '') {
                    var orgNumber = orgData.orgNumber;
                    $.ajax({
                        url:detailUrl,
                        type: 'GET',
                        xhrFields:{withCredentials: true},
                        crossDomain:true,
                        data:{
                            userid: userId,
                            pagenum:pageNum-1,
                            pagesize:pageSize,
                            orgnumber:orgNumber
                        },
                        success:function(data){
                            if(data.returnFlag == 0){
                                _this.detailList = data
                                _this.total = data.total
//                            console.log(_this.detailList)
                            }else{
                                console.log(data.info)
                            }
                        },error:function(){
                            console.log("服务器异常")
                        }
                    })
                }
            },
        },
        ready:function(){
            var _this = this;
            var userId = this.$route.query.userId;//获取地址栏的userId
            if(this.$route.query.flag == 1){
                _this.orgDetailShow = true;
            }
            if(this.$route.query.flag == 2){
                _this.orgListShow = true;
            }
//            console.log(this.$route.query.userId)
            var orgInfo =  sessionStorage.getItem("orgInfo");
            var orgData = JSON.parse(orgInfo)
            if(orgInfo != '') {
                var orgNumber = orgData.orgNumber;
                $.ajax({
                    url:detailUrl,
                    type: 'GET',
                    xhrFields:{withCredentials: true},
                    crossDomain:true,
                    data:{
                        userid: userId,
                        pagenum:pageNum,
                        pagesize:pageSize,
                        orgnumber:orgNumber
                    },
                    success:function(data){
                        if(data.returnFlag == 0){
                            _this.detailList = data
                            _this.total = data.total
                        }else{
                            console.log(data.info)
                        }
                    },error:function(){
                        console.log("服务器异常")
                    }
                })
            }
        },
        computed: {
            account: function () {//总页数 = 总记录数 / 每页显示的条数
                var _this=this;
                if(_this.detailList.infos != null){
                    return Math.ceil(_this.total/pageSize);
                }
            },
        }
    }
</script>
