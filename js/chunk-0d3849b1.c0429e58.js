(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d3849b1"],{a557:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"IndexPage"},[e("a-spin",{attrs:{spinning:t.spinning}},[e("div",{staticClass:"menuContainer"},[e("div",{staticClass:"scrollTips"},[e("a-row",{attrs:{type:"flex"}},[e("a-col",{attrs:{span:2}},[e("div",{staticClass:"gif-img"},[e("CustomIcon",{staticClass:"myGis",attrs:{name:"onlineOfficeHall-004laba-2"}}),e("CustomIcon",{staticClass:"myGis scale-up-left",attrs:{name:"onlineOfficeHall-shengbo"}})],1)]),e("a-col",{attrs:{span:18}},[e("vue-seamless-scroll",{staticClass:"seamless-warp",attrs:{data:t.noticeList,"class-option":t.classOption}},[e("a-list",{attrs:{size:"small",split:!1,"data-source":t.noticeList},scopedSlots:t._u([{key:"renderItem",fn:function(i,n){return e("a-list-item",{},[e("div",{key:n,staticClass:"my-ellipsis",on:{click:function(e){return t.go2NoticeMore(i)}}},[e("a",{staticClass:"scroll-list-a",attrs:{href:"javascript:void(0);"}},[t._v(t._s(i.TITLE))])])])}}])})],1)],1),e("a-col",{staticStyle:{display:"flex","align-self":"center","justify-content":"flex-end"},attrs:{span:4}},[e("router-link",{staticClass:"linkBtn",attrs:{to:{name:"notice"}}},[e("span",{staticClass:"white-font"},[t._v("更多>>")])])],1)],1)],1),e("a-row",{staticStyle:{flex:"1"},attrs:{gutter:{sm:20,xxl:40},type:"flex",justify:"start",align:"stretch"}},t._l(t.menuList,(function(i,n){return e("a-col",{key:n,staticClass:"menuCol",attrs:{span:8}},[e("a-card",{staticClass:"menuCard",on:{click:function(e){return t.goMainPage(i)}}},[e("div",{staticClass:"imgBox"},[e("img",{attrs:{alt:i.name,src:i.meta.webicon||"/home/nav_0"+(n+1)+".png"}})]),i.count?e("span",{staticClass:"menuCount"},[t._v(t._s(i.count||"暂无数据"))]):t._e(),e("a-card-meta",{attrs:{title:i.meta.title||"暂无数据"}},[e("template",{slot:"description"},[t._v(t._s(i.meta.intro||"暂无数据"))])],2)],1)],1)})),1)],1)])],1)},s=[],o=(e("99af"),e("4de4"),e("7db0"),e("b0c0"),e("5530")),a=e("2f62"),r=e("ca00"),l=e("36d1"),c=e("8207"),h=e("a939"),u=e.n(h),f=e("235e"),d={name:"Home",components:{GlobalHeader:l["a"],GlobalFooter:c["a"],vueSeamlessScroll:u.a},data:function(){return{listData:[],timeFix:Object(r["b"])(),loading:!0,radarLoading:!0,projects:[],activities:[],teams:[],axis1Opts:{dataKey:"item",line:null,tickLine:null,grid:{lineStyle:{lineDash:null},hideFirstLine:!1}},axis2Opts:{dataKey:"score",line:null,tickLine:null,grid:{type:"polygon",lineStyle:{lineDash:null}}},scale:[{dataKey:"score",min:0,max:80}],axisData:[{item:"引用",a:70,b:30,c:40},{item:"口碑",a:60,b:70,c:40},{item:"产量",a:50,b:60,c:40},{item:"贡献",a:40,b:50,c:40},{item:"热度",a:60,b:70,c:40},{item:"引用",a:70,b:50,c:40}],radarData:[],dataArray:[],spinning:!1,noticeList:[],msgIndex:0,nextDisabled:!0,preDisabled:!0,isMsgBox:!1,isCountDisabled:!1}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(a["c"])({user:"user",hasShowMsgBox:"hasShowMsgBox",token:"token"})),Object(a["d"])({menuList:function(t){var i=Object(f["a"])(t.permission.addRouters.find((function(t){return"/"===t.path})));return(i&&i.children||[]).filter((function(t){return"home"!==t.name}))}})),{},{classOption:function(){return{direction:1,limitMoveNum:1,step:.5,singleHeight:30,waitTime:2500}}}),created:function(){},mounted:function(){},watch:{sidebarOpened:function(t){this.collapsed=!t}},methods:{goMainPage:function(t){this.$router.push({name:t.name})},goNoticeList:function(){var t=this;this.noticeList=[],this.$WebApi.home["GetNoticeList"]().then((function(i){t.noticeList=i.rowsList||[],t.noticeList=t.noticeList.concat(t.noticeList),t.isMsgBox=!0,t.$store.commit("SET_MSG_BOX",!0),t.noticeList.length>1&&(t.nextDisabled=!1)}))},nextMsg:function(){this.preDisabled=!1,this.msgIndex++,this.msgIndex>=this.noticeList.length-1&&(this.nextDisabled=!0,this.msgIndex=this.noticeList.length-1)},preMsg:function(){this.nextDisabled=!1,this.msgIndex--,this.msgIndex<=0&&(this.preDisabled=!0,this.msgIndex=0)},closeMsgBox:function(){this.isMsgBox=!1},go2NoticeMore:function(t){this.$router.push({name:"noticeMore",params:{data:t}})}}},m=d,p=(e("c2ed"),e("2877")),v=Object(p["a"])(m,n,s,!1,null,"4b82ee8a",null);i["default"]=v.exports},a939:function(t,i,e){!function(i,e){t.exports=e()}("undefined"!=typeof self&&self,(function(){return function(t){function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}var e={};return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},i.p="",i(i.s=1)}([function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),e(4)();var n=e(5),s=e(6);i.default={name:"vue-seamless-scroll",data:function(){return{xPos:0,yPos:0,delay:0,copyHtml:"",height:0,width:0,realBoxWidth:0}},props:{data:{type:Array,default:function(){return[]}},classOption:{type:Object,default:function(){return{}}}},computed:{leftSwitchState:function(){return this.xPos<0},rightSwitchState:function(){return Math.abs(this.xPos)<this.realBoxWidth-this.width},leftSwitchClass:function(){return this.leftSwitchState?"":this.options.switchDisabledClass},rightSwitchClass:function(){return this.rightSwitchState?"":this.options.switchDisabledClass},leftSwitch:function(){return{position:"absolute",margin:this.height/2+"px 0 0 -"+this.options.switchOffset+"px",transform:"translate(-100%,-50%)"}},rightSwitch:function(){return{position:"absolute",margin:this.height/2+"px 0 0 "+(this.width+this.options.switchOffset)+"px",transform:"translateY(-50%)"}},float:function(){return this.isHorizontal?{float:"left",overflow:"hidden"}:{overflow:"hidden"}},pos:function(){return{transform:"translate("+this.xPos+"px,"+this.yPos+"px)",transition:"all "+this.ease+" "+this.delay+"ms",overflow:"hidden"}},defaultOption:function(){return{step:1,limitMoveNum:5,hoverStop:!0,direction:1,openTouch:!0,singleHeight:0,singleWidth:0,waitTime:1e3,switchOffset:30,autoPlay:!0,navigation:!1,switchSingleStep:134,switchDelay:400,switchDisabledClass:"disabled",isSingleRemUnit:!1}},options:function(){return s({},this.defaultOption,this.classOption)},navigation:function(){return this.options.navigation},autoPlay:function(){return!this.navigation&&this.options.autoPlay},scrollSwitch:function(){return this.data.length>=this.options.limitMoveNum},hoverStopSwitch:function(){return this.options.hoverStop&&this.autoPlay&&this.scrollSwitch},canTouchScroll:function(){return this.options.openTouch},isHorizontal:function(){return this.options.direction>1},baseFontSize:function(){return this.options.isSingleRemUnit?parseInt(window.getComputedStyle(document.documentElement,null).fontSize):1},realSingleStopWidth:function(){return this.options.singleWidth*this.baseFontSize},realSingleStopHeight:function(){return this.options.singleHeight*this.baseFontSize},step:function(){var t=this.options.step;return this.isHorizontal?this.realSingleStopWidth:this.realSingleStopHeight,t}},methods:{leftSwitchClick:function(){if(this.leftSwitchState)return Math.abs(this.xPos)<this.options.switchSingleStep?void(this.xPos=0):void(this.xPos+=this.options.switchSingleStep)},rightSwitchClick:function(){if(this.rightSwitchState)return this.realBoxWidth-this.width+this.xPos<this.options.switchSingleStep?void(this.xPos=this.width-this.realBoxWidth):void(this.xPos-=this.options.switchSingleStep)},_cancle:function(){cancelAnimationFrame(this.reqFrame||"")},touchStart:function(t){var i=this;if(this.canTouchScroll){var e=void 0,n=t.targetTouches[0],s=this.options,o=s.waitTime,a=s.singleHeight,r=s.singleWidth;this.startPos={x:n.pageX,y:n.pageY},this.startPosY=this.yPos,this.startPosX=this.xPos,a&&r?(e&&clearTimeout(e),e=setTimeout((function(){i._cancle()}),o+20)):this._cancle()}},touchMove:function(t){if(!(!this.canTouchScroll||t.targetTouches.length>1||t.scale&&1!==t.scale)){var i=t.targetTouches[0],e=this.options.direction;this.endPos={x:i.pageX-this.startPos.x,y:i.pageY-this.startPos.y},event.preventDefault();var n=Math.abs(this.endPos.x)<Math.abs(this.endPos.y)?1:0;1===n&&e<2?this.yPos=this.startPosY+this.endPos.y:0===n&&e>1&&(this.xPos=this.startPosX+this.endPos.x)}},touchEnd:function(){var t=this;if(this.canTouchScroll){var i=void 0,e=this.options.direction;if(this.delay=50,1===e)this.yPos>0&&(this.yPos=0);else if(0===e){var n=this.realBoxHeight/2*-1;this.yPos<n&&(this.yPos=n)}else if(2===e)this.xPos>0&&(this.xPos=0);else if(3===e){var s=-1*this.realBoxWidth;this.xPos<s&&(this.xPos=s)}i&&clearTimeout(i),i=setTimeout((function(){t.delay=0,t._move()}),this.delay)}},enter:function(){this.hoverStopSwitch&&this._stopMove()},leave:function(){this.hoverStopSwitch&&this._startMove()},_move:function(){this.isHover||(this._cancle(),this.reqFrame=requestAnimationFrame(function(){var t=this,i=this.realBoxHeight/2,e=this.realBoxWidth/2,n=this.options,s=n.direction,o=n.waitTime,a=this.step;1===s?(Math.abs(this.yPos)>=i&&(this.$emit("ScrollEnd"),this.yPos=0),this.yPos-=a):0===s?(this.yPos>=0&&(this.$emit("ScrollEnd"),this.yPos=-1*i),this.yPos+=a):2===s?(Math.abs(this.xPos)>=e&&(this.$emit("ScrollEnd"),this.xPos=0),this.xPos-=a):3===s&&(this.xPos>=0&&(this.$emit("ScrollEnd"),this.xPos=-1*e),this.xPos+=a),this.singleWaitTime&&clearTimeout(this.singleWaitTime),this.realSingleStopHeight?Math.abs(this.yPos)%this.realSingleStopHeight<a?this.singleWaitTime=setTimeout((function(){t._move()}),o):this._move():this.realSingleStopWidth&&Math.abs(this.xPos)%this.realSingleStopWidth<a?this.singleWaitTime=setTimeout((function(){t._move()}),o):this._move()}.bind(this)))},_initMove:function(){var t=this;this.$nextTick((function(){var i=t.options.switchDelay,e=t.autoPlay,n=t.isHorizontal;if(t._dataWarm(t.data),t.copyHtml="",n){t.height=t.$refs.wrap.offsetHeight,t.width=t.$refs.wrap.offsetWidth;var s=t.$refs.slotList.offsetWidth;e&&(s=2*s+1),t.$refs.realBox.style.width=s+"px",t.realBoxWidth=s}if(!e)return t.ease="linear",void(t.delay=i);t.ease="ease-in",t.delay=0,t.scrollSwitch?(t.copyHtml=t.$refs.slotList.innerHTML,setTimeout((function(){t.realBoxHeight=t.$refs.realBox.offsetHeight,t._move()}),0)):(t._cancle(),t.yPos=t.xPos=0)}))},_dataWarm:function(t){t.length},_startMove:function(){this.isHover=!1,this._move()},_stopMove:function(){this.isHover=!0,this.singleWaitTime&&clearTimeout(this.singleWaitTime),this._cancle()}},mounted:function(){this._initMove()},watch:{data:function(t,i){this._dataWarm(t),n(t,i)||(this._cancle(),this._initMove())},autoPlay:function(t){t?(this._cancle(),this._initMove()):this._stopMove()}},beforeCreate:function(){this.reqFrame=null,this.singleWaitTime=null,this.isHover=!1,this.ease="ease-in"},beforeDestroy:function(){this._cancle(),clearTimeout(this.singleWaitTime)}}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(2),s=function(t){return t&&t.__esModule?t:{default:t}}(n);s.default.install=function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.component(i.componentName||s.default.name,s.default)},"undefined"!=typeof window&&window.Vue&&Vue.component(s.default.name,s.default),i.default=s.default},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(0),s=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);var a=e(7),r=e(3),l=r(s.a,a.a,!1,null,null,null);i.default=l.exports},function(t,i){t.exports=function(t,i,e,n,s,o){var a,r=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(a=t,r=t.default);var c,h="function"==typeof r?r.options:r;if(i&&(h.render=i.render,h.staticRenderFns=i.staticRenderFns,h._compiled=!0),e&&(h.functional=!0),s&&(h._scopeId=s),o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},h._ssrRegister=c):n&&(c=n),c){var u=h.functional,f=u?h.render:h.beforeCreate;u?(h._injectStyles=c,h.render=function(t,i){return c.call(i),f(t,i)}):h.beforeCreate=f?[].concat(f,c):[c]}return{esModule:a,exports:r,options:h}}},function(t,i){var e=function(){window.cancelAnimationFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t)}}(),window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}()};t.exports=e},function(t,i){var e=function(t,i){if(t===i)return!0;if(t.length!==i.length)return!1;for(var e=0;e<t.length;++e)if(t[e]!==i[e])return!1;return!0};t.exports=e},function(t,i){function e(){Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)});var t=void 0,i=void 0,s=void 0,o=void 0,a=void 0,r=void 0,l=1,c=arguments[0]||{},h=!1,u=arguments.length;if("boolean"==typeof c&&(h=c,c=arguments[1]||{},l++),"object"!==(void 0===c?"undefined":n(c))&&"function"!=typeof c&&(c={}),l===u)return c;for(;l<u;l++)if(null!=(i=arguments[l]))for(t in i)s=c[t],o=i[t],a=Array.isArray(o),h&&o&&("object"===(void 0===o?"undefined":n(o))||a)?(a?(a=!1,r=s&&Array.isArray(s)?s:[]):r=s&&"object"===(void 0===s?"undefined":n(s))?s:{},c[t]=e(h,r,o)):void 0!==o&&(c[t]=o);return c}var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=e},function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{ref:"wrap"},[t.navigation?e("div",{class:t.leftSwitchClass,style:t.leftSwitch,on:{click:t.leftSwitchClick}},[t._t("left-switch")],2):t._e(),t._v(" "),t.navigation?e("div",{class:t.rightSwitchClass,style:t.rightSwitch,on:{click:t.rightSwitchClick}},[t._t("right-switch")],2):t._e(),t._v(" "),e("div",{ref:"realBox",style:t.pos,on:{mouseenter:t.enter,mouseleave:t.leave,touchstart:t.touchStart,touchmove:t.touchMove,touchend:t.touchEnd}},[e("div",{ref:"slotList",style:t.float},[t._t("default")],2),t._v(" "),e("div",{style:t.float,domProps:{innerHTML:t._s(t.copyHtml)}})])])},s=[],o={render:n,staticRenderFns:s};i.a=o}]).default}))},bbe0:function(t,i,e){},c2ed:function(t,i,e){"use strict";e("bbe0")}}]);