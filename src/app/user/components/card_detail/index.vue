<template>
  <div class="user-card-detail-page">
    <app-header title="办卡查询"></app-header>
    <scroller>
      <div class="wrapper">
        <div class="container" v-if="formTemp">
          <div class="banner">
            <img :src="formTemp.bank.banner">
          </div>

          <div class="time">
						<div class="bank-log">
							<img :src="formTemp.bank.thumb">
						</div>
            <span class="bank-name">{{ formTemp.bank.name }}</span>
            <span v-if="userInfo.id === formTemp.user_id" class="state">进度查询</span>
            <span v-else class="state" v-on:click="handleNotice()"><!-- {{ formTemp.status_val }} -->提醒查询</span>
          </div>

          <div class="text">
            <div class="info">申请时间：
							<span class="date">{{ formTemp.create_at }}</span>
						</div>
            <div class="info">申请人：
							<span class="date">{{ formTemp.user_name }}（{{ formTemp.user_id }}）<i>（{{ formTemp.user_level_name }}）</i></span>
						</div>
            <!-- <div class="info">证件号：
							<span class="date">{{ formTemp.id_number | hideId }}</span>
						</div> -->
            <div class="info">手机号：
							<span class="date">{{ formTemp.phone | hidePhone }}</span>
						</div>
            <!-- <div class="info">浏览时间：
              <span class="date">2017-11-20 <i>18:30:31</i></span>
            </div> -->
          </div>

          <div class="status">
            <div class="sta-group">
              <div class="sta-txt">
                <i v-if="1 <= formTemp.status_alias" class="sp sp-success"></i>
                <span :class="{ on: 1 <= formTemp.status_alias }">已提交</span>
              </div>
              <div class="sta-txt">
                <i v-if="2 <= formTemp.status_alias" class="sp sp-success"></i>
                <span :class="{ on: 2 <= formTemp.status_alias }">待审核</span>
              </div>
              <div class="sta-txt">
                <i v-if="3 <= formTemp.status_alias" class="sp sp-success"></i>
                <span :class="{ on: 3 <= formTemp.status_alias }">审核中</span>
              </div>
              <div class="sta-txt">
                <i v-if="4 <= formTemp.status_alias"
                    :class="['sp', {'sp-success': 4 == formTemp.status_alias, 'sp-failure': 5 == formTemp.status_alias}]"></i>
                <span :class="{ on: 4 <= formTemp.status_alias, fall: 5 == formTemp.status_alias }">
                  {{ 4 == formTemp.status_alias ? '审核通过' : 5 == formTemp.status_alias ? '审核失败' : '审核结果' }}
                </span>
              </div>
            </div>
          </div>

          <!-- <div class="foot-tip">
            <p>申请进度无需查询，7-15个工作日会自动更新申请状态</p>
          </div> -->

          <div class="desc" v-if="type == 1000 || type == 1001">
            <p><b>[信用卡佣金]</b></p>
            <p>条件：必须是在卡盟平台申请而且是该行首卡。</p>
            <p>时间：收到银行寄卡短信通知开始计算，达到规定时间后自动计算。逢法定节假日延后。</p>
            <p>如超过规定时间又确定银行已寄卡的。请提供办卡者姓名、电话、下卡银行给客服登记，统一给银行核查。</p>
            <p>(交通、兴业、上海、民生、浦发、华夏寄卡12个工作日后；光大白金、工商寄卡30个工作日后)</p>
          </div>

          <div class="desc" v-if="type == 1003">
            <p><span style="color: red;">审核失败：</span>① 此次申请并非本行首卡; &nbsp; ② 银行审批不通过; &nbsp; ③ 同时在其他平台申请过; &nbsp; ④ 平台填写资料与银行填写不一致。</p>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
