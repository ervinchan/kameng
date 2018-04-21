import './index.scss';

import Header     from '~common/components/header';
import Models     from '~common/models';

export default {
  name: 'userRankingList',
  data () {
    return {
      formTemp: {
        list: [],
      },
      text: '',
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
  },
  mounted () {
    this.switchRank('收入');
  },
  watch: {
  },
  methods: {

    goStimulatePage () {
      // this.$router.push({name: 'user.Stimulate'});
    },

    /*
     * 切换排行榜
     */
    switchRank (text) {
      let self = this;
      if (text !== this.text) {
        this.text = text;

        switch (text) {
          case '积分':
            self.integral();
            break;
          case '收入':
            self.account();
            break;
          case '锁粉':
            self.fans();
            break;
        }
      }
    },

    /*
     * 获取积分
     */
    integral () {
      let self = this;
      Models.User
      .integralList()
      .then((res) => {
        if (1 === res.code) {
          self.formTemp.list = res.data;
        }
      });
    },

    /*
     * 获取收入
     */
    account () {
      let self = this;
      Models.User
      .accountList()
      .then((res) => {
        if (1 === res.code) {
          self.formTemp.list = res.data;
        }
      });
    },

    /*
     * 获取粉丝
     */
    fans () {
      let self = this;
      Models.User
      .fansList()
      .then((res) => {
        if (1 === res.code) {
          self.formTemp.list = res.data;
        }
      });
    },

  }
};