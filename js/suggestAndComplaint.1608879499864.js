(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["suggestAndComplaint","chunk-8f4e1152","chunk-722fc792","chunk-6db1bf4a","chunk-2d2307dd"],{"09cf":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[this._.isEmpty(t.orginData.rowsList)?t._e():a("busi-descriptions",{attrs:{listData:t.listData,tableFid:[],titleFid:t.titleFid},scopedSlots:t._u([{key:"descTitle",fn:function(e){return a("a-row",{},[t._l(e.currentList,(function(i,s){return["JYBT"===i["key"]||"JYRQ"===i["key"]?a("a-col",{key:s,attrs:{span:8}},[t._v(t._s(i["label"])+": "+t._s(i["value"]))]):t._e(),"DQZT"===i["key"]?a("a-col",{key:s,attrs:{span:8}},[t._v(t._s(i["label"])+": "+t._s(i["value"])+" "),"未提交"===i["value"]?[a("a-button",{staticClass:"titleButton",attrs:{size:"small",type:"primary"},on:{click:function(a){return t.handleEditAgain(e)}}},[t._v("重新编辑")])]:t._e(),"未提交"!=i["value"]?[a("a-button",{staticClass:"titleButton",attrs:{size:"small",type:"primary"},on:{click:function(a){return t.handleQueryMore(e)}}},[t._v("查看详情")])]:t._e()],2):t._e()]}))],2)}}],null,!1,244579364)}),this._.isEmpty(t.orginData.rowsList)&&!t.onSpinning?a("a-empty"):t._e()],1)},s=[],n=(a("a9e3"),a("498a"),a("e0ea")),o=a("ed08"),l={name:"MainList",components:{BusiDescriptions:n["default"]},data:function(){return{orginData:{},listData:[],afterColumns:[],titleFid:["JYBT","JYRQ","DQZT","RID"]}},props:{onSpinning:{type:Boolean,default:!1},radioValue:{type:Number,default:1},searchValue:{type:String,default:""},user:{type:Object,default:function(){return{}}}},watch:{"$store.state.suggestAndComplaintModel.queryComplaint":function(){this.QueryComplaint()},"$store.state.suggestAndComplaintModel.querySuggestions":function(){this.QuerySuggestions()}},mounted:function(){this.QueryComplaint()},methods:{QueryComplaint:function(){var t=this;this.orginData={},this.$emit("update:onSpinning",!0),this.$WebApi.suggest["QueryComplaint"]({type:this.radioValue,keyword:Window._.trim(this.searchValue),userid:this.user.userID}).then((function(e){t.orginData=e,t.listData=o["b"].table2Desc(e,1.5,!1),t.afterColumns=o["b"].deleteHideColumns(e),t.$emit("update:onSpinning",!1)})).catch((function(e){t.$emit("update:onSpinning",!1)}))},QuerySuggestions:function(){var t=this;this.orginData={},this.$emit("update:onSpinning",!0),this.$WebApi.suggest["QuerySuggestions"]({type:this.radioValue,keyword:Window._.trim(this.searchValue),userid:this.user.userID}).then((function(e){t.orginData=e,t.listData=o["b"].table2Desc(e,1.5,!1),t.afterColumns=o["b"].deleteHideColumns(e),t.$emit("update:onSpinning",!1)})).catch((function(e){t.$emit("update:onSpinning",!1)}))},handleEditAgain:function(t){this.$emit("editAgain",t.currentList)},handleQueryMore:function(t){this.$emit("queryMore",t.currentList)}}},r=l,u=a("2877"),c=Object(u["a"])(r,i,s,!1,null,null,null);e["default"]=c.exports},"1b84":function(t,e,a){},"3f09":function(t,e,a){},6856:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"suggest"},[a("a-tabs",{on:{change:t.tabChange},model:{value:t.activeKey,callback:function(e){t.activeKey=e},expression:"activeKey"}},[a("template",{slot:"tabBarExtraContent"},[a("a-button",{attrs:{icon:"plus",type:"primary"},on:{click:t.showProtocol}},[t._v("新增投诉与建议")]),a("a-input-search",{staticStyle:{width:"200px","margin-left":"20px"},attrs:{placeholder:"请输入搜索关键词"},on:{search:t.onSearch}})],1),a("a-tab-pane",{key:"1",attrs:{tab:"投诉"}}),a("a-tab-pane",{key:"2",attrs:{tab:"建议"}})],2),a("div",{staticClass:"radio"},[a("a-radio-group",{on:{change:t.radioChange},model:{value:t.radioValue,callback:function(e){t.radioValue=e},expression:"radioValue"}},[a("a-radio",{attrs:{value:1}},[t._v("所有状态")]),a("a-radio",{attrs:{value:2}},[t._v("未提交")]),a("a-radio",{attrs:{value:3}},[t._v("待回复")]),a("a-radio",{attrs:{value:4}},[t._v("处理中")]),a("a-radio",{attrs:{value:5}},[t._v("已回复")])],1)],1),a("a-layout",{staticClass:"ShowOrganizations",staticStyle:{background:"#fff"}},[a("a-spin",{attrs:{tip:"正在加载...",spinning:t.onSpinning,delay:t.delayTime}},[a("main-list",{attrs:{onSpinning:t.onSpinning,radioValue:t.radioValue,searchValue:t.searchValue,user:t.user},on:{"update:onSpinning":function(e){t.onSpinning=e},"update:on-spinning":function(e){t.onSpinning=e},queryMore:t.queryMore,editAgain:t.editAgain}})],1),a("a-back-top")],1),a("sac-model",{attrs:{user:t.user}}),a("a-modal",{attrs:{visible:t.queryMoreData.visible,title:t.queryMoreData.title,"confirm-loading":t.queryMoreData.confirmLoading,maskClosable:!1,width:"1000px"},on:{ok:t.handleMoreDataOK,cancel:t.handleMoreDataCancel}},[a("div",{staticClass:"queryMoreData"},[a("div",{staticClass:"info-border"},[a("div",{staticClass:"info-border-inner"},["1"===t.activeKey?[t._v("投诉信息")]:[t._v("建议信息")]],2)]),a("a-descriptions",{attrs:{title:"",bordered:""}},[t._l(t.moreData,(function(e,i){return["RID"!=e.key?["HFR"!=e.key&&"HFSJ"!=e.key&&"ZXDH"!=e.key&&"HFNR"!=e.key&&"FILE2"!=e.key?["FILE1"===e.key?[a("a-descriptions-item",{key:i,attrs:{label:"上传文件",span:e.span}},[t._l(e.value,(function(e,i){return[a("div",{key:i},[a("a",{attrs:{href:e,target:"_blank"}},[t._v("文件"+t._s(i+1))])])]}))],2)]:a("a-descriptions-item",{key:i,attrs:{label:e.label,span:e.span}},[t._v(" "+t._s(e.value)+" ")])]:t._e()]:t._e()]}))],2),a("div",{staticClass:"info-border"},[a("div",{staticClass:"info-border-inner"},[t._v("回复信息")])]),a("a-descriptions",{attrs:{title:"",bordered:""}},[t._l(t.moreData,(function(e,i){return["RID"!=e.key?["HFR"===e.key||"HFSJ"===e.key||"ZXDH"===e.key||"HFNR"===e.key||"FILE2"===e.key?["FILE2"===e.key?[a("a-descriptions-item",{key:i,attrs:{label:"回复文件",span:e.span}},[t._l(e.value,(function(e,i){return[a("div",{key:i},[a("a",{attrs:{href:e,target:"_blank"}},[t._v("文件"+t._s(i+1))])])]}))],2)]:a("a-descriptions-item",{key:i,attrs:{label:e.label,span:e.span}},[t._v(" "+t._s(e.value)+" ")])]:t._e()]:t._e()]}))],2)],1)])],1)},s=[],n=(a("d81d"),a("5530")),o=a("2f62"),l=a("ed08"),r=a("09cf"),u=a("95ae"),c={name:"Suggest",components:{MainList:r["default"],"sac-model":u["default"]},props:{},data:function(){return{delayTime:500,queryMoreData:{visible:!1,title:"查看详情",confirmLoading:!1,closable:!0},complaintSubmitData:{},fileurl:[],searchValue:"",activeKey:"1",radioValue:1,onSpinning:!1,docunid:"",saveData:{},moreData:[]}},computed:Object(n["a"])({},Object(o["c"])({user:"userInfo"})),watch:{},methods:{GetSuggestionsSurveyInfo:function(t,e){var a=this;this.fileurl=[],this.fileList=[],this.$WebApi.suggest["GetSuggestionsSurveyInfo"]({sDocUNID:t,userid:this.user.userID}).then((function(t){if(0===e){var i={};a.docunid=t.rowsList[0].RID;var s=JSON.parse(JSON.stringify(t.rowsList[0]));for(var n in s.FILE1&&(i.fileurl=s.FILE1,a.fileurl=s.FILE1,a.fileList=s.FILE1.map((function(t,e){return{uid:e,name:e+".png",status:"done",url:t}})),delete s.FILE1),delete s.RID,s.FILE2&&delete s.FILE2,s)s.hasOwnProperty(n)&&(i["REC_"+n]=s[n]);a.saveData=i,a.suggestFormData=a.saveData,a.suggestData.visible=!0}else a.moreData=l["b"].table2Desc(t,1.5,!1)[0]})).catch((function(t){}))},GetComplaintSurveyInfo:function(t,e){var a=this;this.fileurl=[],this.fileList=[],this.$WebApi.suggest["GetComplaintSurveyInfo"]({sDocUNID:t,userid:this.user.userID}).then((function(t){if(0===e){var i={};a.docunid=t.rowsList[0].RID;var s=JSON.parse(JSON.stringify(t.rowsList[0]));for(var n in s.FILE1&&(i.fileurl=s.FILE1,a.fileurl=s.FILE1,a.fileList=s.FILE1.map((function(t,e){return{uid:e,name:e+".png",status:"done",url:t}})),delete s.FILE1),delete s.RID,s.FILE2&&delete s.FILE2,s)s.hasOwnProperty(n)&&(i["REC_"+n]=s[n]);a.saveData=i,a.complaintFormData=a.saveData,a.complaintData.visible=!0}else a.moreData=l["b"].table2Desc(t,1.5,!1)[0]})).catch((function(t){}))},onSearch:function(t){var e=this;this.searchValue=t,this.$nextTick((function(){"2"===e.activeKey?e.emitQuerySuggestions():e.emitQueryComplaint()}))},tabChange:function(t){"2"===t?this.emitQuerySuggestions():this.emitQueryComplaint()},radioChange:function(t){var e=this;this.radioValue=t.target.value,this.$nextTick((function(){"2"===e.activeKey?e.emitQuerySuggestions():e.emitQueryComplaint()}))},editAgain:function(t){var e="";t.map((function(t,a){"RID"===t.key&&(e=t.value)})),"2"===this.activeKey?this.GetSuggestionsSurveyInfo(e,0):this.GetComplaintSurveyInfo(e,0)},queryMore:function(t){var e="";t.map((function(t,a){"RID"===t.key&&(e=t.value)})),"2"===this.activeKey?this.GetSuggestionsSurveyInfo(e,1):this.GetComplaintSurveyInfo(e,1),this.queryMoreData.visible=!0},handleMoreDataOK:function(){this.queryMoreData.visible=!1},handleMoreDataCancel:function(){this.queryMoreData.visible=!1},showProtocol:function(){this.emitShowProtocol()},emitQuerySuggestions:function(){this.$store.commit("CHANGE_QUERY_SUGGESTIONS")},emitQueryComplaint:function(){this.$store.commit("CHANGE_QUERY_COMPLAINT")},emitShowProtocol:function(){this.$store.commit("CHANGE_SHOW_PROTOCOL")}}},m=c,d=(a("e098"),a("2877")),p=Object(d["a"])(m,i,s,!1,null,"f170484c",null);e["default"]=p.exports},"6be4":function(t,e,a){"use strict";a("1b84")},"95ae":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-modal",{attrs:{visible:t.protocolData.visible,title:t.protocolData.title,"confirm-loading":t.protocolData.confirmLoading,footer:null,maskClosable:!1,width:"600px"},on:{ok:t.handleProtocolOK,cancel:t.handleProtocolCancel}},[a("div",[a("div",{staticStyle:{"text-indent":"2em"}},[t._v(t._s(this.protocolData.content.title))]),a("div",{staticStyle:{margin:"10px 0 5px 0"}},[a("span",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[t._v("注意事项:")])]),a("div",{staticStyle:{color:"red"}},[a("a-icon",{attrs:{type:"exclamation-circle"}}),t._v(" 请认真填写信息，确保所填信息真实有效！")],1),a("div",{staticClass:"protocolContentData"},[a("a-list",{attrs:{size:"small",split:!1,"data-source":t.protocolData.content.data},scopedSlots:t._u([{key:"renderItem",fn:function(e,i){return a("a-list-item",{key:i},[t._v(" "+t._s(e)+" ")])}}])})],1)]),a("div",{staticClass:"addClass"},[a("div",{staticClass:"buttonClass"},[a("a-button",{attrs:{type:"danger"},on:{click:t.handleComplaint}},[t._v("我要投诉")]),a("a-button",{attrs:{type:"primary"},on:{click:t.handleSuggest}},[t._v("我要建议")])],1)])]),a("a-modal",{attrs:{visible:t.suggestData.visible,title:t.suggestData.title,"confirm-loading":t.suggestData.confirmLoading,closable:t.suggestData.closable,maskClosable:!1,width:"800px"},on:{ok:t.handleSuggestOK,cancel:t.handleSuggestCancel}},[a("template",{slot:"footer"},[a("a-button",{attrs:{type:"default",disabled:t.suggestData.confirmLoading},on:{click:t.handleSaveSuggestData}},[t._v("暂存")]),a("a-button",{attrs:{type:"primary",disabled:t.suggestData.confirmLoading},on:{click:t.handleSuggestOK}},[t._v("提交")])],1),a("a-form-model",{ref:"suggestForm",attrs:{model:t.suggestFormData,rules:t.rules,"label-col":{span:4},"wrapper-col":{span:17}}},[a("a-form-model-item",{ref:"REC_JYBT",attrs:{label:"建议标题",prop:"REC_JYBT"}},[a("a-input",{attrs:{placeholder:"请输入建议标题"},model:{value:t.suggestFormData.REC_JYBT,callback:function(e){t.$set(t.suggestFormData,"REC_JYBT",e)},expression:"suggestFormData.REC_JYBT"}})],1),a("a-form-model-item",{ref:"REC_JYLX",attrs:{label:"建议类型",prop:"REC_JYLX"}},[a("a-select",{attrs:{placeholder:"请选择建议类型"},on:{change:t.JYLX_Change},model:{value:t.suggestFormData.REC_JYLX,callback:function(e){t.$set(t.suggestFormData,"REC_JYLX",e)},expression:"suggestFormData.REC_JYLX"}},[t._l(t.inData.JYLX_LIST,(function(e,i){return[a("a-select-option",{key:i,attrs:{value:e.value}},[t._v(" "+t._s(e.value)+" ")])]}))],2)],1),a("a-form-model-item",{ref:"REC_JYRXM",attrs:{label:"建议人姓名",prop:"REC_JYRXM"}},[a("a-input",{attrs:{placeholder:"请输入建议人姓名"},model:{value:t.suggestFormData.REC_JYRXM,callback:function(e){t.$set(t.suggestFormData,"REC_JYRXM",e)},expression:"suggestFormData.REC_JYRXM"}})],1),a("a-form-model-item",{ref:"REC_SFZHM",attrs:{label:"身份证号",prop:"REC_SFZHM"}},[a("a-input",{attrs:{placeholder:"请输入身份证号"},model:{value:t.suggestFormData.REC_SFZHM,callback:function(e){t.$set(t.suggestFormData,"REC_SFZHM",e)},expression:"suggestFormData.REC_SFZHM"}})],1),a("a-form-model-item",{ref:"REC_LXDH",attrs:{label:"联系电话",prop:"REC_LXDH"}},[a("a-input",{attrs:{placeholder:"请输入联系电话"},model:{value:t.suggestFormData.REC_LXDH,callback:function(e){t.$set(t.suggestFormData,"REC_LXDH",e)},expression:"suggestFormData.REC_LXDH"}})],1),a("a-form-model-item",{ref:"REC_DZYX",attrs:{label:"电子邮箱",prop:"REC_DZYX"}},[a("a-input",{attrs:{placeholder:"请输入电子邮箱"},model:{value:t.suggestFormData.REC_DZYX,callback:function(e){t.$set(t.suggestFormData,"REC_DZYX",e)},expression:"suggestFormData.REC_DZYX"}})],1),a("a-form-model-item",{ref:"REC_LXDZ",attrs:{label:"联系地址",prop:"REC_LXDZ"}},[a("a-input",{attrs:{placeholder:"请输入联系地址"},model:{value:t.suggestFormData.REC_LXDZ,callback:function(e){t.$set(t.suggestFormData,"REC_LXDZ",e)},expression:"suggestFormData.REC_LXDZ"}})],1),a("a-form-model-item",{ref:"REC_JYNR",attrs:{label:"建议内容",prop:"REC_JYNR"}},[a("a-input",{attrs:{placeholder:"请输入建议内容"},model:{value:t.suggestFormData.REC_JYNR,callback:function(e){t.$set(t.suggestFormData,"REC_JYNR",e)},expression:"suggestFormData.REC_JYNR"}})],1),a("a-form-model-item",{ref:"fileurl",attrs:{label:"附件上传",prop:"fileurl"}},[a("div",{staticClass:"clearfix"},[a("a-upload",{attrs:{action:t.MaterialUpload,"list-type":"picture-card","file-list":t.fileList},on:{preview:t.handlePreview,change:t.handleUploadChange}},[t.fileList.length<8?a("div",[a("a-icon",{attrs:{type:"plus"}}),a("div",{staticClass:"ant-upload-text"},[t._v("请上传图片")])],1):t._e()]),a("a-modal",{attrs:{visible:t.previewVisible,footer:null},on:{cancel:t.handlePicModalCancel}},[a("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:t.previewImage}})])],1)])],1)],2),a("a-modal",{ref:"complaint",attrs:{visible:t.complaintData.visible,title:t.complaintData.title,"confirm-loading":t.complaintData.confirmLoading,closable:t.complaintData.closable,maskClosable:!1,width:"800px"},on:{ok:t.handleComplaintOK,cancel:t.handleComplaintCancel}},[a("template",{slot:"footer"},[a("a-button",{attrs:{type:"default",disabled:t.complaintData.confirmLoading},on:{click:t.handleSaveComplaintData}},[t._v("暂存")]),a("a-button",{attrs:{type:"primary",disabled:t.complaintData.confirmLoading},on:{click:t.handleComplaintOK}},[t._v("提交")])],1),a("a-form-model",{ref:"complaintForm",attrs:{model:t.complaintFormData,rules:t.rules,"label-col":{span:4},"wrapper-col":{span:17}}},[a("a-form-model-item",{ref:"REC_TSBT",attrs:{label:"投诉标题",prop:"REC_TSBT"}},[a("a-input",{attrs:{placeholder:"请输入投诉标题"},model:{value:t.complaintFormData.REC_TSBT,callback:function(e){t.$set(t.complaintFormData,"REC_TSBT",e)},expression:"complaintFormData.REC_TSBT"}})],1),a("a-form-model-item",{ref:"REC_TSLX",attrs:{label:"投诉类型",prop:"REC_TSLX"}},[a("a-select",{attrs:{placeholder:"请选择投诉类型"},on:{change:t.TSLX_Change},model:{value:t.complaintFormData.REC_TSLX,callback:function(e){t.$set(t.complaintFormData,"REC_TSLX",e)},expression:"complaintFormData.REC_TSLX"}},[t._l(t.inData.TSLX_LIST,(function(e,i){return[a("a-select-option",{key:i,attrs:{value:e.value}},[t._v(" "+t._s(e.value)+" ")])]}))],2)],1),a("a-form-model-item",{ref:"REC_TSRXM",attrs:{label:"投诉人姓名",prop:"REC_TSRXM"}},[a("a-input",{attrs:{placeholder:"请输入投诉人姓名"},model:{value:t.complaintFormData.REC_TSRXM,callback:function(e){t.$set(t.complaintFormData,"REC_TSRXM",e)},expression:"complaintFormData.REC_TSRXM"}})],1),a("a-form-model-item",{ref:"REC_SFZHM",attrs:{label:"身份证号",prop:"REC_SFZHM"}},[a("a-input",{attrs:{placeholder:"请输入身份证号"},model:{value:t.complaintFormData.REC_SFZHM,callback:function(e){t.$set(t.complaintFormData,"REC_SFZHM",e)},expression:"complaintFormData.REC_SFZHM"}})],1),a("a-form-model-item",{ref:"REC_LXDH",attrs:{label:"联系电话",prop:"REC_LXDH"}},[a("a-input",{attrs:{placeholder:"请输入联系电话"},model:{value:t.complaintFormData.REC_LXDH,callback:function(e){t.$set(t.complaintFormData,"REC_LXDH",e)},expression:"complaintFormData.REC_LXDH"}})],1),a("a-form-model-item",{ref:"REC_DZYX",attrs:{label:"电子邮箱",prop:"REC_DZYX"}},[a("a-input",{attrs:{placeholder:"请输入电子邮箱"},model:{value:t.complaintFormData.REC_DZYX,callback:function(e){t.$set(t.complaintFormData,"REC_DZYX",e)},expression:"complaintFormData.REC_DZYX"}})],1),a("a-form-model-item",{ref:"REC_LXDZ",attrs:{label:"联系地址",prop:"REC_LXDZ"}},[a("a-input",{attrs:{placeholder:"请输入联系地址"},model:{value:t.complaintFormData.REC_LXDZ,callback:function(e){t.$set(t.complaintFormData,"REC_LXDZ",e)},expression:"complaintFormData.REC_LXDZ"}})],1),a("a-form-model-item",{ref:"REC_TSNR",attrs:{label:"投诉内容",prop:"REC_TSNR"}},[a("a-input",{attrs:{placeholder:"请输入投诉内容"},model:{value:t.complaintFormData.REC_TSNR,callback:function(e){t.$set(t.complaintFormData,"REC_TSNR",e)},expression:"complaintFormData.REC_TSNR"}})],1),a("a-form-model-item",{ref:"fileurl",attrs:{label:"附件上传",prop:"fileurl"}},[a("div",{staticClass:"clearfix"},[a("a-upload",{attrs:{action:t.MaterialUpload,"list-type":"picture-card","file-list":t.fileList},on:{preview:t.handlePreview,change:t.handleUploadChange}},[t.fileList.length<8?a("div",[a("a-icon",{attrs:{type:"plus"}}),a("div",{staticClass:"ant-upload-text"},[t._v("请上传图片")])],1):t._e()]),a("a-modal",{attrs:{visible:t.previewVisible,footer:null},on:{cancel:t.handlePicModalCancel}},[a("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:t.previewImage}})])],1)])],1)],2)],1)},s=[],n=(a("d3b7"),a("96cf"),a("1da1")),o=a("5530"),l=a("377c");function r(t){return new Promise((function(e,a){var i=new FileReader;i.readAsDataURL(t),i.onload=function(){return e(i.result)},i.onerror=function(t){return a(t)}}))}var u={name:"SuggestAndComplaintModel",props:{user:{type:Object,default:function(){return{}}}},watch:{"$store.state.suggestAndComplaintModel.showProtocol":function(){this.protocolData.visible=!0,this.getDataFromLoginInfo()}},mounted:function(){this.getDataFromLoginInfo()},data:function(){return{rules:{REC_JYBT:[{required:!0,message:"请输入建议标题",trigger:["change","blur"]}],REC_TSBT:[{required:!0,message:"请输入投诉标题",trigger:["change","blur"]}],REC_JYLX:[{required:!0,message:"请选择建议类型",trigger:["change"]}],REC_TSLX:[{required:!0,message:"请选择投诉类型",trigger:["change"]}],REC_JYRXM:[{required:!0,message:"请输入建议人姓名",trigger:["change","blur"]}],REC_TSRXM:[{required:!0,message:"请输入投诉人姓名",trigger:["change","blur"]}],REC_SFZHM:[{required:!0,message:"请输入身份证号码",trigger:["change","blur"]}],REC_LXDH:[{required:!1,message:"请输入联系电话",trigger:["change","blur"]}],REC_LXDZ:[{required:!1,message:"请输入联系地址",trigger:["change","blur"]}],REC_DZYX:[{required:!1,message:"请输入电子邮箱",trigger:["change","blur"]}],REC_JYNR:[{required:!1,message:"请输入建议内容",trigger:["change","blur"]}],REC_TSNR:[{required:!1,message:"请输入投诉内容",trigger:["change","blur"]}],fileurl:[{required:!1,message:"请上传附件"}]},inData:{JYLX_LIST:[{value:"网站建议"},{value:"部门建议"},{value:"我要纠错"}],TSLX_LIST:[{value:"网站投诉"},{value:"部门投诉"},{value:"其他"}]},protocolData:{visible:!1,title:"关于投诉与建议说明",confirmLoading:!1,content:{title:"欢迎您进入平昌县建设工程项目“多审合一”网上办事大厅提出您的投诉与建议，填写前，请仔细阅读以下注意事项。",data:["1、接受自然人、法人或其他组织对平昌县自然资源局和规划局改进工程建设项目“多测合一”办事服务效能、服务方式及网上办事大厅建设的意见和建议。","2、感谢您给我们提出的宝贵的建议。我们会进行严格保密。您的个人信息绝不会向外公开，请根据您的实际情况或内心真实想法如实填写。","3、您可以在用户中心查看您提出的投诉与建议的回复情况。","4、您必须对您填写信息的真实性负责，对其带来的影响承担相应的责任。"]}},suggestData:{visible:!1,title:"新增建议",confirmLoading:!1},suggestFormData:{REC_JYBT:"",REC_JYLX:"",REC_JYRXM:"",REC_SFZHM:"",REC_LXDH:"",REC_LXDZ:"",REC_DZYX:"",REC_JYNR:"",fileurl:[]},suggestSubmitData:{},MaterialUpload:l["K"],fileList:[],previewVisible:!1,complaintData:{visible:!1,title:"新增投诉",confirmLoading:!1,closable:!0},complaintFormData:{REC_TSBT:"",REC_TSLX:"",REC_TSRXM:"",REC_SFZHM:"",REC_LXDH:"",REC_LXDZ:"",REC_DZYX:"",REC_TSNR:"",fileurl:[]},previewImage:""}},methods:{getDataFromLoginInfo:function(){var t,e,a=this.user;for(var i in a)a.hasOwnProperty(i)&&("MAILBOX"===i&&(this.complaintFormData.REC_DZYX=a[i],this.suggestFormData.REC_DZYX=a[i]),"MOBILEPHONE"===i&&(this.complaintFormData.REC_LXDH=a[i],this.suggestFormData.REC_LXDH=a[i]),"DWDZ"===i&&(this.complaintFormData.REC_LXDZ=a[i],this.suggestFormData.REC_LXDZ=a[i]),"USERNAME"===i&&(this.complaintFormData.REC_TSRXM=a[i],this.suggestFormData.REC_JYRXM=a[i]),"ZJLX"===i&&(t=a[i],"身份证"===t&&(this.complaintFormData.REC_SFZHM=e,this.suggestFormData.REC_SFZHM=e)),"ZJHM"===i&&(e=a[i],"身份证"===t&&(this.complaintFormData.REC_SFZHM=e,this.suggestFormData.REC_SFZHM=e)));"身份证"===t&&(this.complaintFormData.REC_SFZHM=e,this.suggestFormData.REC_SFZHM=e)},handleProtocolOK:function(){this.protocolData.visible=!1},handleProtocolCancel:function(){this.protocolData.visible=!1},handleComplaint:function(){this.fileurl=[],this.fileList=[],this.protocolData.visible=!1,this.complaintData.visible=!0},handleSuggest:function(){this.fileurl=[],this.fileList=[],this.protocolData.visible=!1,this.suggestData.visible=!0},handleSuggestOK:function(t){var e=this;this.suggestSubmitData=Object(o["a"])(Object(o["a"])({},this.suggestFormData),{},{userid:this.user.userID,docunid:this.docunid}),this.$refs.suggestForm.validate((function(t,a){t?e.SubmitSuggestions():e.$message.warning("请输入所有必填表单项")}))},handleSuggestCancel:function(t){this.suggestData.visible=!1,this.clearnData()},handleSaveSuggestData:function(){this.suggestSubmitData=Object(o["a"])(Object(o["a"])({},this.suggestFormData),{},{userid:this.user.userID,docunid:this.docunid}),this.SaveSuggestionsDataByTemporarily()},JYLX_Change:function(t){},handlePreview:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.url||t.preview){a.next=4;break}return a.next=3,r(t.originFileObj);case 3:t.preview=a.sent;case 4:e.previewImage=t.url||t.preview,e.previewVisible=!0;case 6:case"end":return a.stop()}}),a)})))()},handleUploadChange:function(t){var e=t.fileList,a=t.file;if(this.fileList=e,a&&"done"===a.status&&a.response&&0===a.response.code&&a.response.data[0].fileUrl&&this.fileurl.push(a.response.data[0].fileUrl),a&&"removed"===a.status&&a.url){var i=a.url;Window._.remove(this.fileurl,(function(t){return t===i}))}!0===this.suggestData.visible&&(this.$set(this.suggestFormData,"fileurl",JSON.parse(JSON.stringify(this.fileurl))),this.$refs.suggestForm.validateField("fileurl")),!0===this.complaintData.visible&&(this.$set(this.complaintFormData,"fileurl",JSON.parse(JSON.stringify(this.fileurl))),this.$refs.complaintForm.validateField("fileurl"))},handlePicModalCancel:function(){this.previewVisible=!1},handleComplaintOK:function(t){var e=this;this.complaintSubmitData=Object(o["a"])(Object(o["a"])({},this.complaintFormData),{},{userid:this.user.userID,docunid:this.docunid}),this.$refs.complaintForm.validate((function(t,a){t?e.SubmitComplaint():e.$message.warning("请输入所有必填表单项")}))},handleComplaintCancel:function(t){this.complaintData.visible=!1,this.clearnData()},handleSaveComplaintData:function(){this.complaintSubmitData=Object(o["a"])(Object(o["a"])({},this.complaintFormData),{},{userid:this.user.userID,docunid:this.docunid}),this.SaveComplaintDataByTemporarily()},TSLX_Change:function(t){},SaveComplaintDataByTemporarily:function(){var t=this;this.complaintData.confirmLoading=!0,this.complaintData.closable=!1,this.$WebApi.suggest["SaveComplaintDataByTemporarily"]({data:JSON.stringify(this.complaintSubmitData)}).then((function(e){t.emitQueryComplaint(),t.complaintData.confirmLoading=!1,t.complaintData.visible=!1,t.complaintData.closable=!0,t.clearnData()})).catch((function(e){t.emitQueryComplaint(),t.complaintData.confirmLoading=!1,t.complaintData.visible=!1,t.complaintData.closable=!0,t.clearnData()}))},SubmitComplaint:function(){var t=this;this.complaintData.confirmLoading=!0,this.complaintData.closable=!1,this.$WebApi.suggest["SubmitComplaint"]({data:JSON.stringify(this.complaintSubmitData)}).then((function(e){t.emitQueryComplaint(),t.complaintData.confirmLoading=!1,t.complaintData.visible=!1,t.complaintData.closable=!0,t.clearnData()})).catch((function(e){t.emitQueryComplaint(),t.complaintData.confirmLoading=!1,t.complaintData.visible=!1,t.complaintData.closable=!0,t.clearnData()}))},clearnData:function(){this.complaintFormData={REC_TSBT:"",REC_TSLX:"",REC_TSRXM:"",REC_SFZHM:"",REC_LXDH:"",REC_LXDZ:"",REC_DZYX:"",REC_TSNR:"",fileurl:[]},this.suggestFormData={REC_JYBT:"",REC_JYLX:"",REC_JYRXM:"",REC_SFZHM:"",REC_LXDH:"",REC_LXDZ:"",REC_DZYX:"",REC_JYNR:"",fileurl:[]},this.fileurl=[],this.fileList=[],this.suggestSubmitData={},this.complaintSubmitData={},this.saveData={}},SaveSuggestionsDataByTemporarily:function(){var t=this;this.suggestData.confirmLoading=!0,this.suggestData.closable=!1,this.$WebApi.suggest["SaveSuggestionsDataByTemporarily"]({data:JSON.stringify(this.suggestSubmitData)}).then((function(e){t.emitQuerySuggestions(),t.suggestData.confirmLoading=!1,t.suggestData.visible=!1,t.suggestData.closable=!0,t.clearnData()})).catch((function(e){t.emitQuerySuggestions(),t.suggestData.confirmLoading=!1,t.suggestData.visible=!1,t.suggestData.closable=!0,t.clearnData()}))},SubmitSuggestions:function(){var t=this;this.suggestData.confirmLoading=!0,this.suggestData.closable=!1,this.$WebApi.suggest["SubmitSuggestions"]({data:JSON.stringify(this.suggestSubmitData)}).then((function(e){t.emitQuerySuggestions(),t.suggestData.confirmLoading=!1,t.suggestData.visible=!1,t.suggestData.closable=!0,t.clearnData()})).catch((function(e){t.emitQuerySuggestions(),t.suggestData.confirmLoading=!1,t.suggestData.visible=!1,t.suggestData.closable=!0,t.clearnData()}))},emitQueryComplaint:function(){this.$store.commit("CHANGE_QUERY_COMPLAINT")},emitQuerySuggestions:function(){this.$store.commit("CHANGE_QUERY_SUGGESTIONS")}}},c=u,m=(a("6be4"),a("2877")),d=Object(m["a"])(c,i,s,!1,null,"6d5c1120",null);e["default"]=d.exports},a261:function(t,e,a){"use strict";a("3f09")},b6e9:function(t,e,a){},e098:function(t,e,a){"use strict";a("b6e9")},e0ea:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"busiDesc"},t._l(t.listData,(function(e,i){return a("div",{key:i},[a("a-card",{attrs:{title:"",bordered:!1,size:"small"}},[a("a-descriptions",{attrs:{size:"small",bordered:""}},[a("a-row",{attrs:{slot:"title"},slot:"title"},[t._t("descTitle",null,{currentList:e})],2),t._l(e,(function(e,i){return[-1===t.hideFid.indexOf(e.key)&&-1===t.titleFid.indexOf(e.key)&&-1===t.tableFid.indexOf(e.key)&&"RID"!=e.key?a("a-descriptions-item",{key:i,attrs:{label:e.label,span:e.span}},[t._v(t._s(e.value||"-")+" ")]):t._e()]})),t._t("hideFid")],2),t._l(e,(function(e,i){return[-1!==t.tableFid.indexOf(e.key)&&"JFQDLIST"!=e.key?[e.value["rowsList"]&&e.value["rowsList"].length>0?a("div",{key:i},[a("div",{staticClass:"wtsxClass"},[t._v(" "+t._s(e.label)+" ")]),t._t("table",null,{tableData:e.value})],2):t._e()]:t._e(),-1!==t.tableFid.indexOf(e.key)&&"JFQDLIST"===e.key?[e.value["JFQD"]&&e.value["JFQD"]["rowsList"]&&e.value["JFQD"]["rowsList"].length>0?a("div",{key:i},[a("div",{staticClass:"wtsxClass"},[t._v(" "+t._s(e.label)+" ")]),a("div",[t._v("TODO:后期在进度里也可以直接缴费")]),t._t("table",null,{tableData:e.value["JFQD"]})],2):t._e()]:t._e()]}))],2)],1)})),0)},s=[],n={name:"BusiDescriptions",components:{},props:{listData:{default:function(){return[]},type:Array,required:!0},tableFid:{default:function(){return[]},type:Array,required:!0},titleFid:{default:function(){return["XMBH","DQZT","WTRQ","RID"]},type:Array,required:!1},hideFid:{default:function(){return[]},type:Array,required:!1}},data:function(){return{}},computed:{},watch:{tableData:{handler:function(t,e){this._.isEmpty(t)},deep:!0}},created:function(){},methods:{}},o=n,l=(a("a261"),a("2877")),r=Object(l["a"])(o,i,s,!1,null,"3641dc1c",null);e["default"]=r.exports},ed08:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return s}));a("4de4"),a("d81d"),a("45fc");var i={handleResultTableData:function(t){var e=[],a=[],i=[];return Array.isArray(t)?(e=t[0].tableResults.columns,a=t[0].tableResults.hideColumns,i=t[0].tableResults.rowsList):Window._.isPlainObject(t)&&t.hasOwnProperty("tableResults")?(e=t.tableResults.columns,a=t.tableResults.hideColumns,i=t.tableResults.rowsList):(e=t.columns,a=t.hideColumns,i=t.rowsList),{columns:e,hideColumns:a,rowsList:i}},deleteHideColumns:function(t){var e=this.handleResultTableData(t),a=e.columns,i=e.hideColumns;e.rowsList;return a.filter((function(t){return!i.some((function(e){return e===t["key"]}))}))},handleColumns:function(t){var e=this.handleResultTableData(t),a=e.columns,i=e.hideColumns,s=(e.rowsList,a.filter((function(t){return!i.some((function(e){return t.key===e}))})));return s.map((function(t,e){return{dataIndex:t["key"],key:t["key"],scopedSlots:{customRender:t["key"]},title:t["label"]}}))},table2Desc:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1.5,a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=e,s=this.handleResultTableData(t),n=s.columns,o=s.hideColumns,l=s.rowsList,r=[];r=a?n.filter((function(t){return!o.some((function(e){return e===t["key"]}))})):n;var u=l.map((function(t,e){var a=[];return r.map((function(e,s){"textarea"===e.type?a.push({label:e.label,key:e.key,value:t[e.key],span:3}):a.push({label:e.label,key:e.key,value:t[e.key],span:i})})),a}));return u}},s={reloadComponent:function(t){var e=t.$route.path;t.$router.push({path:"/FixRouter",query:{path:e}})}}}}]);