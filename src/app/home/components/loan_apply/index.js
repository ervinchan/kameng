import './index.scss';

import _          					from 'lodash';
import Header     					from '~common/components/header';
import phoneCode  					from '~common/components/phone_code';
import Checkbox   					from '~common/components/checkbox';

import Models     					from '~common/models';
import CityList       			from '~common/components/city_list';

import Protocol             from '~common/components/protocol_detail';

export default {
  name: 'loanApply',
  data () {
    return {
      state: {
        /*
         * 填写信息是否完整
         */
        active        : false,
        /*
         * 协议状态
         */
        agree         : true,
        /*
         * 是否已填写申请人信息
         */
        // applyed       : false,
        /*
         * 是否添加申请人信息
         */
        addFlag       : false,
        /*
         * 是否跳转
         */
        jumpFlag      : false,
      },
      /*
       * 申请人信息
       */
      formData: {
        lender_id     : '',
        name          : '',
        id_number     : '',
        phone         : '',
				code          : '',
				// location			:	'',
				// province      : '',
        // city          : '',
        // district      : '',
				// address       : {},
			},
			loansList:[],
			isShow: false,
			show:false,
      creditDetail: '',

      /*
       * 申请人信息列表
       */
      formList: [],
      loading: false,
      single: true,

      /*
       * 跳转贷款链接
       */
			loanUrl: '',

			isOpenProtocol: false,
    };
  },
  components: {
    'app-header': Header,
    phoneCode,
		Checkbox,
		CityList,
		Protocol,
  },
  computed: {
		cityShow () {
      return _.get(this.$store.get.state, 'CityList.content.isShow') || false;
    },

    provObj () {
      return _.get(this.$store.get.state, 'CityList.content.data.prov') || {};
    },

    cityObj () {
      return _.get(this.$store.get.state, 'CityList.content.data.city') || {};
    },

    areaObj () {
      return _.get(this.$store.get.state, 'CityList.content.data.area') || {};
    },

    address () {
      let data = `${_.get(this.provObj, 'region_name') || ''}${_.get(this.cityObj, 'region_name') || ''}${_.get(this.areaObj, 'region_name') || ''}`;
      if (_.isEmpty(data)) {
        data = `${this.userInfo.province_name || ''}${this.userInfo.city_name || ''}${this.userInfo.district_name || ''}`;
      }
      return data;
    },
	},
  mounted () {
    this.getAuthentication();
    this.formData.lender_id = _.get(this.$route, 'params.id');
    this.nameList();
    /*this.getLoan();*/
    // this.loanList();
  },
  watch: {
    formData: {
      deep: true,
      handler () {
        this.handleIsempty();
      },
    }
  },
  methods: {

    // 选中
    handelSelectData (item) {
      this.formData = _.assign({}, this.formData, item);
    },

    // 获取基本共用字段
    getAuthentication () {
      Models.Profile
      .getAuthentication()
      .then((res) => {
        if (1 === res.code) {
          let data = res.data;
          this.loansList.name       = data.real_name;
          this.loansList.id_number  = data.id_card;
          this.loansList.phone      = data.mobile;
          this.formData.name        = data.real_name;
          this.formData.id_number   = data.id_card;
          this.formData.phone       = data.mobile;
        }
      });
    },

		/**
		 *自动天申请人信息
		 */
		// loanList () {
  //     Models.Credit
  //     .nameList()
  //     .then((res) => {
  //       if (1 === res.code) {
		// 			let data = res.data;
		// 			if (!_.isEmpty(data.list.data[0])) {
		// 				this.loansList = data.list.data[0];
		// 				this.formData.name = this.loansList.name;
  //           this.formData.id_number = this.loansList.id_number;
  //           this.formData.phone = this.loansList.phone;
  //         }
  //       }
  //     });
  //   },

		/*
     * 所在地
     */
		choose () {
			// console.log(123);
			this.$store.get.dispatch({
        type: 'cityListData',
        isShow: true,
      });
		},
    /*
     * 监控表单是否为空
     */
    handleIsempty () {
      this.state.active = true;
      for (let i in this.formData) {
        if (this.formData[i] && 0 >= this.formData[i].length) {
          this.state.active = false;
          break;
        }
      }
    },

    handleCreditDetail () {
      let self = this;
      Models.Credit
      .show({
        params: {
          id: self.formData.credit_card_id,
        }
      })
      .then((res) => {
        if (1 === res.code) {
          let data = res.data;
          if (_.isEmpty(data)) {
            self.$store.get.dispatch({
              type  : 'handleChangeDialog',
              active: true,
              title : '温馨提示',
              msg   : '内容不存在',
              lists : [
                {
                  msg: '关闭',
                  // func () {
                  //   self.$router.push({
                  //     name: 'home.Home',
                  //   });
                  // }
                },
              ]
            });
            return;
          }
          self.creditDetail = data;
        }
      });
    },

    /*
     * 申请人信息列表
     */
     nameList () {
      Models.Lender
      .nameList()
      .then((res) => {
        if (1 === res.code) {
          let data = res.data;
          if (!_.isEmpty(data.data)) {
            this.formList = data.data;
            this.formData = _.assign({}, this.formData, data.data[0]);
          }
        }
      });
     },
		/**
		 *删除
		 */
		deleteData (item) {
      let self = this;

      self.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        title : '温馨提示',
        msg   : '是否确认删除申请人信息？',
        lists : [
          {
            msg: '取消',
            func () {
            }
          },
          {
            msg: '删除',
            class: 'ok',
            func () {
              Models.Lender
              .delete({
                id: item.id,
              })
              .then((res) => {
                self.$toast(res.msg);
                if (1 === res.code) {
                  self.formList.splice(item, 1);
                }
              });
            }
          }
        ]
      });

    },
    /*
     * 提交用户信息
     */
    handleSumbit () {
      let self = this;
      if (false === self.single) {
        self.$toast('请阅读并同意《卡盟金服服务协议》');
        return;
      }

      // 通过身份证7到14位 判断年龄是否在18~55周岁之间
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      let idNumber = this.formData.id_number;
      if (reg.test(idNumber)) {
        let yearStr = idNumber.substring(6, 10),
            monthStr = idNumber.substring(10, 12),
            dateStr = idNumber.substring(12, 14);
        let eighteen = new Date(+yearStr + 18 + '/' + monthStr + '/' + dateStr).getTime(),
            fiftyFive = new Date(+yearStr + 55 + '/' + monthStr + '/' + dateStr).getTime(),
            now = Date.now();
        if (now < eighteen || now > fiftyFive) {
          this.$store.get.dispatch({
            type  : 'handleChangeDialog',
            active: true,
            title : '提示',
            msg   : '您的年龄未在规定年龄内，您的信用卡申请将无法通过哦！',
            lists : [
              {
                msg: '确定',
              },
            ]
          });
          return;
        }
      }
      else {
        this.$toast('请输入正确的身份证号码');
        return;
      }

      let res = self.$validator(self.$refs.form);
      if (0 !== res.code) {
        self.$toast(res.data.msg);
        return;
      }

      if (true === self.loading) {
        self.$toast('正在为您提交');
        return;
      }

      self.loading = true;
      self.formData.id  = self.formList.length ? self.formList.length + 1 : 1;

      Models.Lender
      .create({
        lender_id     : this.formData.lender_id,
        id_number     : this.formData.id_number,
        name          : this.formData.name,
        phone         : this.formData.phone,
        code          : this.formData.code,
      })
      .then((res) => {
        self.$toast(res.msg);
        self.loading = false;
        if (1 === res.code) {
          self.formData.id = _.get(res, 'data.id') ? _.get(res, 'data.id') : self.formData.id;
          self.formList.push(self.formData);
          self.state.addFlag = false;

          // 清空申请人信息
          self.formData = _.assign({}, self.formData, {
            name: this.loansList.name,
            id_number: this.loansList.id_number,
            phone: this.loansList.phone,
            code: '',
          });
        }
      })
      .catch(() => {
        self.loading = false;
      });

    },

    // 添加申请人信息按钮
    handleApply () {
			this.state.addFlag = true;
			this.formData = _.assign({}, this.formData, {
				name: this.loansList.name || '',
				id_number: this.loansList.id_number || '',
				phone: this.loansList.phone || '',
				code: '',
			});
    },
    //宜人贷信息推送
    yydSendMsg () {
        let self = this;
        Models.Lender
        .sendMsg()
        .then((res) => {
          self.$toast(res.msg);
          if (1 !== res.code) {
            return;
          }
        })
        .catch(() => {

        });
    },
    // 提交申请资料
    sumbit () {
      let self = this;
      if (false === self.single) {
        self.$toast('请阅读并同意《卡盟金服服务协议》');
        return;
      }

      if (true === self.loading) {
        self.$toast('正在为您提交');
        return;
      }
      self.loading = true;
      this.formData.lender_id = _.get(this.$route, 'params.id');
      if (44 === this.formData.lender_id) {
         self.yydSendMsg();
      }
      Models.Lender
      .reapply({
        id        : this.formData.id,
        lender_id : this.formData.lender_id * 1,
      })
      .then((res) => {
        self.$toast(res.msg);
        if (1 !== res.code) {
          self.loading = false;
          return;
        }
        self.loanUrl  = res.data.jump_url;
        setTimeout(() => {
          window.location.href = self.loanUrl;
        }, 2000);
      })
      .catch(() => {
        self.loading = false;
      });
    },

    /*getLoan () {
      let self = this;
      let id = _.get(self.$route, 'params.id');
      Models.Lender
      .show({
        params: {
          id: id * 1,
        }
      })
      .then((res) => {
        if (1 === res.code) {
          let data      = res.data;
        }
      });
		},*/

		//open协议
    openCardProtocol (item) {
      if ('card' === item) {
        this.isOpenProtocol = true;
      }
    },
  },
};
