import './index.scss';
import 'swiper/dist/css/swiper.css';

import _                from 'lodash';
import Header           from '~common/components/header';
import Models           from '~common/models';
import Swiper           from 'swiper';

export default {
  name: 'Increase',
  data () {
    return {
      isShow:true,
      formTemp: {
				increaseData:[]
      },
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
    userInfo () {
      let data = _.get(this.$store.get.state, 'App.userInfo') || this.$user.get();
      return data;
    },
	},
	watch: {

  },
  mounted () {
		this.increase();

    this.$nextTick(() => {
      /* eslint-disable */
      let swiper = new Swiper(this.$refs.mySwiper, {
        notNextTick: true,
        autoplay: 2000,
        grabCursor : true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        mousewheelControl : false,
        observeParents:true,
        loop: true,
        autoplayDisableOnInteraction: false,
      });
      /* eslint-enable */
    });
  },
  methods: {
    goToThePage (item) {
      this.$store.get.commit('saveTypeId', {
        id: item.id,
        name: item.name,
      });
      // if (13 === item.id) {
      //   this.isShow = !this.isShow;
      //   return;
      // }
      this.$router.push({name: 'home.IncreaseList'});
    },

		/**
		 * 提额秘籍
		 */
		increase () {
			let self = this;
			Models.Increase
			.categories({
        params: {
					type:1
        }
      })
			.then(res => {
        if (1 === res.code) {
          res.data.forEach((item) => {
            self.formTemp.increaseData.push(item);
          });
          Models.Increase
          .categories({
            params: {
              type:15
            }
          })
          .then(result => {
            if (1 === result.code) {
              result.data.forEach((item) => {
                self.formTemp.increaseData.push(item);
              });
            }
            else {
              self.$toast(result.msg);
            }
          });
        }
        else {
          self.$toast(res.msg);
        }
			});
    },

    linkToIncreaseList (type, id) {
      if (1 === this.userInfo.level) {
        let self = this;
        this.$store.get.dispatch({
          type  : 'handleChangeDialog',
          active: true,
          title : '温馨提示',
          msg   : '该板块功能仅对高级会员及以上身份会员开放，您可升级会员后使用该功能！',
          lists : [
            {
              msg: '关闭',
            },
            {
              msg: '立即升级',
              class: 'ok',
              func () {
                let route = {
                  name: 'user.BuyVip'
                };
                self.$router.push(route);
              },
            }
          ]
        });
      }
      else {
        if (type === 'IncreaseList') {
          this.$router.push({ name: 'home.IncreaseList', params: { id }});
        }
        else {
          this.$router.push({ name: 'home.' + type});
        }
      }
    }

  },
};
