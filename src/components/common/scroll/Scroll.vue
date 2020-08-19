<template>
    <!--    ref便于我们取wrapper这个div,用原生js(document.querySelector('.classname')取div可能会取其它该class)-->
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return{
        // scroll保留我们创建出来的better-scroll对象
        scroll:null,
        // 当前滚动的位置信息
        currentPosition:{}
      }
    },
    props:{
      // 监听类型，默认为1，监听滚动事件，但不会实时派发
      probeType:{
        type:Number,
        default:1
      },
      // 默认在封装的better-scroll组件中的点击事件是可以触发的
      click:{
        type:Boolean,
        default:true,
      },
      // 默认是不可以触发上拉加载事件的
      pullToLoad:{
        type:Boolean,
        default:false
      }

    },
    mounted(){
      // 1.创建better-scroll实例对象
      // probeType为监听类型
      // 取值：0或1，滚动的时候会派发scroll事件，会截流。
      // 取值：2，滚动的时候实时派发scroll事件，不会截流，在惯性滚动的情况下不会实时派发scroll事件。
      // 取值：3，除了实时派发scroll事件，在惯性滚动的情况下仍然能实时派发scroll事件
      this.scroll=new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:this.click,
        pullToLoad:this.pullToLoad
      })

      // 2.监听滚动事件，并向外实时派发现在的位置,
      // 如首页可监听该滚动事件，并对传出去的option值与其设定的值进行比较，用来设置返回顶部按钮的显示与隐藏
      if(this.probeType===2 || this.probeType===3){
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
      }

      // 3.监听上拉加载事件
      if(this.pullToLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      // 给每一个方法前面添加"this.scroll && this.scroll.方法"判断，是为了防止scroll还没被挂载好，若还没挂载好，则scroll为null/undefined

      // 滚动方法，可以让使用者滚动到想要的位置，duration为滚动时间
      scrollTo(x,y,duration=300){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,duration);
      },

      // 结束上拉操作，每次触发上拉操作的方法后，要调用结束上拉操作的方法后才可以进行下一次的上拉操作
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
      },

      // 刷新操作
      refresh(){
        // console.log('---');//查看调用refresh函数的次数
        this.scroll && this.scroll.refresh && this.scroll.refresh();
      },

      // 得到当前滚动的位置信息,先判断scroll是否为空
      getScrollPosition(){
        if(this.scroll){
          this.currentPosition.x=this.scroll.x;
          this.currentPosition.y=this.scroll.y;
        }
        else{
          this.currentPosition.x=0;
          this.currentPosition.y=0;
        }
        return this.currentPosition;
      }
    }
  }
</script>

<style scoped>

</style>
