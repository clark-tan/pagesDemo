(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["reportOnline","chunk-722fc792","chunk-ed32b3ac","chunk-2d2307dd"],{"03c7":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-layout",{staticClass:"reportOnlineLayout"},[this._.isEmpty(t.orginData)?a("a-spin",{attrs:{tip:"正在加载...",spinning:t.onSpinning}},[a("a-empty")],1):a("a-spin",{attrs:{tip:"正在加载...",spinning:t.onSpinning}},[a("busi-descriptions",{attrs:{listData:t.listData,tableFid:"WTSX"},scopedSlots:t._u([{key:"descTitle",fn:function(e){return a("a-row",{},[t._l(e.currentList,(function(e,n){return["SQRQ"===e["key"]||"YWBH"===e["key"]?a("a-col",{key:n,attrs:{span:8}},[t._v(t._s(e["label"])+": "+t._s(e["value"]))]):t._e(),"DQZT"===e["key"]?a("a-col",{key:n,attrs:{span:8}},[t._v(" "+t._s(e["label"])+": "),["未提交"==e["value"]?a("a-tag",{staticClass:"unSubmit"},[t._v(t._s(e["value"]))]):"测量完成"==e["value"]?a("a-tag",{staticClass:"survey-done"},[t._v(t._s(e["value"]))]):"预约未成功"==e["value"]?a("a-tag",{staticClass:"reserve-fail"},[t._v(t._s(e["value"]))]):a("a-tag",{staticClass:"other"},[t._v(t._s(e["value"]))])]],2):t._e()]}))],2)}}],null,!1,3203921855)},[a("template",{slot:"table"},[a("report-table",{attrs:{tableData:t.tableData.tableData}})],1)],2)],1),a("a-back-top")],1)},s=[],l=a("5530"),i=a("2f62"),r=a("ed08"),u=a("1b63"),o=a("e0ea"),c={name:"BusiOnProcess",components:{"report-table":u["default"],"busi-descriptions":o["default"]},props:{},data:function(){return{listData:[],tableData:{},onSpinning:!1,orginData:{},afterColumns:[]}},computed:Object(l["a"])({},Object(i["c"])({user:"userInfo"})),mounted:function(){this.QueryEntrust()},methods:{QueryEntrust:function(){var t=this;this.orginData={},this.onSpinning=!0,this.$WebApi.reportOnline["QueryEntrust"]({type:4,userid:this.user.userID}).then((function(e){t.orginData=e,t.listData=r["b"].table2Desc(e),t.afterColumns=r["b"].deleteHideColumns(e),t.onSpinning=!1})).catch((function(e){t.onSpinning=!1}))}}},d=c,p=(a("e330"),a("2877")),h=Object(p["a"])(d,n,s,!1,null,"dfeb9c86",null);e["default"]=h.exports},"1b63":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-table",{attrs:{size:"small",columns:t.columns,"data-source":t.data?t.data:[],loading:t.tableLoading,pagination:!1,rowKey:function(t){return t["CLSX"]}},scopedSlots:t._u([{key:"CLZT",fn:function(e,n){return["未开始"==e?a("a-tag",{staticClass:"unStart"},[t._v("未开始")]):"测量中"==e?a("a-tag",{staticClass:"other"},[t._v("测量中")]):"已完成"==e?a("a-tag",{staticClass:"survey-done"},[t._v("已完成")]):"暂停中"==e?[a("a-tag",{staticClass:"stop"},[t._v(t._s(e))]),a("a-button",{attrs:{type:"link"},on:{click:function(e){return t.handleWhy(n)}}},[t._v("查看原因")])]:a("a-tag",{staticClass:"other"},[t._v(t._s(e))])]}},{key:"CHDW",fn:function(e,n){return[a("a-button",{attrs:{type:"link"},on:{click:function(e){return t.handleGroupMore(n)}}},[t._v(t._s(e))])]}},{key:"CLBG",fn:function(e,n){return["查看"!=e?a("span",[t._v(t._s(e))]):a("a-button",{attrs:{type:"link"},on:{click:function(e){return t.handleQueryReport(n)}}},[t._v("查看")])]}}])}),a("a-modal",{attrs:{title:t.modalData.title,width:"600px",size:"small",footer:null},on:{ok:t.handleClztOk,cancel:t.handleClztCancle},model:{value:t.clztVisible,callback:function(e){t.clztVisible=e},expression:"clztVisible"}},[a("a-spin",{attrs:{spinning:t.modalSpinning,tip:"加载中..."}},[t.modalData["descArray"]&&t.modalData["descArray"].length>0?a("a-descriptions",{attrs:{title:"",size:"small",bordered:""}},[t._l(t.modalData["descArray"],(function(e,n){return["XGFJ"!=e["key"]&&"CLBG"!=e["key"]?a("a-descriptions-item",{key:n,attrs:{span:e["span"],label:e["label"]}},[t._v(t._s(e["value"]))]):t._e(),"XGFJ"==e["key"]?a("a-descriptions-item",{key:n,attrs:{span:e["span"],label:e["label"]}},t._l(e.value,(function(e,n){return a("div",{key:n},[a("a",{attrs:{type:"link",href:e.FJLJ,target:"_blank"}},[t._v(t._s(n+1)+"、"+t._s(e.FJMC))])])})),0):t._e(),"CLBG"==e["key"]?a("a-descriptions-item",{key:n,attrs:{span:e["span"],label:e["label"]}},t._l(e.value,(function(e,n){return a("div",{key:n},[a("span",[t._v(t._s(n+1)+"、"),a("a",{attrs:{href:e.FJLJ,target:"_blank"}},[t._v(" "+t._s(e.FJMC))])]),a("a-button",{staticStyle:{float:"right"},attrs:{size:"small",type:"link",icon:"download",href:e.FJLJ,target:"_blank"}},[t._v("下载")])],1)})),0):t._e()]}))],2):a("a-empty")],1)],1)],1)},s=[],l=(a("4de4"),a("d81d"),a("45fc"),{name:"ReportTable",components:{},props:{tableData:{default:function(){},type:Object,required:!0}},data:function(){return{tableLoading:!1,columns:[],data:[],clztVisible:!1,modalData:{title:"",descArray:[]},modalSpinning:!1,tableId:"",tableCLSX:"",tableChdw:""}},computed:{},watch:{tableData:{handler:function(t,e){this._.isEmpty(t)||this.handlerDataChange()},deep:!0}},created:function(){},mounted:function(){this.handlerDataChange()},methods:{getTableColumn:function(t){if(this._.isEmpty(t))return[];var e=t.columns,a=t.hideColumns,n=e.filter((function(t){return!a.some((function(e){return e===t.key}))}));return n.map((function(t,e){return{dataIndex:t["key"],key:t["key"],title:t["label"],scopedSlots:{customRender:t["key"]}}}))},getTableData:function(t){return this._.isEmpty(t)?[]:t.rowsList},handlerDataChange:function(){this.tableLoading=!0;var t=JSON.parse(JSON.stringify(this.tableData));this.columns=this.getTableColumn(t),this.data=this.getTableData(t),this.tableLoading=!1},handleClztOk:function(){this.clztVisible=!1},handleClztCancle:function(){this.clztVisible=!1},handleWhy:function(t){this.tableId=t["TABLE001ID"],this.tableCLSX=t["CLSX"],this.GetPauseReason(),this.clztVisible=!0},handleGroupMore:function(t){this.tableChdw=t["CHDW"],this.GetSurveyCompanyInfo(),this.clztVisible=!0},handleQueryReport:function(t){this.tableId=t["TABLE008ID"],this.GetSurveyReport(),this.clztVisible=!0},GetPauseReason:function(){var t=this;this.modalSpinning=!0,this.$WebApi.reportOnline["GetPauseReason"]({table001id:this.tableId,clsx:this.tableCLSX}).then((function(e){var a=e;t._.isEmpty(a)||(t.modalData=t.handlePauseReason(a)),t.modalSpinning=!1})).catch((function(e){t.modalSpinning=!1}))},GetSurveyCompanyInfo:function(){var t=this;this.modalSpinning=!0,this.$WebApi.reportOnline["GetSurveyCompanyInfo"]({chdw:this.tableChdw}).then((function(e){var a=e;t._.isEmpty(a)||(t.modalData=t.handleSurveyCompanyInfo(a)),t.modalSpinning=!1})).catch((function(e){t.modalSpinning=!1}))},GetSurveyReport:function(){var t=this;this.modalSpinning=!0,this.$WebApi.reportOnline["GetSurveyReport"]({table008id:this.tableId}).then((function(e){var a=e;t._.isEmpty(a)||(t.modalData=t.handleSurveyReport(a)),t.modalSpinning=!1})).catch((function(e){t.modalSpinning=!1}))},handleSurveyReport:function(t){var e=[];for(var a in t)t.hasOwnProperty(a)&&("CHDW"===a&&e.push({label:"测绘单位",value:t[a],key:a,span:3}),"CLBG"===a&&e.push({label:"测量报告",value:t[a],key:a,span:3}),"CLSX"===a&&e.push({label:"测量事项",value:t[a],key:a,span:3}),"SCSJ"===a&&e.push({label:"上传时间",value:t[a],key:a,span:3}));return{title:"查看测量报告",descArray:e}},handleSurveyCompanyInfo:function(t){var e=[];for(var a in t)t.hasOwnProperty(a)&&("DWDZ"===a&&e.push({label:"单位地址",value:t[a],key:a,span:3}),"DWMC"===a&&e.push({label:"单位名称",value:t[a],key:a,span:3}),"LXDH"===a&&e.push({label:"联系电话",value:t[a],key:a,span:3}),"LXR"===a&&e.push({label:"联系人",value:t[a],key:a,span:3}));return{title:"测绘服务机构信息",descArray:e}},handlePauseReason:function(t){var e=[];for(var a in t)t.hasOwnProperty(a)&&("CLDW"===a&&e.push({label:"测绘单位",value:t[a],key:a,span:3}),"CLSX"===a&&e.push({label:"测量事项",value:t[a],key:a,span:3}),"LJYZT"===a&&e.push({label:"累计已暂停",value:t[a],key:a,span:3}),"XGFJ"===a&&e.push({label:"相关附件",value:t[a],key:a,span:3}),"ZTSJ"===a&&e.push({label:"暂停时间",value:t[a],key:a,span:3}),"ZTYY"===a&&e.push({label:"暂停原因",value:t[a],key:a,span:3}));return{title:"查看暂停原因",descArray:e}}}}),i=l,r=(a("740f"),a("2877")),u=Object(r["a"])(i,n,s,!1,null,"ee5268da",null);e["default"]=u.exports},"3f09":function(t,e,a){},"4fc3":function(t,e,a){},"740f":function(t,e,a){"use strict";a("4fc3")},a261:function(t,e,a){"use strict";a("3f09")},e0ea:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"busiDesc"},t._l(t.listData,(function(e,n){return a("div",{key:n},[a("a-card",{attrs:{title:"",bordered:!1,size:"small"}},[a("a-descriptions",{attrs:{size:"small",bordered:""}},[a("a-row",{attrs:{slot:"title"},slot:"title"},[t._t("descTitle",null,{currentList:e})],2),t._l(e,(function(e,n){return[-1===t.hideFid.indexOf(e.key)&&-1===t.titleFid.indexOf(e.key)&&-1===t.tableFid.indexOf(e.key)&&"RID"!=e.key?a("a-descriptions-item",{key:n,attrs:{label:e.label,span:e.span}},[t._v(t._s(e.value||"-")+" ")]):t._e()]})),t._t("hideFid")],2),t._l(e,(function(e,n){return[-1!==t.tableFid.indexOf(e.key)&&"JFQDLIST"!=e.key?[e.value["rowsList"]&&e.value["rowsList"].length>0?a("div",{key:n},[a("div",{staticClass:"wtsxClass"},[t._v(" "+t._s(e.label)+" ")]),t._t("table",null,{tableData:e.value})],2):t._e()]:t._e(),-1!==t.tableFid.indexOf(e.key)&&"JFQDLIST"===e.key?[e.value["JFQD"]&&e.value["JFQD"]["rowsList"]&&e.value["JFQD"]["rowsList"].length>0?a("div",{key:n},[a("div",{staticClass:"wtsxClass"},[t._v(" "+t._s(e.label)+" ")]),a("div",[t._v("TODO:后期在进度里也可以直接缴费")]),t._t("table",null,{tableData:e.value["JFQD"]})],2):t._e()]:t._e()]}))],2)],1)})),0)},s=[],l={name:"BusiDescriptions",components:{},props:{listData:{default:function(){return[]},type:Array,required:!0},tableFid:{default:function(){return[]},type:Array,required:!0},titleFid:{default:function(){return["XMBH","DQZT","WTRQ","RID"]},type:Array,required:!1},hideFid:{default:function(){return[]},type:Array,required:!1}},data:function(){return{}},computed:{},watch:{tableData:{handler:function(t,e){this._.isEmpty(t)},deep:!0}},created:function(){},methods:{}},i=l,r=(a("a261"),a("2877")),u=Object(r["a"])(i,n,s,!1,null,"3641dc1c",null);e["default"]=u.exports},e330:function(t,e,a){"use strict";a("e479")},e479:function(t,e,a){},ed08:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"a",(function(){return s}));a("4de4"),a("d81d"),a("45fc");var n={handleResultTableData:function(t){var e=[],a=[],n=[];return Array.isArray(t)?(e=t[0].tableResults.columns,a=t[0].tableResults.hideColumns,n=t[0].tableResults.rowsList):Window._.isPlainObject(t)&&t.hasOwnProperty("tableResults")?(e=t.tableResults.columns,a=t.tableResults.hideColumns,n=t.tableResults.rowsList):(e=t.columns,a=t.hideColumns,n=t.rowsList),{columns:e,hideColumns:a,rowsList:n}},deleteHideColumns:function(t){var e=this.handleResultTableData(t),a=e.columns,n=e.hideColumns;e.rowsList;return a.filter((function(t){return!n.some((function(e){return e===t["key"]}))}))},handleColumns:function(t){var e=this.handleResultTableData(t),a=e.columns,n=e.hideColumns,s=(e.rowsList,a.filter((function(t){return!n.some((function(e){return t.key===e}))})));return s.map((function(t,e){return{dataIndex:t["key"],key:t["key"],scopedSlots:{customRender:t["key"]},title:t["label"]}}))},table2Desc:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1.5,a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=e,s=this.handleResultTableData(t),l=s.columns,i=s.hideColumns,r=s.rowsList,u=[];u=a?l.filter((function(t){return!i.some((function(e){return e===t["key"]}))})):l;var o=r.map((function(t,e){var a=[];return u.map((function(e,s){"textarea"===e.type?a.push({label:e.label,key:e.key,value:t[e.key],span:3}):a.push({label:e.label,key:e.key,value:t[e.key],span:n})})),a}));return o}},s={reloadComponent:function(t){var e=t.$route.path;t.$router.push({path:"/FixRouter",query:{path:e}})}}}}]);