# mymall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

###1.封装tabbar
```
（1）先设置好tabbar的高度、定位及其内容的显示方式，将其包含的内容作为一个插槽对外开放
<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Tabbar"
  }
</script>

<style scoped>
  #tabbar{
    /*样式*/
    background-color: #f6f6f6;
    height: 49px;
    border-top: 1px solid #eee;
    box-shadow: 0px -1px 1px rgba(150,150,150,.08);

    /*定位*/
    position:fixed;
    bottom:0;
    left:0;
    right:0;

    /*布局*/
    display:flex;
    text-align: center;
  }
</style>
（2）再设置tabbar-item的内容及其flex布局所占的份数，tabbar-item内容有三部分，未点击时的icon，点击时的active-icon，icon下的文本，将这三部分作为三个独立的插槽对外开放
<template>
  <!--  v-show适合于频繁切换，v-if适合于单次切换-->
  <div class="tabbar-item" @click="itemClick">
    <!--    未点击时的icon-->
    <div class="item-icon" v-show="!isActive">
      <slot name="icon"></slot>
    </div>

    <!--    点击时显示的icon-->
    <div class="item-active-icon" v-show="isActive">
      <slot name="active-icon"></slot>
    </div>

    <!--    tabbar标题文字-->
    <div class="item-text" :style="activeStyle">
      <slot name="icon-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabbarItem",
    props:{
      // tabbar被点击时相对应传进来的path路径
      path:{
        //必须传值
        require:true,
        type:String
      }
    },
    computed:{
      // 将路由配置中的所有path与当前传进来的path对比，若有当前传进来的path,则该icon切换成高亮icon
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1;
      },
      // 若isActive为真，则该icon下文字也显示为高亮
      activeStyle(){
        return this.isActive?'color:#ff5777':'';
      }
    },
    methods:{
      // 当icon被点击时，将路由的路径替换为当前传进来的path,replace不可后退
      itemClick(){
        return this.$router.replace(this.path);
      }
    }
  }
</script>

<style scoped>
  /*每个tabbar-item平分一份*/
  .tabbar-item{
    flex:1;
  }

  /*icon图标，active-icon图标*/
  .item-icon img,.item-active-icon img{
    height:24px;
    width:24px;
    margin-top:5px;
    /*图片底边会有白边，设置vertical-align会避免这种情况*/
    vertical-align: middle;
  }

  /*tabbar文字*/
  .item-text{
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }
</style>
（3）将对tabbar赋值tabbar-item的操作封装于maintabbar中
```

###2.封装navbar
```
（1）将navbar分成左中右三部分，左右为固定宽度，中间为自适应宽度（flex:1）；
（2）可通过设置css变量的方法给navbar绑定特定的class，以显示不同的样式
<template>
    <div class="navbar">
      <div class="nav-left"><slot name="nav-left"></slot></div>
      <div class="nav-center"><slot name="nav-center"></slot></div>
      <div class="nav-right"><slot name="nav-right"></slot></div>
    </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .navbar{
    display: flex;
    height:44px;
    line-height:44px;
    text-align:center;
  }

  /*左插槽，可用于做返回标签*/
  .nav-left{
    width:60px;
  }

  /*右插槽，可用于做多选项*/
  .nav-right{
    width:60px;
  }

  /*中间插槽，可用于容纳内容，如标题等*/
  .nav-center{
    flex:1;
  }
</style>
```

###3.请求数据，需要封装网络请求模块，封装一个request网络请求模块，其他小模块再引用它。
```
import axios from 'axios'

export function request(config){
  // 1.创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/z8',
    timeout:10
  })
  // 2.请求拦截
  instance.interceptors.request.use(config=>{
    console.log("请求拦截成功")
    return config
  },err=>{
    console.log("请求拦截失败")
    // 抛出异常
    throw err
  })
  // 3.响应拦截
  instance.interceptors.response.use(res=>{
    console.log("响应拦截成功")
    return res
  },err=>{
    console.log("响应拦截失败")
    console.log(err)
    // 判断错误代码类型
    if(err&&err.response){
      switch(err.response.status){
        case 400:
          err.message="请求失败"
          break
        case 401:
          err.message="未授权的访问"
          break
      }
    }
    // 抛出异常
    throw err
  })

  // 2.传入配置进行网络请求
  return instance(config)
}

（2）首页请求数据模块：
import {request} from "./request";

// 请求首页的多条数据，如轮播图图片等
export function getMultiData(){
  return request({
    url:'/home/multidata'
  })
}
```

###4.封装轮播图
```
（1）封装轮播图，将请求到的轮播图的照片数组数据保存在banners中
（2）在home文件夹中创建子组件childComps文件夹，保留关于home页面中的子组件，新建一个HomeSwiper组件，在该组件中导入封装好的swiper和swiperItem，将banners作为传入swiper组件的值，利用v-for循环遍历banners，将每一个item作为swiperItem，用v-bind:绑定需要的属性
```

###5.封装tabControl
```
ps：当一个组件中只包含文字，且文字是可变的，则可以不用插槽，可利用父组件传titles数组到该组件中，v-for遍历该titles数组，每一个item为一个title
```

###6.封装回到顶部backToTop组件
```
（1）利用ref=”homescroll”取到首页的scroll组件
（2）因为在组件上不可以直接绑定事件，所以我们可利用.native在backToTop组件上绑定点击事件，事件中调用scroll组件中的scrollTo()方法，使其滚动到顶部
（3）不要用鼠标去滑动，要用手指去滑动，不然会出错
```
