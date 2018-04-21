import './index.scss';
import Header           from '~common/components/header';
import Models           from '~common/models';

export default {
  name: 'Advice',
  data () {
    return {
      adviceString: '',
      phone: '',
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
    async submitAdvice () {
      if (!this.adviceString) {
        this.$toast('请留下您的宝贵意见或建议');
        return;
      }
      if (!this.phone) {
        this.$toast('请留下您的联系方式');
        return;
      }
      // let res = await Models.User.();
      this.adviceString = '';
      this.phone = '';
      this.$toast('提交成功，感谢您的反馈');
    }
  },
};
