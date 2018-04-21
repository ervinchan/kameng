import './index.scss';
import _                  from 'lodash';
import Header           from '~common/components/header';
import Swiper           from 'swiper';
import Dates              from '~common/components/dates';
import Models         from '~common/models';

export default {
  name: 'StudentCreditCardApply',
  data () {
    return {
      carId: '',
      carCode: '',
      loading: false,
      isShow: false,
      notice: 1,
      carNumber: undefined,
      cardName: '信用卡',
      userInfo: {
        number: '',
        date1: '',
        date2: '',
        school: '',
      },
      id: '',
      parentid: '',
      isApply: false,
      formData: {
        isShowTime1: 1,
      }
    };
  },
  components: {
    'app-header': Header,
    Dates
  },
 created () {
  },
  computed: {
    active () {
      let bool = true;
      // for (let i in this.userInfo) {
      //   if (!this.userInfo[i]) {
      //     console.log(i);
      //     bool = false;
      //     break;
      //   }
      // }
      return bool;
    }
  },
  mounted () {
     /* eslint-disable */
    this.carId = this.$store.get.state.CarBreakInfo.carId;
    this.carCode = this.$store.get.state.CarBreakInfo.carCode;

    if (this.$route.query.bankCardName) {
      this.cardName = this.$route.query.bankCardName;
    }
    this.userInfo.number = this.$route.query.number;
    this.userInfo.date1 = this.$route.query.date1;
    this.userInfo.date2 = this.$route.query.date2;
    this.userInfo.school = this.$route.query.school;
    this.userInfo.id = this.$route.query.cid;
    // console.log(this.userInfo.id);
    this.illegalIncome();
    this.userInfo.parentid = this.$route.query.parentid;
    this.$nextTick(function () {
      /* eslint-disable */
      let swiper = new Swiper(this.$refs.swiperRoot, {
        loop: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
      });

    });
    let div2=document.getElementById("div2");
    let div1=document.getElementById("div1");
    let self = this;
    div2.onclick=function(){
      div1.className=(div1.className=="close1")?"open1":"close1";
      div2.className=(div2.className=="close2")?"open2":"close2";
      if(div2.className=="open2"){
        self.notice = '1';
      }else{
        self.notice = '0';
      }
    }

  },
  watch: {

  },
  methods: {
    //获取补充资料
    async illegalIncome () {
      let res = await Models.CarVio.illegalIncome({
        params: {
          car_id: this.userInfo.id
        }
      });
      if (res.code === 1) {
        this.cardata = res.data;
        // console.log(this.cardata);
        this.userInfo.number = this.cardata.driver_number;
        this.userInfo.date1 = this.cardata.car_reg_date;
        this.userInfo.date2 = this.cardata.car_check_date;
      }
    },
    // 删除
    async deleteCar () {
      let self = this;
      self.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        title : '温馨提示',
        msg   : '确定删除该车辆吗？',
        lists : [
          {
            msg: '取消'
          },
          {
            msg: '确定',
            class: 'ok',
            async func () {
              let id = self.carId;
              let res = await Models.CarVio.deleteCar({ id });
              if (res.code === 1) {
                self.$toast('车辆删除成功');
                setTimeout(() => {
                  self.$router.replace({ name: 'home.CarBreak' });
                }, 500);
              }
              else {
                self.$toast('删除车辆失败');
              }
            }
          },
        ]
      });
    },

    // 日期选择
    handleDateChange (item) {
      this.isShow = true;
      this.formIndex = item;
    },
    // 日期组件回调
    handelDateClick (obj) {
      if (!_.isNull(obj)) {
        if (_.isObject(obj)) {
          this.isShow = obj.status;
          _.assign(this.userInfo, {
            [this.formIndex]: obj.content
          });
          return;
        }
      }
    },
    // 品牌选择
    selectCart () {
      this.$router.push({ name: 'home.CarBrandChoice', query: this.userInfo });
    },
    //年检提醒
    selector () {
      // console.log(990);
    },
    handleSumbit () {
    },
    //保存
    async save () {
      // console.log(this.notice);
      let res = await Models.CarVio.verification({
         car_id: this.carId,
         car_code: this.userInfo.number,
         car_reg_date: this.userInfo.date1,
         car_check_date: this.userInfo.date2,
         new_notice: this.notice,
         brand_id: this.userInfo.parentid,
       });
       if (res.code === 1) {
         this.$toast('保存成功');
       }
     }
  }
  /* eslint-enable */
};
