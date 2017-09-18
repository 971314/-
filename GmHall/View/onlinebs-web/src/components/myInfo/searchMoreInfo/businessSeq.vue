<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">业务办理</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo">
        <div class="panel-body top17">
            <div class="currentDetail" @click="businessOne">
                <a href="#loadbus" data-toggle="tab" >
                    <span  v-bind:class="[loadBusStyle]" style="padding-left: 49px;" id="busImgOne">正在办理业务</span>
                </a>
            </div>
            <div class="fiveDetail" @click="businessTwo">
                <a href="#business" data-toggle="tab" style="margin-left:35px;">
                    <span v-bind:class="[busWaterTwoStyle]">业务流水</span>
                </a>
            </div>
            <div  class="tab-content" style="margin-top: 16px;">
                <div class="tab-pane fade   in active" id="loadbus">
                    <div style="float: right;">
                       <span class="tipSpan">一个月内待办业务</span>
                    </div>
                    <table class="table table-bordered table-div" v-if="listLoadListData.currentPageData">
                        <tr class="table-tr-bg tableTh">
                            <th>业务名称</th>
                            <th>申请日期</th>
                            <th>申请时间</th>
                            <th>状态</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr  v-for="transData in listLoadListData.currentPageData" >
                            <td>{{transData['70']}}</td>
                            <td>
                                <template v-if="transData['58'] !='' ">    {{dateFormat(transData['58'])}}</template>
                                <template v-if="transData['58'] =='' "> ---- </template>
                            </td>
                            <td>{{transData['60']}}</td>
                            <td>{{transData['71']}}</td>
                            <td>{{transData['1']}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="noneCenterData" v-else>
                        <span><img src="../../../image/loading.gif" class="loadingImg"/></span>
                        <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="listLoadListData.currentPageData && listLoadListData.currentPageData.length !=0">
                        <page-limit :cur.sync="cur" :count.sync="load"  @btn-click="btnLoadListenClick"></page-limit>
                    </template>
                    <template v-if="listLoadListData.currentPageData && listLoadListData.currentPageData.length ==0">
                        <span class="noneCenterData">暂无交易记录！</span>
                    </template>
                </div>
                <div class="tab-pane fade"   id="business">
                    <div style="float: right;">
                         <select class="form-control selectDate" @change="searchTransSeqChange()"   v-model="selectMouthValue">
                             <!--<option   selected="true" disabled="true">请选择日期</option>-->
                             <option value="1" selected="true" >近一个月 </option>
                             <option value="3">近三个月 </option>
                             <option value="6">近六个月 </option>
                         </select>
                    <!--<span class="busTitle"> 业务办理时间：</span>-->
                    <!--<span style="margin-left: 10px;"><input id="startDate" readonly="readonly"  class="searchInput" type="text"></span>-->
                    <!--<span style="margin-left:6px">至</span>-->
                    <!--<span><input  style="margin-left: 8px;" id="endDate" class="searchInput form-text"  type="text"></span>-->
                    <!--<button type="button" class=" btn-style  searchBtn" data-toggle="button" @click="searchTransSeq" id="btnDis">查询</button>-->
                    </div>
                    <table class="table table-bordered table-div" style="margin-top: 14px;" v-if="listSeqList.data" >
                        <tr class="table-tr-bg tableTh">
                            <th>业务名称</th>
                            <th>申请日期</th>
                            <th>结束日期</th>
                            <th>状态</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr  v-for="seqData in listSeqList.data">
                            <td>{{seqData['70']}}</td>
                            <td>
                                <template v-if="seqData['58'] !='' "> {{dateFormat(seqData['58'])}} </template>
                                <template v-if="seqData['58'] =='' "> ---- </template>
                            </td>
                            <td>
                                <template v-if="seqData['59'] !='' ">{{dateFormat(seqData['59'])}} </template>
                                <template v-if="seqData['59'] =='' "> ---- </template>
                            </td>
                            <td>{{seqData['71']}}</td>
                            <td>{{seqData['1']}}</td>
                        </tr>
                        </tbody>
                    </table>


                    <div class="noneCenterData" v-else>
                        <span><img src="../../../image/loading.gif" class="loadingImg"/></span>
                        <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="listSeqList.data && listSeqList.data.length !=0">
                        <page-limit :cur.sync="seq" :count.sync="account"  @btn-click="btnSeqListen"></page-limit>
                    </template>
                    <template v-if="listSeqList.data && listSeqList.data.length ==0">
                        <span class="noneCenterData">暂无交易记录,请调整搜索！</span>
                    </template>

                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default allDivWidth">
        <div class="panel-body panel-bgcolor">
            业务须知：
            <div>
                提交变更申请后，我们客服人员会对新号码进行电话回访，回访后新手机号正式生效。
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../../vuex/store';
    import {getLoadTrans,getTransSeq,getNumSizeTransSeq,getNumSizeLoadTrans} from '../../../vuex/getters';
    import {transSeq,loadTransSeq} from '../../../vuex/action';
    import {YMD,yymmdd} from '../../../util/dateFormat.js';
    import  {onlineGlobal,loadSearchCode,tranSeq,loadTrans,customerType} from '../../../util/config';
    import moment from 'moment';
    import {initDatePicker,getDateTime} from '../../../util/datePicker';
    import pageLimit from '../../../components/publicMethod/pageLimit.vue';
    import {flagLogin} from '../../../util/errorMsg.js';
    import {getCookie,setCookie}from '../../../util/cookie.js';
    export default{
        store: store,
        vuex: {
            getters: {
                loadTransList: getLoadTrans,
            },
            actions: {
                loadTransSeq: loadTransSeq
            }
        },
        components:{
            pageLimit:pageLimit
        },
        ready: function () {
            //获取日历插件
            initDatePicker();
            flagLogin()//判断登录状态
//            let userScape=getCookie("userAccount");
//            if(userScape != ""){
//                let userInfo=JSON.parse(unescape(userScape));
//                var  account =  userInfo.account;
//                var  token =  userInfo.token;
//                //正在办理的业务流水
//                let loadTranObj = JSON.stringify({func:loadSearchCode,type:customerType,account:account,token:token,data:[{58:"",59:"",71:loadTrans}]})
//                this.loadTransSeq(loadTranObj);
//            }
            //初始化加载分页内容
            var pageNum = 1;
            this.btnLoadListenClick(pageNum);
          //  this.searchTransSeq();
            this.searchTransSeqChange();//业务流水的查询
        },
        data: function () {
            return {
                loadBusStyle:'loadBusStyle',
                busWaterTwoStyle:'busWaterTwoStyle',
                pageSize:10,//每页显示10条
                cur: 1,//当前页码
                seq: 1,//当前页码
                orFlag:'',
                listLoadListData:{},//存放正在办理的数据
                listTransSeqObj:{},//存放业务流水的记录
                listSeqList:{},
                selectMouthValue:'',
                startDateSeq:'',
                endDateSeq:''
            }
        },
        methods: {
            dateFormat: function (date) {
                return moment(date).format(YMD);
            },
            //点击所选的改变其颜色
            businessOne: function(){
                this.busWaterTwoStyle = 'busWaterTwoStyle'
                this.loadBusStyle ='loadBusStyle'
            },
            businessTwo: function(){
                this.busWaterTwoStyle= 'loadBusRightStyle'
                this.loadBusStyle ='busLoadOneStyle'
            },
            searchTransSeqChange:function(){
                //近一个月的时间
                var _this = this;
                var currentTime=new Date();
                _this.startDateSeq = moment(getDateTime(currentTime.getTime()-(30*3600*1000*24)),'YYYYMMDD').format(yymmdd);//默认查询近一个月的值
                if(_this.selectMouthValue == 1){
                    _this.startDateSeq =moment(getDateTime(currentTime.getTime()-(30*3600*1000*24)),'YYYYMMDD').format(yymmdd)//近一个月的开始时间
                  }else if(_this.selectMouthValue == 3){
                    _this.startDateSeq =moment(getDateTime(currentTime.getTime()-(90*3600*1000*24)),'YYYYMMDD').format(yymmdd)//近三个月的开始时间
                }else if(_this.selectMouthValue == 6){
                    _this.startDateSeq =moment(getDateTime(currentTime.getTime()-(180*3600*1000*24)),'YYYYMMDD').format(yymmdd)//近6个月的开始时间
                }
             //   console.log(_this.startDateSeq)
                _this.endDateSeq = moment(currentTime.toLocaleDateString(),'YYYYMMDD').format(yymmdd) //结束日期就取当前的日期即可
//                console.log(moment(_this.startDateSeq,'YYYYMMDD').format(yymmdd))
//                console.log(moment(currentTime.toLocaleDateString(),'YYYYMMDD').format(yymmdd))
                let userScape = getCookie("userAccount");
                if (userScape != "") {
                    let userInfo = JSON.parse(unescape(userScape));
                    var account = userInfo.account;
                    var token = userInfo.token;
                    var  objSeq=JSON.stringify({func:loadSearchCode,type:customerType,account:account,token:token,data:[{58: _this.startDateSeq,59:_this.endDateSeq,71:tranSeq}]});
                    $.ajax({
                        url:onlineGlobal,
                        type:'post',
                        data:objSeq,
                        contentType:'application/json',
                        success:function(data){
//                            alert(data.retHead)
                            if(data.retHead == 1){
                                _this.listTransSeqObj = data
                                var pageNum=1
                               _this.btnSeqListen(pageNum);
                            }else if(data.retHead == '-1001'){
                                router.go({path:'/'});
                            }
                        },error:function(data){
                        }
                    })
                }
            },
//            //根据时间条件查询
//            searchTransSeq: function(){
//                 var _this= this;
//                 var startDate = $("#startDate").val();
//                 var endDate = $("#endDate").val();
//                let userScape = getCookie("userAccount");
//                if (userScape != "") {
//                    let userInfo = JSON.parse(unescape(userScape));
//                    var account = userInfo.account;
//                    var token = userInfo.token;
//                    var  objSeq=JSON.stringify({func:loadSearchCode,type:customerType,account:account,token:token,data:[{58:startDate.replace(/\-/g,""),59:endDate.replace(/\-/g,""),71:tranSeq}]});
//                    $.ajax({
//                        url:onlineGlobal,
//                        type:'post',
//                        data:objSeq,
//                        contentType:'application/json',
//                        success:function(data){
//                            if(data.retHead == 1){
//                                _this.listTransSeqObj = data
//                                _this.btnSeqListen();
//                            }else if(data.retHead == '-1001'){
//                                 router.go({path:'/'});
//                            }
//                        },error:function(data){
//                        }
//                    })
//                }
//            },
            //正在办理
            btnLoadListenClick: function(pageNum){//页码点击事件
                var _this=this;
                // 点击翻页
                if(pageNum != this.cur){
                    this.cur = pageNum
                }
                this.listLoadListData = {};//清空初始化的数据
                var currentPageData = [];
                for(var i = (pageNum -1 ) * _this.pageSize  ; i< _this.pageSize * pageNum; i++){
                    if(_this.loadTransList.data != null){
                        if(_this.loadTransList.data[i]){
                            currentPageData.push(_this.loadTransList.data[i])
                        }
                    }
                }
                this.listLoadListData.currentPageData = currentPageData;
            },
            btnSeqListen: function(pageNum) {//页码点击事件
         //       alert("==========1111111=====================")
                var _this = this;
//                 var pageNum = 1;
                // 点击翻页
                if (pageNum != this.seq) {
                    this.seq = pageNum
                }
//                console.log("传过来的"+pageNum)
//                console.log(this.seq)
                _this.listSeqList = {};//清空初始化的数据
                var data = [];
                console.log(_this.listTransSeqObj.data)
                for (var i = (pageNum - 1 ) * _this.pageSize; i < _this.pageSize * pageNum; i++) {
                    if (_this.listTransSeqObj.data != null) {
                        if (_this.listTransSeqObj.data[i]) {
                            data.push(_this.listTransSeqObj.data[i])
                        }
                    }
                }
                _this.listSeqList.data = data;
                console.log(_this.listSeqList)
            }
        },
        computed: {
            //计算返回的总记录数  业务流水
            account: function () {//总页数 = 总记录数 / 每页显示的条数
                var _this=this;
                if(_this.listTransSeqObj.data != null){
                    return Math.ceil(_this.listTransSeqObj.data.length/_this.pageSize);
                }
            },
            load:function(){//总页数 = 总记录数 / 每页显示的条数
                var _this=this;
                if(_this.loadTransList.data != null){
                    return Math.ceil(_this.loadTransList.data.length/_this.pageSize);
                }
            }
        }
    }
</script>