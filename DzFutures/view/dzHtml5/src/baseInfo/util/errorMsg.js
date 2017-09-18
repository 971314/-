/**
 * Created by xiajing on 2016/8/24.
 */

//过滤所有接口返回的信息处理
export function getErrorMsg(data){
    if(data.retHead == 1) {//如果等于1说明是成功
        return data.retHead;
    }
}