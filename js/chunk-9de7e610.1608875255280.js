(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9de7e610","chunk-45fd51f9","chunk-75e40762","chunk-2d2307dd"],{"0ac0":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("UploadTable",{attrs:{tableData:e.tableData}})],1)},o=[],r=(n("d81d"),n("5530")),s=n("4c6d"),l=n("5880"),i=function(e,t,n){var a={children:e,attrs:{}};return 4===n&&(a.attrs.colSpan=0),a},c=[{key:"1",name:"John Brown",age:11,tel:"0571-22098909",phone:18889898989,address:"New York No. 1 Lake Park"},{key:"2",name:"Jim Green",tel:"0571-22098333",phone:18889898888,age:22,address:"London No. 2 Lake Park"},{key:"3",name:"Joe Black",age:33,tel:"0575-22098909",phone:18900010002,address:"Sidney No. 3 Lake Park"},{key:"4",name:"Jim Red",age:44,tel:"0575-22098909",phone:18900010002,address:"London No. 4 Lake Park"},{key:"5",name:"Jake White",age:55,tel:"0575-22098909",phone:18900010002,address:"Dublin No. 5 Lake Park"}],u={name:"MergeTable",components:{UploadTable:s["default"]},props:{},data:function(){var e=this.$createElement,t=[{title:"Name",colSpan:2,dataIndex:"name",customRender:function(t,n,a){return a<2?{children:e("a",{attrs:{href:"javascript:;"}},[t]),attrs:{colSpan:1}}:2===a?{children:e("a",{attrs:{href:"javascript:;"}},[t,"hehe"]),attrs:{colSpan:1,rowSpan:2}}:3===a?{children:e("a",{attrs:{href:"javascript:;"}},[t,"hehe"]),attrs:{colSpan:1,rowSpan:0}}:{children:e("a",{attrs:{href:"javascript:;"}},[t]),attrs:{colSpan:5}}}},{title:"Age",colSpan:0,dataIndex:"age",customRender:function(e,t,n){switch(n){case n:return{children:e,attrs:{colSpan:1,rowSpan:1}};default:}}},{title:"Home phone",colSpan:2,dataIndex:"tel",customRender:function(e,t,n){var a={children:e,attrs:{}};return 2===n&&(a.attrs.rowSpan=2),3===n&&(a.attrs.rowSpan=0),4===n&&(a.attrs.colSpan=0),a}},{title:"Phone",colSpan:0,dataIndex:"phone",customRender:i},{title:"Address",dataIndex:"address",customRender:i}];return{data:c,columns:t,columns2:[],InputColumns:[{title:"Name",colSpan:1,key:"name",properties:[{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1}]},{title:"Age",colSpan:1,key:"age",properties:[{colSpan:1,rowSpan:2},{colSpan:1,rowSpan:0},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:2},{colSpan:1,rowSpan:0}]},{title:"Home phone",colSpan:1,key:"tel",properties:[{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1}]},{title:"Phone",colSpan:1,key:"phone",properties:[{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1}]},{title:"Address",colSpan:1,key:"address",properties:[{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1},{colSpan:1,rowSpan:1}]}],tableData:{}}},computed:Object(r["a"])({},Object(l["mapGetters"])({user:"userInfo"})),watch:{},created:function(){this.QueryEntrust()},mounted:function(){this.columns2=this.addAtt2Col(this.InputColumns)},methods:{QueryEntrust:function(){var e=this;this.$WebApi.busiProcess["QueryEntrust"]({userid:this.user.userID}).then((function(t){e.tableData=t})).catch((function(e){}))},addAtt2Col:function(e){return e.map((function(e,t){return{title:e["title"],colSpan:e["colSpan"],key:e["key"],dataIndex:e["key"],customRender:function(t,n,a){switch(a){case a:return{children:t,attrs:{colSpan:e["properties"][a]["colSpan"],rowSpan:e["properties"][a]["rowSpan"]}};default:return{children:t,attrs:{colSpan:1,rowSpan:1}}}}}}))}}},d=u,p=n("2877"),h=Object(p["a"])(d,a,o,!1,null,"66a9a1a9",null);t["default"]=h.exports},"0dac":function(e,t,n){"use strict";n("c810")},2909:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("6b75");function o(e){if(Array.isArray(e))return Object(a["a"])(e)}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("d3b7"),n("3ca3"),n("ddb0");function r(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}var s=n("06c5");function l(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(e){return o(e)||r(e)||Object(s["a"])(e)||l()}},"4c6d":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a-table",{attrs:{size:"small",columns:e.columns,"data-source":e.data,loading:e.tableLoading,pagination:e.pagination,rowKey:function(e){return e["tableIndex"]},expandedRowKeys:e.expandedRowKeys},on:{expandedRowsChange:e.expandedRowsChange},scopedSlots:e._u([{key:"expandedRowRender",fn:function(t){return[t.FJLIST&&t.FJLIST.length>0?[e._l(t.FJLIST,(function(a,o){return[n("a-row",{key:o,style:{marginBottom:"4px",textAlign:"left",background:"#E6F7FF"}},[n("a-col",{staticStyle:{left:"45px"},attrs:{span:"18"}},[n("a",{style:{marginRight:"10px"},attrs:{href:a.FJURL,target:"_blank"}},[e._v(e._s(a.FJNAME||"-"))])]),n("a-col",{staticStyle:{"text-align":"right",right:"40px"},attrs:{span:"6"}},[0==e.disabled?n("a-button",{attrs:{type:"link",size:"small"},on:{click:function(n){return e.deleteFile(t,o)}}},[e._v("删除")]):e._e()],1)],1)]}))]:n("s-empty")]}},{key:"action",fn:function(t,a){return[n("a-upload",{attrs:{action:e.MaterialUpload,multiple:!0,"file-list":a.action,showUploadList:!1},on:{change:function(t){return e.handleChange(t,a)}}},[n("a-button",{attrs:{size:"small",type:"primary",icon:"upload"}})],1)]}}])})],1)},o=[],r=(n("d81d"),n("a434"),n("2909")),s=n("5530"),l=n("377c"),i=n("ed08"),c=n("b405"),u={name:"UploadTable",components:{"s-empty":c["default"]},props:{tableData:{default:function(){},type:Object,required:!0},disabled:{default:!1,type:Boolean,required:!1},pagination:{default:!1,type:Boolean,required:!1}},data:function(){return{showTemplate:!0,data:[],columns:[],tableLoading:!1,MaterialUpload:l["K"],expandedRowKeys:[]}},computed:{},watch:{tableData:{handler:function(e,t){if(!this._.isEmpty(e)){this.tableLoading=!0;var n=JSON.parse(JSON.stringify(this.tableData));this.columns=this.getTableColumn(n),this.data=this.getTableData(n),this.handleExpandedRows(),this.tableLoading=!1}},immediate:!0,deep:!0}},created:function(){},mounted:function(){},methods:{getTableColumn:function(e){if(this._.isEmpty(e))return{};var t=i["b"].handleColumns(e);return t.push({dataIndex:"action",key:"action",title:"操作",scopedSlots:{customRender:"action"}}),t},getTableData:function(e){var t=[];if(this._.isEmpty(e))t=[];else{var n=e.rowsList;n&&(t=n.map((function(e,t){return Object(s["a"])(Object(s["a"])({},e),{},{tableIndex:t,action:[]})})))}return t},handleChange:function(e,t){var n=Object(r["a"])(e.fileList),a=e.file;a.response&&"done"===a.status?0===a.response.code?(t.FJLIST.push({FJNAME:a.response.data[0].fileName,FJURL:a.response.data[0].fileUrl}),this.expandedRowKeys.push(t.tableIndex)):this.$message.error("文件上传失败！"):"error"===a.status&&this.$message.error("文件上传失败！"),n=n.map((function(e){return e.response&&"done"===e.status&&e.response.code,e})),t.action=n},deleteFile:function(e,t){e.FJLIST.splice(t,1),e.FJLIST&&0===e.FJLIST.length&&(this.expandedRowKeys=[])},getSubmitData:function(){var e=JSON.parse(JSON.stringify(this.data));return e.map((function(e,t){return delete e.tableIndex,delete e.action,e}))},isAllSubmit:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=!0;return this.data&&this.data.length>0?this.data.map((function(n,a){e?n.FJLIST.length<=0&&n.SFBX&&"是"===n.SFBX&&(t=!1):n.FJLIST.length<=0&&(t=!1)})):t=!1,t},handleExpandedRows:function(){var e=this;this.data.map((function(t,n){t.FJLIST&&t.FJLIST.length>0&&e.expandedRowKeys.push(t.tableIndex)}))},expandedRowsChange:function(e){this.expandedRowKeys=e}}},d=u,p=(n("0dac"),n("2877")),h=Object(p["a"])(d,a,o,!1,null,"681a6d02",null);t["default"]=h.exports},b405:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-empty",{attrs:{image:e.imgPath,"image-style":{height:e.height}}},[n("span",{attrs:{slot:"description"},slot:"description"})])},o=[],r={name:"SEmpty",components:{},props:{height:{default:"100%",type:String}},data:function(){return{imgPath:n("f3f6")}},computed:{},watch:{},created:function(){},methods:{}},s=r,l=n("2877"),i=Object(l["a"])(s,a,o,!1,null,"138622d4",null);t["default"]=i.exports},c810:function(e,t,n){},ed08:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return o}));n("4de4"),n("d81d"),n("45fc");var a={handleResultTableData:function(e){var t=[],n=[],a=[];return Array.isArray(e)?(t=e[0].tableResults.columns,n=e[0].tableResults.hideColumns,a=e[0].tableResults.rowsList):Window._.isPlainObject(e)&&e.hasOwnProperty("tableResults")?(t=e.tableResults.columns,n=e.tableResults.hideColumns,a=e.tableResults.rowsList):(t=e.columns,n=e.hideColumns,a=e.rowsList),{columns:t,hideColumns:n,rowsList:a}},deleteHideColumns:function(e){var t=this.handleResultTableData(e),n=t.columns,a=t.hideColumns;t.rowsList;return n.filter((function(e){return!a.some((function(t){return t===e["key"]}))}))},handleColumns:function(e){var t=this.handleResultTableData(e),n=t.columns,a=t.hideColumns,o=(t.rowsList,n.filter((function(e){return!a.some((function(t){return e.key===t}))})));return o.map((function(e,t){return{dataIndex:e["key"],key:e["key"],scopedSlots:{customRender:e["key"]},title:e["label"]}}))},table2Desc:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1.5,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=t,o=this.handleResultTableData(e),r=o.columns,s=o.hideColumns,l=o.rowsList,i=[];i=n?r.filter((function(e){return!s.some((function(t){return t===e["key"]}))})):r;var c=l.map((function(e,t){var n=[];return i.map((function(t,o){"textarea"===t.type?n.push({label:t.label,key:t.key,value:e[t.key],span:3}):n.push({label:t.label,key:t.key,value:e[t.key],span:a})})),n}));return c}},o={reloadComponent:function(e){var t=e.$route.path;e.$router.push({path:"/FixRouter",query:{path:t}})}}},f3f6:function(e,t,n){e.exports=n.p+"img/empty.eb1f7831.png"}}]);