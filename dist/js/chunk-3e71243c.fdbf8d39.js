(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e71243c"],{"004d":function(e,t,s){},1570:function(e,t,s){"use strict";var i=s("ac41"),r=s.n(i);r.a},1572:function(e,t,s){"use strict";var i=s("a891"),r=s.n(i);r.a},"3b42":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"profile"}},[s("div",{staticClass:"profileFloor"}),s("user-info"),s("user-behavior",{attrs:{"user-behavior":e.userBehavior}}),s("user-activity",{attrs:{"user-activity":e.userActivity}}),s("user-orders",{attrs:{"user-orders":e.userOrders}})],1)},r=[],a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"userInfo"},[e._m(0),s("div",{staticClass:"info"},[s("div",{staticClass:"userName"},[e._v(e._s(e.userName))]),s("div",{staticClass:"userTitle"})])])},n=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"userImage"},[i("img",{attrs:{src:s("d665"),alt:""}})])}],u={name:"UserInfo",props:{userName:{type:String,default(){return"登录/注册>"}}}},m=u,l=(s("1570"),s("2877")),c=Object(l["a"])(m,a,n,!1,null,"f88e0806",null),o=c.exports,f=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"userBehavior"},e._l(e.userBehavior,(function(e,t){return s("user-behavior-item",{attrs:{"item-num":e.itemNum,"item-text":e.itemText}})})),1)},v=[],d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"userBehaviorItem"},[s("div",{staticClass:"itemNum"},[e._v(e._s(e.itemNum))]),s("div",{staticClass:"itemText"},[e._v(e._s(e.itemText))])])},p=[],g={name:"UserBehaviorItem",props:{itemNum:{type:Number,default(){return 0}},itemText:{type:String,default(){return"收藏夹"}}}},_=g,T=(s("f5d4"),Object(l["a"])(_,d,p,!1,null,"626261b2",null)),h=T.exports,I={name:"UserBehavior",components:{UserBehaviorItem:h},props:{userBehavior:{type:Array,default(){return[]}}}},b=I,y=(s("86eb"),Object(l["a"])(b,f,v,!1,null,"9e4e81de",null)),x=y.exports,C=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"userActivity"},e._l(e.userActivity,(function(e,t){return s("user-activity-item",{attrs:{"item-text":e.itemText,"item-title":e.itemTitle,"item-image":e.itemImage}})})),1)},O=[],U=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"userActivityItem"},[s("div",{staticClass:"itemInfo"},[s("span",{staticClass:"itemTitle"},[e._v(e._s(e.itemTitle))]),s("span",{staticClass:"itemText"},[e._v(e._s(e.itemText)+">")])]),s("div",{staticClass:"itemImage"},[s("img",{attrs:{src:e.itemImage,alt:""}})])])},A=[],N={name:"UserActivityItem",props:{itemTitle:{type:String,default(){return"红包签到"}},itemText:{type:String,default(){return"领5元红包"}},itemImage:{type:String,default(){return"../../../assets/images/profile/hongbao.svg"}}}},j=N,B=(s("431f"),Object(l["a"])(j,U,A,!1,null,"b017d9cc",null)),E=B.exports,$={name:"UserActivity",components:{UserActivityItem:E},props:{userActivity:{type:Array,default(){return[]}}}},S=$,w=(s("913e"),Object(l["a"])(S,C,O,!1,null,"a82552d8",null)),k=w.exports,J=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"userOrders"},[s("div",{staticClass:"userOrdersTitle"},[e._v("我的订单")]),s("div",{staticClass:"userOrdersContent"},e._l(e.userOrders,(function(e,t){return s("user-orders-item",{attrs:{"item-image":e.itemImage,"item-title":e.itemTitle}})})),1)])},q=[],F=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"userOrdersItem"},[s("div",{staticClass:"itemImage"},[s("img",{attrs:{src:e.itemImage,alt:""}})]),s("div",{staticClass:"itemTitle"},[e._v(e._s(e.itemTitle))])])},P=[],z={name:"UserOrdersItem",props:{itemImage:{type:String,default(){return"../../../../assets/images/profiles/daifukuan.svg"}},itemTitle:{type:String,default(){return"待付款"}}}},D=z,G=(s("1572"),Object(l["a"])(D,F,P,!1,null,"424c4a73",null)),H=G.exports,K={name:"UserOrders",components:{UserOrdersItem:H},props:{userOrders:{type:Array,default(){return[]}}}},L=K,M=(s("7575"),Object(l["a"])(L,J,q,!1,null,"376be86b",null)),Q=M.exports,R={name:"Profile",components:{UserInfo:o,UserBehavior:x,UserActivity:k,UserOrders:Q},data(){return{userBehavior:[{itemNum:0,itemText:"收藏夹"},{itemNum:0,itemText:"足迹"},{itemNum:0,itemText:"红包卡卷"},{itemNum:0,itemText:"积分"}],userActivity:[{itemTitle:"红包签到",itemText:"领5元红包",itemImage:"../../../assets/images/profile/hongbao.svg"},{itemTitle:"优惠券",itemText:"积分领劵",itemImage:"../../../assets/images/profile/quan.svg"},{itemTitle:"私房礼品",itemText:"超值好礼",itemImage:"../../../assets/images/profile/gift.svg"}],userOrders:[{itemTitle:"待付款",itemImage:"../../../../assets/images/profile/daifukuan.svg"},{itemTitle:"待发货",itemImage:"../../../../assets/images/profile/daifahuo.svg"},{itemTitle:"待收货",itemImage:"../../../../assets/images/profile/daishouhuo.svg"},{itemTitle:"待评价",itemImage:"../../../../assets/images/profile/pingjia.svg"},{itemTitle:"售后",itemImage:"../../../../assets/images/profile/shouhou.svg"}]}}},V=R,W=(s("fdf6"),Object(l["a"])(V,i,r,!1,null,"3b59a30a",null));t["default"]=W.exports},"431f":function(e,t,s){"use strict";var i=s("004d"),r=s.n(i);r.a},7575:function(e,t,s){"use strict";var i=s("7a7d"),r=s.n(i);r.a},"7a7d":function(e,t,s){},8417:function(e,t,s){},"86eb":function(e,t,s){"use strict";var i=s("aec4"),r=s.n(i);r.a},8935:function(e,t,s){},"913e":function(e,t,s){"use strict";var i=s("db6b"),r=s.n(i);r.a},a891:function(e,t,s){},ac41:function(e,t,s){},aec4:function(e,t,s){},d665:function(e,t,s){e.exports=s.p+"img/user.36a2de5d.jpg"},db6b:function(e,t,s){},f5d4:function(e,t,s){"use strict";var i=s("8417"),r=s.n(i);r.a},fdf6:function(e,t,s){"use strict";var i=s("8935"),r=s.n(i);r.a}}]);
//# sourceMappingURL=chunk-3e71243c.fdbf8d39.js.map