(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{cfSo:function(e,t,a){e.exports={title:"antd-pro-pages-profile-basic-profile-title"}},hJFj:function(e,t,a){"use strict";a.r(t);a("ByKi");var n,r,i=a("0KHo"),o=(a("MRDS"),a("JfKX")),l=(a("vIFv"),a("zMAF")),c=a("Pjwa"),s=a.n(c),d=a("2cji"),m=a.n(d),u=a("sp3j"),p=a.n(u),f=a("vZkh"),g=a.n(f),h=a("+KCP"),y=a.n(h),E=(a("NSPR"),a("F7Gs")),v=a("ee5G"),k=a.n(v),x=a("LneV"),I=a("+kNj"),b=a("zHco"),B=a("cfSo"),w=a.n(B),N=I["a"].Description,S=[{title:"\u65f6\u95f4",dataIndex:"time",key:"time"},{title:"\u5f53\u524d\u8fdb\u5ea6",dataIndex:"rate",key:"rate"},{title:"\u72b6\u6001",dataIndex:"status",key:"status",render:function(e){return"success"===e?k.a.createElement(E["a"],{status:"success",text:"\u6210\u529f"}):k.a.createElement(E["a"],{status:"processing",text:"\u8fdb\u884c\u4e2d"})}},{title:"\u64cd\u4f5c\u5458ID",dataIndex:"operator",key:"operator"},{title:"\u8017\u65f6",dataIndex:"cost",key:"cost"}],j=(n=Object(x["connect"])(function(e){var t=e.profile,a=e.loading;return{profile:t,loading:a.effects["profile/fetchBasic"]}}),n(r=function(e){function t(){return s()(this,t),p()(this,g()(t).apply(this,arguments))}return y()(t,e),m()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.dispatch,a=e.match,n=a.params;t({type:"profile/fetchBasic",payload:n.id||"1000000000"})}},{key:"render",value:function(){var e=this.props,t=e.profile,a=void 0===t?{}:t,n=e.loading,r=a.basicGoods,c=void 0===r?[]:r,s=a.basicProgress,d=void 0===s?[]:s,m=a.userInfo,u=void 0===m?{}:m,p=a.application,f=void 0===p?{}:p,g=[];if(c.length){var h=0,y=0;c.forEach(function(e){h+=Number(e.num),y+=Number(e.amount)}),g=c.concat({id:"\u603b\u8ba1",num:h,amount:y})}var E=function(e,t,a){var n={children:e,props:{}};return a===c.length&&(n.props.colSpan=0),n},v=[{title:"\u5546\u54c1\u7f16\u53f7",dataIndex:"id",key:"id",render:function(e,t,a){return a<c.length?k.a.createElement("a",{href:""},e):{children:k.a.createElement("span",{style:{fontWeight:600}},"\u603b\u8ba1"),props:{colSpan:4}}}},{title:"\u5546\u54c1\u540d\u79f0",dataIndex:"name",key:"name",render:E},{title:"\u5546\u54c1\u6761\u7801",dataIndex:"barcode",key:"barcode",render:E},{title:"\u5355\u4ef7",dataIndex:"price",key:"price",align:"right",render:E},{title:"\u6570\u91cf\uff08\u4ef6\uff09",dataIndex:"num",key:"num",align:"right",render:function(e,t,a){return a<c.length?e:k.a.createElement("span",{style:{fontWeight:600}},e)}},{title:"\u91d1\u989d",dataIndex:"amount",key:"amount",align:"right",render:function(e,t,a){return a<c.length?e:k.a.createElement("span",{style:{fontWeight:600}},e)}}];return k.a.createElement(b["a"],{title:"\u57fa\u7840\u8be6\u60c5\u9875",loading:n},k.a.createElement(i["a"],{bordered:!1},k.a.createElement(I["a"],{size:"large",title:"\u9000\u6b3e\u7533\u8bf7",style:{marginBottom:32}},k.a.createElement(N,{term:"\u53d6\u8d27\u5355\u53f7"},f.id),k.a.createElement(N,{term:"\u72b6\u6001"},f.status),k.a.createElement(N,{term:"\u9500\u552e\u5355\u53f7"},f.orderNo),k.a.createElement(N,{term:"\u5b50\u8ba2\u5355"},f.childOrderNo)),k.a.createElement(l["a"],{style:{marginBottom:32}}),k.a.createElement(I["a"],{size:"large",title:"\u7528\u6237\u4fe1\u606f",style:{marginBottom:32}},k.a.createElement(N,{term:"\u7528\u6237\u59d3\u540d"},u.name),k.a.createElement(N,{term:"\u8054\u7cfb\u7535\u8bdd"},u.tel),k.a.createElement(N,{term:"\u5e38\u7528\u5feb\u9012"},u.delivery),k.a.createElement(N,{term:"\u53d6\u8d27\u5730\u5740"},u.addr),k.a.createElement(N,{term:"\u5907\u6ce8"},u.remark)),k.a.createElement(l["a"],{style:{marginBottom:32}}),k.a.createElement("div",{className:w.a.title},"\u9000\u8d27\u5546\u54c1"),k.a.createElement(o["a"],{style:{marginBottom:24},pagination:!1,loading:n,dataSource:g,columns:v,rowKey:"id"}),k.a.createElement("div",{className:w.a.title},"\u9000\u8d27\u8fdb\u5ea6"),k.a.createElement(o["a"],{style:{marginBottom:16},pagination:!1,loading:n,dataSource:d,columns:S})))}}]),t}(v["Component"]))||r);t["default"]=j}}]);