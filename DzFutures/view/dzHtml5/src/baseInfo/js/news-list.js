/**
 * Created by xiajing on 2016/8/12.
 */
import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'
import ReactDOM from 'react-dom';
import routes from '../../baseInfo/util/router/news-list.js';
ReactDOM.render(<Router routes={routes} history={hashHistory} />, document.getElementById('news-list'))
import {saveStorageInfo}  from '../util/native.js'
//回调方法
//window.callback = function (message) {
//    var msg = JSON.parse(message);
//    if (msg.moduleId == 90004) {
//        //获取东证的头条信息
//        var dzTtileInfo = msg.jData.Indexes.slice(0,10);
//        saveStorageInfo("dzNewListInfo", dzTtileInfo);
//    }
//}
