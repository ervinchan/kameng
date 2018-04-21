import './index.scss';
import Header from '~common/components/header';
import Models         from '~common/models';

export default {
  name: 'studentCreditCard',
  data () {
    return {
      formTemp: '',
      Destinationlist   : [
          {
            name: 'JJJYYJ瑞士',
            value: 1,
          },
          {
            name: 'FEFEFR西班牙',
            value: 2,
          },
          {
            name: 'JOIJI俄罗斯',
            value: 3,
          },
          {
            name: 'FEFEFR西班牙',
            value: 4,
          },
          {
            name: 'JJJYYJ瑞士',
            value: 5,
          },
        ],
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
  },
  mounted () {
    this.getDestinationList();
  },
  methods:{
    // 选择
    handleItemChange (item) {
      this.active = true;
      if (item === this.formTemp) {
        this.formTemp = {};
        return;
      }
      this.formTemp = item;
      this.$emit('onChildClick', {
        status : false,
        content: this.formTemp
      });
    },
    //获取数据
    getDestinationList () {
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
        }
      });
    },

    refresh (done) {
      let self = this;
      setTimeout(() => {
        self.page = 1;
        this.getDestinationList();
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
        this.getDestinationList();
        done();
      }, 1500);
    },
  }
};
