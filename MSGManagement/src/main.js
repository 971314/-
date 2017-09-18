import Vue from 'vue';
import VueRouter from "vue-router";
import  { 
    Pagination,
  Dialog,
//  Autocomplete,
//  Dropdown,
//  DropdownMenu,
//  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
//  MenuItemGroup,
  Input,
//  InputNumber,
  Radio,
//  RadioGroup,
//  RadioButton,
  Checkbox,
//  CheckboxGroup,
//  Switch,
  Select,
  Option,
//  OptionGroup,
  Button,
//  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
//  TimeSelect,
//  TimePicker,
//  Popover,
//  Tooltip,
//  Breadcrumb,
//  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
//  Tag,
//  Tree,
//  Alert,
//  Slider,
//  Icon,
//  Row,
//  Col,
  Upload,
//  Progress,
//  Spinner,
//  Badge,
//  Card,
//  Rate,
//  Steps,
//  Step,
//  Carousel,
//  Scrollbar,
//  CarouselItem,
//  Collapse,
//  CollapseItem,
//  Cascader,
//  ColorPicker,
  Loading,
  MessageBox,
//  Message
} from 'element-ui';
import "./style.less";
import App from './components/app.vue';

Vue.use(VueRouter);
Vue.component("Page", Pagination);
Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Option);
Vue.component("Btn", Button);
Vue.use(Table);
Vue.component("Column", TableColumn);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.component("Tabs", Tabs);
Vue.component("Pane", TabPane);
Vue.use(Upload);

var load;
$.extend(Vue.prototype, config, {
    $loading(f){
        if(f===false) 
            load.close();
        else
            load = Loading.service();
    },
    $error(msg){
        MessageBox.alert(msg, "", {type:"error"});
    },
    $info(msg){
        MessageBox.alert(msg, "", {type:"success"});
    },
    $confirm(msg, confirmCallback){
        MessageBox.confirm(msg, "", {type:"warning",callback(r){
            r=="confirm" && confirmCallback();
        }});
    },
    $prompt: MessageBox.prompt,
    $post(func, data, success, page, error){
        this.$loading();
        page && (data=$.extend({pagecount:page.count||"10", currentindex:page.page||page}, data));
        $.ajax({url: config.api,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({func:func+"", uid:this.$root.uid||"1", data:[data]}),
				success: res=>{
                    load.close();
                    if(res.retHead != 0) {
                        (error||this.$error)(res.desc);
                        return;
                    }
                    success && success(res.data[0]);
                },
				error(a, b, c){
                    load.close();
                    alert(func+"\n"+b+"\n"+c);
                }
        })
    }
});

function f2(v){
    return v<10?"0"+v:v;
}
Vue.filter("time", (v)=>{
    if(!v || v<1)
        return "";
    var d = new Date();
    d.setTime(v);
    return d.getFullYear() + "-" + f2(d.getMonth()+1) + "-" + f2(d.getDate()) 
        + " " + f2(d.getHours()) + ":" + f2(d.getMinutes());
})

String.prototype.ellipse = function(l){
    !l&&(l=40); 
    return this.length>l?this.substr(0,l)+"...":this;
}

App.router = new VueRouter({
    routes: [
        {
            path: "/send",
            component: require("./components/send.vue")
        },
        {
            path: "/group",
            component: require("./components/group.vue")
        },
        {
            path: "/msg/:id",
            component: require("./components/msg.vue")
        },
        {
            path: "/audit",
            component: require("./components/audit.vue")
        },
        {
            path: "/auditHistory",
            component: require("./components/auditHistory.vue")
        },
        {
            path: "/log",
            component: require("./components/log.vue")
        }
    ]
});

App.router.beforeEach((to, from, next) => {
    if(to.path == "/" && from.path!="/") {
        next(false);
        return;
    }
    next();
});

new Vue(App);