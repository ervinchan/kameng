import './index.scss';
import Header           from '~common/components/header';
import phoneCode        from '~common/components/phone_code';
import Models           from '~common/models';

export default {
  name: 'finishInvite',
  data () {
    return {
      phoneNumber: '',
      verifyCode: '',
      inviteCode: '',
      disabled: false,
    };
  },
  components: {
    'app-header': Header,
    phoneCode,
  },
  computed: {
  },
  async mounted () {
    let res = await Models.User.getParentInviteCode();
    if (res.code === 1 && res.data.code) {
      this.inviteCode = res.data.code;
      this.disabled = true;
    }
  },
  watch: {
  },
  methods: {
    async saveMsg () {
      if (!this.phoneNumber) {
        this.$toast('请输入手机号码');
        return;
      }
      if (!this.verifyCode) {
        this.$toast('请输入验证码');
        return;
      }
      if (!this.inviteCode) {
        this.$toast('请输入推荐码');
        return;
      }
      let res = await Models.User.bindMobile({
        parent_id: this.inviteCode,
        mobile: this.phoneNumber,
        verification_code: this.verifyCode
      });
      if (res.code === 1) {
        this.$toast('操作成功');
        setTimeout(() => {
          let route = this.$store.get.state.App.toRoute;
          if (route.name) {
            this.$router.replace({ name: route.name, query: route.query });
          }
          else {
            this.$router.replace({ name: 'home.Home' });
          }
        }, 500);
      }
      else {
        this.$toast(res.msg || '操作失败');
      }
    }
  },
};
