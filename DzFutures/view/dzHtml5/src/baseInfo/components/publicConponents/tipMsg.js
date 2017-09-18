/**
 * Created by xiajing on 2016/8/17.
 */

import React from 'react';

const TipMsg = React.createClass({
  render(){
      return(
          <div>
              <div className="modal dialog-info" id="tipMsgModal" >
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <p className="text-align">提示</p>
                          <div className="modal-header dialog-bottom">
                              {this.props.tipMsg}
                          </div>
                          <div className="modal-body dialog-bottom" data-dismiss="modal">
                              确认
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }
})
export default TipMsg
