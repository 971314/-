<template>
    <nav class="navBg navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand navFont">机构客户管理</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a class="navFont" v-link="{path: '/'}" >退出</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="twoTitle">
        <a v-link="{path: '/orgDetailManageList'}" ><span style="display: inline-block;">详情</span></a>&nbsp;&nbsp;|
        <a v-link="{path: '/orgManageList'}" ><span style="display: inline-block; padding-left: 6px;">统计</span></a>
    </div>
    <div class="panel panel-default orgDIv">
        <!--<span class="onlinePeople">在线人数：2人</span>-->
        <div class="orgSelect">
            <select class="form-control selectDate" @change="changeList()" id="selectValue">
                <option value="1" selected="true" >近一个月 </option>
                <option value="3">近三个月 </option>
                <option value="6">近六个月 </option>
            </select>
        </div>
        <div class="panel-body">
            <table class="table table-bordered orgTable" v-if="infoList.infos">
                <thead>
                <tr class="orgTableTr">
                    <th>用户ID</th>
                    <th>用户名</th>
                    <th>登录次数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="data in infoList.infos" class="activeTr" @click="detailInfo(data.userId)">
                    <td>{{data.userId}}</td>
                    <td>{{data.userName}}</td>
                    <td>{{data.count}}</td>
                </tr>
                </tbody>
            </table>
            <template v-if="infoList.infos && infoList.infos.length !=0">
                <div class="limitDiv">
                    <!--<div class="text-align">-->
                        <!--<ul class="pagination">-->
                            <!--<li v-if="cur!=1"><a v-on:click="cur&#45;&#45;">上一页</a></li>-->
                            <!--<li v-for="pageNum in indexOfs" v-bind:class="{ activeStyle: cur == pageNum}">-->
                                <!--<template v-if='pageNum == 0 '></template>-->
                                <!--<template v-if='pageNum !=0'>-->
                                    <!--<a v-on:click="btnClick(pageNum)">-->
                                        <!--{{ pageNum }}-->
                                    <!--</a>-->
                                <!--</template>-->
                            <!--</li>-->
                            <!--<li  v-if="cur!=count"><a  v-on:click="cur++">下一页</a></li>-->
                            <!--<li><a>共<i>{{count}}</i>页</a></li>-->
                        <!--</ul>-->
                    <!--</div>-->
                    <page-limit :cur.sync="cur" :count.sync="account" @btn-click="btnOrgListListen"></page-limit>
                </div>
            </template>
            <template  v-if="infoList.infos && infoList.infos.length ==0">
                <span class="noneCenterData">暂无交易记录！</span>
            </template>
        </div>
    </div>
</template>
<script>
    import { listUrl, pageNum, pageSize } from '../util/config.js'
    import pageLimit from '../component/pageLimit.vue';
    export default{
            components:{
                pageLimit:pageLimit
            },
        data:function(){
            return{
                cur: 1,//当前页码
                infoList:{},
                total:'',
                displayInfo:false,
//                count:''
            }
        },
//        route: {
//            canReuse:function(){
//                 false
//            }
//       },
        methods:{
            detailInfo:function(userId){
                router.go({path:'/detailOrgInfo?userId='+userId+'&flag='+2+''});
            },
            btnOrgListListen:function(pageNum){
                // 点击翻页
                var monthValue=$("#selectValue").val()
                var _this = this;
                var orgInfo =  sessionStorage.getItem("orgInfo");
                var orgData = JSON.parse(orgInfo)
                if(orgInfo != '') {
                    var orgNumber = orgData.orgNumber;
                    $.ajax({
                        url: listUrl,
                        type: 'GET',
                        xhrFields: {withCredentials: true},
                        crossDomain: true,
                        data: {
                            month: monthValue,
                            orgnumber: orgNumber,
                            pagenum: pageNum-1,
                            pagesize: pageSize,
                        },
                        success: function (data) {
                            if (data.returnFlag == 0) {
                                _this.$set("infoList",data)
//                                _this.infoList = data
                                _this.total = data.total
                            } else {
                                console.log(data.info)
                            }
                        }, error: function () {
                            console.log("服务器异常")
                        }
                    })
                }
            },
            changeList: function(){
                var monthValue=$("#selectValue").val()
                var _this = this;
                var orgInfo =  sessionStorage.getItem("orgInfo");
                var orgData = JSON.parse(orgInfo)
                if(orgInfo != ''){
                    var orgNumber = orgData.orgNumber;
                    $.ajax({
                        url:listUrl,
                        type: 'GET',
                        xhrFields:{withCredentials: true},
                        crossDomain:true,
                        data:{
                            month:monthValue,
                            orgnumber:orgNumber,
                            pagenum:pageNum,
                            pagesize:pageSize,
                        },
                        success:function(data){
                            if(data.returnFlag == 0){
                             //  _this.$set("infoList",data)
                                _this.infoList = data
                                _this.total = data.total
//                                _this.btnOrgListListen(pageNum)
                            }else{
                                console.log(data.info)
                            }
                        },error:function(){
                            console.log("服务器异常")
                        }
                    })
                }
            }
        },
        ready:function(){
            this.changeList();
        },
        computed: {
            account: function () {//总页数 = 总记录数 / 每页显示的条数
                var _this = this;
                if (_this.infoList.infos != null) {
                    return Math.ceil(_this.total / pageSize);
                }

            },
//            indexOfs: function () {
//                var left = 1;
//                var right = this.count;
//                var pageNum = [];//显示分页按钮
//                if (this.count >= 11) {
//                    if (this.cur > 5 && this.cur <= this.count - 4) {
//                        left = this.cur - 5;
//                        right = this.cur + 4
//                    } else {
//                        if (this.cur <= 5) {
//                            left = 1;
//                            right = 10
//                        } else {
//                            right = this.count;
//                            left = this.count - 9;
//                        }
//                    }
//                }
//                //显示第几页
//                while (left <= right) {
//                    pageNum.push(left)
//                    left++
//                }
//                console.log(pageNum)
//                return pageNum;
//            }
        },
//        //watch 针对表达式或者计算函数 cur数据当它改变的时候，可以获取前后值。然后通知其他组件。
//        watch:{//当点击上一页和下一页的时候触发
//            cur: function(oldValue , newValue){
//                this.$dispatch('btn-click',oldValue)
//            }
//        }
    }
</script>