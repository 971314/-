/**
 * Created by xiajing on 2016/9/29.
 */
import React from 'react';
import titleNative from '../../util/titleNative.js';
import NavTitle from '../publicConponents/navTitle.js';
import {getDzNewList,getStorageInfo} from '../../util/native.js';
const NewsList = React.createClass({
    backClick:function(){
        this.props.history.goBack()
    },
    componentDidMount:function(){
        //获取新闻
        getDzNewList();
        var newsData = getStorageInfo("dzNewListInfo");
        if(newsData){

        }
    },
    render(){
        if(titleNative.getTitleNative(true)){
            var  navBar =  <NavTitle name="通知"  handleClick={this.backClick}/>
        }else{
            titleNative.getTitleNative('通知')
        }
        return(
            <div>
                {navBar}
                <div className="newsList">
                   <ul className="newsListUl">
                      <li className="newsListLiTitle">通知</li>
                      <li className="newsListLi">
                          <div className="newsTitleInfo">阿打算发</div>
                          <div className="newsDate">2019-09-09</div>
                      </li>
                      <li className="newsListLi">阿打算发</li>
                   </ul>
                </div>
            </div>
        )
    }
})
export default NewsList