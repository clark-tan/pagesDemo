(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["preAppointment","chunk-3cdca8ca","chunk-722fc792"],{"0681":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-layout",{staticClass:"reservationEnterLayout"},[e.listData&&e.listData.length>0?a("a-spin",{attrs:{tip:"正在加载...",spinning:e.onSpinning}},[a("div",{staticClass:"busiDesc"},[a("div",{staticStyle:{color:"red","font-size":"large","margin-left":"20px"}},[e._v("注：请提前3天，预约进场时间")]),e._l(e.listData,(function(t,n){return a("div",{key:n},[a("a-card",{attrs:{title:"",bordered:!1,size:"small"}},[a("a-descriptions",{attrs:{size:"small",bordered:""}},[a("a-row",{attrs:{slot:"title"},slot:"title"},[e._l(t,(function(t,n){return["SQRQ"==t.key?a("a-col",{key:n,attrs:{span:8}},[e._v(e._s(t.label)+": "+e._s(t.value))]):e._e(),"YWBH"==t.key?a("a-col",{key:n,attrs:{span:8}},[e._v(e._s(t.label)+": "+e._s(t.value))]):e._e(),"DQZT"==t.key?a("a-col",{key:n,attrs:{span:8}},[e._v(" "+e._s(t.label)+": "),["未提交"==t.value?a("a-tag",{staticClass:"unSubmit"},[e._v(e._s(t.value))]):"测量完成"==t.value?a("a-tag",{staticClass:"survey-done"},[e._v(e._s(t.value))]):"预约未成功"==t.value?a("a-tag",{staticClass:"reserve-fail"},[e._v(e._s(t.value))]):a("a-tag",{staticClass:"other"},[e._v(e._s(t.value))])]],2):e._e()]}))],2),e._l(t,(function(t,n){return["YWBH"!=t.key&&"DQZT"!=t.key&&"SQRQ"!=t.key&&"RID"!=t.key&&"WTSXJYYJCZT"!=t.key?a("a-descriptions-item",{key:n,attrs:{label:t.label,span:t.span}},[e._v(e._s(t.value))]):e._e()]}))],2),e._l(t,(function(n,r){return["WTSXJYYJCZT"==n.key&&n.value?a("div",{key:r},[a("div",{staticClass:"wtsxClass"},[e._v(" "+e._s(n.label)+" ")]),a("ReTable",{attrs:{allItem:t,tableData:{columns:e.outerColumns,hideColumns:[],rowsList:n.value}}})],1):e._e()]}))],2)],1)}))],2)]):a("a-spin",{attrs:{tip:"正在加载...",spinning:e.onSpinning}},[a("a-empty")],1),a("a-back-top")],1)},r=[],s=(a("d81d"),a("5530")),i=a("5880"),o=a("90ba"),l=a("e0ea"),u={name:"ReservationEnter",components:{ReTable:o["default"],BusiDescriptions:l["default"]},props:{},provide:function(){return{reload:this.QueryAppointmentApproach}},data:function(){return{tableData:{},onSpinning:!1,listData:[],data:[],outerColumns:[{title:"测量事项",dataIndex:"CLSX",scopedSlots:{customRender:"CLSX"}},{title:"测量机构",dataIndex:"CLDW",scopedSlots:{customRender:"CLDW"}},{title:"测绘机构联系方式",dataIndex:"LXDH",scopedSlots:{customRender:"LXDH"}},{title:"测量状态",dataIndex:"CLZT",scopedSlots:{customRender:"CLZT"}},{title:"预约进场时间",dataIndex:"YYJCSJ",scopedSlots:{customRender:"YYJCSJ"},width:"200px"},{title:"操作",dataIndex:"ZT",scopedSlots:{customRender:"ZT"},width:"150px"}]}},computed:Object(s["a"])({},Object(i["mapGetters"])({user:"userInfo"})),created:function(){},mounted:function(){this.QueryAppointmentApproach()},methods:{QueryAppointmentApproach:function(){var e=this;this.listData=[],this.onSpinning=!0,this.$WebApi.reservationEnter["QueryAppointmentApproach"]({userid:this.user.userID}).then((function(t){var a=e.handleBusiOnProData(t);e.listData=a,e.onSpinning=!1})).catch((function(t){e.onSpinning=!1}))},handleBusiOnProData:function(e){var t=[],a=e[0],n=a["columns"],r=a["rowsList"];function s(e){var t={};t=n.map((function(t,a){return t["key"]===e?{label:t["label"],type:t["type"]}:0}));var a=window._.pull(window._.uniq(t),0);return t=a[0],t}return t=r.map((function(e){var t=[];for(var a in e)if(e.hasOwnProperty(a)){var n=s(a),r=n.label,i=n.type;t.push({key:a,value:e[a],span:1.5,label:r,type:i})}return t})),t}}},c=u,d=(a("af23"),a("2877")),p=Object(d["a"])(c,n,r,!1,null,"0320ec72",null);t["default"]=p.exports},2909:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a("6b75");function r(e){if(Array.isArray(e))return Object(n["a"])(e)}a("a4d3"),a("e01a"),a("d28b"),a("a630"),a("d3b7"),a("3ca3"),a("ddb0");function s(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}var i=a("06c5");function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e){return r(e)||s(e)||Object(i["a"])(e)||o()}},"3f09":function(e,t,a){},"4c61":function(e,t,a){"use strict";a("6e71")},"6e71":function(e,t,a){},8613:function(e,t,a){},"90ba":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-table",{attrs:{columns:e.columns,"data-source":e.data,pagination:!1,rowKey:function(e){return e.CLSX},bordered:"",size:"small"},scopedSlots:e._u([{key:"CLZT",fn:function(t){return["未开始"==t?a("a-tag",{staticClass:"unStart"},[e._v("未开始")]):"测量中"==t?a("a-tag",{staticClass:"other"},[e._v("测量中")]):"已完成"==t?a("a-tag",{staticClass:"survey-done"},[e._v("已完成")]):a("a-tag","暂停中"==t?{staticClass:"stop"}:{staticClass:"other"},[e._v(e._s(t))])]}},{key:"ZT",fn:function(t,n){return[0==t?a("span",[a("a-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.handleReservation(e.allItem,n,0)}}},[e._v("预约")])],1):e._e(),1==t?a("span",[a("a-button",{attrs:{size:"small",type:"link"},on:{click:function(t){return e.handleQueryReservation(e.allItem,n,1)}}},[e._v("查看")]),a("a-button",{attrs:{size:"small",type:"link"},on:{click:function(t){return e.handleRevoke(e.allItem,n)}}},[a("span",{staticClass:"revokeSpan"},[e._v("撤回")])])],1):e._e(),2==t?a("span",[a("a-button",{attrs:{size:"small",type:"link"},on:{click:function(t){return e.handleQueryReservation(e.allItem,n,2)}}},[e._v("查看")])],1):e._e()]}}])}),a("a-modal",{attrs:{title:"预约进场时间",width:"1000px",size:"small",footer:null,maskClosable:!1},on:{ok:e.handleReservationOk,cancel:e.handleReservationCancle},model:{value:e.ReservationVisible,callback:function(t){e.ReservationVisible=t},expression:"ReservationVisible"}},[a("a-form-model",{ref:"ruleForm",attrs:{size:"small",model:e.form,rules:e.rules,"label-col":{span:4},"wrapper-col":{span:20}}},[a("a-row",{attrs:{gutter:4}},[a("a-col",{attrs:{span:"12"}},[a("a-form-model-item",{ref:"CLSX",attrs:{label:"测量事项",prop:"CLSX",labelCol:{span:8},wrapperCol:{span:14}}},[a("a-input",{attrs:{disabled:""},model:{value:e.form.CLSX,callback:function(t){e.$set(e.form,"CLSX",t)},expression:"form.CLSX"}})],1)],1),a("a-col",{attrs:{span:"12"}},[a("a-form-model-item",{ref:"CLDW",attrs:{label:"测绘单位",prop:"CLDW",wrapperCol:{span:20}}},[a("a-input",{attrs:{disabled:""},model:{value:e.form.CLDW,callback:function(t){e.$set(e.form,"CLDW",t)},expression:"form.CLDW"}})],1)],1)],1),a("a-row",{attrs:{gutter:4}},[a("a-col",{attrs:{span:"12"}},[a("a-form-model-item",{ref:"JCLXR",attrs:{label:"进场联系人",prop:"JCLXR",labelCol:{span:8},wrapperCol:{span:14}}},[a("a-input",{attrs:{disabled:0!=e.currentType},model:{value:e.form.JCLXR,callback:function(t){e.$set(e.form,"JCLXR",t)},expression:"form.JCLXR"}})],1)],1),a("a-col",{attrs:{span:"12"}},[a("a-form-model-item",{ref:"LXDH",attrs:{label:"联系电话",prop:"LXDH",wrapperCol:{span:20}}},[a("a-input",{attrs:{disabled:0!=e.currentType},model:{value:e.form.LXDH,callback:function(t){e.$set(e.form,"LXDH",t)},expression:"form.LXDH"}})],1)],1)],1),a("a-form-model-item",{ref:"YYJCSJ",attrs:{label:"预约进场时间",prop:"YYJCSJ"}},[a("a-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"请选择预约进场时间","disabled-date":e.disabledEndDate,disabled:0!=e.currentType},model:{value:e.form.YYJCSJ,callback:function(t){e.$set(e.form,"YYJCSJ",t)},expression:"form.YYJCSJ"}})],1),e.innerData&&e.innerData.length>0?a("a-form-model-item",{ref:"CXTABLE1",attrs:{label:"预约所需材料",prop:"CXTABLE1"}},[a("a-table",{attrs:{columns:e.innerColumns,"data-source":e.innerData,bordered:"",size:"small",pagination:!1,rowKey:function(e){return e.index},expandedRowKeys:e.expandedRowKeys},on:{expandedRowsChange:e.expandedRowsChange},scopedSlots:e._u([{key:"expandedRowRender",fn:function(t){return[t.showdata&&t.showdata.length>0?[e._l(t.showdata,(function(n,r){return[a("a-row",{key:r,style:{marginBottom:"4px",textAlign:"left"}},[a("a-col",{attrs:{span:"12"}},[a("a",{style:{marginRight:"10px"},attrs:{href:n.url,target:"_blank"}},[e._v(e._s(n.name))])]),a("a-col",{attrs:{span:"12"}},[0===e.currentType?a("a-button",{attrs:{type:"danger",size:"small",icon:"delete"},on:{click:function(a){return e.deleteFile(t,r)}}}):e._e()],1)],1)]}))]:a("a-empty")]}},{key:"action",fn:function(t,n){return[[a("a-upload",{attrs:{name:"file",multiple:!0,action:e.MaterialUpload,"file-list":n.action,showUploadList:!1,disabled:0!=e.currentType},on:{change:function(t){return e.handleChange(t,n)}}},[a("a-button",{attrs:{size:"small",type:"primary",icon:"upload",disabled:0!=e.currentType}},[e._v("点这里上传")])],1)]]}}],null,!1,4160074975)})],1):e._e(),2==e.currentType?[a("a-form-model-item",{ref:"QRJCSJ",attrs:{label:"确定进场时间",prop:"QRJCSJ"}},[a("a-input",{attrs:{disabled:""},model:{value:e.form.QRJCSJ,callback:function(t){e.$set(e.form,"QRJCSJ",t)},expression:"form.QRJCSJ"}})],1),a("a-form-model-item",{ref:"XMFZR",attrs:{label:"项目负责人",prop:"XMFZR"}},[a("a-input",{attrs:{disabled:""},model:{value:e.form.XMFZR,callback:function(t){e.$set(e.form,"XMFZR",t)},expression:"form.XMFZR"}})],1),a("a-form-model-item",{ref:"XMFZRLXDH",attrs:{label:"项目负责人电话",prop:"XMFZRLXDH"}},[a("a-input",{attrs:{disabled:""},model:{value:e.form.XMFZRLXDH,callback:function(t){e.$set(e.form,"XMFZRLXDH",t)},expression:"form.XMFZRLXDH"}})],1)]:e._e(),a("a-form-model-item",{ref:"BZ",attrs:{label:"备注",prop:"BZ"}},[a("a-input",{attrs:{type:"textarea",disabled:0!=e.currentType},model:{value:e.form.BZ,callback:function(t){e.$set(e.form,"BZ",t)},expression:"form.BZ"}})],1),0==e.currentType?a("a-form-model-item",{attrs:{"wrapper-col":{span:14,offset:12}}},[a("a-button",{attrs:{type:"primary",disabled:e.isDisabled},on:{click:e.onSubmit}},[0==e.isDisabled?[e._v("预约")]:[e._v("正在上传文件中...")]],2)],1):e._e()],2)],1)],1)},r=[],s=(a("4de4"),a("d81d"),a("45fc"),a("a434"),a("b0c0"),a("2909")),i=a("5530"),o=a("c1df"),l=a.n(o),u=a("377c"),c={name:"ReTable",components:{},props:{tableData:{default:function(){},type:Object,required:!0},allItem:{default:function(){return[]},type:Array,required:!0}},data:function(){return{MaterialUpload:u["K"],columns:[],data:[],innerColumns:[{title:"名称",dataIndex:"CLMC",key:"CLMC",scopedSlots:{customRender:"CLMC"}},{title:"说明",scopedSlots:{customRender:"SM"},dataIndex:"SM",key:"SM"},{title:"操作",dataIndex:"action",key:"action",scopedSlots:{customRender:"action"}}],innerData:[],tableLoading:!1,ReservationVisible:!1,form:{CLSX:"",LXDH:"",JCLXR:"",CLDW:"",YYJCSJ:void 0,CXTABLE1:[],BZ:"",QRJCSJ:"",XMFZR:"",XMFZRLXDH:""},rules:{CLSX:[{message:"请填写测量事项",trigger:"blur"}],LXDH:[{required:!0,message:"请填写测量事项",trigger:"blur"}],JCLXR:[{required:!0,message:"请填写进场联系人",trigger:"blur"}],CLDW:[{message:"请填写测绘单位",trigger:"blur"}],YYJCSJ:[{required:!0,message:"请请选择预约进场时间",trigger:"change"}],CXTABLE1:[{required:!0,message:"请上传预约材料"}],BZ:[{message:"请填写备注内容",trigger:"blur"}]},submitData:{},expandedRowKeys:[],currentItem:[],currentType:0,isDisabled:!1}},computed:{},watch:{tableData:{handler:function(e,t){this._.isEmpty(e)||this.handlerDataChange()},deep:!0}},created:function(){},mounted:function(){this.handlerDataChange()},inject:["reload"],methods:{getTableColumn:function(e){if(this._.isEmpty(e))return[];var t=e.columns,a=e.hideColumns,n=t.filter((function(e){return!a.some((function(t){return t===e.key}))}));return n.map((function(e,t){return{dataIndex:e["key"],key:e["key"],title:e["label"],scopedSlots:{customRender:e["key"]}}}))},getTableData:function(e){return this._.isEmpty(e)?[]:e.rowsList},handlerDataChange:function(){this.tableLoading=!0;var e=JSON.parse(JSON.stringify(this.tableData));this.columns=e.columns,this.data=this.getTableData(e),this.tableLoading=!1},disabledEndDate:function(e){var t=l()().add(3,"days"),a=e.isBefore(t);return a},handleQueryReservation:function(e,t,a){var n=this;this.expandedRowKeys=[],this.currentType=a,this.currentItem=e,this.form.CLSX=t.CLSX,this.form.CLDW=t.CLDW;var r=t.YYJCCLPZD.rowsList[0];for(var s in this.innerData=r.CXTABLE1,r)r.hasOwnProperty(s)&&(n.form[s]="YYJCSJ"===s?l()(r[s],"YYYY-MM-DD"):r[s]);this.innerData=this.innerData.map((function(e,t){var a=[],n=[],r=[];for(var s in e)"NAME"===s&&(a=e[s]),"ZCURL"===s&&(n=e[s]);return a&&a.length>0&&a.map((function(e,t){r.push({name:e,url:n[t]})})),Object(i["a"])(Object(i["a"])({},e),{},{index:t,showdata:r,action:[]})})),this.innerData.map((function(e,t){e.NAME&&e.NAME.length>0&&n.expandedRowKeys.push(e.index)})),this.ReservationVisible=!0},handleReservation:function(e,t,a){var n=this;this.expandedRowKeys=[],this.currentType=a,this.currentItem=e,this.form.CLSX=t.CLSX,this.form.CLDW=t.CLDW;var r=t.YYJCCLPZD.rowsList[0];for(var s in r)r.hasOwnProperty(s)&&("YYJCSJ"===s?n._.isEmpty(r[s])?n.form[s]=void 0:n.form[s]=l()(r[s],"YYYY-MM-DD"):n.form[s]=r[s]);this.innerData=t.YYJCCLPZD.rowsList[0].CXTABLE1,this.innerData=this.innerData.map((function(e,t){var a=[],n=[],r=[];for(var s in e)"NAME"===s&&(a=e[s]),"ZCURL"===s&&(n=e[s]);return a&&a.length>0&&a.map((function(e,t){r.push({name:e,url:n[t]})})),Object(i["a"])(Object(i["a"])({},e),{},{index:t,showdata:r,action:[]})})),this.innerData.map((function(e,t){e.NAME&&e.NAME.length>0&&n.expandedRowKeys.push(e.index)})),this.ReservationVisible=!0},handleRevoke:function(e,t){var a,n=this,r=t.CLSX;e.map((function(e,t){"RID"===e["key"]&&(a=e["value"])})),this.$confirm({title:"撤回操作！",content:"确认撤回当前预约操作？",okText:"确认",cancelText:"取消",onOk:function(){n.RevokeAppointmentApproach(a,r)},onCancel:function(){}})},RevokeAppointmentApproach:function(e,t){var a=this;this.$WebApi.reservationEnter["RevokeAppointmentApproach"]({code:e,clsx:t}).then((function(e){a.reload()})).catch((function(e){}))},clearReservationModalData:function(){this.$refs.ruleForm.resetFields(),this.currentItem=[]},handleReservationOk:function(){this.clearReservationModalData(),this.ReservationVisible=!1},handleReservationCancle:function(){this.clearReservationModalData(),this.ReservationVisible=!1},onSubmit:function(){var e=this;this.$confirm({title:"预约操作！",content:"确认执行当前预约操作？",okText:"确认",cancelText:"取消",onOk:function(){e.$refs.ruleForm.validate((function(t,a){if(!t)return!1;e.submitData={},e.currentItem.map((function(t,a){"GCMC"!==t.key&&"GCBH"!==t.key&&"GCDD"!==t.key&&"JSDW"!==t.key&&"RID"!==t.key||(e.submitData[t.key]=t.value)}));var n,r=e.form;for(var s in r)r.hasOwnProperty(s)&&"YYJCSJ"===s&&(n=r[s].format("YYYY-MM-DD"));var i=JSON.parse(JSON.stringify(r));i["YYJCSJ"]=n,e.submitData=Object.assign(e.submitData,i),e.SaveAppointmentApproach()}))},onCancel:function(){}})},SaveAppointmentApproach:function(){var e=this;this.$WebApi.reservationEnter["SaveAppointmentApproach"]({data:JSON.stringify(this.submitData)}).then((function(t){e.handleReservationOk(),e.reload()})).catch((function(t){e.handleReservationCancle()}))},expandedRowsChange:function(e){this.expandedRowKeys=e},handleChange:function(e,t){var a=Object(s["a"])(e.fileList),n=e.file;this.isDisabled=!0,n.response&&"done"===n.status&&(0===n.response.code?(this.isDisabled=!1,t.showdata.push({name:n.response.data[0].fileName,url:n.response.data[0].fileUrl}),t.NAME.push(n.response.data[0].fileName),t.ZCURL.push(n.response.data[0].fileUrl),this.expandedRowKeys.push(t.index)):this.$message.error("文件上传失败！")),"error"===n.status&&(this.$message.error("文件: "+n.name+"上传失败！"),this.isDisabled=!1),a=a.map((function(e){return e.response&&"done"===e.status&&e.response.code,e})),t.action=a},deleteFile:function(e,t){e.showdata.splice(t,1),e.NAME.splice(t,1),e.ZCURL.splice(t,1),e.NAME&&0===e.NAME.length&&this.expandedRowKeys.splice(e.index,1,null)}}},d=c,p=(a("4c61"),a("2877")),f=Object(p["a"])(d,n,r,!1,null,"2e41e37a",null);t["default"]=f.exports},a261:function(e,t,a){"use strict";a("3f09")},af23:function(e,t,a){"use strict";a("8613")},e0ea:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"busiDesc"},e._l(e.listData,(function(t,n){return a("div",{key:n},[a("a-card",{attrs:{title:"",bordered:!1,size:"small"}},[a("a-descriptions",{attrs:{size:"small",bordered:""}},[a("a-row",{attrs:{slot:"title"},slot:"title"},[e._t("descTitle",null,{currentList:t})],2),e._l(t,(function(t,n){return[-1===e.hideFid.indexOf(t.key)&&-1===e.titleFid.indexOf(t.key)&&-1===e.tableFid.indexOf(t.key)&&"RID"!=t.key?a("a-descriptions-item",{key:n,attrs:{label:t.label,span:t.span}},[e._v(e._s(t.value||"-")+" ")]):e._e()]})),e._t("hideFid")],2),e._l(t,(function(t,n){return[-1!==e.tableFid.indexOf(t.key)&&"JFQDLIST"!=t.key?[t.value["rowsList"]&&t.value["rowsList"].length>0?a("div",{key:n},[a("div",{staticClass:"wtsxClass"},[e._v(" "+e._s(t.label)+" ")]),e._t("table",null,{tableData:t.value})],2):e._e()]:e._e(),-1!==e.tableFid.indexOf(t.key)&&"JFQDLIST"===t.key?[t.value["JFQD"]&&t.value["JFQD"]["rowsList"]&&t.value["JFQD"]["rowsList"].length>0?a("div",{key:n},[a("div",{staticClass:"wtsxClass"},[e._v(" "+e._s(t.label)+" ")]),a("div",[e._v("TODO:后期在进度里也可以直接缴费")]),e._t("table",null,{tableData:t.value["JFQD"]})],2):e._e()]:e._e()]}))],2)],1)})),0)},r=[],s={name:"BusiDescriptions",components:{},props:{listData:{default:function(){return[]},type:Array,required:!0},tableFid:{default:function(){return[]},type:Array,required:!0},titleFid:{default:function(){return["XMBH","DQZT","WTRQ","RID"]},type:Array,required:!1},hideFid:{default:function(){return[]},type:Array,required:!1}},data:function(){return{}},computed:{},watch:{tableData:{handler:function(e,t){this._.isEmpty(e)},deep:!0}},created:function(){},methods:{}},i=s,o=(a("a261"),a("2877")),l=Object(o["a"])(i,n,r,!1,null,"3641dc1c",null);t["default"]=l.exports}}]);