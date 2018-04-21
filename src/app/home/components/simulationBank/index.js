import './index.scss';
import Header from '~common/components/header';

export default {
  name: 'carBreakCodeQuery',
  data () {
    return {
      codeList: [],
      isShowCodeList: false,
      currentCode: {},
      keyword: '',
      lastData: [],
      isShowQueryTips: false
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
  },
  mounted () {
  },
};