/**
 * Created by xiajing on 2016/10/25.
 */
export function exportCsv(obj){
    //title ["","",""]
    var title = obj.title;
    //titleForKey ["","",""]
    var titleForKey = obj.titleForKey;
    var data = obj.data;
    var str = [];
    str.push(obj.title.join(",")+"\n");
    for(var i=0;i<data.length;i++){
        var temp = [];
        for(var j=0;j<titleForKey.length;j++){
            temp.push(data[i][titleForKey[j]]);
        }
        str.push(temp.join(",")+"\n");
    }
    var uri = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(str.join(""));
    var downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = "数据统计.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}