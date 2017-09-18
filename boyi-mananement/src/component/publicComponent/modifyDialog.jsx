/**
 * Created by xiajing on 2016/11/15.
 */
import React, {Component} from 'react';
class ModifyDialog extends Component{
    //constructor(props){
    //    super(props)
    //    this.state = {
    //        name:'',
    //        code:''
    //    }
    //}
    inputCha() {
        this.props.inputChange(this.refs.titleName.value,this.refs.image1.value,this.refs.url.value)
       // this.setState({name: this.refs.MSGName.value,code:this.refs.MSGCode.value});
   }
    render(){
        return(
            <div className="modal fade modal-top delTop" id="modifyDia" tabindex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content delDialog" style={{height:'345px'}}>
                        <div className="modal-header">
                            <button type="button" class="close"
                                    data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <h4 class="modal-title text-center"  >
                                功能区修改
                            </h4>
                        </div>
                        <div class="modal-body modal-font delWarn" style={{height:'188px',marginTop:'13px'}}>
                            <div className="editDivFunc">
                                <span className="editNewSpan">名称：</span>
                                <input type="text" className="pvwInputText" onFocus={this.props.editFocusClick.bind(this)} onChange={this.inputCha.bind(this)} ref="titleName"  value={this.props.funObject.title}/>
                            </div>
                            <div className="editDivFunc">
                                <span className="editNewSpan">图片名称：</span>
                                <input type="text" className="pvwInputText" onFocus={this.props.editFocusClick.bind(this)}   onChange={this.inputCha.bind(this)} ref="image1"  value={this.props.funObject.image1}/>
                            </div>
                            <div className="editDivFunc">
                                <span className="editNewSpan">URL地址：</span>
                                <input type="text" className="pvwInputText" onFocus={this.props.editFocusClick.bind(this)}   onChange={this.inputCha.bind(this)} ref="url"  value={this.props.funObject.url}/>
                            </div>
                            <div  className="editDivFunc">
                                <span className="editMsg">{this.props.editMsg}</span>
                            </div>
                        </div>
                        <div class="modal-footer delFoo">
                            <button type="button" class="btn btn-default"  data-dismiss="modal" >取消
                            </button>
                            <button type="button" class="bgBlue" onClick={this.props.editBtn.bind(this)}>确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ModifyDialog
