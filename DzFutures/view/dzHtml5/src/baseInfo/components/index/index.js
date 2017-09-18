/**
 * Created by xiajing on 2016/8/23.
 */

import React from 'react';
import titleNative from '../../util/titleNative.js';
import NavTitle from '../publicConponents/navTitle.js';
import banner from '../../image/banner.png';
import redUp from '../../image/myInfo/redUp.png';
import greenDown from '../../image/myInfo/greenDown.png';
import myBill from '../../image/index/myBill.png';
import message from '../../image/index/message.png';
import loginImg from '../../image/index/login.png';
import iScroll from 'iscroll';
const Index = React.createClass({
       render(){
           if(titleNative.getTitleNative(true)){
               var  navBar =  <NavTitle name="东证赢家"  handleClick={this.backClick}/>
           }else{
               titleNative.getTitleNative('东证赢家')
           }
           return(
               <div>
                   {navBar}
                   <CarouselInfo />
                   <ExponentInfo />
                   <CenterInfo />
                   <ListInfo />
               </div>
           )
       }
})
//轮番的图片
var CarouselInfo = React.createClass({
    componentDidMount:function(){
        $('#myCarousel').carousel({
            interval: 5000
        })
    },
    render(){
        return(
            <div>
                <div  id="myCarousel" className="carousel slide bg"  >
                    <ol className="carousel-indicators" style={{bottom: '-5px'}}>
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                             <div className="item active">
                                <img src={banner} className="widthOne"/>
                             </div>
                            <div className="item">
                                <img src={banner} className="widthOne"/>
                            </div>
                            <div className="item">
                                 <img src={banner} className="widthOne"/>
                             </div>
                     </div>
                </div>
            </div>
        )
    }
})

