/**
* /!\ This file is just an example template to create/update your own language file /!\
*/

window.ParsleyConfig = window.ParsleyConfig || {};

(function ($) {
  window.ParsleyConfig = $.extend( true, {}, window.ParsleyConfig, {
    messages: {
      // parsley //////////////////////////////////////
        defaultMessage: "不正确的值"
        , type: {
            email:      "请填写合法的电子邮件地址"
          , url:        "请填写合法的URL地址"
          , urlstrict:  "请填写合法的URL地址"
          , number:     "请填写数字"
          , digits:     "请填写正整数"
          , dateIso:    "请填写一个符合格式的日期(YYYY-MM-DD)."
          , alphanum:   "只允许字符数字和下划线"
          , phone:      "请填写合法的手机号码"
        }
      , notnull:        "请填写内容"
      , notblank:       "请填写非空的内容"
      , required:       "必填字段"
      , regexp:         "值不合法"
      , min:            "只允许大于等于 %s"
      , max:            "只允许小于等于 %s."
      , range:          "只允许大于等于 %s 并小于等于 %s."
      , minlength:      "长度太短，应该大于等于 %s 个字符"
      , maxlength:      "长度过长，应该小于等于 %s 个字符"
      , rangelength:    "长度非法，应该在 %s 和 %s 个字符之间"
      , mincheck:       "你至少要选择 %s 个选项"
      , maxcheck:       "你最多只能选择 %s 个选项"
      , rangecheck:     "你只能选择 %s 到 %s 个选项"
      , equalto:        "两次的值应该一样"
      , notequalto:     "两次的值不能一样"

      // parsley.extend ///////////////////////////////
      , minwords:       "允许至少有 %s 个词"
      , maxwords:       "最多只能有 %s 个词"
      , rangewords:     "只允许 %s 到 %s 个词"
      , greaterthan:    "只允许大于 %s"
      , greaterorequal: "只允许大于或等于 %s"
      , lessthan:       "只允许小于 %s"
      , lessorequal:    "只允许小于或等于 %s"
      , beforedate:     "日期应该早于 %s."
      , afterdate:      "日期应该晚于 %s."
    },
    animate: false,
    trigger: "change keyup focusin",
    validationMinlength: 1,
    errors: {
      container: function(elem, isRadioOrCheckbox) {
        if (elem.closest(".parsley-container").length === 1) {
          return elem.closest(".parsley-container")
        }
        if (elem.parent().is(".controls")) {
          return elem.parent()
        }
        // return undefined for default behavior
        return undefined
      }
    },
    listeners: {
      onFieldValidate: function(elem) {
        return !elem.is(":visible") || elem.prop("disabled")
      }
    }
  });
}(window.jQuery || window.Zepto));
