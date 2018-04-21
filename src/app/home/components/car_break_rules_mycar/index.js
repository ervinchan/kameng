import './index.scss';

import Header       from '~common/components/header';

export default {
  name: 'myCar',
  data () {
    return {
      breakRules: {},
      cid: '',
      carNumber: '',
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {

    isAllSelected () {
      let flag = true;
      if (this.breakRules.peccancy_list && Array.isArray(this.breakRules.peccancy_list)) {
        // for (let el of this.breakRules.peccancy_list) {
        //   // 可代办，未处理的 并且未选中的， flag = false
        //   if (el.can_process === 1 && el.status === 0 && !el.selected) {
        //     flag = false;
        //     break;
        //   }
        // }
        let len = this.breakRules.peccancy_list.length;
        let useful = 0,
            use = 0;
        for (let el of this.breakRules.peccancy_list) {
          if (el.can_process !== 1 || el.status !== 0) {
            useful ++;
          }
          else {
            if (el.selected) {
              use ++;
            }
          }
        }
        if (len - useful === use && use !== 0) {
          flag = true;
        }
        else {
          flag = false;
        }
      }
      else {
        flag = false;
      }
      return flag;
    },

    countOfSelected () {
      let count = 0;
      if (this.breakRules.peccancy_list && Array.isArray(this.breakRules.peccancy_list)) {
        for (let el of this.breakRules.peccancy_list) {
          if (el.selected) {
            count += 1;
          }
        }
      }
      return count;
    },

    pointOfSelected () {
      let point = 0;
      if (this.breakRules.peccancy_list && Array.isArray(this.breakRules.peccancy_list)) {
        for (let el of this.breakRules.peccancy_list) {
          if (el.selected) {
            point += el.actual_degree;
          }
        }
      }
      return point;
    },

    priceOfSelected () {
      let price = 0;
      if (this.breakRules.peccancy_list && Array.isArray(this.breakRules.peccancy_list)) {
        for (let el of this.breakRules.peccancy_list) {
          if (el.selected) {
            price += el.count + el.latefine + el.servicePrice;
          }
        }
      }
      return price;
    },

    hasSelected () {
      let flag = false;
      for (let el of this.breakRules.peccancy_list) {
        if (el.selected) {
          flag = true;
          break;
        }
      }
      return flag;
    }

  },
  created () {
    let carSelected = this.$store.get.state.CarBreakInfo.carSelected;
    this.cid = carSelected.cid;
    if (!this.cid) {
      return;
    }
    this.carNumber = carSelected.carNumber;

    let info = this.$store.get.state.CarBreakInfo.violation;
    let data = info[this.cid] || {};
    data = JSON.parse(JSON.stringify(data));
    if (data.peccancy_list && data.peccancy_list.length) {
      for (let el of data.peccancy_list) {
        el.selected = false;
      }
    }
    this.breakRules = data;
  },

  watch: {
  },
  methods: {
    // 选中取消
    toggleSingle (el) {
      if (el.can_process === 0) {
        this.$toast('该违章不支持代缴');
        return;
      }
      el.selected = !el.selected;
    },

    // 查看更多
    goCarDetails (el) {
      this.$router.push({
        name:'home.CarDetails',
        params: { info: el }
      });
    },

    // 全选取消
    toggleAllSelected () {
      let flag = !this.isAllSelected;
      if (flag) {
        // 可处理违章数量
        let useLen = 0;
        for (let el of this.breakRules.peccancy_list) {
          if (el.status === 0 && el.can_process === 1) {
            useLen ++;
          }
        }
        if (!useLen) {
          this.$toast('无可代缴违章');
          return;
        }
      }
      for (let el of this.breakRules.peccancy_list) {
        // 排除已处理、不可以代办
        if (el.status === 1 || el.can_process === 0) {
          continue;
        }
        el.selected = flag;
      }
    },

    // 办理违章
    dealIllegal () {
      if (!this.hasSelected) {
        return;
      }

      let orderList = [];
      for (let el of this.breakRules.peccancy_list) {
        if (el.selected) {
          orderList.push(el.violation_id);
        }
      }
      this.$store.get.commit('setOrderSelected', orderList);

      // 只要有扣分的 先跳转到 IllegalIncome 路由
      let flag = false;
      for (let el of this.breakRules.peccancy_list) {
        if (el.selected && el.actual_degree > 0) {
          flag = true;
          break;
        }
      }
      if (flag) {
        this.$router.push({
          name:'home.IllegalIncome',
          query: {
            id: this.cid,
            carNumber: this.carNumber
          }
        });
      }
      else {
        this.$router.push({ name:'home.CarBreakOrderConfirm' });
      }
    }

  }
};
