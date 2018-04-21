<template>
  <main class="advice-page">
    <app-header title="意见反馈"></app-header>
    <section class="wrapper">
      <header>您有什么问题或者建议想和我们说？</header>
      <div class="text-wrapper">
        <textarea v-model="adviceString" placeholder="您的宝贵意见是我们进步的源泉~"></textarea>
      </div>
      <div class="phone-wrapper">
        <input type="text" v-model="phone" placeholder="请留下您的联系方式">
      </div>
      <p class="desc">请详细描述您所遇到的问题，有助于我们快速定位及解决问题，或留下您宝贵的意见或建议，我们会认真进行评估！</p>
      <div :class="['submit-btn', { active: adviceString && phone }]" @click="submitAdvice">提交</div>
    </section>
  </main>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
