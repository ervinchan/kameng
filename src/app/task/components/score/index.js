import './index.scss';

import _      from 'lodash';
import Header from '~common/components/header';
import Radio  from '~common/components/radio';
import Models from '~common/models';

export default {
  name: 'taskScore',
  data () {
    return {
      formData: ['', '', '', ''],
      formTemp: [
        {
          title: '建群培训：',
          data: [
            {
              name: '有',
              value: 1,
            },
            {
              name: '无',
              value: 2,
            },
          ]
        },
        {
          title: '朋友圈广告：',
          data: [
            {
              name: '有',
              value: 1,
            },
            {
              name: '无',
              value: 2,
            },
          ]
        },
        {
          title: '虚假宣传：',
          data: [
            {
              name: '有',
              value: 1,
            },
            {
              name: '无',
              value: 2,
            },
          ]
        },
        {
          title: '业务介绍：',
          data: [
            {
              name: '有',
              value: 1,
            },
            {
              name: '无',
              value: 2,
            },
          ]
        },
      ],

      myManager: {},
      loading: false,
    };
  },
  components: {
    'app-header': Header,
    Radio
  },
  created () {
    this.getMyManager();
  },
  computed: {
  },
  mounted () {
  },
  watch: {

  },
  methods: {
    /*
     * 获取专属服务经理信息
     */
    getMyManager () {
      let self = this;
      Models.User
      .myManager()
      .then((res) => {
        let data = res.data;
        if (1 === res.code) {
          this.myManager = data;
        }
        else {
          self.$toast('您无专属服务经理');
          setTimeout(() => {
            self.$router.push({
              name: 'home.Home'
            });
          }, 1500);
        }
      });
    },

    // 提交
    handleSumbit () {
      let isCheck = true;

      let data    = [];
      _.each(this.formData, (item, index) => {
        if (!_.isNumber(item)) {
          this.$toast('请先选择问题再提交');
          isCheck = false;
          return;
        }

        data.push({
          id : index + 1,
          val: item,
        });
      });

      if (true === isCheck) {
        // data = JSON.stringify(data);

        if (_.isEmpty(this.myManager)) {
          this.$toast('专属服务经理获取失败，请刷新');
          return;
        }

        if (this.loading) {
          this.$toast('正在为您提交');
          return;
        }

        this.loading = true;

        Models.User
        .rating({
          user_id: this.myManager.id,
          type_val: data,
        })
        .then((res) => {
          this.$toast(res.msg);
          if (1 !== res.code) {
            this.loading = false;
          }
        });
      }

    }
  }
};