/**
 * Created by xiajing on 2016/11/10.
 */
//保存信息
export function saveStorage(userName,obj){
    sessionStorage.setItem(userName,JSON.stringify(obj))
}
//获取存储的信息
export function getStorage(userName){
   return sessionStorage.getItem(userName)
}
//永久保存
export function saveLocalStorage(userName,obj){
    localStorage.setItem(userName,JSON.stringify(obj))
}
//永久保存
export function getLocalStorage(userName){
    return localStorage.getItem(userName)
}