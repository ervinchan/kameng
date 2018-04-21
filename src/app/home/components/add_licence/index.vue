<template>
  <main class="add_licence">
    <app-header title="添加驾照"></app-header>
    <scroller ref="myscroller">

      <section class="add_licence_wrapper">
        <div class="info-header com-header">
          <p>请填写{{carCode}}车主本人信息</p>
        </div>
        <form class="info_box" ref="form" @submit.prevent="handleSumbit">
          <ul class="info">

            <li class="list">
              <span class="title">车主姓名</span>
              <input type="text"
                vd-required
                vd-notify='{
                    "text": "车主姓名不能为空",
                  }'
                class="input-item"
                v-model="userInfo.name"
                placeholder="车主姓名">
					  </li>

            <li class="list">
              <span class="title">驾驶证号</span>
              <input type="text"
                vd-required
                vd-validate
                vd-type="number"
                v-model="userInfo.number"
                vd-notify='{
                    "text": "驾驶证号不能为空",
                  }'
                class="input-item"
                placeholder="驾驶证号完整 15位或者18位">
					  </li>

            <li class="list">
              <span class="title">档案编号</span>
              <input type="text"
                vd-required
                vd-notify='{
                    "text": "档案编号不能为空",
                  }'
                v-model="userInfo.seriaNumber"
                class="input-item"
                placeholder="档案编号完整 12位">
					  </li>

            <li class="list" @click="handleDateChange('date1')">
              <span class="title">初次领证日期</span>
              <span class="input-item school date">{{userInfo.formIndex ? userInfo.formIndex:'请选择' }}</span>
              <div class="arrow"></div>
					  </li>

            <li class="list">
              <span class="title">驾驶证绑定手机号</span>
              <input type="text"
                vd-required
                vd-notify='{
                    "text": "手机号不能为空",
                  }'
                class="input-item "
                v-model="userInfo.phone"
                placeholder="请输入手机号码">
 
					  </li>

          </ul>
          <button type="submit" class="btn" :class="{ 'on': active }" :disabled="!active" @click = "save">保存</button>
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
