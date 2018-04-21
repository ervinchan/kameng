import './index.scss';
import _            from 'lodash';
import Header       from '~common/components/header';
import Models       from '~common/models';
import Footing      from '~common/components/page_footing';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import Cookie       from 'js-cookie';

export default {
  name: 'carBreakRules',
  data () {
    return {
      carTxt: [],
      carTxtIndex: 0,
      carTxtShow : false,
      isPhoneBundle: false,
      isShowTipsWrapper: false,
      isDialogShow: false,
      identityShow: false,
      codeShow: false,
      isVinShow: false,
      startPageY: 0,
      endPageY: 0,
      swiper: '',
      carCode: '',
      location: '',
      carList: [],
      isCarDialogShow:false
    };
  },
  beforeRouteEnter (to, from, next) {
    if ('home.AddCar' === from.name ) {
      next(vm => {
        vm.isCarDialogShow = true;
      });
    }
    else {
      next();
    }
  },
  components: {
    'app-header': Header,
    'app-footing': Footing,
  },
  computed: {
    userInfo () {
      return _.get(this.$store.get.state, 'App.userInfo') || {};
    }
  },
  mounted () {
    this.getForum();
    this.getMyCar();
    if ( this.device.is('WeChat') ) {
      this.requestWechatAuthorization();
    }
    this.getCarProvinces();
  },
  watch: {
    userInfo (value) {
      if (_.isEmpty(value.mobile)) {
        this.handleCheckRealName();
      }
    }
  },
  methods: {
    // 获取版块通知
    async getForum () {
      let res = await Models.Notify.forum('violation');
      if (res.code === 1) {
        this.$store.get.dispatch({
          type: 'setSystemMessage',
          message: res.data
        });
      }
    },

    async getCarProvinces () {
      let res = await Models.CarVio.getCarProvinces();
      if (res.code === 1) {
        this.carTxt = res.data;
      }
    },
    carTxtItem (index) {
      this.carTxtIndex = index;
      this.carTxtShow = false;
    },
    btnCarTxtShow () {
      this.carTxtShow = true;
    },
    closeDialog () {
      this.identityShow = false;
      this.isVinShow = false;
      this.isDialogShow = false;
    },
    identityDialog () {
      // this.identityShow = true;
      // this.isDialogShow = true;
      this.$router.push({ name: 'home.AddCar' });
    },
    complete () {
      this.carCode = this.$refs.carCode.value;
      this.location = this.$refs.location.innerText.slice(0, 1);
       if (!this.carCode) {
        this.$toast('请输入车牌号');
        // return;
      }
      else {
        this.$router.push({
          name: 'home.IDVerifyHome',
          query: { carCode: this.location + this.carCode }
        });
      }
    },
    // 获取我的车辆
    async getMyCar () {
      this.$store.get.dispatch({
        type: 'Loading',
        isShow: true
      });
      let res = await Models.CarVio.getMyCar();
      if (res.code === 1) {
        this.carList = res.data;

        if (this.carList.length) {
          this.$nextTick(() => {
            /* eslint-disable */
            let swiper = new Swiper(this.$refs.homeSwiper, {
              pagination : '.swiper-pagination',
              paginationClickable :true,
              bulletActiveClass: 'car-break-bullet-active',
            });
          });
          /* eslint-disable */
        }

        for (let el of this.carList) {
          this.getCarViolation(el);
        }

        this.$store.get.dispatch({
          type: 'Loading',
          isShow: false
        });
      }
      else {
        this.$store.get.dispatch({
          type: 'Loading',
          isShow: false
        });
        this.$toast('车辆信息获取失败');
      }
    },

    // 获取车辆违章信息
    getCarViolation (el) {
      let violation = Cookie.get('violation_' + el.id);
      if (violation) {
        violation = JSON.parse(violation);
        this.$set(el, 'violation', violation);
        this.setViolationState(el.id, violation);
      }
      else {
        this.getViolation(el);
      }
    },

    // 调用接口获取违章信息
    getViolation (el) {
      Models.CarVio.violationInformation({
        params: { id: el.id }
      })
      .then(res => {
        if (res.code === 1) {
          let data = res.data;
          if (data.peccancy_list && Array.isArray(data.peccancy_list)) {
            for (let el of data.peccancy_list) {
              el.count = Number(el.count);
              el.degree = Number(el.degree);
              el.actual_degree = Number(el.actual_degree);
              el.latefine = Number(el.latefine);
              el.servicePrice = Number(el.servicePrice);
              el.status = Number(el.status);
              el.can_process  = Number(el.can_process );
              el.violation_id  = Number(el.violation_id );
            }
            // 未处理 违章记录
            data.unDeal = {
              total_degree: 0,
              total_count: 0,
              sumServicePrice: 0,
              total_num: 0
            }
            for (let el of data.peccancy_list) {
              if (el.status === 0) {
                data.unDeal.total_degree += el.actual_degree;
                data.unDeal.total_count += el.count;
                data.unDeal.sumServicePrice += el.servicePrice;
                data.unDeal.total_num += 1;
              }
            }
          }
          this.$set(el, 'violation', data);
          this.setViolationState(el.id, data);
          this.setViolationCookie(el.id, data);
        }
        else {
          this.$toast(el.msg || '查询失败');
          this.$set(el, 'violation', {});
          this.setViolationState(el.id, {});
          this.setViolationCookie(el.id, {});
        }
      });
    },

    // 设置cookie 3天有效
    setViolationCookie (id, data) {
      let violation = JSON.stringify(data);
      Cookie.set('violation_' + id, violation, { expires: 3 });
    },

    // 设置vuex
    setViolationState (id, data) {
      this.$store.get.commit('setViolation', { id, data });
    },


    // getCarBreakMessage () {
    //   let url = '/car_vio_v3/car/query_violation?id=1515';
    //   this.$http.get(url).then( res => {
    //     console.log(res);
    //   });
    // },
    goHome () {
      this.$router.push({
        name:'home.Home'
      });
    },
    //微信支付授权
    requestWechatAuthorization () {
      Models.CarBreak.wechatAuthorization().then( res => {
        this.requestCount += 1;
        if (0 === res.code) {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
          else {
            if (2 > this.requestCount) {
              this.$toast('微信授权失败');
            }
          }
        }
        else {
          if (2 > this.requestCount) {
            this.requestWechatAuthorization();
          }
        }
      });
    },
    // 车辆详情页
    goDetailPage (id) {
      this.$router.push({ name: 'home.CarBreakDetail', params: { cid: id } });
    },
    goMyCarPage () {
      this.$router.push({name: 'home.MyCarInfo'});
    },
    goAddCarPage () {
      this.$router.push({name: 'home.AddCar'});
    },
    goMyOrderrPage () {
      this.$router.push({name: 'home.MySelfOrader'});
    },
    goHomePage () {
      this.$router.push({name: 'home.Home'});
    },
    cancel () {
      this.isShowTipsWrapper = false;
    },
    goBundlePhonePage () {
      this.$router.push({name: 'user.Profile'});
    },

    // 修改 + 3
    handleCheckRealName () {
      let self = this;
      if ('home.CarBreakRules' === self.$route.name) {
        document.addEventListener('touchstart', function (event) {
          self.touchstart(event);
        }, true);

        document.addEventListener('touchend', function (event) {
          self.touchend(event);
        }, true);
      }
    },

    // touchstart事件函数
    touchstart (event) {
      if (event) {
        let self = this;
        let isStart = false;
        if (false === isStart) {
          isStart = true;
          setTimeout(() => {
            self.startPageY = event.touches[0].pageY;
            isStart = false;
          }, 500);
        }
      }
    },

    // touchend事件函数
    touchend (event) {
      if (event) {
        let self    = this;
        let target  = event.target;
        let isEnd   = false;

        if (event && event.preventDefault &&
          'home.CarBreakRules' === self.$route.name &&
          -1 === target.className.indexOf('cancel') &&
          -1 === target.className.indexOf('bundle') &&
          -1 === target.className.indexOf('header-back') &&
          -1 === target.className.indexOf('utility-home') &&
          -1 === target.className.indexOf('top-img')) {

          event.preventDefault();

          if (false === isEnd) {
            isEnd = true;
            setTimeout(() => {
              self.endPageY = event.changedTouches[0].pageY;
              if (10 >= Math.abs(self.endPageY - self.startPageY)) {
                self.handleWrapper();
              }
              isEnd = false;
            }, 500);
          }
        }
      }
    },

    handleWrapper () {
      this.isShowTipsWrapper = true;
    },
  }
};
