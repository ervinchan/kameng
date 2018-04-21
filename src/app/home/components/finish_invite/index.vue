<template>
  <main class="finish-invite-page">
    <!-- <app-header title="注册"></app-header> -->
    <scroller ref="myscroller">
      <section class="wrapper">
        <div class="header"></div>
        <ul class="info-wrapper">
          <li class="phone">
            <span>手机号</span>
            <input type="text" placeholder="输入11位手机号码" v-model="phoneNumber">
          </li>
          <li class="code">
            <span>验证码</span>
            <input type="text" placeholder="注意查收短信" v-model="verifyCode">
            <div class="code-wrapper">
              <phoneCode title="获取验证码" :phone="phoneNumber"></phoneCode>
            </div>
          </li>
          <li>
            <span>推荐码</span>
            <span class="val" v-if="disabled">{{ inviteCode }}</span>
            <input type="text" placeholder="请输入推荐码" v-model="inviteCode" v-else>
          </li>
        </ul>
        <div class="save-btn" @click="saveMsg">立即接受邀请</div>
      </section>
    </scroller>
  </main>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