//指数信息
var ExponentInfo = React.createClass({
    getInitialState: function() {
        return {dataValue: []};
    },
    componentDidMount:function(){
        //这个接口只获取 合约名称
        if(window.pbEngine){
            var data =  pbEngine.readConfig('PbHomeThreeContracts.json');
            if(data !='' && data != 'undefined'){
                var dataValue = JSON.parse(data);
                this.setState({dataValue:dataValue})
            }
        }
        //var dataValue = [{"market":"2001","name":"黄金1612","code":"011512"},{"code":"010107","market":"2001","name":"沪铝1607"}]
    },
    render(){
        return(
            <div  className="exponent">
                {
                   this.state.dataValue.map(function(data){
                       return   <div className="exponentDiv">
                                   <p className="exponentName">{data.name}</p>
                                   <p className="pInfo">
                                       <img src={redUp} className="upDownImg"/>
                                       <span className="upRed">-----</span>
                                   </p>
                                   <UpDownInfo  code ={data.code} market={data.market}/>
                               </div>
                   })
                }
            </div>
        )
    }
})
//获取涨跌幅的信息
var UpDownInfo = React.createClass({
    render(){
        //根据code 和 marke 查询  涨跌幅的信息
        if(window.pbEngine){
          var upDownInfo =  pbEngine.getHQZDInfo(this.props.code,this.props.market);
        }
        return(
            <div>
                <p>
                    <span className="upRedValue spanDiv1">1.98</span>
                    <span className="spanDiv2"></span>
                    <span className="upRedValue spanDiv3">0.01%</span>
                </p>
            </div>
            )
    }
})
//中间的内容信息
var CenterInfo = React.createClass({
    getInitialState: function(){
        return {
            btnChecked :false
        };
    },
    componentDidMount:function(){
		var _this =this;
        if(window.pbEngine){
          var data =   pbEngine.getPublicData("PbKey_Home_Verify");
            alert(data)
            if(data == 0){//如果等于0就是不存在就要去登录或则注册否则是游客
                _this.setState({btnChecked:  false});
            }else{
                _this.setState({btnChecked:  true});
            }
        }
    },
     render(){
         var loginBtn =this.state.btnChecked ? <LoginBtn /> : <ExitLoginBtn />
         return(
             <div className="centerInfo">
                 {loginBtn}
                 {
                     //<ExitLoginBtn />
                 }
                 {
                     // <LoginBtn />
                 }
                
                 <div>
                     <div className="rowList">
                         <div className="wrapper">
                             <div className="imgOne">
                                 <p>开户</p>
                             </div>
                         </div>
                     </div>
                     <div className="rowList">
                         <div className="wrapper">
                             <div className="imgFour">
                                 <p>财经日历</p>
                             </div>
                         </div>
                     </div>
                     <div className="rowList">
                         <div className="wrapper">
                             <div className="imgThree">
                                 <p>回答</p>
                             </div>
                         </div>
                     </div>
                     <div className="rowList">
                         <div className="wrapper">
                             <div className="imgTwo">
                                 <p>资管</p>
                             </div>
                         </div>
                     </div>
                     <div className="rowList">
                         <div className="wrapper">
                             <div className="imgOne">
                                 <p>开户</p>
                             </div>
                         </div>
                     </div>
                     <div className="rowList">
                         <div className="wrapper">
                             <div className="imgFour">
                                 <p>财经日历</p>
                             </div>
                         </div>
                     </div>
                     <div className="rowList">
                         <div className="wrapper">
                             <div className="imgThree">
                                 <p>回答</p>
                             </div>
                         </div>
                     </div>
                     <div className="rowList">
                         <div className="wrapper">
                             <div className="imgTwo">
                                 <p>资管</p>
                             </div>
                         </div>
                     </div>
                     <div className="clearBoth"></div>
                 </div>
             </div>
         )
     }
})
var ExitLoginBtn = React.createClass({
    render(){
        return(
            <div>
                <div className="exitLogin">
                    <div className="exitLogin1">
                        <img src={myBill} className="exitLoginImg"/>
                        <span className="exitLoginInfo1">我的资产</span>
                    </div>
                    <div className="exitLogin2">
                        <div className="loginSplitLine"></div>
                    </div>

                    <div className="exitLogin3 infoDivP" style={{margin: '-39px auto 22px'}}>
                        <div className="infoDivLeft"><img src={message} className="exitLoginImg " style={{paddingLeft:'2%'}}/></div>
                        <div className="infoDivRight">
                               <span className="exitLoginInfo2">
                                   给您推荐一条新资讯，点击查看
                               </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
var LoginBtn = React.createClass({
    render(){
        return(
            <div>
                <div className="loginBtn">
                     <span><img src={loginImg} className="notLoginImg"/></span>
                     <span className="notLoginFont">登录 / 注册</span>
                </div>
            </div>
        )
    }
})
var ListInfo = React.createClass({
    render(){
        return(
                 <div className="listInfoDiv">
                         <div className="listRow">
                             <div className="exitLogin1" style={{marginLeft: '-8px'}}>
                                <p className="list-P1">3.90994%</p>
                                 <p className="list-P2">最高预期年化收益率</p>
                             </div>
                             <div className="exitLogin2" style={{width: '3%'}}>
                                 <div className="listSplitLine"></div>
                             </div>
                             <div className="exitLogin3  "  style={{paddingLeft: '10px'}}>
                                 <p className="list-P3">活期盈</p>
                                 <p className="list-P4">每天快速赎回额度5万元</p>
                                 <p className="list-P5">多种期限&nbsp;&nbsp;&nbsp;100元起</p>
                             </div>
                         </div>
                     <div className="listRow">
                         <div className="exitLogin1" style={{marginLeft: '-8px'}}>
                             <p className="list-P1">3.90994%</p>
                             <p className="list-P2">最高预期年化收益率</p>
                         </div>
                         <div className="exitLogin2" style={{width: '3%'}}>
                             <div className="listSplitLine"></div>
                         </div>
                         <div className="exitLogin3  " style={{paddingLeft: '10px'}}>
                             <p className="list-P3">活期盈</p>
                             <p className="list-P4">每天快速赎回额度5万元</p>
                             <p className="list-P5">多种期限&nbsp;&nbsp;&nbsp;100元起</p>
                         </div>
                     </div>
                     <div className="listRow">
                         <div className="exitLogin1" style={{marginLeft: '-8px'}}>
                             <p className="list-P1">3.90994%</p>
                             <p className="list-P2">最高预期年化收益率</p>
                         </div>
                         <div className="exitLogin2" style={{width: '3%'}}>
                             <div className="listSplitLine"></div>
                         </div>
                         <div className="exitLogin3  " style={{paddingLeft: '10px'}}>
                             <p className="list-P3">活期盈</p>
                             <p className="list-P4">每天快速赎回额度5万元</p>
                             <p className="list-P5">多种期限&nbsp;&nbsp;&nbsp;100元起</p>
                         </div>
                     </div>
                 </div>
        )
    }
})
export default Index
