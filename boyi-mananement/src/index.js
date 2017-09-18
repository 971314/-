/**
 * Created by xiajing on 2016/10/31.
 */
import './css/lib/bootstrap.min.css'
import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ReactDom from 'react-dom';
import routes from './router/routerConfig.js';
import './css/main.css';
ReactDom.render(<Router routes={routes}   history={hashHistory} />,  document.getElementById('app'))
