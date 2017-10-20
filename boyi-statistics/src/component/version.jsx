import  React,{Component} from 'react';
import {versionDate, getLastYearYestdy,day,month,sort,monthlyStatistics,setDateDate,setMonthDeta,setDateHis} from '../js/main';

class version extends Component{
    constructor(props){
        super(props);
        var d = new Date();
        var enddata = d.getDate()+ '',
            endMonth =(d.getMonth()+1) + '';
        enddata = setDateHis(enddata);
        endMonth = setDateHis(endMonth);
        var endTime = d.getFullYear()+"/"+endMonth+"/"+enddata;
        this.state = {
            beginTime:endTime,
            endTime:endTime,
            summaryArray:[],
            name:'',
            sessionId:''
        };
    }
    componentDidMount(){
        versionDate();
        var _this = this;
        var sessionData = sessionStorage.getItem("sessionInfo");
        if(sessionData != null && sessionData!= ''){
            var dat = JSON.parse(sessionData);
            _this.setState({name:dat.name,sessionId:dat.sessionId,});
            var data = {
                "func": 501,
                "data": {
                    "name": dat.name,
                    "sessionId": dat.sessionId,
                    "beginTime": this.state.beginTime.replace(/\//g,''),
                    "endTime": this.state.endTime.replace(/\//g,'')
                }
            };
            $.ajax({
                url:''+url+'/UserStatistics/WebService',
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data:JSON.stringify(data),
                success: function (data) {
                    if(data.retHead == 0){
                        var dat = data.data,
                            proportionAnd = 0;
                        for(var i = 0;i < dat.length;i++){
                            proportionAnd += dat[i].count
                        }
                        for(var j = 0;j < dat.length;j++){
                            dat[j].proportion = ((dat[j].count/proportionAnd)*100).toFixed(2) + '%';
                        }
                        _this.setState({
                            summaryArray:dat
                        });
                    }else if(data.retHead == -6){
                        alert('请先登录')
                        _this.context.router.push('/');
                    }
                }, error: function (data) {
                    console.log("服务器异常");
                }
            });
        }
    }
    inquiriesClick(){
        var _this = this;
        var endTime = $('#endTime').val().replace(/\//g,''),
            beginTime = $('#beginTime').val().replace(/\//g,''),
            type = $('#type').val();
        if(endTime < beginTime){
            alert('结束时间不能小于开始时间')
        }else{
                var data = {
                    "func": 501,
                    "data": {
                        "name":this.state.name,
                        "sessionId": this.state.sessionId,
                        "beginTime": beginTime,
                        "endTime": endTime
                    }
                };
                $.ajax({
                    url:''+url+'/UserStatistics/WebService',
                    type: 'POST',
                    crossDomain: true,
                    contentType: 'application/json',
                    data:JSON.stringify(data),
                    success: function (data) {
                        beginTime = day(beginTime);
                        endTime = day(endTime);
                        if(data.retHead == 0){
                            var dat = data.data,
                                proportionAnd = 0;
                            for(var i = 0;i < dat.length;i++){
                                proportionAnd += dat[i].count
                            }
                            for(var j = 0;j < dat.length;j++){
                                dat[j].proportion = ((dat[j].count/proportionAnd)*100).toFixed(2) + '%';
                            }
                            _this.setState({
                                summaryArray:dat,
                                beginTime:beginTime,
                                endTime:endTime
                            });
                        }else if(data.retHead == -8){
                            alert('没有该时间段记录');
                            _this.setState({
                                summaryArray: [],
                                beginTime: beginTime,
                                endTime: endTime,
                                getOtion: []
                            })
                        }else if(data.retHead == -6){
                            alert('请先登录');
                            _this.context.router.push('/');
                        }
                    }, error: function (data) {
                        console.log("服务器异常");
                    }
                });
        }
    }
    render(){
        return(
            <div>
                <div className="mb24">
                    <span className="font18">
                        开始日期
                        <div id="datetimepicker1" className="input-append date h33 ml15">
                        <input type="text" className="input outline font16" id="beginTime" value={this.state.beginTime}/>
                        <span class="add-on">
                        <i className="glyphicon glyphicon-calendar"></i>
                        </span>
                        </div>
                    </span>
                    <span className="ml15 font18">
                        结束日期
                        <div id="datetimepicker2" className="input-append date h33 ml15">
                        <input type="text" className="input outline font16" id="endTime" value={this.state.endTime}/>
                        <span className="add-on">
                        <i className="glyphicon glyphicon-calendar"></i>
                        </span>
                        </div>
                    </span>
                    <span className="ml14r">
                        <input type="button" value="查询" className="button button-b" onClick={this.inquiriesClick.bind(this)}/>
                    </span>
                </div>
                <div className="border form" style={{height:633}}>
                    <FormHeader/>
                    <FormBody summaryArray={this.state.summaryArray}/>
                </div>
            </div>
        )
    }
}

class FormHeader extends Component{
    render(){
        return(
            <div>
                <ul className="fromheader historical clearfloat">
                    <li>版本</li>
                    <li>数量</li>
                    <li>比例</li>
                </ul>
            </div>
        )
    }
}

class FormBody extends Component{
    render(){
        return(
            <div>
                <ul className="frombody historicalbody clearfloat h37r">
                    {
                        this.props.summaryArray.map(function(data){
                            return(
                                <li className="clearfloat">
                                    <span className="alignLeft textIndex3">{data.softVersion}</span>
                                    <span>{data.count}</span>
                                    <span>{data.proportion}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

version.contextTypes = {
    router: React.PropTypes.isRequired
};

export default version