/**
 * Created by xiajing on 2016/11/11.
 */
import React,{Component} from 'react';
class DelInfo extends Component{
    render(){
        return(
            <div className="modal fade modal-top delTop" id="delDialog" tabindex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content delDialog">
                        <div className="modal-header">
                            <button type="button" class="close"
                                    data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <h4 class="modal-title text-center"  >
                                提示
                            </h4>
                        </div>
                        <div class="modal-body modal-font delWarn">
                            确定删除吗？
                        </div>
                        <div class="modal-footer delFoo">
                            <button type="button" class="btn btn-default"
                                    data-dismiss="modal" >取消
                            </button>
                            <button type="button" class="bgBlue" onClick={this.props.delBtn.bind(this)}>确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DelInfo;