import './index.scss';
import _                  from 'lodash';
import Header           from '~common/components/header';
import Dates              from '~common/components/dates';
import Models       from '~common/models';
export default {
  name: 'AddLicence',
  data () {
    return {
      loading: false,
			isShow: false,
      carId: '',
      carCode: '',
      userInfo: {
        name: '',
        number: '',
        seriaNumber: '',
        phone: '',
        formIndex: '',
      },
      formData: {
        date1: '',
      },
      isApply: false
    };
  },
  components: {
    'app-header': Header,
     Dates,
  },
  computed: {
    active () {
      let bool = true;
      for (let i in this.userInfo) {
        if (!this.userInfo[i]) {
          bool = false;
          break;
        }
      }
      return bool;
    }
  },
  mounted () {
    this.carId = this.$route.params.id;
    this.carCode = this.$route.params.code;
    this.illegalIncome();
  },
  watch: {
  },
  methods: {
    //获取补充资料
    async illegalIncome () {
      let res = await Models.CarVio.illegalIncome({
        params: {
          car_id: this.carId
        }
      });
      if (res.code === 1) {
        this.cardata = res.data;
        // console.log(this.cardata);
        this.userInfo.seriaNumber = this.cardata.archive_number;
        this.userInfo.number = this.cardata.driver_number;
        this.userInfo.name = this.cardata.name;
        this.userInfo.formIndex = this.cardata.first_license_date;
        this.userInfo.phone = this.cardata.phone;
        // this.userInfo.date2 = this.cardata.car_check_date;
      }
    },

    // 日期选择
    handleDateChange () {
      this.isShow     = true;
    },
    // 日期组件回调
    handelDateClick (obj) {
      if (!_.isNull(obj)) {
        if (_.isObject(obj)) {
          this.isShow = obj.status;
          _.assign(this.formData, {
            [this.userInfo.formIndex]: obj.content
          });
          this.userInfo.formIndex = obj.content;
          return;
        }
      }
    },
    handleSumbit () {
    },
    //保存
    async save () {
      /* eslint-disable */
      const identity =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      const file =/\b\d{12}\b/;

      if (!identity.test(this.userInfo.number)) {
           this.$toast('驾驶证号完整 15位或者18位');
           return;
         }
         else if (!file.test(this.userInfo.seriaNumber)) {
           this.$toast('档案编号完整 12位');
           return;
         }
         else {
          let res = await Models.CarVio.saveLicense({
            name: this.userInfo.name,
            car_number: this.userInfo.number,
            archive_number: this.userInfo.seriaNumber,
            first_license_date: this.userInfo.formIndex,
            phone: this.userInfo.phone,
          });
          if (res.code === 1) {
            this.$toast('保存成功');
          }
         }
         /* eslint-enable */
    }
  }
};
