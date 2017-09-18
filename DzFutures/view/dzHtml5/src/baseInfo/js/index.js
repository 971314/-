/**
 * Created by xiajing on 2016/8/12.
 */
import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'
import ReactDOM from 'react-dom';
import routes from '../../baseInfo/util/router/indexRouteConfig.js';
ReactDOM.render(<Router routes={routes} history={hashHistory} />, document.getElementById('app'))