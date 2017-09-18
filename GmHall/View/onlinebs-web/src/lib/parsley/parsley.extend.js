window.ParsleyConfig = window.ParsleyConfig || {};

(function ($) {
  window.ParsleyConfig = $.extend( true, {}, window.ParsleyConfig, {
    validators: {
      minwords: function ( val, nbWords ) {
        val = val.replace( /(^\s*)|(\s*$)/gi, "" );
        val = val.replace( /[ ]{2,}/gi, " " );
        val = val.replace( /\n /, "\n" );
        val = val.split(' ').length;

        return val >= nbWords;
      },

  bankaccount: function ( val ) {
    var reg = new RegExp("^[0-9]*$");      
    if(!reg.test(val)){
      return false;
    }
    if (!(val.length==16 || val.length==19))
    {
    return false;
    }

    var bankno = val;
    var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";    
    if (strBin.indexOf(bankno.substring(0, 2))== -1) {
        return false;
    }
    var lastNum=bankno.substr(bankno.length-1,1);
        var first15Num=bankno.substr(0,bankno.length-1);
        var newArr=new Array();
        for(var i=first15Num.length-1;i>-1;i--){   
            newArr.push(first15Num.substr(i,1));
        }
        var arrJiShu=new Array(); 
        var arrJiShu2=new Array();    
        var arrOuShu=new Array();  
        for(var j=0;j<newArr.length;j++){
            if((j+1)%2==1){
                if(parseInt(newArr[j])*2<9)
                arrJiShu.push(parseInt(newArr[j])*2);
                else
                arrJiShu2.push(parseInt(newArr[j])*2);
            }
            else 
            arrOuShu.push(newArr[j]);
        }     
        var jishu_child1=new Array();
        var jishu_child2=new Array();
        for(var h=0;h<arrJiShu2.length;h++){
            jishu_child1.push(parseInt(arrJiShu2[h])%10);
            jishu_child2.push(parseInt(arrJiShu2[h])/10);
        }        
        
        var sumJiShu=0;
        var sumOuShu=0; 
        var sumJiShuChild1=0; 
        var sumJiShuChild2=0; 
        var sumTotal=0;
        for(var m=0;m<arrJiShu.length;m++){
            sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
        }
        
        for(var n=0;n<arrOuShu.length;n++){
            sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
        }
        
        for(var p=0;p<jishu_child1.length;p++){
            sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
            sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
        }      
        
        sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
        var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
        var luhm= 10-k;
        if(lastNum==luhm){
        return true;
        }
        else{
        return false;
        }        
           }

     , idcard : function ( val, nbWords ) {
    
      var cardreg = /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|201[1-3])(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[01])[0-9]{3}[0-9xX]$/;
      var idtype=$(nbWords).val();
      if (idtype=="1" || idtype=="6" )
      {
       return '' !== val ? cardreg.test( val ) : false;
       

      }else{

        return '' !== val ?true : false;
      }
        
      }

      , maxwords : function ( val, nbWords ) {
        val = val.replace( /(^\s*)|(\s*$)/gi, "" );
        val = val.replace( /[ ]{2,}/gi, " " );
        val = val.replace( /\n /, "\n" );
        val = val.split(' ').length;

        return val <= nbWords;
      }

      , rangewords: function ( val, obj ) {
        val = val.replace( /(^\s*)|(\s*$)/gi, "" );
        val = val.replace( /[ ]{2,}/gi, " " );
        val = val.replace( /\n /, "\n" );
        val = val.split(' ').length;

        return val >= obj[0] && val <= obj[1];
      }

      , greaterthan: function ( val, elem, self ) {
        self.options.validateIfUnchanged = true;

        return new Number(val) > new Number($( elem ).val());
      }
      , greaterorequal: function ( val, elem, self ) {
        self.options.validateIfUnchanged = true;

        return new Number(val) >= new Number($( elem ).val());
      }
      , lessthan: function ( val, elem, self ) {
        self.options.validateIfUnchanged = true;

        return new Number(val) < new Number($( elem ).val());
      }
      , lessorequal: function ( val, elem, self ) {
        self.options.validateIfUnchanged = true;

        return new Number(val) <= new Number($( elem ).val());
      }
      , beforedate: function ( val, elem, self) {
        return Date.parse(val) < Date.parse($(elem).val());
      }

      , afterdate: function ( val, elem, self) {
        return Date.parse($(elem).val()) < Date.parse(val);
      }

      , inlist: function ( val, list, self ) {
        var delimiter = self.options.inlistDelimiter || ',';
        var listItems = (list + "").split(new RegExp("\\s*\\" + delimiter + "\\s*"));

        return (listItems.indexOf(val.trim()) !== -1);
      }

      , luhn: function ( val, elem, self) {
        val = val.replace(/[ -]/g, '');
        var digit, n, sum, _j, _len1, _ref2;
        sum = 0;
        _ref2 = val.split('').reverse();
        for (n = _j = 0, _len1 = _ref2.length; _j < _len1; n = ++_j) {
          digit = _ref2[n];
          digit = +digit;
          if (n % 2) {
            digit *= 2;
            if (digit < 10) {
              sum += digit;
            } else {
              sum += digit - 9;
            }
          } else {
            sum += digit;
          }
        }
        return sum % 10 === 0;
      }

      , americandate: function ( val, elem, self) {
        if(!/^([01]?[1-9])[\.\/-]([0-3]?[0-9])[\.\/-]([0-9]{4}|[0-9]{2})$/.test(val)) {
        	return false;
        }
        var parts = val.split(/[.\/-]+/);
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);
        if(year == 0 || month == 0 || month > 12) {
          return false;
        }
        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
          monthLength[1] = 29;
        }
        return day > 0 && day <= monthLength[month - 1];
      }
    }
    , messages: {
        minwords:       "This value should have %s words at least."
      , maxwords:       "This value should have %s words maximum."
      , rangewords:     "This value should have between %s and %s words."
      , greaterthan:    "This value should be greater than %s."
      , greaterorequal: "This value should be greater than %s or equal %s."
      , lessthan:       "This value should be less than %s."
      , lessorequal:    "This value should be less than %s or equal %s."
      , beforedate:     "This date should be before %s."
      , afterdate:      "This date should be after %s."
      , luhn:           "This value should pass the luhn test."
      , americandate:	"This value should be a valid date (MM/DD/YYYY)."
    }
  });
}(window.jQuery || window.Zepto));
