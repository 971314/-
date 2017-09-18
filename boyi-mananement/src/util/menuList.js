/**
 * Created by xiajing on 2016/11/25.
 */
export function initMenuList(){
    //给有子对象的元素加收缩图标
    $("#tree ul").each(function(index,element){
        var ulContent = $(element).html();
        var liContent = $(element).siblings("a").html();
        if(ulContent){
            $(element).siblings("a").html("<img   class='menuRightImg' src='../view/images/right.png'/>" + liContent)
        }
    })
    $("#tree").find("ul a").click(function(){
        var ul = $(this).siblings("ul");
        var valueName = $(this).text();
        if(ul.find("li").html() != null){
            if(ul.css("display") == "none"){
                ul.show(300);
                $(this).html("<img class='menuDownImg' src='../view/images/down.png'/> "+valueName);
            }else{
                ul.hide(300);
                $(this).html("<img  class='menuRightImg' src='../view/images/right.png'/> "+valueName );
            }
        }
    })
}
//点击给table 中的tr添加颜色
export function clickTable(){
    $("tbody tr").click(function(){
        //console.log($(this))
        $(this).addClass("tableCheckCss").siblings().removeClass("tableCheckCss");
    });
}