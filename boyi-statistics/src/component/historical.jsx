import React, {Component} from 'react';
import {
    initDate,
    getLastYearYestdy,
    day,
    month,
    sort,
    monthlyStatistics,
    setDateDate,
    setMonthDeta,
    setDateHis
} from '../js/main';
import ReactEcharts from 'echarts-for-react';

class HistoricalUser extends Component {
    constructor(props) {
        super(props);
        var d = new Date();
        var enddata = d.getDate() + '',
            endMonth = (d.getMonth() + 1) + '',
            begMonth = d.getMonth() + '',
            begFullYear = d.getFullYear(),
            begdata;
        enddata = setDateDate(enddata);
        begdata = setDateHis(enddata);
        endMonth = setDateHis(endMonth);
        begMonth = setMonthDeta(begMonth);
        if (begMonth == '12') {
            begFullYear = begFullYear - 1;
        }
        var endTime = d.getFullYear() + "/" + endMonth + "/" + enddata,
            beginTime = begFullYear + "/" + begMonth + "/" + begdata;
        this.state = {
            beginTime: beginTime,
            endTime: endTime,
            summaryArray: [],
            name: '',
            sessionId: '',
            getOtion: [],
            initialBegin: beginTime,
            initialEnd: endTime,
            initialBeginYear: begFullYear + "/" + begMonth,
            initialEndYear: d.getFullYear() + "/" + endMonth
        };
    }

    componentDidMount() {
        initDate();
        var _this = this;
        var sessionData = sessionStorage.getItem("sessionInfo");
        if (sessionData != null && sessionData != '') {
            var dat = JSON.parse(sessionData);
            _this.setState({name: dat.name, sessionId: dat.sessionId,});
            var data = {
                "func": 301,
                "data": {
                    "name": dat.name,
                    "sessionId": dat.sessionId,
                    "beginTime": this.state.beginTime.replace(/\//g, ''),
                    "endTime": this.state.endTime.replace(/\//g, '')
                }
            };
            $.ajax({
                url: '' + url + '/UserStatistics/WebService',
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (data) {
                    if (data.retHead == 0) {
                        _this.setState({
                            summaryArray: data.data,
                            getOtion: data.data.slice(0)
                        });
                    } else if (data.retHead == -6) {
                        alert('请先登录')
                        _this.context.router.push('/');
                    }
                }, error: function (data) {
                    console.log("服务器异常");
                }
            });
        }
    }

    getOtion() {
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [
                    {
                        name: '日活数据',
                        textStyle: {
                            color: '#539ff5'
                        }
                    },
                    {
                        name: '新增用户',
                        textStyle: {
                            color: '#f7298f'
                        }
                    }
                ],
                right: 0,
                top: 20
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: sort(this.state.getOtion).map(function (data) {
                    return data.time;
                })
            },
            yAxis: {},
            series: [
                {
                    name: '日活数据',
                    type: 'line',
                    // stack: '总量',
                    data: sort(this.state.getOtion).map(function (data) {
                        return data.dailyActive
                    }),
                    itemStyle: {
                        normal: {
                            color: '#539ff5'
                        }
                    }
                },
                {
                    name: '新增用户',
                    type: 'line',
                    data: sort(this.state.getOtion).map(function (data) {
                        return data.newReg
                    }),
                    itemStyle: {
                        normal: {
                            color: '#f7298f'
                        }
                    }
                }
            ]
        };
        return option;
    }

