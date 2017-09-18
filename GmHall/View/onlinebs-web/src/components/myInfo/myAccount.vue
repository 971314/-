<template>
     <div 　class="indexDivImg" style="margin-top: 4px;margin-left: 0px;">
          <div  class="indexLogo">
              <div  id="myCarousel" class="carousel slide bg ss"  >
                  <!-- 轮播（Carousel）指标 -->
                  <ol class="carousel-indicators" style="bottom: -5px;">
                      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                      <li data-target="#myCarousel" data-slide-to="2"></li>
                      <li data-target="#myCarousel" data-slide-to="3"></li>
                  </ol>
                  <!-- 轮播（Carousel）项目 -->
                  <div class="carousel-inner">
                      <div class="item active">
                          <img src="../../image/index/banner.jpg">
                      </div>
                      <div class="item">
                          <img src="../../image/index/banner1.jpg">
                      </div>
                      <div class="item">
                          <img src="../../image/index/banner2.jpg">
                      </div>
                      <div class="item">
                          <img src="../../image/index/banner3.jpg">
                      </div>
                  </div>
              </div>

          </div>
     </div>
     <div  class="infoSpanImg">
           <div class="panel panel-default four-span" style="margin-left: -80px;">
                 <div class="panel-body connect" style="margin-left: 12px;">
                            <a href="http://itf.com.cn/index.php?m=content&c=index&a=lists&catid=146" target="_blank"><div class="oneImg"><img src="../../image/index/comeOnline.png" class="filed-img msOne"><p class="margin5">走进国贸</p></div></a>
                            <a href="http://itf.com.cn/wskh/index.html" target="_blank"><div class="indexDivOne"><img src="../../image/index/message.png" class="filed-img msOne"><p class="margin5">网上开户</p></div></a>
                            <a href="http://itf.com.cn/index.php?m=content&c=index&a=lists&catid=295" target="_blank"><div class="oneImg"><img src="../../image/index/soft-dw.png" class="filed-img msTwo"><p class="margin5">软件下载</p></div></a>
                            <a href="http://www.itf.com.cn/index.php?m=content&c=index&a=lists&catid=202" target="_blank"><div class="indexDivFour"><img src="../../image/index/trans.png" class="filed-img msTwo"><p class="margin5">交易服务</p></div></a>
                  </div>
           </div>
     </div>
    <div class="panel panel-default allDivWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">业务办理</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth">
        <div class="panel-body" >
            <div class="row">
                <div class="currentDetail"   @click="businessOne">
                    <a href="#loadbus" data-toggle="tab" >
                        <span  v-bind:class="[loadBusStyle]"  id="busImgOne">正在办理业务</span>
                    </a>
                </div>
                <div class="fiveDetail"  @click="businessTwo">
                    <a href="#business" data-toggle="tab" style="margin-left:35px;">
                        <span v-bind:class="[busWaterTwoStyle]">业务流水</span>
                    </a>
                </div>
            </div>
            <div  class="tab-content" style="margin-top: 16px;">
                <div class="tab-pane fade in active" id="loadbus">
                    <table class="table table-bordered table-div" v-if="loadTransData.transSeqArray">
                        <tr class="table-tr-bg tableTh">
                            <th>业务名称</th>
                            <th>申请日期</th>
                            <th>申请时间</th>
                            <th>状态</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr  v-for="transData in loadTransData.transSeqArray" >
                            <td>{{transData['70']}}</td>
                            <td>
                                <template v-if="transData['58'] !='' "> {{dateFormat(transData['58'])}}</template>
                                <template v-if="transData['58'] =='' "> ---- </template>
                            </td>
                            <td>{{transData['60']}}</td>
                            <td>{{transData['71']}}</td>
                            <td>{{transData['1']}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="noneCenterData" v-else>
                       <span><img src="../../image/loading.gif" class="loadingImg"/></span>
                       <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="loadTransData.transSeqArray && loadTransData.transSeqArray.length !=0">
                        <span class="float-right"><a v-link="{path:'/main/businessSeq'}">查看所有</a></span>
                    </template>
                    <template v-if="loadTransData.transSeqArray && loadTransData.transSeqArray.length ==0">
                        <span class="noneCenterData">暂无交易记录！</span>
                    </template>
                </div>
                <div class="tab-pane fade"   id="business">
                    <table class="table table-bordered table-div" style="margin-top: 14px;" v-if="fiveTransSeqList.transSeqArray" >
                        <tr class="table-tr-bg tableTh">
                            <th>业务名称</th>
                            <th>申请日期</th>
                            <th>结束时间</th>
                            <th>状态</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr  v-for="seqData in fiveTransSeqList.transSeqArray">
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
                        <span><img src="../../image/loading.gif" class="loadingImg"/></span>
                        <span class="loadingImgLeft"> 加载中......</span>
                    </div>
                    <template v-if="fiveTransSeqList.transSeqArray && fiveTransSeqList.transSeqArray.length !=0">
                        <span class="float-right"><a v-link="{path:'/main/businessSeq'}">查看所有</a></span>
                    </template>
                    <template v-if="fiveTransSeqList.transSeqArray && fiveTransSeqList.transSeqArray.length ==0">
                        <span class="noneCenterData">暂无交易记录！</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <div class="contextInfoLeft allDivWidth">
        <div class="panel panel-default transTitle ">
            <div class="panel-body panel-title" >
                <img src="../../image/index/round.png" class="round-icon"><span class="round-title">交易查询</span>
            </div>
        </div>
        <div class="panel panel-default transSeqInfo ">
            <div class="panel-body panel-title">
                <img src="../../image/index/round.png" class="round-icon"><span class="round-title">账户基本信息</span>
            </div>
        </div>
    </div>
    <div class="contextInfoLeft index-title">
        <div class="divLeft">
            <div class="panel panel-default">
                <div class="panel-body" >
                    <div style="margin-left: 29px;">
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
                            <div class="noneData" v-else>
                                <span><img src="../../image/loading.gif" class="loadingImg"/></span>
                                <span class="loadingImgLeft"> 加载中......</span>
                            </div>
                            <template v-if="currentBillList.data  && currentBillList.data.length ==0">
                                <div class="noneData" v-else>暂无交易记录</div>
                            </template>
                        </div>
                        <div class="tab-pane fade" id="currentPosit">
                            <table class="table table-bordered table-div" v-if="currentPositList.transSeqArray">
                                <tr class="table-tr-bg tableTh">
                                    <th>合约</th>
                                    <th>可用数量</th>
                                    <th>持仓数量</th>
                                    <th>成本价</th>
                                    <th>浮动盈亏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="positData in currentPositList.transSeqArray">
                                    <td>
                                        <template v-if="positData['64'] == '' "> {{positData['63']}} </template>
                                        <template v-if="positData['64'] != '' "> {{positData['64']}}</template>
                                    </td>
                                    <td>{{ avaiableAmount(positData['135'],positData['145']) }}</td>
                                    <td>{{positData['135']}} </td>
                                    <td>{{positData['139']}}</td>
                                    <td>{{positData['141']}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="noneData" v-else>
                                <span><img src="../../image/loading.gif" class="loadingImg"/></span>
                                <span class="loadingImgLeft"> 加载中......</span>
                            </div>
                            <template v-if="currentPositList.transSeqArray  && currentPositList.transSeqArray.length ==0">
                                <div class="noneData" v-else>暂无交易记录！</div>
                            </template>
                            <template v-if="currentPositList.transSeqArray  && currentPositList.transSeqArray.length !=0">
                                 <span class="float-right"><a v-link="{path:'/main/curBusSearch'}">查看所有</a></span>
                            </template>
                        </div>
                        <div class="tab-pane fade" id="currentTrust">
                            <table class="table table-bordered table-div" v-if="currentTrustList.transSeqArray">
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
                                <tr v-for="trustData in currentTrustList.transSeqArray">
                                    <td>{{trustData['159']}}</td>
                                    <td>
                                        <template v-if="trustData['64'] == '' "> {{trustData['63']}} </template>
                                        <template v-if="trustData['64'] != '' "> {{trustData['64']}} </template>
                                    </td>
                                    <td>{{trustData['129']}}</td>
                                    <td>{{trustData['113']}}/{{trustData['130']}}</td>
                                    <td>{{trustData['118']}}</td>
                                    <td>
                                        <template v-if="trustData['113'] == 0">可撤销</template>
                                        <template v-if="trustData['113'] < trustData['130']">部分撤销</template>
                                        <template v-if="trustData['113'] == trustData['130']">已成交</template>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="noneData" v-else>
                                <span><img src="../../image/loading.gif" class="loadingImg"/></span>
                                <span class="loadingImgLeft"> 加载中......</span>
                            </div>
                            <template v-if="currentTrustList.transSeqArray && currentTrustList.transSeqArray.length ==0">
                                <div class="noneData" v-else>暂无交易记录！</div>
                            </template>
                            <template v-if="currentTrustList.transSeqArray && currentTrustList.transSeqArray.length !=0">
                                <span class="float-right"><a v-link="{path:'/main/curBusSearch'}">查看所有</a></span>
                            </template>
                        </div>
                        <div class="tab-pane fade" id="currentTrans">
                            <table class="table table-bordered table-div" v-if="currentTransList.transSeqArray">
                                <tr class="table-tr-bg tableTh">
                                    <th>成交时间</th>
                                    <th>合约</th>
                                    <th>成交均价</th>
                                    <th>成交数量</th>
                                    <th>开平方向</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="transDataInfo in currentTransList.transSeqArray">
                                    <td>{{transDataInfo['116']}}</td>
                                    <td>
                                        <template v-if="transDataInfo['64'] == '' "> {{transDataInfo['63']}} </template>
                                        <template v-if="transDataInfo['64'] != '' "> {{transDataInfo['64']}} </template>
                                    </td>
                                    <td>{{transDataInfo['114']}}</td>
                                    <td>{{transDataInfo['113']}}</td>
                                    <td>{{transDataInfo['118']}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="noneData" v-else>
                                <span><img src="../../image/loading.gif" class="loadingImg"/></span>
                                <span class="loadingImgLeft"> 加载中......</span>
                            </div>
                            <template v-if="currentTransList.transSeqArray && currentTransList.transSeqArray.length ==0">
                                <div class="noneData" v-else>暂无交易记录！</div>
                            </template>
                            <template v-if="currentTransList.transSeqArray && currentTransList.transSeqArray.length !=0">
                                <span class="float-right"><a v-link="{path:'/main/curBusSearch'}">查看所有</a></span>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div  class="divRight">
            <div class="panel panel-default" style="height: 231px;  ">
                <div class="panel-body accountInfo" v-if="baseInfo.data">
                    <p>客户姓名：{{baseInfo.data[0]['24']}}</p>
                    <p>手机号：  {{baseInfo.data[0]['30']}}</p>
                    <p>联系地址：{{baseInfo.data[0]['34']}}</p>
                    <p>联系电话：{{baseInfo.data[0]['31']}}</p>
                    <p>电子邮箱：{{baseInfo.data[0]['35']}}</p>
                    <!--<p>客户姓名：{{userName}}</p>-->
                    <!--<p>手机号：  {{phone}}</p>-->
                    <!--<p>联系地址：{{address}}</p>-->
                    <!--<p>联系电话：{{linkTel}}</p>-->
                    <!--<p>电子邮箱：{{email}}</p>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../vuex/store';
    import { requestMyInfo,loadTransSeq,transSeq,currentBillInfo,
            currentPositInfo,currentTrustInfo,currentTransInfo} from '../../vuex/action';
    import {getTransSeqData,getBaseInfo,getTransSeq,getLoadTrans,getCurrentBill,
            getFiveCurrentPosit,getFiveCurrentTrans,getFiveCurrentTrust,getFiveTransSeq,getFiveLoadTrans} from '../../vuex/getters';
    import moment from 'moment';
    import {initDatePicker} from '../../util/datePicker';
    import  {onlineGlobal,loadSearchCode,tranSeq,loadTrans,customerType} from '../../util/config';
    import {YMD} from '../../util/dateFormat.js';
    import {flagLogin} from '../../util/errorMsg.js';
    import {getCookie,setCookie}from '../../util/cookie.js';
    export default{
        data:function(){
            return {
                loadBusStyle:'loadBusStyle',
                busWaterTwoStyle:'busWaterTwoStyle',
                currentBillStyle: 'currentBillStyle',
                busLoadOneStyle: 'busLoadOneStyle',
                busWaterOneStyle: 'busWaterOneStyle',
                currentPositStyle:　'currentPositStyle',
                noneStyle: 'noneStyle',
                currentTrustStyle: 'currentTrustStyle',
                currentTransStyle: 'currentTransStyle',
                applyDate:'seqData.applyDate',
                startDate:'',
                endDate:'',
                userName:'',
                phone:'',
                address:'',
                linkTel:'',
                email:''
            }
        },
        //第一种方法vuex
        store:store,
        vuex: {
            getters: {
                baseInfo: getBaseInfo,
                //获取正在办理的业务流水 前5条信息
                loadTransData:getFiveLoadTrans,
                //获取当日资金的列表信息
                currentBillList:getCurrentBill,
                //获取当日持仓的列表信息
                currentPositList:getFiveCurrentPosit,
                //获取当日委托的列表信息
                currentTrustList:getFiveCurrentTrust,
                //获取当日成交的列表信息
                currentTransList:getFiveCurrentTrans,
                //获取业务流水的前五条信息
                fiveTransSeqList:getFiveTransSeq
            },
        actions: {
                //账户基本信息
                requestMyInfo:requestMyInfo,
                transSeq:transSeq,
                loadTransSeq:loadTransSeq,
                currentBillInfo:currentBillInfo,
                currentPositInfo:currentPositInfo,
                currentTrustInfo:currentTrustInfo,
                currentTransInfo:currentTransInfo
        }
    },
        //初始化加载信息列表
        ready: function(){
             //获取账户信息
//            let userInfoScape=getCookie("user")
//            let userAccount=JSON.parse(unescape(userInfoScape))
//            if(userAccount != null){
//                this.userName = userAccount.data[0]['24'],
//                this.phone = userAccount.data[0]['30'],
//                this.address = userAccount.data[0]['34'],
//                this.linkTel = userAccount.data[0]['31'],
//                this.email = userAccount.data[0]['35']
//            }
            $('#myCarousel').carousel({
                interval: 5000
            })

            this.requestMyInfo()
//            //根据账户信息判断登录状态
   //         flagLogin();
            let userScape=getCookie("userAccount");
            if(userScape != ""){
                let userInfo=JSON.parse(unescape(userScape));
                var  account =  userInfo.account;
                var  token =  userInfo.token;
                //业务流水
                let objSeq=JSON.stringify({func:loadSearchCode,type:customerType,account:account,token:token,data:[{58:"",59:"",71:tranSeq}]});
                this.transSeq(objSeq)
                //正在办理的业务流水
                let loadTranObj = JSON.stringify({func:loadSearchCode,type:customerType,account:account,token:token,data:[{58:"",59:"",71:loadTrans}]})
                this.loadTransSeq(loadTranObj);
            }
            //初始化获取当日资金列表的信息
            this.currentBillInfo();
            //获取当日持仓的列表信息
            this.currentPositInfo();
            //获取当日委托的列表信息
            this.currentTrustInfo();
            //获取当日成交的列表信息
            this.currentTransInfo();



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
            businessOne: function(){
                this.busWaterTwoStyle = 'busWaterTwoStyle'
                this.loadBusStyle ='loadBusStyle'
            },
            businessTwo: function(){
                this.busWaterTwoStyle= 'loadBusRightStyle'
                this.loadBusStyle ='busLoadOneStyle'
            },
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
            }
        }
    }
</script>