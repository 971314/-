/**
 * Created by xiajing on 2016/8/15.
 */
import React from 'react';
import backImg  from '../../image/back.png';
import browser from '../../util/browser.js'
const NavTitle = React.createClass({
    getInitialState: function(){
      return{
          backFlag:false
      }
    },
    componentDidMount:function(){
        //获取地址栏的信息
        var flag = browser.GetUrlArgStr("flag")
        //如果等于1就显示有返回按钮的箭头
        if(flag == 1){
            this.setState({backFlag:true})
        }
    },
    render(){
        var back =this.state.backFlag ? <a href='close'><img src= {backImg} /> </a>: ''
        return(
            <div>
                <nav className="navbar navInfo navbar-fixed-top">
                    <div className="titleBack initHeight">{back}</div>
                    <div className="login-nav"> {this.props.name} </div>
                </nav>
            </div>
        )
    }
})
export default NavTitle