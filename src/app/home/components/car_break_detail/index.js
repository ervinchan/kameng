import './index.scss';
import Header           from '~common/components/header';
import Models       from '~common/models';

export default {
  name: 'CarBreakDetail',
  data () {
    return {
      carSelected: undefined,
      ctime: '',
      carList: [],
      violation: {},
      funList: [
        { key: 'check', name: '车险年检' },
        { key: 'firm', name: '添加车主本人驾照', desc: '查看驾照余分，到期清零提醒' },
        { key: 'fine', name: '罚单缴费', desc: '1分钟快速缴费，2小时极速办理' },
      ]
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
  },
  async mounted () {
    await this.getMyCar();
    if (!this.carList.length) {
      return;
    }
    if (this.$route.params.cid) {
      this.carSelected = this.$route.params.cid;
    }
    else {
      this.carSelected = this.carList[0].id;
    }
  },
  watch: {
    carSelected (val) {
      this.getCarViolation(val);
      this.annualDay();
    }
  },
  methods: {
    // 获取我的车辆
    async getMyCar () {
      this.$store.get.dispatch({
        type: 'Loading',
        isShow: true
      });
      let res = await Models.CarVio.getMyCar();
      if (res.code === 1) {
        this.carList = res.data;
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
    //获取天数
    //获取剩余天数
    async annualDay () {
      let res = await Models.CarVio.annualDay({
        params: {
          car_id: this.carSelected
        }
      });
      if (res.code === 1) {
        this.ctime = res.data.day;
       }
    },
    // 查询车辆违章信息
    getCarViolation (id) {
      let info = this.$store.get.state.CarBreakInfo.violation;
      this.violation = info[id] || {};
    },

    // 车辆验证
    Accreditation () {
      this.$store.get.commit('setCarId', this.carSelected);
      this.$store.get.commit('setcarCode', this.$refs.carcode.innerText);
      this.$router.push({
        name: 'home.CarAccreditation',
        query: {
          cid: this.carSelected,
          code: this.$refs.carcode.innerText
        },
      });
    },

    // 查看车辆详细信息
    goMyCarPage () {
      let carNumber = this.carList.filter(el => el.id === Number(this.carSelected))[0].car_number;
      this.$store.get.commit('setCarSelected', { cid: this.carSelected, carNumber });
      // sessionStorage.setItem('carQuery', JSON.stringify({ cid: this.carSelected, carNumber }));
      this.$router.push({ name: 'home.MyCarInfo' });
    },

    // 办理违章
    handleIllegal () {
      if (this.violation.unDeal && this.violation.unDeal.total_num) {
        this.goMyCarPage();
      }
    },

    selectFun (key) {
      switch (key) {
        /* eslint-disable */
        case 'check':
          this.$router.push({ 
            name: 'home.CarBreakCheck',
            query: {
              id: this.carSelected
            },
          });
          break;
        case 'firm':
          this.$router.push({
            name: 'home.AddLicence',
            params: {
              id: this.carSelected,
              code: this.$refs.carcode.innerText
            },
          });
          break;
        default:
          this.goMyCarPage();
      }
      /* eslint-enable */
    },
  },
};
