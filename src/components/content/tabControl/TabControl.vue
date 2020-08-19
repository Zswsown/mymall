<!--标题栏，当一个组件中只含有文字，不包含其它小图标等，则可以不选用插槽，直接用父组件传titles数组进来，
    在该组件中用v-for中循环遍历每一个title，并将其显示出来-->
<template>
    <div class="tabControl">
      <!--      v-for遍历传进来的titles数组，每一个item为一个title-->
      <!--      绑定动态属性，若当前的title的currentIndex等于数组中title的index，则该title高亮且显示小横线-->
      <!--      监听title的点击，若title被点击了，则currentIndex为当前被点击的title的index-->
      <!--      且该title会向home发出一个事件，告诉home它被点击了，然后home会将home页面的title值替换为被点击的title的值-->
      <!--      （我们在发出事件的同时会发出一个index,帮助home判断哪个title被点击了）-->
      <!--      且在home页面可用计算属性computed实时监听currentTitleEng的值，并用this.goodsList[this.currentTitleEng].list赋值给商品列表进行展示-->
      <div class="tabControlItem"
           v-for="(item,index) in titles"
           :class="{active:currentIndex===index}"
           @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return{
        // 当前title的下标
        currentIndex:0
      }
    },
    props:{
      // 传值进来的titles数组
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      // title被点击时调用的方法
      itemClick(index){
        // 将当前的下标改成被点击的title的下标
        this.currentIndex=index;
        // 点击title后会向home传递一个事件名，请求调用该事件tabControlClick
        this.$emit('tabControlClick',index)
      }
    }

  }
</script>

<style scoped>
  .tabControl{
    display:flex;
    text-align: center;
  }
  .tabControlItem{
    flex:1;
    height:40px;
    line-height:40px;
  }
  /*点击title时该title文本高亮*/
  .active{
    color:var(--color-high-text);
  }
  /*点击title时该title显示下横线*/
  .active span{
    padding:5px;
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
