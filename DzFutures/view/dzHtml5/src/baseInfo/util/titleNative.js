/**
 * Created by xiajing on 2016/8/12.
 */
module.exports = {
    getTitleNative(title){
        if(window.pbEngine){
            document.body.style.paddingTop = '0px';
            pbEngine.sendMessageToNative('Pbkey_H5_Tabbar_Title',title)
        }else{
            document.body.style.paddingTop = '44px';
            return title == true;
        }
    }
}