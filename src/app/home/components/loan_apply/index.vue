<template>
  <div class="loan-apply-page">
    <app-header title="贷款申请"></app-header>
    <scroller ref="myscroller">

      <div class="banner">
        <img src="~assets/images/loan-banner.jpg">
      </div>

      <div class="explain">
        <div class="title">选择或添加申请人信息</div>
        <div class="content">
          <div class="box">请确保选择或添加的申请人信息与贷款申请表所填信息保持真实一致，以免影响信用贷款进度；本平台对此信息保密，仅作提交金融机构工作人员审核,审核通知将以短信形式发送至该号码。</div>
        </div>
      </div>

      <div class="info-wrapper" v-show="0 < formList.length">
        <ul class="list">
          <transition-group enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
            <li class="item" :class="{'on': formData.id === item.id }" v-for="(item, index) in formList" :key="index">
              <a href="javascript:" @click="handelSelectData(item)">
                <div class="text">姓名：{{ item.name }}</div>
                <div class="text">证件：{{ item.id_number }}</div>
                <div class="text">电话：{{ item.phone }}</div>
                <div class="select">
                  <i class="icon icon-choice"></i>
                </div>
                <div class="del" @click="deleteData(item)">
                  <i class="icon icon-del"></i>
                </div>
              </a>
            </li>
          </transition-group>
        </ul>
      </div>

      <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
        <div class="form-wrapper" v-show="0 >= formList.length || state.addFlag">
          <form class="form-group" ref="form" @submit.prevent="handleSumbit">
            <ul class="list">

              <li class="item">
                <i class="icon icon-user"></i>
                <div class="title">姓名</div>
                <div class="content">
                  <input type="text"
                    vd-required
                    vd-notify='{
                      "text": "申请人姓名不能为空",
                    }'
                    v-model.trim="formData.name"
                    placeholder="请填写申请人姓名">
                </div>
              </li>

              <li class="item">
                <i class="icon icon-certificates"></i>
                <div class="title">证件</div>
                <div class="content">
                  <input type="text"
                    vd-required
                    vd-validate
                    vd-type="identity"
                    vd-notify='{
                      "text": "身份证不能为空",
                      "patt": "身份证格式不正确"
                    }'
                    v-model.trim="formData.id_number"
                    placeholder="请填写申请人身份证号码">
                </div>
              </li>

              <li class="item">
                <i class="icon icon-phone"></i>
                <div class="title">电话</div>
                <div class="content">
                  <input type="text"
                    vd-required
                    vd-validate
                    vd-type="phone"
                    vd-notify='{
                      "text": "手机号码不能为空",
                      "patt": "手机号码格式不正确"
                    }'
                    v-model.number="formData.phone"
                    placeholder="请填写申请人手机号码">
                </div>
              </li>

              <li class="item">
                <i class="icon icon-vali"></i>
                <div class="title">验证码</div>
                <div class="content">
                  <input type="text"
                    vd-required
                    v-model.number="formData.code"
                    placeholder="请输入验证码">
                  <div class="code">
                    <phoneCode title="获取验证码" :phone="formData.phone"></phoneCode>
                  </div>
                </div>
              </li>

            </ul>
            <div class="submit-btn">
              <button type="submit" class="btn" :class="{'on': state.active}" :disabled="!state.active">添加信息</button>
            </div>
            <div class="submit-btn" v-show="0 < formList.length && state.addFlag">
              <a href="javascript:" class="on" @click="state.addFlag=false">取消</a>
            </div>
          </form>
        </div>
      </transition>

      <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
        <div class="add-wrapper" v-show="0 < formList.length && !state.addFlag">
          <a href="javascript:" @click="handleApply()">
            <i class="icon icon-add"></i>
            <span>添加申请人信息</span>
          </a>
        </div>
      </transition>

      <div class="agree-wrapper">
        <div class="agree">
          <Checkbox v-model="single">
            <span>阅读并同意</span>
            <span class="link" @click.stop="openCardProtocol('card')">《卡盟金服服务协议》</span>
          </Checkbox>
        </div>
        <div class="tips">注：在卡盟申请贷款一律不收取任何费用，如有向您索要手续费的请拨打电话400-018-8616向平台举报。</div>
      </div>

      <div class="next-step" v-show="0 < formList.length">
        <a href="javascript:" v-on:click="sumbit()">提交申请</a>
      </div>

    </scroller>

		<!-- <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutRight">
			<div v-show="show" class="mask-bank">
				<div class="inner">
					<div class="content">
						<div class="head">
							<span>银行选择</span>
							<i class="sp sp-close" v-on:click="handleClose()"></i>
						</div>
						<div class="main">
							<scroller :on-refresh="refresh" :on-infinite="infinite">
								<ul class="list">
									<li v-for="(item, index) in formTemp.data" :key="index" class="item" v-on:click="handleSelect(item)">
										<div class="img">
											<img :src="item.thumb">
										</div>
										<div class="name">
											<span>{{ item.name }}</span>
										</div>
										<i v-if="current.id !== item.id" class="sp sp-select-no"></i>
										<i v-if="current.id === item.id" class="sp sp-select-ok"></i>
									</li>
								</ul>
							</scroller>
						</div>

					</div>
				</div>
			</div>
  	</transition> -->
		<CityList></CityList>
		<Protocol
      :isOpenProtocol="isOpenProtocol"
      v-on:callProtocolEvent="isOpenProtocol = false">
    </Protocol>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>