(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{"7GcH":function(e,a,t){e.exports={stepForm:"antd-pro-pages-forms-step-form-style-stepForm",stepFormText:"antd-pro-pages-forms-step-form-style-stepFormText",result:"antd-pro-pages-forms-step-form-style-result",desc:"antd-pro-pages-forms-step-form-style-desc",information:"antd-pro-pages-forms-step-form-style-information",label:"antd-pro-pages-forms-step-form-style-label",money:"antd-pro-pages-forms-step-form-style-money",uppercase:"antd-pro-pages-forms-step-form-style-uppercase"}},OTy5:function(e,a,t){"use strict";t.r(a);t("vIFv");var n,r,l,s=t("zMAF"),c=(t("lSJu"),t("bxpF")),m=(t("lFM6"),t("35aY")),o=t("U1Sa"),p=t.n(o),i=t("Pjwa"),u=t.n(i),f=t("2cji"),d=t.n(f),E=t("sp3j"),y=t.n(E),h=t("vZkh"),v=t.n(h),b=t("+KCP"),g=t.n(b),F=(t("FBDu"),t("TeBW")),x=(t("kJbr"),t("9Ayl")),C=t("ee5G"),w=t.n(C),N=t("LneV"),k=t("WcUY"),j=t("7GcH"),I=t.n(j),A=x["a"].Option,P={labelCol:{span:5},wrapperCol:{span:19}},G=(n=Object(N["connect"])(function(e){var a=e.form;return{data:a.step}}),r=F["a"].create(),n(l=r(l=function(e){function a(){return u()(this,a),y()(this,v()(a).apply(this,arguments))}return g()(a,e),d()(a,[{key:"render",value:function(){var e=this.props,a=e.form,t=e.dispatch,n=e.data,r=a.getFieldDecorator,l=a.validateFields,o=function(){l(function(e,a){e||(t({type:"form/saveStepFormData",payload:a}),k["a"].push("/form/step-form/confirm"))})};return w.a.createElement(C["Fragment"],null,w.a.createElement(F["a"],{layout:"horizontal",className:I.a.stepForm,hideRequiredMark:!0},w.a.createElement(F["a"].Item,p()({},P,{label:"\u4ed8\u6b3e\u8d26\u6237"}),r("payAccount",{initialValue:n.payAccount,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u4ed8\u6b3e\u8d26\u6237"}]})(w.a.createElement(x["a"],{placeholder:"test@example.com"},w.a.createElement(A,{value:"ant-design@alipay.com"},"ant-design@alipay.com")))),w.a.createElement(F["a"].Item,p()({},P,{label:"\u6536\u6b3e\u8d26\u6237"}),w.a.createElement(m["a"].Group,{compact:!0},w.a.createElement(x["a"],{defaultValue:"alipay",style:{width:100}},w.a.createElement(A,{value:"alipay"},"\u652f\u4ed8\u5b9d"),w.a.createElement(A,{value:"bank"},"\u94f6\u884c\u8d26\u6237")),r("receiverAccount",{initialValue:n.receiverAccount,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6536\u6b3e\u4eba\u8d26\u6237"},{type:"email",message:"\u8d26\u6237\u540d\u5e94\u4e3a\u90ae\u7bb1\u683c\u5f0f"}]})(w.a.createElement(m["a"],{style:{width:"calc(100% - 100px)"},placeholder:"test@example.com"})))),w.a.createElement(F["a"].Item,p()({},P,{label:"\u6536\u6b3e\u4eba\u59d3\u540d"}),r("receiverName",{initialValue:n.receiverName,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6536\u6b3e\u4eba\u59d3\u540d"}]})(w.a.createElement(m["a"],{placeholder:"\u8bf7\u8f93\u5165\u6536\u6b3e\u4eba\u59d3\u540d"}))),w.a.createElement(F["a"].Item,p()({},P,{label:"\u8f6c\u8d26\u91d1\u989d"}),r("amount",{initialValue:n.amount,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8f6c\u8d26\u91d1\u989d"},{pattern:/^(\d+)((?:\.\d+)?)$/,message:"\u8bf7\u8f93\u5165\u5408\u6cd5\u91d1\u989d\u6570\u5b57"}]})(w.a.createElement(m["a"],{prefix:"\uffe5",placeholder:"\u8bf7\u8f93\u5165\u91d1\u989d"}))),w.a.createElement(F["a"].Item,{wrapperCol:{xs:{span:24,offset:0},sm:{span:P.wrapperCol.span,offset:P.labelCol.span}},label:""},w.a.createElement(c["a"],{type:"primary",onClick:o},"\u4e0b\u4e00\u6b65"))),w.a.createElement(s["a"],{style:{margin:"40px 0 24px"}}),w.a.createElement("div",{className:I.a.desc},w.a.createElement("h3",null,"\u8bf4\u660e"),w.a.createElement("h4",null,"\u8f6c\u8d26\u5230\u652f\u4ed8\u5b9d\u8d26\u6237"),w.a.createElement("p",null,"\u5982\u679c\u9700\u8981\uff0c\u8fd9\u91cc\u53ef\u4ee5\u653e\u4e00\u4e9b\u5173\u4e8e\u4ea7\u54c1\u7684\u5e38\u89c1\u95ee\u9898\u8bf4\u660e\u3002\u5982\u679c\u9700\u8981\uff0c\u8fd9\u91cc\u53ef\u4ee5\u653e\u4e00\u4e9b\u5173\u4e8e\u4ea7\u54c1\u7684\u5e38\u89c1\u95ee\u9898\u8bf4\u660e\u3002\u5982\u679c\u9700\u8981\uff0c\u8fd9\u91cc\u53ef\u4ee5\u653e\u4e00\u4e9b\u5173\u4e8e\u4ea7\u54c1\u7684\u5e38\u89c1\u95ee\u9898\u8bf4\u660e\u3002"),w.a.createElement("h4",null,"\u8f6c\u8d26\u5230\u94f6\u884c\u5361"),w.a.createElement("p",null,"\u5982\u679c\u9700\u8981\uff0c\u8fd9\u91cc\u53ef\u4ee5\u653e\u4e00\u4e9b\u5173\u4e8e\u4ea7\u54c1\u7684\u5e38\u89c1\u95ee\u9898\u8bf4\u660e\u3002\u5982\u679c\u9700\u8981\uff0c\u8fd9\u91cc\u53ef\u4ee5\u653e\u4e00\u4e9b\u5173\u4e8e\u4ea7\u54c1\u7684\u5e38\u89c1\u95ee\u9898\u8bf4\u660e\u3002\u5982\u679c\u9700\u8981\uff0c\u8fd9\u91cc\u53ef\u4ee5\u653e\u4e00\u4e9b\u5173\u4e8e\u4ea7\u54c1\u7684\u5e38\u89c1\u95ee\u9898\u8bf4\u660e\u3002")))}}]),a}(w.a.PureComponent))||l)||l);a["default"]=G},Tc1X:function(e,a,t){"use strict";t.r(a);t("lSJu");var n,r,l=t("bxpF"),s=(t("wF++"),t("5BGb")),c=(t("XoiG"),t("ImDg")),m=t("Pjwa"),o=t.n(m),p=t("2cji"),i=t.n(p),u=t("sp3j"),f=t.n(u),d=t("vZkh"),E=t.n(d),y=t("+KCP"),h=t.n(y),v=t("ee5G"),b=t.n(v),g=t("LneV"),F=t("WcUY"),x=t("ALo4"),C=t("7GcH"),w=t.n(C),N=(n=Object(g["connect"])(function(e){var a=e.form;return{data:a.step}}),n(r=function(e){function a(){return o()(this,a),f()(this,E()(a).apply(this,arguments))}return h()(a,e),i()(a,[{key:"render",value:function(){var e=this.props.data,a=function(){F["a"].push("/form/step-form/info")},t=b.a.createElement("div",{className:w.a.information},b.a.createElement(s["a"],null,b.a.createElement(c["a"],{xs:24,sm:8,className:w.a.label},"\u4ed8\u6b3e\u8d26\u6237\uff1a"),b.a.createElement(c["a"],{xs:24,sm:16},e.payAccount)),b.a.createElement(s["a"],null,b.a.createElement(c["a"],{xs:24,sm:8,className:w.a.label},"\u6536\u6b3e\u8d26\u6237\uff1a"),b.a.createElement(c["a"],{xs:24,sm:16},e.receiverAccount)),b.a.createElement(s["a"],null,b.a.createElement(c["a"],{xs:24,sm:8,className:w.a.label},"\u6536\u6b3e\u4eba\u59d3\u540d\uff1a"),b.a.createElement(c["a"],{xs:24,sm:16},e.receiverName)),b.a.createElement(s["a"],null,b.a.createElement(c["a"],{xs:24,sm:8,className:w.a.label},"\u8f6c\u8d26\u91d1\u989d\uff1a"),b.a.createElement(c["a"],{xs:24,sm:16},b.a.createElement("span",{className:w.a.money},e.amount)," \u5143"))),n=b.a.createElement(v["Fragment"],null,b.a.createElement(l["a"],{type:"primary",onClick:a},"\u518d\u8f6c\u4e00\u7b14"),b.a.createElement(l["a"],null,"\u67e5\u770b\u8d26\u5355"));return b.a.createElement(x["a"],{type:"success",title:"\u64cd\u4f5c\u6210\u529f",description:"\u9884\u8ba1\u4e24\u5c0f\u65f6\u5185\u5230\u8d26",extra:t,actions:n,className:w.a.result})}}]),a}(b.a.PureComponent))||r);a["default"]=N},szkQ:function(e,a,t){"use strict";t.r(a),t.d(a,"default",function(){return F});t("ByKi");var n=t("0KHo"),r=t("Pjwa"),l=t.n(r),s=t("2cji"),c=t.n(s),m=t("sp3j"),o=t.n(m),p=t("vZkh"),i=t.n(p),u=t("+KCP"),f=t.n(u),d=(t("IQo9"),t("9ycm")),E=t("ee5G"),y=t.n(E),h=t("zHco"),v=t("Zpge"),b=t.n(v),g=d["a"].Step,F=function(e){function a(){return l()(this,a),o()(this,i()(a).apply(this,arguments))}return f()(a,e),c()(a,[{key:"getCurrentStep",value:function(){var e=this.props.location,a=e.pathname,t=a.split("/");switch(t[t.length-1]){case"info":return 0;case"confirm":return 1;case"result":return 2;default:return 0}}},{key:"render",value:function(){var e=this.props,a=e.location,t=e.children;return y.a.createElement(h["a"],{title:"\u5206\u6b65\u8868\u5355",tabActiveKey:a.pathname,content:"\u5c06\u4e00\u4e2a\u5197\u957f\u6216\u7528\u6237\u4e0d\u719f\u6089\u7684\u8868\u5355\u4efb\u52a1\u5206\u6210\u591a\u4e2a\u6b65\u9aa4\uff0c\u6307\u5bfc\u7528\u6237\u5b8c\u6210\u3002"},y.a.createElement(n["a"],{bordered:!1},y.a.createElement(E["Fragment"],null,y.a.createElement(d["a"],{current:this.getCurrentStep(),className:b.a.steps},y.a.createElement(g,{title:"\u586b\u5199\u8f6c\u8d26\u4fe1\u606f"}),y.a.createElement(g,{title:"\u786e\u8ba4\u8f6c\u8d26\u4fe1\u606f"}),y.a.createElement(g,{title:"\u5b8c\u6210"})),t)))}}]),a}(E["PureComponent"])},zfh6:function(e,a,t){"use strict";t.r(a);t("lSJu");var n,r,l,s=t("bxpF"),c=(t("lFM6"),t("35aY")),m=(t("vIFv"),t("zMAF")),o=t("U1Sa"),p=t.n(o),i=(t("BXzi"),t("UnUk")),u=t("smUt"),f=t.n(u),d=t("Pjwa"),E=t.n(d),y=t("2cji"),h=t.n(y),v=t("sp3j"),b=t.n(v),g=t("vZkh"),F=t.n(g),x=t("+KCP"),C=t.n(x),w=(t("FBDu"),t("TeBW")),N=t("ee5G"),k=t.n(N),j=t("LneV"),I=t("WcUY"),A=t("+n12"),P=t("7GcH"),G=t.n(P),S={labelCol:{span:5},wrapperCol:{span:19}},T=(n=Object(j["connect"])(function(e){var a=e.form,t=e.loading;return{submitting:t.effects["form/submitStepForm"],data:a.step}}),r=w["a"].create(),n(l=r(l=function(e){function a(){return E()(this,a),b()(this,F()(a).apply(this,arguments))}return C()(a,e),h()(a,[{key:"render",value:function(){var e=this.props,a=e.form,t=e.data,n=e.dispatch,r=e.submitting,l=a.getFieldDecorator,o=a.validateFields,u=function(){I["a"].push("/form/step-form/info")},d=function(e){e.preventDefault(),o(function(e,a){e||n({type:"form/submitStepForm",payload:f()({},t,a)})})};return k.a.createElement(w["a"],{layout:"horizontal",className:G.a.stepForm},k.a.createElement(i["a"],{closable:!0,showIcon:!0,message:"\u786e\u8ba4\u8f6c\u8d26\u540e\uff0c\u8d44\u91d1\u5c06\u76f4\u63a5\u6253\u5165\u5bf9\u65b9\u8d26\u6237\uff0c\u65e0\u6cd5\u9000\u56de\u3002",style:{marginBottom:24}}),k.a.createElement(w["a"].Item,p()({},S,{className:G.a.stepFormText,label:"\u4ed8\u6b3e\u8d26\u6237"}),t.payAccount),k.a.createElement(w["a"].Item,p()({},S,{className:G.a.stepFormText,label:"\u6536\u6b3e\u8d26\u6237"}),t.receiverAccount),k.a.createElement(w["a"].Item,p()({},S,{className:G.a.stepFormText,label:"\u6536\u6b3e\u4eba\u59d3\u540d"}),t.receiverName),k.a.createElement(w["a"].Item,p()({},S,{className:G.a.stepFormText,label:"\u8f6c\u8d26\u91d1\u989d"}),k.a.createElement("span",{className:G.a.money},t.amount),k.a.createElement("span",{className:G.a.uppercase},"\uff08",Object(A["a"])(t.amount),"\uff09")),k.a.createElement(m["a"],{style:{margin:"24px 0"}}),k.a.createElement(w["a"].Item,p()({},S,{label:"\u652f\u4ed8\u5bc6\u7801",required:!1}),l("password",{initialValue:"123456",rules:[{required:!0,message:"\u9700\u8981\u652f\u4ed8\u5bc6\u7801\u624d\u80fd\u8fdb\u884c\u652f\u4ed8"}]})(k.a.createElement(c["a"],{type:"password",autoComplete:"off",style:{width:"80%"}}))),k.a.createElement(w["a"].Item,{style:{marginBottom:8},wrapperCol:{xs:{span:24,offset:0},sm:{span:S.wrapperCol.span,offset:S.labelCol.span}},label:""},k.a.createElement(s["a"],{type:"primary",onClick:d,loading:r},"\u63d0\u4ea4"),k.a.createElement(s["a"],{onClick:u,style:{marginLeft:8}},"\u4e0a\u4e00\u6b65")))}}]),a}(k.a.PureComponent))||l)||l);a["default"]=T}}]);