    inquiriesClick() {
        var _this = this;
        var endTime = $('#endTime').val().replace(/\//g, ''),
            beginTime = $('#beginTime').val().replace(/\//g, ''),
            type = $('#type').val();
        if (endTime < beginTime) {
            alert('结束时间不能小于开始时间')
        } else {
            if (type == 0) {
                var data = {
                    "func": 301,
                    "data": {
                        "name": this.state.name,
                        "sessionId": this.state.sessionId,
                        "beginTime": beginTime,
                        "endTime": endTime
                    }
                };
                $.ajax({
                    url: '' + url + '/UserStatistics/WebService',
                    type: 'POST',
                    crossDomain: true,
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function (data) {
                        beginTime = day(beginTime);
                        endTime = day(endTime);
                        if (data.retHead == 0) {
                            _this.setState({
                                summaryArray: data.data,
                                beginTime: beginTime,
                                endTime: endTime,
                                getOtion: data.data.slice(0)
                            });
                        } else if (data.retHead == -8) {
                            alert('没有该时间段记录');
                            _this.setState({
                                summaryArray: [],
                                beginTime: beginTime,
                                endTime: endTime,
                                getOtion: []
                            })
                        } else if (data.retHead == -6) {
                            alert('请先登录');
                            _this.context.router.push('/');
                        }
                    }, error: function (data) {
                        console.log("服务器异常");
                    }
                });
            } else if (type == 1) {
                beginTime = beginTime.substring(0, 6);
                endTime = endTime.substring(0, 6);
                var currentMonth = (new Date().getMonth()) + 1;
                console.log(currentMonth, beginTime.substring(4, 6), currentMonth, endTime.substring(4, 6));
                if (currentMonth == beginTime.substring(4, 6)) {
                    alert('不能查询当月记录')
                } else {
                    var data = {
                        "func": 302,
                        "data": {
                            "name": this.state.name,
                            "sessionId": this.state.sessionId,
                            "beginTime": beginTime.replace(/\//g, ''),
                            "endTime": endTime.replace(/\//g, ''),
                        }
                    };
                    $.ajax({
                        url: '' + url + '/UserStatistics/WebService',
                        type: 'POST',
                        crossDomain: true,
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        success: function (data) {
                            beginTime = month(beginTime);
                            endTime = month(endTime);
                            if (data.retHead == 0) {
                                _this.setState({
                                    summaryArray: data.data,
                                    beginTime: beginTime,
                                    endTime: endTime,
                                    getOtion: data.data.slice(0)
                                });
                            } else if (data.retHead == -8) {
                                alert('没有该时间段数据')
                                _this.setState({
                                    summaryArray: [],
                                    beginTime: beginTime,
                                    endTime: endTime,
                                    getOtion: []
                                });
                            } else if (data.retHead == -6) {
                                alert('请先登录')
                                _this.context.router.push('/');
                            }
                        }, error: function (data) {
                            console.log("服务器异常");
                        }
                    });
                }
            }
        }
    }

    exportClick() {
        var _this = this;
        var endTime = $('#endTime').val().replace(/\//g, ''),
            beginTime = $('#beginTime').val().replace(/\//g, ''),
            type = $('#type').val();
        if (endTime < beginTime) {
            alert('结束时间不能小于开始时间')
        } else {
            if (type == 0) {
                window.open('' + url + '/UserStatistics/DownloadService?json={"func":303,"data":{"name":"' + this.state.name + '","sessionId":"' + this.state.sessionId + '","beginTime":"' + beginTime + '","endTime":"' + endTime + '"}}')
            } else if (type == 1) {
                beginTime = beginTime.substring(0, 6);
                endTime = endTime.substring(0, 6);
                var currentMonth = (new Date().getMonth()) + 1;
                if (currentMonth == beginTime.substring(4, 6)) {
                    alert('不能查询当月记录')
                } else {
                    window.open('' + url + '/UserStatistics/DownloadService?json={"func":304,"data":{"name":"' + this.state.name + '","sessionId":"' + this.state.sessionId + '","beginTime":"' + beginTime.replace(/\//g, '') + '","endTime":"' + endTime.replace(/\//g, '') + '"}}')
                }
            }
        }
    }

    typeClick() {
        var type = $('#type').val();
        if (type == '1') {
            monthlyStatistics();
            $("#datetimepicker1").datepicker("setDate", this.state.initialBeginYear);
            $("#datetimepicker2").datepicker("setDate", this.state.initialEndYear);
        } else if (type == '0') {
            initDate();
            $("#datetimepicker1").datepicker("setDate", this.state.initialBegin);
            $("#datetimepicker2").datepicker("setDate", this.state.initialEnd);
        }
    }

    render() {
        return (
            <div>
                <div className="mb24">
                    <span className="font18">
                        开始日期
                        <div id="datetimepicker1" className="input-append date h33 ml15">
                        <input type="text" className="input outline font16" id="beginTime"
                               value={this.state.beginTime} data-format="yyyy/MM/dd"/>
                        <span className="add-on">
                        <i className="glyphicon glyphicon-calendar"></i>
                        </span>
                        </div>
                    </span>
                    <span className="ml15 font18">
                        结束日期
                        <div id="datetimepicker2" className="input-append date h33 ml15">
                        <input type="text" className="input outline font16" id="endTime" value={this.state.endTime}
                               data-format="yyyy/MM/dd"/>
                        <span className="add-on">
                        <i className="glyphicon glyphicon-calendar"></i>
                        </span>
                        </div>
                    </span>
                    <span className="ml15 font18">
                        类型
                        <select className="select h33 ml15 w185 outline font16" id="type"
                                onClick={this.typeClick.bind(this)}>
                                <option value="0" selected="">按日统计</option>
                                <option value="1">按月统计</option>
                        </select>
                    </span>
                    <span className="ml33">
                        <input type="button" value="查询" className="button button-b"
                               onClick={this.inquiriesClick.bind(this)}/>
                        <input type="button" value="导出" className="ml10 button button-b"
                               onClick={this.exportClick.bind(this)}/>
                    </span>

                </div>
                <div className="border form">
                    <FormHeader/>
                    <FormBody summaryArray={this.state.summaryArray}/>
                </div>
                <ReactEcharts option={this.getOtion(this)}
                              style={{height: '300', width: '765', left: '-38px', top: '-10'}}
                              className="echarts-for-echarts"/>
            </div>
        )
    }
}

class FormHeader extends Component {
    render() {
        return (
            <div>
                <ul className="fromheader historical clearfloat">
                    <li>日期</li>
                    <li>日活数据</li>
                    <li>新增用户</li>
                </ul>
            </div>
        )
    }
}

class FormBody extends Component {
    render() {
        return (
            <div>
                <ul className="frombody historicalbody clearfloat h20r">
                    {
                        this.props.summaryArray.map(function (data) {
                            return (
                                <li className="clearfloat">
                                    <span>{data.time}</span>
                                    <span>{data.dailyActive}</span>
                                    <span>{data.newReg}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

HistoricalUser.contextTypes = {
    router: React.PropTypes.isRequired
};
export default HistoricalUser