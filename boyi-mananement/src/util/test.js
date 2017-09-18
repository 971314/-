/**
 * Created by xiajing on 2016/11/14.
 */

    export function init(){
    var json = [{"name":"*a","list":[
        {"name":"**a","url":"#a1"},
        {"name":"**aa","list":[
            {"name":"***a","url":"#a11"},  {"name":"***aa","list":[ {"name":"****a","url":"#a111"},  {"name":"****aa","list":[ {"name":"*****a","url":"#a1111"},  {"name":"*****aa","url":"#a1112"}
            ]}
            ]},
            {"name":"***aaa","url":"#a13"},
            {"name":"***aaaa","url":"#a14"}
        ]
        },
        {"name":"**a","url":"#a3"}
    ]
    },
        {"name":"*b","list":[
            {"name":"**b","url":"#b1"},
            {"name":"**bb","list":[
                {"name":"****b","url":"#b111"},
                {"name":"****bb","url":"#b112"}
            ]
            },
        ]
        },
        {"name":"*c","list":[
            {"name":"**c","url":"#c1"},
            {"name":"**cc","url":"#c2"}
        ]
        },
        {"name":"*d"}
    ]
    /*递归实现获取无级树数据并生成DOM结构*/
    var str = "";
    var forTree = function(o){
        for(var i=0;i<o.length;i++){
            var urlstr = "";
            try{
                if(typeof o[i]["url"] == "undefined"){
                    urlstr = "<div><span>"+ o[i]["name"] +"</span><ul>";
                }else{
                    urlstr = "<div><span><a href="+ o[i]["url"] +">"+ o[i]["name"] +"</a></span><ul>";
                }
                str += urlstr;
                if(o[i]["list"] != null){
                    forTree(o[i]["list"]);
                }
                str += "</ul></div>";
            }catch(e){}
        }
        return str;
    }
    /*添加无级树*/
    document.getElementById("menuTree").innerHTML = forTree(json);
    /*树形菜单*/
    var menuTree = function(){
        //给有子对象的元素加[+-]
        $("#menuTree ul").each(function(index, element) {
            var ulContent = $(element).html();
            var spanContent = $(element).siblings("span").html();
            if(ulContent){
                $(element).siblings("span").html("[+] " + spanContent)
            }
        });
        $("#menuTree").find("div span").click(function(){
            var ul = $(this).siblings("ul");
            var spanStr = $(this).html();
            var spanContent = spanStr.substr(3,spanStr.length);
            if(ul.find("div").html() != null){
                if(ul.css("display") == "none"){
                    ul.show(300);
                    $(this).html("[-] " + spanContent);
                }else{
                    ul.hide(300);
                    $(this).html("[+] " + spanContent);
                }
            }
        })
    }()
}
