(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e6fc501a"],{2909:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var r=a("6b75");function n(e){if(Array.isArray(e))return Object(r["a"])(e)}a("a4d3"),a("e01a"),a("d28b"),a("a630"),a("d3b7"),a("3ca3"),a("ddb0");function o(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}var s=a("06c5");function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(e){return n(e)||o(e)||Object(s["a"])(e)||c()}},"5c84":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"baseSettingPage"},[a("p",{staticClass:"title"},[e._v(" 账号信息 "),a("a-button",{attrs:{type:"link"},on:{click:e.handleShowAccountModal}},[e._v("编辑")])],1),a("a-divider",{staticClass:"titleDivider"}),a("a-descriptions",{staticClass:"infoDesc",attrs:{column:2,colon:!1}},[a("a-descriptions-item",{attrs:{label:"登录名"}},[e._v(e._s(e.accountForm.loginName||"-"))]),a("a-descriptions-item",{attrs:{label:"用户名"}},[e._v(e._s(e.accountForm.userName||"-"))]),a("a-descriptions-item",{attrs:{label:"昵称"}},[e._v(e._s(e.accountForm.nickName||"-"))]),a("a-descriptions-item",{attrs:{label:"账户类型"}},[e._v(e._s(e.accountForm.AccountType||"-"))]),a("a-descriptions-item",{attrs:{label:"证件类型"}},[e._v(e._s(e.accountForm.ZJLX||"-"))]),a("a-descriptions-item",{attrs:{label:"证件号码"}},[e._v(e._s(e.accountForm.ZJHM||"-"))]),a("a-descriptions-item",{attrs:{label:"单位地址"}},[e._v(e._s(e.accountForm.DWDZ||"-"))]),a("a-descriptions-item",{attrs:{label:"联系人"}},[e._v(e._s(e.accountForm.LXR||"-"))]),a("a-descriptions-item",{attrs:{label:"单位名称"}},[e._v(e._s(e.accountForm.DWMC||"-"))])],1),e.editAccountForm?a("a-modal",{attrs:{visible:!0,width:1e3,title:"修改账号信息","confirm-loading":e.pageLoading},on:{ok:e.handleUpdate,cancel:function(){return e.editAccountForm=!1}}},[a("a-spin",{attrs:{spinning:e.pageLoading}},[a("a-form-model",{ref:"editAccountForm",attrs:{rules:e.rules,model:e.tempAccountForm,"label-col":{span:6},"wrapper-col":{span:18}}},[a("a-row",{attrs:{gutter:16}},["个人"===e.tempAccountForm.AccountType?a("a-col",{attrs:{span:12}},[a("a-form-model-item",{ref:"userName",attrs:{label:"用户名",prop:"userName"}},[a("a-input",{model:{value:e.tempAccountForm.userName,callback:function(t){e.$set(e.tempAccountForm,"userName",t)},expression:"tempAccountForm.userName"}})],1)],1):e._e(),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{ref:"nickName",attrs:{label:"昵称",prop:"nickName"}},[a("a-input",{model:{value:e.tempAccountForm.nickName,callback:function(t){e.$set(e.tempAccountForm,"nickName",t)},expression:"tempAccountForm.nickName"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{ref:"AccountType",attrs:{label:"账号类型",prop:"AccountType"}},[a("a-select",{attrs:{placeholder:"请选择账号类型"},on:{change:e.ZHLX_Change},model:{value:e.tempAccountForm.AccountType,callback:function(t){e.$set(e.tempAccountForm,"AccountType",t)},expression:"tempAccountForm.AccountType"}},[e._l(e.inData.ZHLX_LIST,(function(t,r){return[a("a-select-option",{key:r,attrs:{value:t.TITLE}},[e._v(" "+e._s(t.TITLE)+" ")])]}))],2)],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{ref:"ZJLX",attrs:{label:"证件类型",prop:"ZJLX"}},[a("a-select",{attrs:{placeholder:"请选择证件类型"},on:{change:e.ZJLX_Change},model:{value:e.tempAccountForm.ZJLX,callback:function(t){e.$set(e.tempAccountForm,"ZJLX",t)},expression:"tempAccountForm.ZJLX"}},[e._l(e.inData.ZJLX_LIST,(function(t,r){return[a("a-select-option",{key:r,attrs:{value:t.TITLE}},[e._v(" "+e._s(t.TITLE)+" ")])]}))],2)],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{ref:"ZJHM",attrs:{label:"证件号码",prop:"ZJHM"}},[a("a-input",{model:{value:e.tempAccountForm.ZJHM,callback:function(t){e.$set(e.tempAccountForm,"ZJHM",t)},expression:"tempAccountForm.ZJHM"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{ref:"DWDZ",attrs:{label:"单位地址",prop:"DWDZ"}},[a("a-input",{model:{value:e.tempAccountForm.DWDZ,callback:function(t){e.$set(e.tempAccountForm,"DWDZ",t)},expression:"tempAccountForm.DWDZ"}})],1)],1),"企业"===e.tempAccountForm.AccountType?a("a-col",{attrs:{span:12}},[a("a-form-model-item",{ref:"LXR",attrs:{label:"联系人",prop:"LXR"}},[a("a-input",{model:{value:e.tempAccountForm.LXR,callback:function(t){e.$set(e.tempAccountForm,"LXR",t)},expression:"tempAccountForm.LXR"}})],1)],1):e._e(),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{ref:"DWMC",attrs:{label:"单位名称",prop:"DWMC"}},[a("a-input",{model:{value:e.tempAccountForm.DWMC,callback:function(t){e.$set(e.tempAccountForm,"DWMC",t)},expression:"tempAccountForm.DWMC"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{ref:"mobilePhone",attrs:{label:"手机号码",prop:"mobilePhone"}},[a("a-input",{attrs:{disabled:""},model:{value:e.tempAccountForm.mobilePhone,callback:function(t){e.$set(e.tempAccountForm,"mobilePhone",t)},expression:"tempAccountForm.mobilePhone"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"验证码"}},[a("a-col",{attrs:{span:16}},[a("a-input",{attrs:{type:"text",placeholder:"请输入验证码"},model:{value:e.captchaForm.value,callback:function(t){e.$set(e.captchaForm,"value",t)},expression:"captchaForm.value"}},[a("a-icon",{style:{color:"rgba(0,0,0,.25)"}})],1)],1),a("a-col",{staticStyle:{"text-align":"right"},attrs:{span:8}},[a("a-button",{staticClass:"getCaptcha",attrs:{disabled:e.captchaForm.sendBtn},domProps:{textContent:e._s(e.captchaForm.sendBtn?e.captchaForm.time+" s":"获取验证码")},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.getCaptcha(t)}}})],1)],1)],1)],1)],1)],1)],1):e._e(),e.editAddressForm?a("a-modal",{attrs:{visible:!0,width:800,title:(e.tempAddressForm.id?"编辑":"新增")+"地址信息","confirm-loading":e.pageLoading},on:{ok:e.summitAddressForm,cancel:function(){return e.editAddressForm=!1}}},[a("a-spin",{attrs:{spinning:e.pageLoading}},[a("a-form-model",{attrs:{model:e.tempAddressForm,"label-col":{span:6},"wrapper-col":{span:18}}},[a("a-row",{attrs:{gutter:16}},[a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"收货人"}},[a("a-input",{model:{value:e.tempAddressForm.name,callback:function(t){e.$set(e.tempAddressForm,"name",t)},expression:"tempAddressForm.name"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-model-item",{attrs:{label:"电话号码"}},[a("a-input",{model:{value:e.tempAddressForm.mobile,callback:function(t){e.$set(e.tempAddressForm,"mobile",t)},expression:"tempAddressForm.mobile"}})],1)],1),e._v("descriptions "),a("a-col",{attrs:{span:24}},[a("a-form-model-item",{attrs:{label:"收件地址","label-col":{span:3},"wrapper-col":{span:21}}},[a("cascader",{staticStyle:{width:"calc(43% - 8px)","margin-right":"16px"},model:{value:e.tempAddressForm.address1,callback:function(t){e.$set(e.tempAddressForm,"address1",t)},expression:"tempAddressForm.address1"}}),a("a-input",{staticStyle:{width:"calc(57% - 8px)"},model:{value:e.tempAddressForm.address2,callback:function(t){e.$set(e.tempAddressForm,"address2",t)},expression:"tempAddressForm.address2"}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-model-item",{attrs:{"wrapper-col":{offset:3,span:18}}},[a("a-checkbox",{model:{value:e.tempAddressForm.isDefault,callback:function(t){e.$set(e.tempAddressForm,"isDefault",t)},expression:"tempAddressForm.isDefault"}},[e._v("设置为默认地址")])],1)],1)],1)],1)],1)],1):e._e()],1)},n=[],o=(a("7db0"),a("d81d"),a("fb6a"),a("b0c0"),a("d3b7"),a("4d63"),a("ac1f"),a("25f0"),a("5530")),s=(a("96cf"),a("1da1")),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-cascader",{attrs:{options:e.options,"load-data":e.loadData,placeholder:"请选择"},on:{change:e.onChange},model:{value:e.newValue,callback:function(t){e.newValue=t},expression:"newValue"}})},i=[],m=(a("a15b"),a("3ca3"),a("ddb0"),a("2909")),u=a("3835"),l={props:{value:{type:Array,default:function(){return[]}}},model:{prop:"value",event:"change"},data:function(){return{newValue:[],options:[]}},watch:{value:function(){this.value.map((function(e){return e.value})).join()!==this.newValue.join()&&this.initOptions()}},mounted:function(){this.initOptions()},methods:{initOptions:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r,n,o,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=[],!e.value.length){t.next=14;break}return t.next=4,Promise.all([e.getAddress(),e.getAddress(e.value[0].id),e.getAddress(e.value[1].id,!0)]);case 4:r=t.sent,n=Object(u["a"])(r,3),o=n[0],s=n[1],c=n[2],s.find((function(t){return t.id===e.value[1].id})).children=c,o.find((function(t){return t.id===e.value[0].id})).children=s,a=o,t.next=17;break;case 14:return t.next=16,e.getAddress();case 16:a=t.sent;case 17:e.options=a,e.newValue=e.value.map((function(e){return e.value}));case 19:case"end":return t.stop()}}),t)})))()},getAddress:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise((function(a){fetch("/ws/district/v1/getchildren?key=XRJBZ-GC7W6-ETTSA-EBFEN-2LN4K-2IFS4".concat(e?"&id="+e:"")).then((function(e){return e.json()})).then((function(r){a(r.result[0].map((function(a){return{id:a.id,isProvince:""===e,value:a.fullname,label:a.fullname,isLeaf:t}})))}))}))},loadData:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=e[e.length-1],r.loading=!0,a.next=4,t.getAddress(r.id,!r.isProvince);case 4:r.children=a.sent,t.options=Object(m["a"])(t.options),r.loading=!1;case 7:case"end":return a.stop()}}),a)})))()},onChange:function(e,t){var a=t.map((function(e){return{id:e.id,value:e.value}}));this.$emit("change",a)}}},d=l,p=a("2877"),f=Object(p["a"])(d,c,i,!1,null,"78e2f795",null),g=f.exports,h=a("ed08"),b={components:{Cascader:g},data:function(){var e=this;return{pageLoading:!1,accountForm:{DWDZ:"",DWMC:"",loginName:"",nickName:"",AccountType:"",LXR:"",mailBox:"",mobilePhone:"",userID:"",userName:"",ZJHM:"",ZJLX:""},rules:{DWDZ:[{required:!0,message:"请填写单位地址",trigger:["blur","change"]}],nickName:[{required:!0,message:"请填写昵称",trigger:["blur","change"]}],AccountType:[{required:!0,message:"请填写账号类型",trigger:["blur","change"]}],DWMC:[{required:!0,message:"请填写单位名称",trigger:["blur","change"]}],loginName:[{required:!0,message:"请填写登录名",trigger:["blur","change"]}],LXR:[{required:!0,message:"请填写联系人",trigger:["blur","change"]}],mailBox:[{required:!1,message:"请填写邮箱",trigger:["blur","change"]}],mobilePhone:[{required:!0,message:"请填写手机号码",trigger:["blur","change"]}],userID:[{required:!0,message:"请填写userID",trigger:["blur","change"]}],userName:[{required:!0,message:"请填写用户名",trigger:["blur","change"]}],ZJHM:[{required:!0,trigger:["blur","change"],validator:function(t,a,r){if(""===a)r(new Error("请输入正确的证件号码"));else{var n=e.tempAccountForm.ZJLX,o="";if(e.inData["ZJLX_LIST"].map((function(e,t){e["TITLE"]===n&&(o=e["EXTRAVALUE"])})),e._.isEmpty(o))r();else{var s,c=JSON.parse(o);s=e._.isEmpty(c.option)?new RegExp(c.patten):new RegExp(c.patten,c.option),s.test(a)?e.CheckRegisterInfo("idNumber",a,(function(t){"成功！"===t?r():!e._.isEmpty(t)&&t.hasOwnProperty("desc")&&r(new Error(t["desc"]))})):r(new Error("请输入正确的证件号码"))}}}}],ZJLX:[{required:!0,message:"请填写证件类型",trigger:["blur","change"]}]},zjhmShow:!1,editAccountForm:!1,inData:{ZJLX_LIST:[{value:"身份证"},{value:"身份证2"},{value:"身份证3"}],ZHLX_LIST:[{TITLE:"个人"},{TITLE:"企业"}]},tempAccountForm:{DWDZ:"",DWMC:"",loginName:"",nickName:"",AccountType:"",LXR:"",mailBox:"",mobilePhone:"",userID:"",userName:"",ZJHM:"",ZJLX:""},addressTableColumns:[{key:"name",dataIndex:"name",title:"收货人",width:100},{key:"address",title:"地址",scopedSlots:{customRender:"address"}},{key:"mobile",title:"手机号码",scopedSlots:{customRender:"mobile"}},{key:"action",title:"操作",align:"right",width:300,scopedSlots:{customRender:"action"}}],addressTableRows:[{id:"1212",name:"蓝浩瑜",address1:[{id:"440000",value:"广东省"},{id:"440100",value:"广州市"},{id:"440106",value:"天河区"}],address2:"金碧世纪花园测试超2长长长长长长长长长长长长长长长长长长长",mobile:18826102321,isDefault:!0},{id:"232323",name:"蓝浩瑜",address1:[{id:"440000",value:"广东省"},{id:"440100",value:"广州市"},{id:"440106",value:"天河区"}],address2:"金碧世纪花园测试超2长长长长长长",mobile:18826102321,isDefault:!1}],editAddressForm:!1,tempAddressForm:{},captchaForm:{time:60,sendBtn:!1,value:""}}},computed:function(){},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.accountForm=Object(o["a"])({},e.$store.state.user.user),e.getOriginize();case 2:case"end":return t.stop()}}),t)})))()},methods:{getOriginize:function(){var e=this;this.$WebApi.util["LookupDict"]({listcode:"001"}).then((function(t){e.inData.ZJLX_LIST=t})).catch((function(e){}))},handleShowAccountModal:function(){this.tempAccountForm=Object(o["a"])({},this.accountForm),this.editAccountForm=!0},zjhmFormat:function(e){return e+="",e?e.slice(0,4)+"****"+e.slice(-4):""},dhhmFormat:function(e){return e+="",e?e.slice(0,3)+"****"+e.slice(-4):""},handleShowAddressModal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.tempAddressForm=Object(o["a"])({name:"",address1:[],address2:"",mobile:null,isDefault:!1},e),this.editAddressForm=!0},summitAddressForm:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.pageLoading=!0,t.next=3,new Promise((function(e){setTimeout((function(){e()}),500)}));case 3:e.pageLoading=!1,e.editAddressForm=!1,e.tempAddressForm.id&&(a=e.addressTableRows.find((function(t){return t.id===e.tempAddressForm.id})),a.name=e.tempAddressForm.name,a.address1=e.tempAddressForm.address1,a.address2=e.tempAddressForm.address2,a.mobile=e.tempAddressForm.mobile,a.isDefault=e.tempAddressForm.isDefault,e.$message.success("修改成功"));case 6:case"end":return t.stop()}}),t)})))()},handleUpdate:function(){var e=this;this.$refs.editAccountForm.validate((function(t,a){if(t)if(Window._.isEmpty(e.captchaForm.value))e.$message.warning("请填写手机验证码");else{e.pageLoading=!0;var r={loginName:e.tempAccountForm.loginName,userID:e.tempAccountForm.userID,nickName:e.tempAccountForm.nickName,AccountType:e.tempAccountForm.AccountType,ZJLX:e.tempAccountForm.ZJLX,ZJHM:e.tempAccountForm.ZJHM,DWDZ:e.tempAccountForm.DWDZ,LXR:e.tempAccountForm.LXR,DWMC:e.tempAccountForm.DWMC,mobilePhone:e.tempAccountForm.mobilePhone,VALIDATE:e.captchaForm.value};e.$WebApi.user["updateProUser"]({data:r}).then((function(t){998===t.code?(e.pageLoading=!1,e.$message.error(t.desc)):(e.pageLoading=!1,e.editAccountForm=!1,e.$message.success("修改成功",2),e.$store.state.user.user.ZJLX=r.ZJLX,e.$store.state.user.user.ZJHM=r.ZJHM,e.$store.state.user.user.DWDZ=r.DWDZ,e.$store.state.user.user.AccountType=r.AccountType,e.$store.state.user.user.LXR=r.LXR,e.$store.state.user.user.DWMC=r.DWMC,e.$store.state.user.user.nickName=r.nickName,e.accountForm=Object(o["a"])({},e.$store.state.user.user),e.captchaForm.value="",e.$forceUpdate())})).catch((function(e){}))}else e.$message.warning("请填写必填项")}))},getCaptcha:function(){var e=this;this.$refs.editAccountForm.validate((function(t,a){if(t){var r=e.captchaForm;e.phoneNum=e.$store.state.user.user.mobilePhone,r.sendBtn=!0,e.$WebApi.user["SendVerification"]({sPhoneNum:e.phoneNum}).then((function(t){"短信发送失败！"===t?e.$message.error("短信发送失败!60秒后再验证"):e.$message.success("短信发送成功!");var a=window.setInterval((function(){r.time--<=0&&(r.time=60,r.sendBtn=!1,window.clearInterval(a))}),1e3)})).catch((function(t){clearInterval(interval2),r.time=60,e.$message.error("短信发送失败，请查看网络接口问题"),r.sendBtn=!1,e.requestFailed(t)}))}else e.$message.warning("请填写必填项")}))},CheckRegisterInfo:function(e,t,a){this.$WebApi.user["CheckRegisterInfo"]({key:e,value:t}).then((function(e){return a&&a(e),e})).catch((function(e){}))},ZJLX_Change:function(){},ZHLX_Change:function(){},hadleRefresh:function(){var e=this;h["a"].reloadComponent(e)}}},A=b,v=(a("b4fb"),Object(p["a"])(A,r,n,!1,null,"e3a7f372",null));t["default"]=v.exports},ae4a:function(e,t,a){},b4fb:function(e,t,a){"use strict";a("ae4a")}}]);