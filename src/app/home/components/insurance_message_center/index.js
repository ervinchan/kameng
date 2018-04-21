import './index.scss';
import Header from '~common/components/header';
import Models         from '~common/models';

export default {
  name: '',
  data () {
    return {
      messageList:[],
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
  },
  mounted () {
    this.getmessageList();
  },
  methods:{
    InsDetails () {
      this.$router.push({
        name: ''
      });
    },

    //消息中心
    message () {
      this.$router.push({
        name: ''
      });
    },

    gettags (tags) {
      let tagarr = [];
      if (tags) {
        tagarr = tags.split(',').slice(0, 2);
      }
      return tagarr;
    },
    //获取数据
    getmessageList () {
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
          // console.log(data);
        }
      });
    },

    refresh (done) {
      let self = this;
      setTimeout(() => {
        self.page = 1;
        this.getmessageList();
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
        this.getmessageList();
        done();
      }, 1500);
    },
  }
};
