import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载，当路由被访问的时候才能加载对应组件
const Home=()=>import('../views/home/Home');
const Category=()=>import('../views/category/Category');
const Shopcart=()=>import('../views/shopcart/Shopcart');
const Profile=()=>import('../views/profile/Profile');
const Detail=()=>import('../views/detail/Detail')

// 避免路由重复点击后报路由重复的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 1.安装路由插件
Vue.use(VueRouter)

// 2.配置路由信息
const routes=[
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
  },
  {
    path:'/category',
    component:Category,
  },
  {
    path:'/shopcart',
    component:Shopcart,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    // 动态路由 ：iid
    path:'/detail/:iid',
    component:Detail,
  }
]

// 3.创建路由对象
const router=new VueRouter({
  mode:'hash',
  base:process.env.BASE_URL,
  routes,
  // mode:'history', //history是相对于根目录的，要history生效生效只能配置服务器的根目录
})

// 4.导出路由
export default router
