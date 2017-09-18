/**
 * Created by xiajing on 2016/8/15.
 */

import React from 'react';
import titleNative from '../../util/titleNative.js';
import NavTitle from '../publicConponents/navTitle.js';
import {saveStorageInfo} from '../../util/native.js';

const ApplyStepOne = React.createClass({
    getInitialState: function(){
        return {
            btnChecked:false
        };
    },
    backClick:function(){
        this.props.history.goBack()
    },
    handleChange:function(){
        var name =  this.refs.name.value;
        var department =  this.refs.department.value;
        var number = this.refs.number.value;
        this.setState({name:name,department:department,number:number})
        if(name && department && number){
            this.setState({btnChecked: true})
        }else{
            this.setState({btnChecked:false})
        }
    },
    render(){
        var  navBar =  <NavTitle name="申请"  handleClick={this.backClick}/>
        document.body.style.paddingTop = '44px';
        var nextStep = this.state.btnChecked ?   <RegisterNextBtn name={this.state.name} department={this.state.department} number={this.state.number}/> : <RegisterInitBtn />;
        //if(titleNative.getTitleNative(true)){
        //    var  navBar =  <NavTitle name="申请"  handleClick={this.backClick}/>
        //}else{
        //    titleNative.getTitleNative('申请')
        //}
        return(
            <div>
                {navBar}
                <div className="list-ul" style={{height:'135px'}}>
                    <ul>
                        <li className="login-bottom liLineHeight">
                            <div className="registerLeft"><input ref="name" autocomplete="off" onChange={this.handleChange} type="text"  placeholder="请输入真实姓名" className="loginText widthTwo tLineHeight" /></div>
                        </li>
                        <li className="login-bottom">
                            <div className="registerLeft liLineHeight"><input ref="department" autocomplete="off" onChange={this.handleChange} type="text"  placeholder="请输入所在部门" className="loginText widthTwo tLineHeight"  /></div>
                        </li>
                        <li>
                            <div className="registerLeft"><input ref="number" autocomplete="off"  onChange={this.handleChange} type="text"  placeholder="请输入东证员工号" className="loginText widthTwo" /></div>
                        </li>
                    </ul>
                </div>
                <div className="btnDiv">
                    {nextStep}
                </div>
                <div className="btnDiv2 detail" style={{color:'#808086',fontSize: '12px',marginTop:'16px',padding: '6px'}}>
                    <p>温馨提示：</p>
                    <p className="pTipOne">如果您不是我们员工，请加入我们后在申请。</p>
                </div>
            </div>
        )
    }
})

var RegisterInitBtn = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    render(){
        return(
            <div><button   type="button" className="registerInitBtn" data-toggle="button" > 下一步 </button> </div>
        )
    }
})
var RegisterNextBtn = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    render(){
        var obj = {name:this.props.name,department:this.props.department,number:this.props.number}
        saveStorageInfo("applyAgentInfo",obj)
        return(
            <div><button   type="button" className="btnSubmit" data-toggle="button" onClick={()=>this.context.router.push('/applyStepTwo')}>下一步</button></div>
        )
    }
})
export default ApplyStepOne