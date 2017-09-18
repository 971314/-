<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">业务办理</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo">
        <div class="panel-body top17">
            <div style="margin-left: 215px">
                <div>
                    <a href="#currentBill" data-toggle="tab"  @click="currentBillClick">
                        <span  v-bind:class="[currentBillStyle]">当日资金</span>
                    </a>
                </div>
                <div style="margin-left: 135px;">
                    <div class="currentOne">
                        <a href="#currentPosit" data-toggle="tab" @click="currentPositClick">
                            <span  v-bind:class="[currentPositStyle]">当日持仓</span>
                        </a>
                    </div>
                    <div class="currentTwo">
                        <a href= "#currentTrust" data-toggle="tab"  @click="currentTrustClick">
                            <span  v-bind:class="[currentTrustStyle]">当日委托</span>
                        </a>
                    </div>
                    <div class="currentThree">
                        <a href="#currentTrans" data-toggle="tab" @click="currentTransClick">
                            <span  v-bind:class="[noneStyle]">当日成交</span>
                        </a>
                    </div>
                </div>

            </div>
            <div  class="tab-content" style="margin-top: 26px;">
                <div class="tab-pane fade in active" id="currentBill">
                    <table class="table table-bordered table-div" v-if="currentBillList.data">
                        <tr class="table-tr-bg tableTh">
                            <th>当前权益</th>
                            <th>浮动盈亏</th>
                            <th>可用保证金</th>
                            <th>占用保证金</th>
                            <th>可取资金</th>
                            <th>风险度</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="billData in currentBillList.data">
                            <td>{{billData['97']}}</td>
                            <td>{{billData['101']}}</td>
                            <td>{{billData['111']}}</td>
                            <td>{{billData['152']}}</td>
                            <td>{{billData['95']}} </td>
                            <td>{{billData['345']}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="noneCenterData" v-else>
                        <span><img src="../../../image/loading.gif" class="loadingImg"/></span>
                        <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="currentBillList.data && currentBillList.data.length ==0">
                        <span class="noneCenterData">暂无交易记录！</span>
                    </template>
                </div>
                <div class="tab-pane fade" id="currentPosit">
                    <table class="table table-bordered table-div" v-if="positList.currentPageData">
                        <tr class="table-tr-bg tableTh">
                            <th>合约</th>
                            <th>可用数量</th>
                            <th>持仓数量</th>
                            <th>成本价</th>
                            <th>浮动盈亏</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="positData in positList.currentPageData">
                            <td>
                                <template v-if="positData['64'] == '' ">{{ positData['63'] }}</template>
                                <template v-if="positData['64'] != '' "> {{positData['64'] }}</template>
                            </td>
                            <td>{{ avaiableAmount(positData['135'],positData['145']) }}</td>
                            <td>{{positData['135']}} </td>
                            <td>{{positData['139']}}</td>
                            <td>{{positData['141']}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="noneCenterData" v-else>
                        <span><img src="../../../image/loading.gif" class="loadingImg"/></span>
                        <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="positList.currentPageData && positList.currentPageData.length !=0">
                        <page-limit :cur.sync="curone" :count.sync="posit" @btn-click="btnPositListen"></page-limit>
                    </template>
                    <template v-if="positList.currentPageData && positList.currentPageData.length ==0">
                        <span class="noneCenterData">暂无交易记录！</span>
                    </template>
                </div>
                <div class="tab-pane fade" id="currentTrust">
                    <table class="table table-bordered table-div" v-if="trustList.currentPageData">
                        <tr class="table-tr-bg tableTh">
                            <th>委托时间</th>
                            <th>合约</th>
                            <th>委托价格</th>
                            <th>成交手/委托手</th>
                            <th>开平方向</th>
                            <th>状态</th>
                        </tr>
                        </thead>
                        <!--成交数量=0，则状态为“可撤”   113 – 成交数量-->
                        <!--成交数量<委托数量，则状态为“部分可撤”  130 – 委托数量-->
                        <!--成交数量=委托数量，则状态为“已成交-->
                        <tbody>
                        <tr v-for="trustData in trustList.currentPageData">
                            <td>{{trustData['159']}}</td>
                            <td>
                                <template v-if="trustData['64'] == '' ">{{ trustData['63'] }}</template>
                                <template v-if="trustData['64'] != '' "> {{trustData['64']}} </template>
                            </td>
                            <td>{{trustData['129']}}</td>
                            <td>{{trustData['113']}}/{{trustData['130']}}</td>
                            <td>{{trustData['118']}}</td>
                            <!--<td>-->
                                <!--<template v-if="trustData['127'] == 0">限价</template>-->
                                <!--<template v-if="trustData['127'] == 1">市价</template>-->
                            <!--</td>-->
                            <td>
                                <template v-if="trustData['113'] == 0">可撤销</template>
                                <template v-if="trustData['113'] < trustData['130']">部分撤销</template>
                                <template v-if="trustData['113'] == trustData['130']">已成交</template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="noneCenterData" v-else>
                        <span><img src="../../../image/loading.gif" class="loadingImg"/></span>
                        <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="trustList.currentPageData && trustList.currentPageData.length !=0">
                        <page-limit :cur.sync="curtwo" :count.sync="trust" @btn-click="btnTrustListen"></page-limit>
                    </template>
                    <template v-if="trustList.currentPageData && trustList.currentPageData.length ==0">
                        <span class="noneCenterData">暂无交易记录！</span>
                    </template>
                </div>
                <div class="tab-pane fade" id="currentTrans">
                    <table class="table table-bordered table-div" v-if="transList.currentPageData">
                        <tr class="table-tr-bg tableTh">
                            <th>成交时间</th>
                            <th>合约</th>
                            <th>成交均价</th>
                            <th>成交数量</th>
                            <th>开平方向</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="transData in transList.currentPageData">
                            <td>{{transData['116']}}</td>
                            <td>
                                <template v-if="transData['64'] == '' ">{{ transData['63']}} </template>
                                <template v-if="transData['64'] != '' "> {{transData['64'] }}</template>
                            </td>
                            <td>{{transData['114']}}</td>
                            <td>{{transData['113']}}</td>
                            <td>{{transData['118']}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="noneCenterData" v-else>
                        <span><img src="../../../image/loading.gif" class="loadingImg"/></span>
                        <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="transList.currentPageData && transList.currentPageData.length !=0">
                        <page-limit :cur.sync="curthree" :count.sync="trans" @btn-click="btnTransListen"></page-limit>
                    </template>
                    <template v-if="transList.currentPageData && transList.currentPageData.length ==0">
                        <span class="noneCenterData">暂无交易记录！</span>
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
    import {getCurrentBill,
            getCurrentPosit,getCurrentTrans,getCurrentTrust,} from '../../../vuex/getters';
    import {currentBillInfo,
            currentPositInfo,currentTrustInfo,currentTransInfo} from '../../../vuex/action';
    import {YMD} from '../../../util/dateFormat.js';
    import  {onlineGlobal,loadSearchCode,tranSeq,loadTrans,customerType} from '../../../util/config';
    import moment from 'moment';
    import {initDatePicker} from '../../../util/datePicker';
    import pageLimit from '../../../components/publicMethod/pageLimit.vue';
    import {flagLogin} from '../../../util/errorMsg.js';
    import {getCookie,setCookie}from '../../../util/cookie.js';
    export default{
        store: store,
        vuex: {
            getters: {
                //获取当日资金的列表信息
                currentBillList:getCurrentBill,
                //获取当日持仓的列表信息
                currentPositList:getCurrentPosit,
                //获取当日委托的列表信息
                currentTrustList:getCurrentTrust,
                //获取当日成交的列表信息
                currentTransList:getCurrentTrans,
            },
            actions: {
                currentBillInfo:currentBillInfo,
                currentPositInfo:currentPositInfo,
                currentTrustInfo:currentTrustInfo,
                currentTransInfo:currentTransInfo
            }
        },
        components:{
            pageLimit:pageLimit
        },
        ready: function () {
            flagLogin();//判断登录状态
    //     console.log("持仓总记录数"+this.currentPositList.data.length)
//           console.log(this.$route.query['0']);
            //获取日历插件
            let userScape = getCookie("userAccount");
            if (userScape != "") {
                let userInfo = JSON.parse(unescape(userScape));
                var account = userInfo.account
            }
            //初始化获取当日资金列表的信息
            this.currentBillInfo();
            //获取当日持仓的列表信息
            this.currentPositInfo();
            //获取当日委托的列表信息
            this.currentTrustInfo();
            //获取当日成交的列表信息
            this.currentTransInfo();
            var pageNum = 1;
            this.btnPositListen(pageNum);
            this.btnTrustListen(pageNum);
            this.btnTransListen(pageNum);
//            if(this.$route.query['0'] == 1){
//                this.noneStyle = 'currentBlueRightStyle'//当日成交
//            }
        },
        data: function () {
            return {
                currentBillStyle: 'currentBillStyle',
                busLoadOneStyle: 'busLoadOneStyle',
                busWaterOneStyle: 'busWaterOneStyle',
                currentPositStyle:　'currentPositStyle',
                noneStyle: 'noneStyle',
                currentTrustStyle: 'currentTrustStyle',
                currentTransStyle: 'currentTransStyle',
                curone: 1,//当前页码
                curtwo: 1,//当前页码
                curthree: 1,//当前页码
                positList:{},
                transList:{},
                trustList:{},
                posit:'',
                pageSize:10,
            }
        },
        computed:{
            //计算返回的总记录数
            //当日持仓
            posit:function(){//总页数 = 总记录数 / 每页显示的条数
                var _this=this;
                if(_this.currentPositList.data != null){
                    return Math.ceil(_this.currentPositList.data.length/_this.pageSize);
                }
            },
            //当日委托
            trust:function(){
                var _this=this;
                if(_this.currentTrustList.data != null){
                    return Math.ceil(_this.currentTrustList.data.length/_this.pageSize);
                }
            },
            //当日交易
            trans:function(){
                var _this=this;
                if(_this.currentTransList.data != null){
                    return Math.ceil(_this.currentTransList.data.length/_this.pageSize);
                }
            }
        },
        methods: {
            dateFormat: function (date) {
                return moment(date).format(YMD);
            },
            //计算当日持仓中的  可用数量
            //计算规则
            //可用数量= 当前数量 - 冻结数量  :(135 - 145 )
            // 如果没找到 145，则 135 - 0
            avaiableAmount : function(currentAmount,freezeAmount){
                // alert("当日资金:"+currentAmount +":"+ "冻结资金"+freezeAmount);
                if(freezeAmount == undefined){
                    return currentAmount - 0;
                }else{
                    return currentAmount - freezeAmount;
                }
            },
            //点击所选的改变其颜色
            currentBillClick: function(){
                this.currentBillStyle= 'currentBillStyle'//当日资金
                this.currentPositStyle = 'currentNoneStyle'//当日持仓
                this.currentTrustStyle = 'currentNoneStyle'//当日委托
                this.noneStyle = 'currentNoneLeftStyle'//当日成交
            },
            currentPositClick: function(){
                this.currentBillStyle= 'currentArrowLeftStyle'//当日资金
                this.currentPositStyle = 'currentBlueStyle'//当日持仓
                this.currentTrustStyle = 'currentNoneStyle'//当日委托
                this.noneStyle = 'currentNoneLeftStyle'//当日成交
            },
            currentTrustClick: function(){
                this.currentBillStyle= 'currentArrowLeftStyle'//当日资金
                this.currentPositStyle = 'currentNoneStyle'//当日持仓
                this.currentTrustStyle = 'currentBlueStyle'//当日委托
                this.noneStyle = 'currentNoneLeftStyle'//当日成交

            },
            currentTransClick: function () {
                this.currentBillStyle= 'currentArrowLeftStyle'//当日资金
                this.currentPositStyle = 'currentNoneStyle'//当日持仓
                this.currentTrustStyle = 'currentNoneStyle'//当日委托
                this.noneStyle = 'currentBlueRightStyle'//当日成交
            },
            //当日持仓
            btnPositListen: function(pageNum){//页码点击事件
                var _this=this;
                // 点击翻页
                if(pageNum != this.curone){
                    this.curone = pageNum
                }
                this.positList = {};//清空初始化的数据
                var currentPageData = [];
                for(var i = (pageNum -1 ) * _this.pageSize  ; i< _this.pageSize * pageNum; i++){
                    if(_this.currentPositList.data != null){
                        if(_this.currentPositList.data[i]){
                            currentPageData.push(_this.currentPositList.data[i])
                        }
                    }
                }
                this.positList.currentPageData = currentPageData;
            },
            //当日委托
            btnTrustListen: function(pageNum){//页码点击事件
                var _this=this;
                // 点击翻页
                if(pageNum != this.curtwo){
                    this.curtwo = pageNum
                }
                this.trustList = {};//清空初始化的数据
                var currentPageData = [];
                for(var i = (pageNum -1 ) * _this.pageSize  ; i< _this.pageSize * pageNum; i++){
                    if(_this.currentTrustList.data != null){
                        if(_this.currentTrustList.data[i]){
                            currentPageData.push(_this.currentTrustList.data[i])
                        }
                    }
                }
                this.trustList.currentPageData = currentPageData;
            },
            //当日成交
            btnTransListen: function(pageNum){//页码点击事件
                var _this=this;
                // 点击翻页
                if(pageNum != this.curthree){
                    this.curthree = pageNum
                }
                this.transList = {};//清空初始化的数据
                var currentPageData = [];
                for(var i = (pageNum -1 ) * _this.pageSize  ; i< _this.pageSize * pageNum; i++){
                    if(_this.currentTransList.data != null){
                        if(_this.currentTransList.data[i]){
                            currentPageData.push(_this.currentTransList.data[i])
                        }
                    }
                }
                this.transList.currentPageData = currentPageData;
            }
        }
    }
</script>