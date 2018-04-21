<template>
  <div class="user-ranking-list-page">
    <app-header title="排行榜"></app-header>
    <scroller>
      <div class="wrapper">
        <div class="controller">
          <div class="banner">
            <img src="~assets/images/ranking-list-bg.jpg" alt="">
          </div>
          <div class="tips" v-on:click.stop="goStimulatePage">
            <i class="icon icon-horn"></i>
            <div class="notice">
              <div class="marquee">卡盟金服平台于2018年1月25日正式上线运营，特推出3项排名竞赛活动，1、收入排行榜，2、团队锁粉排行榜，3、直推锁粉排行榜，活动周期60天，人人都可以参与活动公平竞争，点击查看活动详情。</div>
            </div>
          </div>
          <ul class="nav">
            <li class="item" :class="{ 'on': text == '积分' }">
              <span>积分排行</span>
            </li>
            <li class="item" :class="{ 'on': text == '收入' }" @click="switchRank('收入')">
              <span>收入排行</span>
            </li>
            <li class="item" :class="{ 'on': text == '锁粉' }">
              <span>锁粉排行</span>
            </li>
          </ul>
          <ul class="list">
            <li class="item" v-for="(item, index) in formTemp.list" :key="index">
              <div class="number">
                <span v-show="index < 3" class="image sp" :class="'sp-ranking-list-top' + ( index + 1)"></span>
                <span class="text">{{ index + 1 }}</span>
              </div>
              <div class="avatar">
                <img v-if="item.avatar" :src="item.avatar" alt="">
                <img v-else src="~assets/images/user-avatar.png" alt="">
              </div>
              <div class="content left">
                <div class="name user-name">{{ item.name }}</div>
                <div class="text">工号：{{ item.job_no || '未知' }}</div>
              </div>
              <div class="content right">
                <div class="name" v-if="item.integral">{{ item.integral }}</div>
                <div class="name" v-if="item.account">{{ item.account }}</div>
                <div class="name" v-if="item.fans">{{ item.fans }}</div>
                <div class="text">{{ text }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>