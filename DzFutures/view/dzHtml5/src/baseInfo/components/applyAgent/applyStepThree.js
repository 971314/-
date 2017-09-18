/**
 * Created by xiajing on 2016/8/15.
 */
import React from 'react';
import NavTitle from '../publicConponents/noBackNavTitle.js';
import titleNative from '../../util/titleNative.js';
import registerSuc from '../../image/registerSuc.png'
const RegisterStepFour = React.createClass({
    backClick:function(){
        this.props.history.goBack()
    },
    confirmClick:function(){
        window.location.href='close'
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    render(){
        var  navBar =  <NavTitle name="申请"  handleClick={this.backClick}/>
        document.body.style.paddingTop = '44px';
        //if(titleNative.getTitleNative(true)){
        //    var  navBar =  <NavTitle name="申请"  handleClick={this.backClick}/>
        //}else{
        //    titleNative.getTitleNative('申请')
        //}
        return(
            <div>
                {navBar}
                <div className="sucBg">
                    <div className="stepFourDiv">
                        <img src={registerSuc}  className="sucImgTop"/>
                    </div>
                    <div className="stepFourDiv span1">
                        申请成功
                    </div>
                    <div className="btnDiv" style={{marginTop:'66px'}}>
                    <button   type="button" className="btnSubmit" onClick={this.confirmClick}  data-toggle="button">确定 </button>
                    </div>
                </div>
            </div>
        )
    }
})
export default RegisterStepFour