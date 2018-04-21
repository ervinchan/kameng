import './index.scss';
import Dates              from '~common/components/dates';
import Header           from '~common/components/header';
import _                  from 'lodash';
import BotSelect     from '~common/components/bot_select';
import BombBox            from '~common/components/bomb_box';
export default {
  name: '',
  data () {
    return {
      formIndex: false,
      botTitle: '',
      loading: false,
			bombShow: false,
      userInfo: {
        Destination: '',
        beginTime: '',
        terminationTime: '',
        deadline: '',
        name: '',
        idType: '',
        relation: '',
        email: '',
        phone: '',
        live: '',
        idCode: '',
        copies: '',
        en: '',
      },
      formTemp       : {
        deadline      : [
          {
            name     : '1-7',
            value    : 1,
          },
          {
            name     : '1-7',
            value    : 2,
          },
          {
            name     : '1-7',
            value    : 3,
          },
          {
            name     : '1-7',
            value    : 4,
          },
        ],
        idType       :[
          {
            name     : '身份证',
            value    : 1,
          },
          {
            name     : '驾驶证',
            value    : 2,
          },
          {
            name     : '证',
            value    : 3,
          },
          {
            name     : '身证',
            value    : 4,
          },
        ],
        relation     :[
          {
            name     : '父亲',
            value    : 1,
          },
          {
            name     : '母亲',
            value    : 2,
          },
          {
            name     : '姐姐',
            value    : 3,
          },
          {
            name     : '爷爷',
            value    : 4,
          },
        ],
        copies       :[
          {
            name     : '1份',
            value    : 1,
          },
          {
            name     : '2份',
            value    : 2,
          },
          {
            name     : '3份',
            value    : 3,
          },
          {
            name     : '4份',
            value    : 4,
          },
        ],
        Destination :[],
        live :[],
      },
      isShow: false,
      Show: false,
    };
  },
  components: {
    'app-header': Header,
     Dates,
     BombBox,
     BotSelect
  },
  computed: {
  },
  mounted () {
  },
  watch: {

  },
  methods: {
   //立即投保
   insure () {
     this.$router.push({
       name: 'home.insuranceOrderDetail'
     });
   },
   // 目的地选择
   selectDestination () {
   },
   // 城市切换
   selectCity () {
   },
    // 底部弹框组件2
    handleBombBoxChange (index) {
      this.formIndex  = index;
      this.bombShow   = true;
    },
    /*
     * 底部弹框组件2
     */
    handleBomb (obj) {
      if (!_.isNull(obj)) {
        if (_.isObject(obj)) {
          this.bombShow = obj.status;
          if (!_.isEmpty(_.get(obj, 'content'))) {
            _.assign(this.userInfo, {
              [this.formIndex]: obj.content.name,
            });
          }
          return;
        }
      }
    },
    // 底部弹框组件1
    botSelectClick (obj) {
      if (!_.isNull(obj)) {
        if (_.isObject(obj)) {
          this.Show = obj.status;
          if (!_.isEmpty(_.get(obj, 'content'))) {
            _.assign(this.userInfo, {
              [this.formIndex]: obj.content.name
            });
          }
          return;
        }
      }
    },
    // 所属组件1
    handleBotSelectChange (index) {
      this.formIndex  = index;
      this.Show     = true;
      if ( index === 'deadline' ) {
        this.botTitle = '保障期限';
      }
      else if (index === 'idType') {
        this.botTitle = '证件类型';
      }
      else if (index === 'relation') {
        this.botTitle = '关系';
      }
      else if (index === 'copies') {
        this.botTitle = '份数';
      }
    },
    handleSumbit () {
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
  }
};
