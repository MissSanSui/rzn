(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{Fi3x:function(e,a,t){"use strict";t.r(a);var r=t("smUt"),n=t.n(r),s=t("NTxs"),c=t.n(s),u=(t("K9tu"),t("mYvE")),o=t("DWJA"),p=t("dCQc");a["default"]={namespace:"form",state:{step:{payAccount:"ant-design@alipay.com",receiverAccount:"test@example.com",receiverName:"Alex",amount:"500"}},effects:{submitRegularForm:c.a.mark(function e(a,t){var r,n;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,e.next=4,n(p["f"],r);case 4:u["a"].success("\u63d0\u4ea4\u6210\u529f");case 5:case"end":return e.stop()}},e)}),submitStepForm:c.a.mark(function e(a,t){var r,n,s;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,s=t.put,e.next=4,n(p["f"],r);case 4:return e.next=6,s({type:"saveStepFormData",payload:r});case 6:return e.next=8,s(o["routerRedux"].push("/form/step-form/result"));case 8:case"end":return e.stop()}},e)}),submitAdvancedForm:c.a.mark(function e(a,t){var r,n;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,e.next=4,n(p["f"],r);case 4:u["a"].success("\u63d0\u4ea4\u6210\u529f");case 5:case"end":return e.stop()}},e)})},reducers:{saveStepFormData:function(e,a){var t=a.payload;return n()({},e,{step:n()({},e.step,t)})}}}}}]);