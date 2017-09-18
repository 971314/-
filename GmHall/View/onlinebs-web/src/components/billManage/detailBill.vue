<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">资金明细</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo">
        <div class="panel-body top17">
            <div class="currentDetail" @click="businessOne">
                <a href="#loadbus" data-toggle="tab" >
                    <span  v-bind:class="[loadBusStyle]" style="padding-left: 49px;" id="busImgOne">当日明细</span>
                </a>
            </div>
            <div class="fiveDetail" @click="businessTwo">
                <a href="#business" data-toggle="tab" style="margin-left:35px;">
                    <span v-bind:class="[busWaterTwoStyle]">五日明细</span>
                </a>
            </div>
            <div  class="tab-content" style="margin-top: 27px;">
                <div class="tab-pane fade  in active" id="loadbus">
                    <table class="table table-bordered table-div" v-if="currentBillListLimit && currentBillListLimit.dataValue">
                        <tr class="table-tr-bg tableTh">
                            <th>发生交易日</th>
                            <th>发生时间</th>
                            <th>类别</th>
                            <th>金额</th>
                            <th>银行名称</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="list in currentBillListLimit.dataValue">
                            <td>{{list['227']}}</td>
                            <td>{{list['228']}}</td>
                            <td>{{list['207']}}</td>
                            <td>
                                <template v-if="list['210'] == '处理失败' ">处理失败</template>
                                <template v-if="list['210'] == '处理中' ">处理中</template>
                                <template v-if="list['210'] == '处理成功' || list['210'] =='1' ">{{list['220']}}</template>
                            </td>
                            <td>{{list['216']}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="noneCenterData" v-else>
                        <span><img src="../../image/loading.gif" class="loadingImg"/></span>
                        <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="currentBillListLimit.dataValue && currentBillListLimit.dataValue.length !=0">
                        <page-limit :cur.sync="cur" :count.sync="current" @btn-click="currentList"></page-limit>
                    </template>
                    <template v-if="currentBillListLimit.dataValue && currentBillListLimit.dataValue.length ==0">
                        <span class="noneCenterData">暂无交易记录!</span>
                    </template>
                </div>
                <div class="tab-pane fade "   id="business">
                    <table class="table table-bordered table-div" style="margin-top: 14px;" v-if="fiveDetailListLimit && fiveDetailListLimit.dataValue">
                        <tr class="table-tr-bg tableTh">
                            <th>发生日期</th>
                            <th>发生时间</th>
                            <th>收入金额</th>
                            <th>付出金额</th>
                            <th>银行名称</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="list in fiveDetailListLimit.dataValue">
                            <td>{{dateFormat(list['50'])}}</td>
                            <td>{{list['51']}}</td>
                            <td>{{list['90']}}</td>
                            <td>{{list['91']}}</td>
                            <td>{{list['92']}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="noneCenterData" v-else>
                        <span><img src="../../image/loading.gif" class="loadingImg"/></span>
                        <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="fiveDetailListLimit.dataValue && fiveDetailListLimit.dataValue.length !=0">
                        <page-limit :cur.sync="curtwo" :count.sync="load" @btn-click="fiveDayList"></page-limit>
                    </template>
                    <template v-if="fiveDetailListLimit.dataValue && fiveDetailListLimit.dataValue.length ==0">
                        <span class="noneCenterData">暂无交易记录!</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../vuex/store';
    import {getDetailInfo,getFiveDayInfo} from '../../vuex/getters';
    import {detailInfo,fiveBillInfo} from '../../vuex/action';
    import {YMD} from '../../util/dateFormat.js';
    import {flagLogin} from '../../util/errorMsg.js'
    import moment from 'moment';
    import pageLimit from '../publicMethod/pageLimit.vue';
    import {getCookie,setCookie} from '../../util/cookie.js';
    import {bankTransSeq,tranSeq,detailBill,customerType,currentBill,fiveDayBill,onlineGlobal} from '../../util/config.js';
    import {getErrorMsg} from '../../util/errorMsg.js'
    export default{
        store:store,
        vuex: {
            getters: {
//                currentBillList:getDetailInfo,
//                fiveDetailList:getFiveDayInfo
            },
            actions: {
                detailInfo:detailInfo,
                fiveBillInfo:fiveBillInfo
            }
        },
        components:{
            pageLimit:pageLimit
        },
        ready:function(){
            var _this = this;
            flagLogin();//判断登录状态
            //初始化加载分页内容
            var pageNum = 1;
//            this.currentList(pageNum);
//            this.fiveDayList(pageNum);
            var userScape=getCookie("userAccount");
            if(userScape != ""){
                let userInfo=JSON.parse(unescape(userScape));
                var  account =  userInfo.account;
                var token =userInfo.token;
                $.ajax({
                    url:onlineGlobal,
                    type:'post',
                    contentType:'application/json',
                    data:JSON.stringify({func:bankTransSeq,type:tranSeq,account:account,token:token,data:[{49:currentBill}]}),
                    success:function(data){
                        if(getErrorMsg(data) == 1){
                            var pageNum = 1;
                            _this.currentBillList = data
                            _this.currentList(pageNum,data);
                        }
                    },error:function(data){

                    }
                })
                $.ajax({
                    url:onlineGlobal,
                    type:'post',
                    contentType:'application/json',
                    data:JSON.stringify({func:detailBill,type:customerType,account:account,token:token,data:[{49:fiveDayBill}]}),
                    success:function(data){
                        if(getErrorMsg(data) == 1){
                            var pageNum = 1;
                            _this.fiveDetailList = data
                            _this.fiveDayList(pageNum,data)
                        }
                    },error:function(data){
                    }
                })
            }

//            this.detailInfo()
//            this.fiveBillInfo()
//            this.currentBillListLimit = {};//清空初始化的数据
//            this.fiveDetailListLimit = {};//清空初始化的数据
        },
        data:function(){
            return {
                loadBusStyle:'loadBusStyle',
                busWaterTwoStyle:'busWaterTwoStyle',
                currentBillListLimit:{},
                fiveDetailListLimit:{},
                pageSize:10,//每页显示10条
                cur: 1,//当前页码
                curtwo: 1,//当前页码
                currentBillList:{},
                fiveDetailList:{}
            }
        },
        methods:{
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
            //当日明细的分页
            currentList:function(pageNum,data){
               // this.detailInfo()
                this.currentBillListLimit = {};//清空初始化的数据
                var _this=this;
                // 点击翻页
                if(pageNum != this.cur){
                    this.cur = pageNum
                }
                var dataValue = [];
                for(var i = (pageNum -1 ) * _this.pageSize  ; i< _this.pageSize * pageNum; i++){
                    if(_this.currentBillList.data != null){
                        if(_this.currentBillList.data[i]){
                            dataValue.push(_this.currentBillList.data[i])
                        }
                    }
                }
                this.currentBillListLimit.dataValue = dataValue;
            },
            //五日明细的分页
            fiveDayList:function(){
               // this.fiveBillInfo()
               this.fiveDetailListLimit = {};//清空初始化的数据
                var _this =this;
               var  pageNum = 1;
                // 点击翻页
                if(pageNum != this.curtwo){
                    this.curtwo = pageNum
                }
                var dataValue = [];
                for(var i = (pageNum -1 ) * _this.pageSize  ; i< _this.pageSize * pageNum; i++){
                    if(_this.fiveDetailList.data != null){
                        if(_this.fiveDetailList.data[i]){
                            dataValue.push(_this.fiveDetailList.data[i])
                        }
                    }
                }
            this.fiveDetailListLimit.dataValue = dataValue;
            }
        },
        computed:  {
               //计算返回的总记录数
            current: function () {//总页数 = 总记录数 / 每页显示的条数
                   var _this=this;
//                   alert(_this.currentBillList.data)
                   if(_this.currentBillList.data != null){
                       return Math.ceil(_this.currentBillList.data.length/_this.pageSize);
                   }
               },
               load:function(){//总页数 = 总记录数 / 每页显示的条数
                   var _this=this;
                   if(_this.fiveDetailList.data != null){
                       return Math.ceil(_this.fiveDetailList.data.length/_this.pageSize);
                   }
               }
         }
    }
</script>