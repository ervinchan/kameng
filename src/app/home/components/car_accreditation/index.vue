<template>
  <main class="add_car_accreditation">
    <app-header title="车辆验证"></app-header>
    <scroller ref="myscroller">
      <section class="basic-info-wrapper">
        <div class="header">
          <p>
            <span>请填写{{carCode}}车主本人信息</span>
            <span class = "car_message_delete" @click="deleteCar">
            <i class="message_delect"></i>删除</span>
          </p>
        </div>
        <form class="info_box" ref="form" @submit.prevent="handleSumbit">
          <ul class="info">
            <li class="list">
              <span class="people">车身驾驶号</span>
              <input type="text"
                vd-required
                class="input-item"
                placeholder="请输入"
                v-model="userInfo.number">
					  </li>
            <li class="list" @click="handleDateChange('date1')">
              <span class="title">车辆注册日期</span>
              <span class="input-item school date">{{userInfo.date1 ? userInfo.date1:'请选择' }}</span>
             <!--   <input type="text"
                vd-required
                class="input-item "
                placeholder="请选择"
                v-model="userInfo.date1"> -->
              <div class="arrow"></div>
           </li>

            <li class="list" @click="handleDateChange('date2')">
              <span class="title">验证有效期至</span>
               <span class="input-item school date">{{userInfo.date2 ? userInfo.date2:'请选择' }}</span>
               <!-- <input type="text"
                vd-required
                class="input-item "
                placeholder="请选择"
                v-model="userInfo.date2"> -->
              <div class="arrow"></div>
            </li>

            <li class="list" @click="selectCart">
              <span class="people">品牌车系</span>
              <span class="input-item school date">{{userInfo.school ? userInfo.school:'请选择' }}</span>
             <!--  <input type="text"
                vd-required
                class="input-item "
                placeholder="请选择"
                v-model="userInfo.school"> -->
              <div class="arrow"></div>
					  </li>

          </ul>
          <ul class="carinfo-list">
            <li class="item" >
              <div class="title">违章通知及年检提醒</div>
              <div class="content" >
                <div class="switch-checked">
               <!--    <input type="checkbox"  class="open_audio" id="isShowTime1" v-model="formData.isShowTime1" @click="notice">
                  <label for="isShowTime1" class="green"></label> -->
                   <div id="div1" class="open1">
                           <div id="div2" class="open2"></div>
                  </div>
                </div>
              </div>
              <div class="icon"></div>
            </li>
          </ul>

          <button type="submit" class="btn" :class="{ 'on': active }" :disabled="!active" @click="save">保存</button>
        </form>
      </section>

    </scroller>
     <Dates v-on:onDateClick="handelDateClick" :show="isShow" :today="false"></Dates>
  </main>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
