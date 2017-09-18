/**
 * Created by xiajing on 2016/11/22.
 */
import React,{Component} from 'react';
import loadImg from '../../images/loading.gif';
class LoadingImg extends Component{
       render(){
           return(
               <div className="loadImg"><img src={loadImg}/></div>
           )
       }
}
export default LoadingImg;