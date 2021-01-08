<!--template这个html5的标签，这个标签中的内容默认是不显示的
应用界面只有一个index.html  App.vue里面的内容就是显示在index.html中

大胆想象一下
document.querySelect("#app").innerHtml=document.querySelect("template").innerHtml
把template标签中的内容放到app中body中，不包含template标签
template模板标签中只能有一个根标签
router-view：表示的是一个不确定显示的内容，这个显示的内容，是一个vue的组件，
    并且在royter中配置使用
-->


<template>

  <div class="app-box">

    <router-view/>
  </div>
</template>

<style lang="less">
//重置边距
* {
  margin: 0px;
  padding: 0px;
}

html,body,.app-box{
  width: 100%;
  height: 100%;
}
</style>
