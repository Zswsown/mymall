<template>
    <div id="toast">
      <div class="toastMessage" v-show="isShow">{{message}}</div>
    </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return{
        // 提示框的内容
        message:'',
        // 默认提示框不显示
        isShow:false
      }
    },
    methods:{
      // 封装一个提示框显示的方法，利用定时器让其在duration时间后不显示
      show(message,duration){
        this.message=message;
        this.isShow=true;
        // 定时器
        setTimeout(()=>{
          this.isShow=false;
          this.message=''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toastMessage{
    /*让提示文本居中显示*/
    position: fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    padding: 8px 10px;
    z-index: 9;

    border-radius: 8px;
    font-size: 13px;
    color:#fff;
    background:rgba(0,0,0,.6);
    /*border:1px solid #f6f6f6;*/
  }
</style>
