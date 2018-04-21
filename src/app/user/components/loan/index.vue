<template>
  <div class="user-card-page">
    <app-header title="贷款查询"></app-header>
		<div class="my-team">
      <i class="sp sp-sea"></i>
			<div class="input">
				<input type="text" placeholder="请输入订单号 / 工号" v-model="keyword">
			</div>
      <i class="icon icon-close" v-show="keyword" @click="keyword = ''"></i>
    </div>
    <div class="nav">
      <div class="nav-group">
        <div class="item" :class="{ active: 1000 == status}" @click="switchState(1000)">
					<div class="sprite">
						<span class="sp sp-refer01"></span>
					</div>
					<div class="title">已提交</div>
				</div>
        <div class="item" :class="{ active: 1001 == status}" @click="switchState(1001)">
					<div class="sprite">
						<span class="sp sp-refer02"></span>
					</div>
					<div class="title">待审核</div>
				</div>
        <div class="item" :class="{ active: 1002 == status}" @click="switchState(1002)">
					<div class="sprite">
						<span class="sp sp-refer04"></span>
					</div>
					<div class="title">审核通过</div>
				</div>
        <div class="item" :class="{ active: 1003 == status}" @click="switchState(1003)">
					<div class="sprite">
						<span class="sp sp-refer03"></span>
					</div>
					<div class="title">审核失败</div>
				</div>
      </div>
    </div>
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="my_scroller">
      <div class="wrapper">
				<div class="container">
          <ul class="list">
            <li class="item" tag="li" v-for="(item, index) in formTemp.list" :key="index">
              <div class="avatar">
								<div class="photo">
									<img :src="item.lender.thumb" alt="">
								</div>
								<div class="title">{{ item.lender.name }}</div>
              </div>
              <div class="info">
                <h2 class="name">申请人 ：{{ item.user_name }}（{{ item.job_no }}）</h2>
                <span v-if="item.user_level_name" class="grade">（{{ item.user_level_name }}）</span>
                <i v-if="0 < item.level" class="sp" :class="'sp-level-0' + item.level"></i>
                <p class="phone">手机号：{{ item.mobile }}</p>
                <p class="time">申请时间：<span class="date">{{ item.create_at }}</span></p>
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