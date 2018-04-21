import './index.scss';

import Header   from '~common/components/header';

export default {
  name: 'toolHome',
  data () {
    return {
      formTemp: {
      },
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
  },
  mounted () {
	},
	watch: {
	},
  methods: {

		handleDownApp () {
			let self = this;
			this.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
				title : '温馨提示',
				msg:'该功能需要在App里面使用，请下载',
        lists : [
          {
            msg: '取消',
          },
          {
            msg: '去下载',
            func () {
							self.$router.push({name: 'home.AppDownLoad'});
            },
            class: 'ok',
          },
        ]
      });
		}

  },
};