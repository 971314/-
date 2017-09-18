/**
 * Created by xiajing on 2016/11/9.
 */
import React, {Component} from 'react';
class BackTitle extends Component{
     render(){
          return(
              <div className="curPvwTitle">
                  <span className="curPvwOne goBack" onClick={this.props.backClick.bind(this)}>返回>></span>
              </div>
          )
      }
}
export default BackTitle