(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45fd51f9","chunk-75e40762","chunk-2d2307dd"],{"0dac":function(t,e,n){"use strict";n("c810")},2909:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var a=n("6b75");function s(t){if(Array.isArray(t))return Object(a["a"])(t)}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("d3b7"),n("3ca3"),n("ddb0");function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var i=n("06c5");function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t){return s(t)||o(t)||Object(i["a"])(t)||r()}},"4c6d":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-table",{attrs:{size:"small",columns:t.columns,"data-source":t.data,loading:t.tableLoading,pagination:t.pagination,rowKey:function(t){return t["tableIndex"]},expandedRowKeys:t.expandedRowKeys},on:{expandedRowsChange:t.expandedRowsChange},scopedSlots:t._u([{key:"expandedRowRender",fn:function(e){return[e.FJLIST&&e.FJLIST.length>0?[t._l(e.FJLIST,(function(a,s){return[n("a-row",{key:s,style:{marginBottom:"4px",textAlign:"left",background:"#E6F7FF"}},[n("a-col",{staticStyle:{left:"45px"},attrs:{span:"18"}},[n("a",{style:{marginRight:"10px"},attrs:{href:a.FJURL,target:"_blank"}},[t._v(t._s(a.FJNAME||"-"))])]),n("a-col",{staticStyle:{"text-align":"right",right:"40px"},attrs:{span:"6"}},[0==t.disabled?n("a-button",{attrs:{type:"link",size:"small"},on:{click:function(n){return t.deleteFile(e,s)}}},[t._v("删除")]):t._e()],1)],1)]}))]:n("s-empty")]}},{key:"action",fn:function(e,a){return[n("a-upload",{attrs:{action:t.MaterialUpload,multiple:!0,"file-list":a.action,showUploadList:!1},on:{change:function(e){return t.handleChange(e,a)}}},[n("a-button",{attrs:{size:"small",type:"primary",icon:"upload"}})],1)]}}])})],1)},s=[],o=(n("d81d"),n("a434"),n("2909")),i=n("5530"),r=n("377c"),l=n("ed08"),u=n("b405"),d={name:"UploadTable",components:{"s-empty":u["default"]},props:{tableData:{default:function(){},type:Object,required:!0},disabled:{default:!1,type:Boolean,required:!1},pagination:{default:!1,type:Boolean,required:!1}},data:function(){return{showTemplate:!0,data:[],columns:[],tableLoading:!1,MaterialUpload:r["K"],expandedRowKeys:[]}},computed:{},watch:{tableData:{handler:function(t,e){if(!this._.isEmpty(t)){this.tableLoading=!0;var n=JSON.parse(JSON.stringify(this.tableData));this.columns=this.getTableColumn(n),this.data=this.getTableData(n),this.handleExpandedRows(),this.tableLoading=!1}},immediate:!0,deep:!0}},created:function(){},mounted:function(){},methods:{getTableColumn:function(t){if(this._.isEmpty(t))return{};var e=l["b"].handleColumns(t);return e.push({dataIndex:"action",key:"action",title:"操作",scopedSlots:{customRender:"action"}}),e},getTableData:function(t){var e=[];if(this._.isEmpty(t))e=[];else{var n=t.rowsList;n&&(e=n.map((function(t,e){return Object(i["a"])(Object(i["a"])({},t),{},{tableIndex:e,action:[]})})))}return e},handleChange:function(t,e){var n=Object(o["a"])(t.fileList),a=t.file;a.response&&"done"===a.status?0===a.response.code?(e.FJLIST.push({FJNAME:a.response.data[0].fileName,FJURL:a.response.data[0].fileUrl}),this.expandedRowKeys.push(e.tableIndex)):this.$message.error("文件上传失败！"):"error"===a.status&&this.$message.error("文件上传失败！"),n=n.map((function(t){return t.response&&"done"===t.status&&t.response.code,t})),e.action=n},deleteFile:function(t,e){t.FJLIST.splice(e,1),t.FJLIST&&0===t.FJLIST.length&&(this.expandedRowKeys=[])},getSubmitData:function(){var t=JSON.parse(JSON.stringify(this.data));return t.map((function(t,e){return delete t.tableIndex,delete t.action,t}))},isAllSubmit:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=!0;return this.data&&this.data.length>0?this.data.map((function(n,a){t?n.FJLIST.length<=0&&n.SFBX&&"是"===n.SFBX&&(e=!1):n.FJLIST.length<=0&&(e=!1)})):e=!1,e},handleExpandedRows:function(){var t=this;this.data.map((function(e,n){e.FJLIST&&e.FJLIST.length>0&&t.expandedRowKeys.push(e.tableIndex)}))},expandedRowsChange:function(t){this.expandedRowKeys=t}}},c=d,p=(n("0dac"),n("2877")),f=Object(p["a"])(c,a,s,!1,null,"681a6d02",null);e["default"]=f.exports},b405:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a-empty",{attrs:{image:t.imgPath,"image-style":{height:t.height}}},[n("span",{attrs:{slot:"description"},slot:"description"})])},s=[],o={name:"SEmpty",components:{},props:{height:{default:"100%",type:String}},data:function(){return{imgPath:n("f3f6")}},computed:{},watch:{},created:function(){},methods:{}},i=o,r=n("2877"),l=Object(r["a"])(i,a,s,!1,null,"138622d4",null);e["default"]=l.exports},c810:function(t,e,n){},ed08:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return s}));n("4de4"),n("d81d"),n("45fc");var a={handleResultTableData:function(t){var e=[],n=[],a=[];return Array.isArray(t)?(e=t[0].tableResults.columns,n=t[0].tableResults.hideColumns,a=t[0].tableResults.rowsList):Window._.isPlainObject(t)&&t.hasOwnProperty("tableResults")?(e=t.tableResults.columns,n=t.tableResults.hideColumns,a=t.tableResults.rowsList):(e=t.columns,n=t.hideColumns,a=t.rowsList),{columns:e,hideColumns:n,rowsList:a}},deleteHideColumns:function(t){var e=this.handleResultTableData(t),n=e.columns,a=e.hideColumns;e.rowsList;return n.filter((function(t){return!a.some((function(e){return e===t["key"]}))}))},handleColumns:function(t){var e=this.handleResultTableData(t),n=e.columns,a=e.hideColumns,s=(e.rowsList,n.filter((function(t){return!a.some((function(e){return t.key===e}))})));return s.map((function(t,e){return{dataIndex:t["key"],key:t["key"],scopedSlots:{customRender:t["key"]},title:t["label"]}}))},table2Desc:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1.5,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=e,s=this.handleResultTableData(t),o=s.columns,i=s.hideColumns,r=s.rowsList,l=[];l=n?o.filter((function(t){return!i.some((function(e){return e===t["key"]}))})):o;var u=r.map((function(t,e){var n=[];return l.map((function(e,s){"textarea"===e.type?n.push({label:e.label,key:e.key,value:t[e.key],span:3}):n.push({label:e.label,key:e.key,value:t[e.key],span:a})})),n}));return u}},s={reloadComponent:function(t){var e=t.$route.path;t.$router.push({path:"/FixRouter",query:{path:e}})}}},f3f6:function(t,e,n){t.exports=n.p+"img/empty.eb1f7831.png"}}]);