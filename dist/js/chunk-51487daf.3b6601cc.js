(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51487daf"],{"10d7":function(t,e,a){},"1f0b":function(t,e,a){},"2d07":function(t,e,a){"use strict";var n=a("5d29"),o=a.n(n);o.a},3931:function(t,e,a){"use strict";var n=a("89bf"),o=a.n(n);o.a},"44de":function(t,e,a){},"5d29":function(t,e,a){},"7fa3":function(t,e,a){},"85a8":function(t,e,a){"use strict";var n=a("7fa3"),o=a.n(n);o.a},"89bf":function(t,e,a){},"9bd0":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tabControl"},t._l(t.titles,(function(e,n){return a("div",{staticClass:"tabControlItem",class:{active:t.currentIndex===n},on:{click:function(e){return t.itemClick(n)}}},[a("span",[t._v(t._s(e))])])})),0)},o=[],r={name:"TabControl",data(){return{currentIndex:0}},props:{titles:{type:Array,default(){return[]}}},methods:{itemClick(t){this.currentIndex=t,this.$emit("tabControlClick",t)}}},s=r,i=(a("3931"),a("2877")),c=Object(i["a"])(s,n,o,!1,null,"627e9047",null);e["a"]=c.exports},b3f1:function(t,e,a){"use strict";var n=a("1f0b"),o=a.n(n);o.a},bb51:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"category"}},[a("nav-bar",{staticClass:"categoryNavBar"},[a("div",{attrs:{slot:"nav-center"},slot:"nav-center"},[t._v("商品分类")])]),a("tab-menu",{attrs:{"tab-menu-content":t.tabMenuContent},on:{tabMenuItemClick:t.tabMenuItemClick}}),a("tab-content",{attrs:{subcategory:t.showSubcategory,"category-detail":t.showCategoryDetail},on:{tabControlClick:t.tabControlClick}})],1)},o=[],r=a("a7ac"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("scroll",{staticClass:"tabMenuScroll"},[a("div",{attrs:{id:"tabMenu"}},t._l(t.tabMenuContent,(function(e,n){return a("div",{staticClass:"tabMenuItem",class:{active:t.currentIndex===n},on:{click:function(e){return t.tabMenuItemClick(n)}}},[t._v(t._s(e.title))])})),0)])},i=[],c=a("5d17"),l={name:"TabMenu",props:{tabMenuContent:{type:Array,default(){return[]}}},data(){return{currentIndex:0}},components:{Scroll:c["a"]},methods:{tabMenuItemClick(t){this.currentIndex=t,this.$emit("tabMenuItemClick",t),this.$bus.$emit("tabMenuItemClick")}}},u=l,b=(a("f55e"),a("2877")),g=Object(b["a"])(u,s,i,!1,null,"256d18e2",null),d=g.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"tabContentContainer"}},[a("tab-control",{directives:[{name:"show",rawName:"v-show",value:t.isToggleTabControlShow,expression:"isToggleTabControlShow"}],ref:"toggletabcontrol",staticClass:"toggletabcontrol",attrs:{titles:t.titles},on:{tabControlClick:t.tabControlClick}}),a("scroll",{ref:"scroll",staticClass:"tabContent",attrs:{"probe-type":3},on:{scroll:t.categoryContentScroll}},[a("tab-content-category",{attrs:{subcategories:t.subcategory},on:{imageLoad:t.catetegoryImageLoad}}),a("tab-control",{ref:"tabcontrol",staticClass:"tabControl",class:{tabControlHidden:t.isToggleTabControlShow},attrs:{titles:t.titles},on:{tabControlClick:t.tabControlClick}}),a("tab-content-datail",{attrs:{"goods-list":t.categoryDetail}})],1),a("back-to-top",{directives:[{name:"show",rawName:"v-show",value:t.isShowBackToTop,expression:"isShowBackToTop"}],nativeOn:{click:function(e){return t.backToTop(e)}}})],1)},h=[],f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.subcategories.data?a("div",{attrs:{id:"tabContentCategory"}},t._l(t.subcategories.data.list,(function(e,n){return a("div",{key:n,staticClass:"item"},[a("a",{attrs:{href:e.link}},[a("img",{staticClass:"item-img",attrs:{src:e.image,alt:""},on:{load:t.imageLoad}}),a("div",{staticClass:"item-text"},[t._v(t._s(e.title))])])])})),0):t._e()},m=[],y={name:"TabContentCategory",props:{subcategories:{type:Object,default(){return[]}}},methods:{imageLoad(){this.$emit("imageLoad")}}},p=y,T=(a("2d07"),Object(b["a"])(p,f,m,!1,null,"31271a0b",null)),v=T.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"goodsList"},t._l(t.goodsList,(function(e,n){return a("goods-list-item",{key:n,staticClass:"goodsItem",attrs:{goodsItem:e},on:{itemImageLoad:t.itemImageLoad}})})),1)},I=[],_=a("1eb0"),w={name:"TabContentDatail",components:{GoodsListItem:_["a"]},props:{goodsList:{type:Array,default(){return[]}}},methods:{itemImageLoad(){this.$bus.$emit("itemImageLoad")}}},x=w,S=(a("85a8"),Object(b["a"])(x,k,I,!1,null,"0b3aa9e4",null)),D=S.exports,M=a("9bd0"),$=a("b95e"),O=a("eecb"),L={name:"TabContent",components:{Scroll:c["a"],TabContentCategory:v,TabContentDatail:D,TabControl:M["a"]},props:{subcategory:{type:Object,default(){return{}}},categoryDetail:{type:Array,default(){return[]}}},data(){return{titles:["流行","新款","精选"],currentTitleEng:"pop",isToggleTabControlShow:!1,tabControlOffsetTop:0,currentScrollY:0}},mixins:[O["a"],O["b"]],methods:{tabControlClick(t){switch(t){case 0:this.currentTitleEng=$["b"];break;case 1:this.currentTitleEng=$["a"];break;case 2:this.currentTitleEng=$["c"];break}this.$emit("tabControlClick",this.currentTitleEng),this.$refs.tabcontrol.currentIndex=t,this.$refs.toggletabcontrol.currentIndex=t,this.isToggleTabControlShow&&this.currentScrollY>this.tabControlOffsetTop&&this.$refs.scroll.scrollTo(0,-this.tabControlOffsetTop,300)},categoryContentScroll(t){this.getBackToTopShow(t),this.isToggleTabControlShow=-t.y>this.tabControlOffsetTop,this.currentScrollY=-t.y},catetegoryImageLoad(){this.$refs.scroll.refresh(),this.tabControlOffsetTop=this.$refs.tabcontrol.$el.offsetTop}}},j=L,E=(a("eaa6"),Object(b["a"])(j,C,h,!1,null,"1c776cff",null)),B=E.exports,A=a("1bab");function N(){return Object(A["a"])({url:"/category"})}function Y(t){return Object(A["a"])({url:"/subcategory",params:{maitKey:t}})}function J(t,e){return Object(A["a"])({url:"/subcategory/detail",params:{miniWallkey:t,type:e}})}var K={name:"Category",components:{NavBar:r["a"],TabMenu:d,TabContent:B},data(){return{tabMenuContent:[],categoryData:{},currentIndex:-1,currentType:$["b"]}},created(){this._getCategory()},computed:{showSubcategory(){return-1===this.currentIndex?{}:this.categoryData[this.currentIndex].subcategories},showCategoryDetail(){return-1===this.currentIndex?[]:this.categoryData[this.currentIndex].categoryDetail[this.currentType].data}},methods:{_getCategory(){N().then(t=>{this.tabMenuContent=t.data.data.category.list;for(let e=0;e<this.tabMenuContent.length;e++)this.categoryData[e]={subcategories:{},categoryDetail:{pop:[],new:[],sell:[]}};this._getSubcategories(0)})},_getSubcategories(t){this.currentIndex=t;const e=this.tabMenuContent[t].maitKey;Y(e).then(e=>{this.categoryData[t].subcategories=e.data,this.categoryData={...this.categoryData},this._getCategoryDetail($["b"]),this._getCategoryDetail($["c"]),this._getCategoryDetail($["a"])})},_getCategoryDetail(t){const e=this.tabMenuContent[this.currentIndex].miniWallkey;J(e,t).then(e=>{this.categoryData[this.currentIndex].categoryDetail[t]=e})},tabMenuItemClick(t){this._getSubcategories(t)},tabControlClick(t){this.currentType=t}}},W=K,G=(a("b3f1"),Object(b["a"])(W,n,o,!1,null,"3fab3edd",null));e["default"]=G.exports},eaa6:function(t,e,a){"use strict";var n=a("44de"),o=a.n(n);o.a},f55e:function(t,e,a){"use strict";var n=a("10d7"),o=a.n(n);o.a}}]);
//# sourceMappingURL=chunk-51487daf.3b6601cc.js.map