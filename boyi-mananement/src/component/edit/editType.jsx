/**
 * Created by xiajing on 2016/11/9.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import {historyPvw,typeFive,queryHttpUrl,editHttpUrl,productNone,productTypeIOS,productTypeAndroid,productTypeAll } from '../../util/config.js';
import {getStorage,saveStorage} from '../../util/storageData.js'
class EditType extends Component{
    constructor(props){
        super(props)
        this.state = {
            productList:[],
            dataFlag:''
        }
    }
    componentDidMount(){
        let _this = this;
        var tokenInfo = getStorage("tokenInfo");
        if(tokenInfo !=null){
            var info = JSON.parse(tokenInfo);
            $.ajax({
                url:httpsUrl+editHttpUrl,
                method:'post',
                dataType:'json',
                xhrFields:{withCredentials: true},
                crossDomain:true,
                data:{
                    json:JSON.stringify({
                        func:productNone,
                        id:info.id,
                        token:info.token
                    })
                },
                success:function(data){
                    console.log(data)
                    if(data.status == 0){
                       _this.setState({productList:data.data,dataFlag:data.flag})
                    }else if(data.status == '-2' || data.status == '-9'){
                        _this.context.router.push('/');
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
    clickType(productID,appVersion){
        let obj = {productID:productID,appVersion:appVersion,productType:productID}
        saveStorage("versionInfo",obj)
        var versionName;
        if(productID == productTypeAndroid){
            versionName =  '安卓'
        }
        if(productID == productTypeIOS){
            versionName = '苹果'
        }
        if(productID == productTypeAll){
            versionName = '苹果/安卓'
        }
        this.context.router.push('indexEdit/4?title='+versionName+'&showInfo=1');
    }
    render(){
        var _this = this;
        return(
            <div className="rightDivInfo">
                <div style={{marginTop:'30px'}}>
                 <span className="editSpan">
                   选择你需要编辑的版本
                 </span>
                    <div className="dropdown disIn">
                        <button type="button" className="btn dropdown-toggle editType" id="dropdownMenu1" data-toggle="dropdown">
                            正在编辑平台
                            <span class="caret platSpan"></span>
                        </button>
                        <ul className="dropdown-menu editTypeInfo" role="menu" aria-labelledby="dropdownMenu1">
                            {
                                this.state.productList.map(function(data){
                                    return(
                                        <li role="presentation">
                                            <Link  onClick={_this.clickType.bind(_this,data.productID,data.appVersion)}>
                                                <a role="menuitem" tabindex="-1">
                                                    平台:
                                                    {data.productID == productTypeAndroid ? '安卓':''}
                                                    {data.productID == productTypeIOS ? '苹果':''}
                                                    {data.productID == productTypeAll ? '苹果/安卓':''},
                                                    版本号:{data.appVersion}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
EditType.contextTypes = {
    router: React.PropTypes.isRequired
}
export default EditType