<template>
  <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutRight">
    <div class="dates-page" v-show="show">
      <div class="layer">
        <div class="inner">
          <div class="head">
            <div class="left">
              <span v-on:click="dismiss()">取消</span>
            </div>
            <div class="right">
              <a v-if="today" class="item" v-on:click="handelToday()">至今</a>
              <a class="item ok" v-on:click="submit()">完成</a>
            </div>
          </div>

          <div class="body">
            <div class="select-group" :class="'item-' + child.length">

              <div v-if="-1 !== child.indexOf('year')" class="child">
                <scroller ref="year">
                  <ul class="list">
                    <li v-for="(item, index) in formTemp.year"
                      :key="index"
                      :class="{ act: year === item }"
                      v-on:click="year = item"
                      class="item">{{ item }}年</li>
                  </ul>
                </scroller>
              </div>

              <div v-if="-1 !== child.indexOf('month')" class="child">
                <scroller ref="month">
                  <ul class="list">
                    <li v-for="item in 12"
                      :class="{ act: month === item }"
                      v-on:click="month = item"
                      class="item">{{ item | month }}月</li>
                  </ul>
                </scroller>
              </div>

              <div v-if="-1 !== child.indexOf('day')" class="child">
                <scroller ref="day">
                  <ul class="list">
                    <li v-for="(item, index) in getDate()"
                      :class="{ act: day === item }"
                      v-on:click="day = item"
                      class="item">{{ item | day }}日</li>
                  </ul>
                </scroller>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>