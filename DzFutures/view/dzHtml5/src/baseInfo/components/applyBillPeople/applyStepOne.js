/**
 * Created by xiajing on 2016/8/15.
 */

import React from 'react';
import titleNative from '../../util/titleNative.js';
import NavTitle from '../publicConponents/navTitle.js';
import addInitImg from '../../image/other/addInit.png';
import {saveStorageInfo} from '../../util/native.js';
import {cardNoRegexp} from '../../util/validation.js';
import TipMsg from '../publicConponents/tipMsg.js';
const ApplyStepOne = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState: function(){
        return {
            btnChecked:false,
            fileImgFlag:false,
            imgValue:''　
        };
    },
    componentDidMount:function(){
        this.setState({fileImgFlag :　true})　
        this.setState({btnChecked :　false})　
    },
    backClick:function(){
        this.props.history.goBack()
    },
    handleChange:function(){
        var _this =this;
        var cardNo =  this.refs.cardNo.value;
        var department =  this.refs.department.value;
        var number = this.refs.number.value;
        if(cardNo){
            _this.setState({btnChecked :　true})
        }else{
            _this.setState({btnChecked :　false})
        }
        this.setState({cardNo:cardNo});this.setState({department:department});this.setState({number:number})
    },
    stepTwoClick:function(){
        var obj = {cardNo:this.state.cardNo,department:this.state.department,number:this.state.number,imgValue:this.state.img}
        //console.log(obj)
        saveStorageInfo("applyBillPeopleInfo",obj);
        if(!cardNoRegexp.test(this.state.cardNo)){
            this.setState({tipMsg:"请正确填写身份证号!"})
            $('#tipMsgModal').modal(tipMsgModal)
            return;
        }
        if(!this.state.number){
            this.setState({tipMsg:"员工号必填！"})
            $('#tipMsgModal').modal(tipMsgModal)
            return;
        }
        this.context.router.push('/applyBillStepTwo')
    },
    //上传文件
    uploadFileChange: function(e){
        var _this = this;
        var file= e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
             _this.setState({fileImgFlag :　false})
             _this.setState({img:e.target.result})//将值赋给img显示到页面上
            //console.log(_this.state.img)
        }
    },
    render(){
        var fileImg =  this.state.fileImgFlag ? <InitUpFile handleChange={this.uploadFileChange}/> : <ExitUpFile  exitImg={this.state.img} handleChange={this.uploadFileChange}   />;
        var nextStep = this.state.btnChecked ?   <RegisterNextBtn imgValue={this.state.img} cardNo={this.state.cardNo} department={this.state.department} number={this.state.number} handleClick={this.stepTwoClick}/> : <RegisterInitBtn />;
        //if(titleNative.getTitleNative(true)){
        //    var  navBar =  <NavTitle name="申请"  handleClick={this.backClick}/>
        //}else{
        //    titleNative.getTitleNative('申请')
        //}
        var  navBar =  <NavTitle name="申请"  handleClick={this.backClick}/>
        document.body.style.paddingTop = '44px';
        return(
            <div>
                {navBar}
                <TipMsg tipMsg={this.state.tipMsg}/>
                <div className="list-ul" style={{height:'135px'}}>
                    <ul>
                        <li className="login-bottom liLineHeight">
                            <div className="registerLeft"><input ref="cardNo" autocomplete="off" onChange={this.handleChange} type="text"  placeholder="请输入身份证号" className="loginText widthTwo tLineHeight" /></div>
                        </li>
                        <li className="login-bottom liLineHeight">
                            <div className="registerLeft"><input ref="department" autocomplete="off" onChange={this.handleChange} type="text"  placeholder="请输入所在部门（选填）" className="loginText widthTwo tLineHeight" /></div>
                        </li>
                        <li>
                            <div className="registerLeft"><input ref="number" autocomplete="off" onChange={this.handleChange} type="text"   placeholder="请输入东证员工号（必填）" className="loginText widthTwo" /></div>
                        </li>
                    </ul>
                </div>
                <div className="upFileDiv" style={{marginTop:'41px'}}>
                    {fileImg}
                </div>
                <div className="btnDiv"  style={{marginTop:'41px'}}>
                    {nextStep}
                </div>
            </div>
        )
    }
})
var InitUpFile = React.createClass({
    render(){
        return(
            <div>
                <div className="borderDashed">
                    <input type="file" accept="image/*" className="uploadFile" onChange={this.props.handleChange}/>
                    <p className="upFileP1"><img src={addInitImg} className="addInitUp"/></p>
                    <p className="upFileP2">上传基金从业资格证图片</p>
                </div>
            </div>
        )
    }
})
var ExitUpFile = React.createClass({
    render(){
        return(
            <div>
                <div className="exitFile">
                    <input type="file" accept="image/*"  className="uploadFile" onChange={this.props.handleChange} />
                   <img src={this.props.exitImg} className="exitFileImg" />
                </div>
            </div>
        )
    }
})
var RegisterInitBtn = React.createClass({
    render(){
        return(
            <div><button   type="button" className="registerInitBtn" data-toggle="button" > 下一步 </button> </div>
        )
    }
})
var RegisterNextBtn = React.createClass({
    render(){
        return(
            <div><button onClick={this.props.handleClick}  type="button" className="btnSubmit" data-toggle="button">下一步</button></div>
        )
    }
})
export default ApplyStepOne