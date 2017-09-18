/**
 * Created by xiajing on 2016/8/12.
 */
import React from 'react';
import { Link } from 'react-router';
import titleNative from '../../util/titleNative.js';
import NavTitle from '../publicConponents/navTitle.js'
const GesturePass = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    backClick:function(){
        this.props.history.goBack()
    },
    componentDidMount:function(){
        var opt = {
            chooseType: 3, // 3 , 4 , 5,
            width: 300, // lock wrap width
            height: 300, // lock wrap height
            container: 'element', // the id attribute of element
        }
        var lock = new H5lock(opt);
        lock.init();
        //var data = JSON.parse(window.localStorage.getItem("successInfo"))
        //if(localStorage.getItem("successInfo")){
        //    if(data == 1){
        //        this.context.router.push('/RegisterStepOne')
        //    }
        //}
    },
    render(){
        if(titleNative.getTitleNative(true)){
            //titleNativePass(true) == true  就显示自己写的title 否则掉原生的title
            var  navBar =  <NavTitle name="手势密码"  handleClick={this.backClick}/>
        }else{
            titleNative.getTitleNative('手势密码')
        }
        return(
            <div>
                {navBar}
                <div > </div>
                <h4 id="title" class="title">设置手势密码</h4>
                <a id="updatePassword" style={{float: 'right'}}>重置密码</a>
                <canvas id="canvas" width="300" height="300" style={{display: 'inline-block',marginTop: '15px'}}></canvas>
            </div>
        )
    }
})
export default GesturePass
