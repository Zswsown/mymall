<template>
  <div id="category">
    <!--    分类页导航栏-->
    <nav-bar class="categoryNavBar"><div slot="nav-center">商品分类</div></nav-bar>

    <!--    分类页分类标签组件-->
    <tab-menu :tab-menu-content="tabMenuContent"
              @tabMenuItemClick="tabMenuItemClick"></tab-menu>

    <!--    分类页分类标签对应的子标签的内容-->
    <tab-content :subcategory="showSubcategory"
                 :category-detail="showCategoryDetail"
                 @tabControlClick="tabControlClick"></tab-content>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import TabContent from "./childComps/TabContent";

  import {
    // 请求分类标签的数据
    getCategory,
    // 请求分类标签对应的子标签的数据
    getSubcategory,
    // 请求分类标签对应的商品数据
    getCategoryDetail
  } from "../../network/category";

  import {POP,NEW,SELL} from "../../common/const"

  export default {
    name: "Category",
    components:{
      // 导航栏
      NavBar,

      // 分类页分类标签
      TabMenu,

      // 分类页分类标签对应的子分类标签和对应商品的内容框
      TabContent,
    },
    data(){
      return{
        // 分类页分类标签内容
        tabMenuContent:[],

        // 分类页分类标签对应的内容
        categoryData: {},

        // 记录当前被点击的分类标签的下标,默认为-1，只有当该页面刚被创建时才会赋值为0
        currentIndex: -1,

        // 记录当前被点击的分类标签的对应的商品的类型
        currentType:POP,
      }
    },
    created() {
      // 请求分类数据
      this._getCategory()
    },
    computed: {
      // 1.返回当前点击的分类标签的子分类标签的内容
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      // 2.返回当前对应的点击标签对应的商品详情数据
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType].data
      }
    },

    // activated() {
    //   // 当页面被激活时，进行一次刷新，防止页面不能滚动
    //   this.$refs.scroll.refresh();
    // },

    methods:{
      // 1.请求分类数据
      _getCategory() {
        getCategory().then(res => {
          // （1）请求分类页的分类标签数据
          this.tabMenuContent = res.data.data.category.list
          // （2）初始化每个类别的子数据
          for (let i = 0; i < this.tabMenuContent.length; i++) {
            this.categoryData[i] = {
              // 1）分类标签中子分类标签的内容
              subcategories: {},
              // 2）分类标签中子分类标签对应的商品详情数据,商品数据中又有三种类型，“流行”、“新款”、“热卖”
              categoryDetail: {
                // 流行
                'pop': [],
                // 新款
                'new': [],
                // 热卖
                'sell': []
              }
            }
          }
          // （3）在加载分类页面时，默认第一个分类被点击，所以需要请求第一个分类的数据
          this._getSubcategories(0)
        })
      },

      // 2.请求各子分类标签对应的商品数据，默认将点击分类标签时tabMenu传出的index作为请求该分类标签对应的商品数据的参数
      _getSubcategories(index) {
        // （1）更新请求数据的分类标签的下标
        this.currentIndex = index;

        // （2）取得该分类标签对应的密钥
        const maitKey = this.tabMenuContent[index].maitKey;

        // （3）请求该分类标签对应的数据
        getSubcategory(maitKey).then(res => {
          // 1）存储子分类标签的内容
          this.categoryData[index].subcategories = res.data

          // 2）进行拼接，等于this.categoryData作为一个数组元素添加进this.categoryData中
          this.categoryData = {...this.categoryData}

          // 3）请求分类标签对应的商品数据，按照商品类型来进行请求
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },

      // 3.获取被点击的分类标签 对应的商品数据
      _getCategoryDetail(type) {
        //（1）获取请求的miniWallkey
        const miniWallkey = this.tabMenuContent[this.currentIndex].miniWallkey;

        //（2）发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {

          // （3）将获取到的子分类标签对应的商品数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          // this.categoryData = {...this.categoryData}
        })
      },

      /**
       * 事件响应相关的方法
       */
      tabMenuItemClick(index) {
        // 获取被点击的分类标签对应的数据
        this._getSubcategories(index);
      },

      // 接收tabControl组件传出来的事件，刷新分类标签中商品类型对应的商品内容，
      // 更改currentType会导致计算属性中showCategoryDetail中的数据也被刷新，达到我们的目的
      tabControlClick(type){
        this.currentType=type;
      }
    }

  }
</script>

<style scoped>
  #category{

  }
  .categoryNavBar{
    background: var(--color-tint);
    color:#fff;
  }
</style>
