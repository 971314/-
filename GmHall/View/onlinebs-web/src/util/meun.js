/**
 * Created by xiajing on 2016/4/25.
 */
export function initMenu(){
    $(".twoMenu li").click(function(){
        //给选中当前二级ul下面的li  添加样式  并移除同胞的样式和 同级ul 下面的li  的样式
        $(this).addClass('menuStyle').siblings('li').removeClass('menuStyle');
        $(this).parent().siblings('ul').children('li').removeClass('menuStyle');
        //找到当前元素的上一个li 添加样式 并移除此元素的同胞样式
        $(this).parents().prev('li').addClass('menuBigLi').siblings('li').removeClass('menuBigLi');//字体及高度变大 以及移除同胞下的元素样式
        $(this).parents().prev('li').find('img').addClass('menuBigImg').siblings('li').find('img').removeClass('menuBigImg');//图片变大 以及移除同胞下的元素样式
        $(".firstMenu li").first().removeClass('indexAStyle').find('img').removeClass('indexLiBigImg');//移除的是一级下的 第一级的li 的样式
    })
    //初始化时将  一级的  第一个li 添加样式
    $(".firstMenu li").first().addClass('indexAStyle').find('img').addClass('indexLiBigImg');
    $(".firstMenu li").first().click(function(){
        $(".firstMenu li").first().addClass('indexAStyle').find('img').addClass('indexLiBigImg');
        //被选一级ul下 移除其所有的直接子元素以及子元素中img标签的样式
        $(".firstMenu").children().removeClass('menuBigLi').find('li').removeClass('menuStyle').find('img').removeClass('menuBigImg');
    })
}
