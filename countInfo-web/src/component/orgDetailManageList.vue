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
        <span class="onlinePeople"><input id="startDate" readonly="readonly"  class="searchInput" type="text">
            <span style="margin-left:6px">至</span>
            <input  style="margin-left: 8px;" id="endDate" class="searchInput form-text"  type="text">
            <button type="button" class=" btn-style  searchBtn" data-toggle="button" @click="searchTransSeq" id="btnDis">查询</button>
        </span>
        <!--<span class="excelCss" onclick="exportExcel('tableExcel')">导出Excel</span>-->
        <span class="excelCss" ><a @click="exportExcel"   href="javascript:;">导出</a></span>
        <div class="orgSelect">
            <select class="form-control selectDate" @change="changeOrgDetail()" id="selectDateValue">
                <option value="1" selected="true" >今天 </option>
                <option value="2">昨天 </option>
                <option value="3">本周 </option>
            </select>
        </div>
        <div class="panel-body">
            <table class="table table-bordered orgTable" v-if="orgDetailInfoList.infos" id="tableExcel">
                <thead>
                <tr class="orgTableTr">
                    <th>用户ID</th>
                    <th>用户名</th>
                    <th>登录时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="data in orgDetailInfoList.infos" class="activeTr" @click="detailInfo(data.userId)">
                    <td>{{data.userId}}</td>
                    <td>{{data.userName}}</td>
                    <td>{{data.loginDate}}</td>
                </tr>
                </tbody>
            </table>
            <template v-if="orgDetailInfoList.infos && orgDetailInfoList.infos.length !=0">
                <div class="limitDiv">
                    <page-limit :cur.sync="cur" :count.sync="account" @btn-click="btnSeqListen"></page-limit>
                </div>
            </template>
            <template  v-if="orgDetailInfoList.infos && orgDetailInfoList.infos.length ==0">
                <span class="noneCenterData">暂无交易记录！</span>
            </template>
        </div>
    </div>
