<template>
    <div class="leftMenu">
        <div style="width:187px;">
            <ul class="firstMenu">
                <li >
                    <img src="../../image/index/home-icon.png"  id="bigImgIndex"  class="indexIcon"/>
                    <a v-link="{path:'/myAccount'}">网厅首页</a>
                </li>
                <li>
                    <img src="../../image/index/modify-icon.png" id="bigImgOne"  class="modifyInfo"/>
                    <span>信息变更</span>
                </li>
                <ul class="twoMenu topOneMenu">
                    <li> <a v-link="{path: '/linkManModify'}">联系方式变更</a> </li>
                    <li> <a v-link="{path: '/stepFirst'}">身份证有效期变更</a> </li>
                    <li> <a v-link="{path: '/comAdsChange'}">通讯地址变更</a> </li>
                    <li> <a v-link="{path: '/billAccountChange'}">结算账户变更</a> </li>
                </ul>
                <li>
                    <img src="../../image/index/password-icon.png" id="bigImgTwo"   class="menuPassManIcon">
                    密码管理
                </li>
                <ul class="twoMenu topTwoMenu">
                    <li> <a v-link="{path: '/modifyPass'}" style="line-height: 17px;">修改密码</a> </li>
                </ul>
                <li>
                    <img src="../../image/index/money-icons.png" id="bigImgThree" class="menuBillIcon">
                    资金管理
                </li>
                <ul class="twoMenu topThreeMenu">
                    <li> <a v-link="{path: '/bankFuture'}">资金转账</a> </li>
                    <li> <a v-link="{path: '/detailBill'}">资金明细</a> </li>
                    <li> <a v-link="{path: '/limitCancel'}">保底限制取消</a> </li>
                </ul>
                <li>
                    <img src="../../image/index/activat-icons.png" id="bigImgFour"   class="menuActivatIcon">
                    休眠激活
                </li>
                <ul class="twoMenu topFourMenu">
                    <li> <a v-link="{path: '/accountActivat'}" style="line-height: 17px;">休眠账户激活</a> </li>
                </ul>
                <li>
                    <img src="../../image/index/trans-icons.png"  id="bigImgFive"  class="menuTransIcon">
                    辅助交易
                </li>
                <ul class="twoMenu topFiveMenu">
                    <li> <a v-link="{path: '/switchTrans'}">切换交易系统</a> </li>
                    <li> <a v-link="{path: '/arbitrageApply'}">套保、套利申请</a> </li>
                    <li> <a v-link="{path: '/straddleApply'}">仓单服务</a> </li>
                    <li> <a v-link="{path: '/pledgeService'}">质押服务</a> </li>
                </ul>
            </ul>
        </div>
    </div>
</template>