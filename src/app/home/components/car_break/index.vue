<template>
    <div class="car-break-rules-page">
    <scroller>
      <div class="wrapper">
        <div class="break-rules-top">
          <div class="bg">
            <img src="~assets/images/break-head-bg.png" alt="">
          </div>
          <a class="return" @click="goHome"></a>
        </div>

        <div class="break-add"  @click="identityDialog">
          <div class="add-title">
            <img src="~assets/images/break-icon-jia.png" alt="">添加车辆查违章
          </div>
          <div class="serve">
            <img src="~assets/images/break-icon-wei.png" alt="">享受新违章通知，在线查询等服务
          </div>
        </div>

        <div class="break-cont"></div>

        <div class="break-container" ref="homeSwiper" v-if="carList.length">
          <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(el, index) in carList" :key="index">
              <div class="con-top" @click="goDetailPage(el.id)">
                <div class="title">{{ el.car_number.substring(0, 2) + ' ' +  el.car_number.substring(2) }}</div>
                <div class="tip">剩余查询次数：{{ '15' }}次</div>
                <em></em>
              </div>
              <div class="con-bottom">
                <ul>
                  <li>违章 {{ el.violation && el.violation.unDeal && el.violation.unDeal.total_num ? el.violation.unDeal.total_num : 0 }}</li>
                  <li class="pl"><span class="kou">扣</span>
                    {{ el.violation && el.violation.unDeal && el.violation.unDeal.total_degree ? el.violation.unDeal.total_degree : 0 }}分</li>
                  <li class="pl"><span class="fa">罚</span>
                    {{ el.violation && el.violation.unDeal && el.violation.unDeal.total_count ? el.violation.unDeal.total_count : 0 }}元</li>
                  <!-- <li @click.stop="goMyCarPage"><span>查看详情</span></li> -->
                  <li @click.stop="goDetailPage(el.id)"><span>查看详情</span></li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
        </div>

        <div class="break-list">
          <router-link class="list-item" :to="{name: 'home.CreditCard'}" tag="div">
            <img src="~assets/images/break-item-2.gif" alt="">
            <div class="item-right">
              <div class="title">车老板：办信用卡额度高，秒批！</div>
              <div class="chakan"><img src="~assets/images/break-icon-write.png" alt="">已有1500人成功申请</div>
            </div>
          </router-link>
          <router-link class="list-item" :to="{ name: 'insurance.Home' }" tag="div">
            <img src="~assets/images/break-item-3.gif" alt="">
            <div class="item-right">
              <div class="title">买车险，找卡盟最实惠！</div>
              <div class="chakan"><img src="~assets/images/break-icon-kan.png" alt="">1200人查看</div>
            </div>
          </router-link>
        </div>

        <app-footing></app-footing>
      </div>

    </scroller>

    <transition name="fade">
      <div class="authentication" v-if="isDialogShow">
        <div class="bg" @click="closeDialog"></div>
        <div class="authentication_wrapper" v-if="identityShow">
            <header>
              添加车辆
              <i class="close-btn" @click="closeDialog"></i>
            </header>
            <div class="authentication_content"><span class="yue" ref="location" @click="btnCarTxtShow">{{carTxt[carTxtIndex]}}&nbsp;></span><i class="addcart"></i><input type="text"  placeholder="请输入车牌号码" ref="carCode"/></div>
            <div class="complete-btn" @click="complete">完成</div>
        </div>
          <div class="authentication_wrapper" v-if="codeShow">
            <header>
                手机验证
                <i class="close-btn" @click="closeDialog"></i><br/>
                <span class = "messages">已向133*****233手机发送了验证信息</span>
            </header>
            <div class="authentication_content"><i class = "carode"></i><input type="text"  placeholder="输入验证码"  /></div>
            <div class="complete-btn" @click="complete">完成</div>
          </div>
        <div class="vin-default" v-if="isVinShow" @click="closeDialog"></div>
      </div>
    </transition>
    <div class="region" v-if="carTxtShow">
      <ul>
        <li v-for="(item,index) in carTxt" @click="carTxtItem(index)" :key="index">{{item}}</li>
      </ul>
    </div>
    <transition name="fade">
      <div class="car-dialog" v-if="isCarDialogShow">
        <div class="bg" @click="isCarDialogShow = false"></div>
        <div class="take-photo-wrapper">
          <header>
            <i class="close-btn" @click="isCarDialogShow = false"></i>
          </header>
          <section class="take-photo-content">
            <router-link :to="{ name: 'home.CreditCard' }">
              <div class="photo-card-wrapper">
                  <img class="photo-card" alt="广告" src="~assets/images/creditcar_ad.png" />
              </div>
            </router-link>
          </section>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