</template>
<script>
    import { detailListUrl, pageNum, pageSize } from '../util/config.js'
    import pageLimit from '../component/pageLimit.vue';
    import { initDatePicker,GetDateStr,YMD } from '../util/datePicker.js';
    import { exportCsv } from '../util/exportExcle.js';
    import moment from 'moment';
    export default{
            components:{
                pageLimit:pageLimit
            },
        data:function(){
            return{
                cur: 1,//当前页码
                orgDetailInfoList:{},
                total:'',
                displayInfo:false,
                todayList:{}
            }
        },
        ready:function(){
            initDatePicker();
            this.changeOrgDetail();
//            console.log($("#startDate").val())
//            console.log($("#endDate").val())
        },
        methods:{
            detailInfo:function(userId){
                router.go({path:'/detailOrgInfo?userId='+userId+'&flag='+1+''});
            },
            //日历控件的查询按钮
            searchTransSeq:function(){
                //临时存放为了区分状态、、后期要优化
                var obj = {flag:true}
                sessionStorage.setItem("selectDate",JSON.stringify(obj))
                var startDate =$("#startDate").val();
                var endDate = $("#endDate").val();
                this.fetchList(startDate,endDate);
            },
            btnSeqListen:function(pageNum){
                var selectDateValue=$("#selectDateValue").val();
                var currentTime = new Date();
                var startDate;
                var endDate;
                var endDateValue =moment(currentTime.toLocaleDateString(),'YYYY-MM-DD').format(YMD);
                // console.log(currentTime.toLocaleDateString().replace(/\//g,"-"));//获取当前日期
                var selectStartDate = $("#startDate").val();
                var selectEndDate =  $("#endDate").val();
                var data =sessionStorage.getItem("selectDate")
                if(data !=  null){
                    var dataValue=JSON.parse(data);
                    if(dataValue.flag == true){
                         startDate = selectStartDate
                         endDate = selectEndDate
                    }
                    if(dataValue.flag == true && dataValue.selectFlag == false){
                        //今天，昨天，本周
                        if(selectDateValue == 1){
                            //今天
                            startDate = endDateValue;
                            endDate =='';
                        }
                        if(selectDateValue == 2){
                            //昨天
                            startDate = GetDateStr(-1)
                            endDate  = GetDateStr(-1)
//                    console.log(startDate)
                        }
                        if(selectDateValue == 3){
                            //本周
                            var now=new Date();
                            var start=new Date();
                            var end=new Date();
                            var n=now.getDay();
                            start.setDate(now.getDate()-n+1);
                            end.setDate(now.getDate()-n+7);
                            startDate = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
                            endDate = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();
                        }
                    }
                }else{
                    //今天，昨天，本周
                    if(selectDateValue == 1){
                        //今天
                        startDate = endDateValue;
                        endDate =='';
                    }
                    if(selectDateValue == 2){
                        //昨天
                        startDate = GetDateStr(-1)
                        endDate  = GetDateStr(-1)
//                    console.log(startDate)
                    }
                    if(selectDateValue == 3){
                        //本周
                        var now=new Date();
                        var start=new Date();
                        var end=new Date();
                        var n=now.getDay();
                        start.setDate(now.getDate()-n+1);
                        end.setDate(now.getDate()-n+7);
                        startDate = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
                        endDate = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();
                    }
                }
                // 点击翻页
                var _this = this;
                var orgInfo =  sessionStorage.getItem("orgInfo");
                var orgData = JSON.parse(orgInfo)
                if(orgInfo != '') {
                    var orgNumber = orgData.orgNumber;
                    $.ajax({
                        url: detailListUrl,
                        type: 'GET',
                        xhrFields: {withCredentials: true},
                        crossDomain: true,
                        data: {
                            from:startDate,
                            to:endDate,
                            orgnumber:orgNumber,
                            pagesize:pageSize,
                            pagenum: pageNum-1,
                        },
                        success: function (data) {
                            if (data.returnFlag == 0) {
                                _this.orgDetailInfoList = data
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
            changeOrgDetail: function(){
                var selectDateValue=$("#selectDateValue").val();
                var currentTime = new Date();
                var startDate;
                var endDate =moment(currentTime.toLocaleDateString(),'YYYY-MM-DD').format(YMD);
                //今天，昨天，本周
                if(selectDateValue == 1){
                    //今天
                    startDate = endDate;
                    endDate = '';
                }
                if(selectDateValue == 2){
                    //昨天
                    startDate = GetDateStr(-1)
                    endDate  = GetDateStr(-1)
//                    console.log(startDate)
                }
                if(selectDateValue == 3){
                    //本周
                    var now=new Date();
                    var start=new Date();
                    var end=new Date();
                    var n=now.getDay();
                    start.setDate(now.getDate()-n+1);
                    end.setDate(now.getDate()-n+7);
                    startDate = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
                    endDate = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();
                }
                var _this = this;
                _this.fetchList(startDate,endDate);
                //临时这样写  多存个状态判断
                var stepResult = sessionStorage.getItem("selectDate");
                if(stepResult != null){
                    var dataInfo = JSON.parse(stepResult);
                    var obj = {selectFlag:false}
                    //遍历对象并将第一步和第二步的信息合并为一个对象
                    for (let tem in obj) {
                        dataInfo[tem] = obj[tem];
                    }
                    sessionStorage.setItem("selectDate",  JSON.stringify(dataInfo));
                }
            },
            //查询日期
            fetchList:function(startDate,endDate){
                var _this = this;
                var orgInfo =  sessionStorage.getItem("orgInfo");
                var orgData = JSON.parse(orgInfo)
                if(orgInfo != ''){
                    var orgNumber = orgData.orgNumber;
                    $.ajax({
                        url:detailListUrl,
                        type: 'GET',
                        xhrFields:{withCredentials: true},
                        crossDomain:true,
                        data:{
//                            userid:'',
                            from:startDate,
                            to:endDate,
                            orgnumber:orgNumber,
                            pagesize:pageSize,
                            pagenum: pageNum,
                        },
                        success:function(data){
                            if(data.returnFlag == 0){
                                _this.orgDetailInfoList = data
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
          //将表格导出为cvs
            exportExcel:function(){
                var _this =this;
                var selectDateValue=$("#selectDateValue").val();
                var currentTime = new Date();
                var startDate;
                var endDate =moment(currentTime.toLocaleDateString(),'YYYY-MM-DD').format(YMD);
                // console.log(currentTime.toLocaleDateString().replace(/\//g,"-"));//获取当前日期
                //今天，昨天，本周
                if(selectDateValue == 1){
                    //今天
                    startDate = endDate;
                    endDate = '';
                }
                if(selectDateValue == 2){
                    //昨天
                    startDate = GetDateStr(-1)
                    endDate  = GetDateStr(-1)
//                    console.log(startDate)
                }
                if(selectDateValue == 3){
                    //本周
                    var now=new Date();
                    var start=new Date();
                    var end=new Date();
                    var n=now.getDay();
                    start.setDate(now.getDate()-n+1);
                    end.setDate(now.getDate()-n+7);
                    startDate = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
                    endDate = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();
                }
                var orgInfo =  sessionStorage.getItem("orgInfo");
                var orgData = JSON.parse(orgInfo)
                if(orgInfo != ''){
                    var orgNumber = orgData.orgNumber;
                    $.ajax({
                        url:detailListUrl,
                        type: 'GET',
                        xhrFields:{withCredentials: true},
                        crossDomain:true,
                        data:{
                            from:startDate,
                            to:endDate,
                            orgnumber:orgNumber,
//                            pagesize:0,
                            pagenum: 0,
                        },
                        success:function(data){
                            if(data.returnFlag == 0){
                                _this.todayList = data
//                                console.log(_this.todayList.infos)
                            }else{
                                console.log(data.info)
                            }
                        },error:function(){
                            console.log("服务器异常")
                        }
                    })
                }
                if(_this.todayList.infos != null){
                    exportCsv({
                        title:["userId","userName","loginDate"],
                        titleForKey:["userId","userName","loginDate"],
                        data:_this.todayList.infos
                    });
                }
            }
        },
        computed: {
            account: function () {//总页数 = 总记录数 / 每页显示的条数
                var _this=this;
                if(_this.orgDetailInfoList.infos != null){
                    return Math.ceil(_this.total/pageSize);
                }
            },
        }
    }
</script>