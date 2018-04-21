import './index.scss';
import Models         from '~common/models';

export default {
  name: '',
  data () {
    return {
      isShow:  true,
      status     : 1,
      num        : 1,
      idx        : 1,
      ListDetails:[],
      tabs: [
         '玛瑙计划',
         '玛瑙计划',
         '玛瑙计划',
       ],
      tabContents: [
         '1',
         '2',
         '3',
       ],
    };
  },
  components: {
  },
  computed: {
  },
  mounted () {
    this.getListDetails();
  },
  methods:{
    //切换
    switchState (index) {
      this.num = index;
    },

    //立即投保
    insure () {
      this.$router.push({
        name: 'home.insuranceListDetail'
      });
    },

    //更多
    showDetail (index) {
      this.isShow = !this.isShow;
      console.log(index);
    },

    //获取数据
    getListDetails () {
      let self = this;
      Models.StudentCreditCard
      .creditcardlist({
        params: {
          page:self.page
        }
      })
      .then((res) => {
        if (1 === res.code) {
          let data = res.data;
          console.log(data);
        }
      });
    },
    //核算保费
    Accountremium () {
    },

    refresh (done) {
      let self = this;
      setTimeout(() => {
        self.page = 1;
        this.getListDetails();
        done();
      }, 1500);
    },

    infinite (done) {
      if (this.last_page * 1 <= this.current_page * 1) {
        setTimeout(() => {
          done(true);
        }, 1500);
        return;
      }

      setTimeout(() => {
        this.page ++;
        this.getListDetails();
        done();
      }, 1500);
    },
  }
};
