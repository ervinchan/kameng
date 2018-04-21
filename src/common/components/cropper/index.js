import './index.scss';

import _          from 'lodash';
import VueCropper from 'vue-cropperjs';
import Models     from '~common/models';

export default {
  name: 'cropper',
  props: {


  },
  data () {
    return {
      loading : false,
      imgSrc  : '',
      imgType : 'image/jpeg',
    };
  },
  watch: {
    cropImg (val) {
      this.newImgUrl = val;
    }
  },
  computed: {
    isShow () {
      if (true === _.get(this.$store.get.state, 'Cropper.content.isShow')) {
        this.setImage();
      }
      return _.get(this.$store.get.state, 'Cropper.content.isShow') || false;
    },
    save () {
      return _.get(this.$store.get.state, 'Cropper.content.save') || 0;
    },
  },
  mounted () {
  },

  components: {
    VueCropper
  },

  watch: {
  },
  methods: {
    cancel () {
      this.imgSrc = this.lastImg;
      this.$store.get.dispatch({
        type  : 'cropperData',
        isShow: false,
        data: {}
      });

      this.fileClose();

    },

    fileClose () {
      this.$emit('uploadFileClose');
    },

    setImage () {
      const file = _.get(this.$store.get.state, 'Cropper.content.data.file');
      let type   = _.get(file, 'type');
      this.imgType = type;
      if (!_.includes(type, 'image')) {
        this.$toast('Please select an image file');
        return;
      }
      const reader = new FileReader();

      // 加载图片
      reader.onloadstart = () => {
        this.$store.get.dispatch({
          type: 'Loading',
          Text: '图片加载中...',
          isShow: true
        });
      };

      // 加载完成
      reader.onload = (event) => {
        this.imgSrc  = event.target.result;
        this.$refs.cropper.replace(event.target.result);
        this.$store.get.dispatch({
          type: 'Loading',
          isShow: false
        });
      };

      // 加载错误
      reader.onerror = () => {
        this.$toast('图片加载失败');
        return;
      };

      reader.readAsDataURL(file);

    },

    upload () {
      let self = this;

      if (false === self.loading) {
        self.$store.get.dispatch({
          type: 'Loading',
          Text: '上传中...',
          isShow: true
        });

        self.loading = true;

        let data = {
          image:  self.$refs.cropper.getCroppedCanvas().toDataURL(self.imgType, 0.3) || '',
          save: self.save
        };


        Models.Upload
        .uploadImage(data)
        .then((res) => {

          if (1 === res.code) {
            this.$store.get.dispatch({
              type  : 'cropperData',
              isShow: false,
              data: res.data
            });
          }
          else {
            this.$toast(res.msg);
          }

          self.$store.get.dispatch({
            type: 'Loading',
            isShow: false
          });
          self.loading = false;
          this.fileClose();

        });
      }

    },

    rotate () {
      this.$refs.cropper.rotate(90);
    }
  }
};