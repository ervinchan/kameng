import './index.scss';

import _                from 'lodash';
import Vue        			from 'vue';
import Vuex        			from 'vuex';
import Router         	from 'vue-router';
import axios            from 'axios';
import VueAxios         from 'vue-axios';
import VueLazyload      from 'vue-lazyload';
import VueScroller      from 'vue-scroller';

import Common           from '~common';
import App              from './App.vue';

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueScroller);
Vue.use(VueAxios, axios);
Vue.use(VueLazyload, {
  error: '../assets/no_team_icon.png',
  loading: '../assets/loading.gif',
});
let routerArr   = [];
let storeArr    = [];
let storeCommon = {};

if (!_.isEmpty(__PROJECTDIR__)) {
  __PROJECTDIR__.forEach((elem) => {

    // 组合不同模块的路由
    let item = require(`~appRoot/${elem}/router`);
    if (0 < item.default.routes.length) {
      let routes = item.default.routes;
      for (let i in routes) {
        let isBe = _.find(routerArr, (o) => {
          return o.name === routes[i].name;
        });
        if (_.isEmpty(isBe) || _.isEmpty(routes[i].name)) {
          routerArr.push(routes[i]);
        }
      }
    }

    // 组合不同模块的store
    let storeItem = require(`~appRoot/${elem}/store`);
    let store = storeItem.default;

    storeCommon = _.assign({}, storeCommon, store.common);
    store.store.forEach(function (elem) {
      _.assign(elem.modules, storeCommon);
      storeArr.push(elem);
    });

  });

  storeArr = _.uniqBy(storeArr, 'name');
}


/**
 * 组合新路由
 */
let router = _.assign({
  linkActiveClass: 'active',
  // mode: 'history',
  routes: routerArr,
});

if ('production' === _.get(process.env, 'NODE_ENV')) {
  router.mode = 'history';
}

/**
 * 处理不同模块路由跳转
 * 找不到跳到404模块（Todo）
 */
let newRouter     = new Router(router);
let routerToName  = {};


/**
 * axios 配置
 *
 */
let host = window.location.host;
// axios.defaults.baseURL = 'production' === _.get(process.env, 'NODE_ENV') ? 'http://api.kamengjinfu.com/api' : 'http://www.km.com/api';
axios.defaults.baseURL    = -1 !== host.indexOf('m') ? 'https://api.kamengjinfu.com/api' : 'https://api.kamengjinfu.com/api';
// axios.defaults.baseURL    = -1 !== host.indexOf('m') ? 'http://api.kamengjinfu.com/api' : 'http://api.kamengjinfu.com/api';
axios.defaults.retry      = 1;
axios.defaults.retryDelay = 1000;
axios.defaults.timeout    = 10000;

const options = {
  headers: {}
};

// 解析url里面参数为Json
function parseQueryString (url) {
  let regUrl   = /^[^\?]+\?([\w\W]+)$/;
  let regPara  = /([^&=]+)=([\w\W]*?)(&|$|#)/g;
  let arrUrl =  regUrl.exec(url);
  let ret     = {};

  if (arrUrl && arrUrl[1]) {
   let strPara = arrUrl[1];
   let result;
   while (null !== (result = regPara.exec(strPara))) {
    ret[result[1]] = result[2];
   }
  }
  return ret;
}

// 替换删除敏感字段
function funcUrlDel (names) {
  if ('string' === typeof names) {
    names = [names];
  }
  let loca = window.location;
  let obj = parseQueryString(loca.href);
  //删除指定参数
  for (let i = 0; i < names.length; i ++) {
       delete obj[names[i]];
  }
  //重新拼接url
  let url = loca.origin + loca.pathname + '?' + JSON.stringify(obj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&');
  return url;
}

let urlToken = parseQueryString(window.location.href);
if (!_.isEmpty(urlToken.token)) {
  Common.Services.LocalStorage.set('KMToken', {
    token : urlToken.token,
    weChat: 1,
  });
}

/**
 * 初始状态实例
 */
let newStore  = {};

newRouter.beforeEach((to, from, next) => {

  if (!_.isEmpty(urlToken.token)) {
    let url = funcUrlDel('token');
    window.location.replace(url);
  }
  else if (!_.isEmpty(urlToken.openid)) {
    let url = funcUrlDel('openid');
    window.location.replace(url);
  }

  // 不存在
  if (undefined === to.name || _.isEmpty(_.get(to, 'name'))) {
    next({
      name: 'home.Home',
    });
    return;
  }
  let modules = _.get(_.find(storeArr, { name: to.name }), 'modules');
  modules = _.assign({}, modules, storeCommon);
  newStore.get = new Vuex.Store({ modules });

  newStore.get.dispatch({
    type  : 'handleChangeDialog',
    active: false
  });


  // 路由跳转，判断KMToken是否存在
  routerToName            = to;
  let KMToken             = Common.Services.LocalStorage.get('KMToken') || newStore.get.state.App.histData;
  let KMDeviceType        = Common.Services.LocalStorage.get('KMDeviceType');
  if (!_.isEmpty(_.get(KMToken, 'data.token'))) {
    options.headers = _.assign({}, options.headers, {
     'KM-Token'       : _.get(KMToken, 'data.token'),
     'KM-Device-Type' : _.get(KMDeviceType, 'data') || 'web',
    });

    // let userInfo = Common.Services.LocalStorage.get('userInfo');

    // if (_.isEmpty(userInfo.data)) {
    //   Common.Models.Profile
    //   .get()
    //   .then((res) => {
    //     if (1 === res.code) {
    //       let data = res.data;
    //       Common.Services.LocalStorage.set('userInfo', data);
    //       newStore.get.dispatch({
    //         type: 'userInfo',
    //         userInfo: data,
    //       });
    //     }
    //   });
    // }

  }

  // 检测微信授权
  if ('home.AppDownLoad' !== to.name) {
    if (true === Common.Spreads.Device.is('WeChat')
      && 0 !== _.get(KMToken, 'data.weChat')
      && 'welcome.Login' !== to.name
      && 'welcome.Register' !== to.name
      && 'welcome.Findpwd' !== to.name) {
      Common.Models.Wechat
      .checkAuth()
      .then((res) => {
        if (0 === res.code) {
          Common.Services.LocalStorage.remove('KMToken');
          Common.Services.LocalStorage.remove('KMDeviceType');
          Common.Services.LocalStorage.remove('userInfo');
          Common.Services.LocalStorage.remove('guideNumber');
          window.location.href = `${axios.defaults.baseURL}/user/sns_login/index/channel/weixin/device_type/web`;
        }
      });
    }
    else {
      // 登录权限验证
      _.filter(to.matched, (o) => {
        if (false === Common.Spreads.Device.is('WeChat') && true === _.get(o, 'meta.authorization') || true === _.get(o, 'parent.meta.authorization')) {
          if (_.isEmpty(KMToken) || _.isEmpty(_.get(KMToken, 'data.token'))) {

            let dtLink = {};
            if ('welcome.Login' !== routerToName.name) {
              dtLink = {
                name: routerToName.name,
              };

              if (!_.isEmpty(routerToName.params)) {
                dtLink.params = routerToName.params;
              }

              if (!_.isEmpty(routerToName.query)) {
                dtLink.query = routerToName.query;
              }
              /* eslint-disable */
              if (window.js_obj) {
                js_obj.logout();
              }
              /* eslint-enable */
              // Todo，next只运行一次
              next({
                name: 'welcome.Login',
                query: {
                  dt: JSON.stringify(dtLink)
                }
              });
            }
            return;
          }
        }
      });


      // 禁止重复登录
      if (!_.isEmpty(_.get(KMToken, 'data.token')) && 'welcome.Login' === to.name) {
        next({
          name: from.name || 'home.Home'
        });

        return;
      }
    }
  }



  newStore.get.dispatch({
    type: 'setRouter',
    historyRoute: from.name || '',
  });

  newStore.get.dispatch({
    type: 'currentRoute',
    data: to.name,
  });

  let lastRoute = _.get(newStore.get.state, 'App.histData.lastRoute');

  if (_.isEmpty(lastRoute)) {
    newStore.get.dispatch({
      type: 'histData',
      data: {
        lastRoute: to.name
      },
    });
  }


  document.title = _.get(to, 'meta.title') || '卡盟v金服';

//加载开启Loading
  newStore.get.dispatch({
    type: 'Loading',
    isShow: true
  });
  next();
});

/**
  * 注入request请求信息
  **/
axios.interceptors.request.use((config) => {
  config = _.assign({}, config, options);
  return config;
}, (err) => {
  return Promise.reject(err);
});

/**
  * 返回结果拦截
  **/
axios.interceptors.response.use((response) => {


  let data;
  if (200 === response.status) {
    data = _.get(response, 'data');
  }
  else {
    data = response.data;
    const err = new Error(data.description);

    err.data = data;
    err.response = response;

    throw err;
  }



  // 登录Token失效
  if (10001 === data.code * 1) {
    Common.Services.LocalStorage.remove('KMToken');
    Common.Services.LocalStorage.remove('KMDeviceType');
    Common.Services.LocalStorage.remove('userInfo');
    Common.Services.LocalStorage.remove('guideNumber');

    let dtLink = {};
    if ('welcome.Login' !== routerToName.name && false === Common.Spreads.Device.is('WeChat')) {
      dtLink = {
        name: routerToName.name,
      };

      if (!_.isEmpty(routerToName.params)) {
        dtLink.params = routerToName.params;
      }

      if (!_.isEmpty(routerToName.query)) {
        dtLink.query = routerToName.query;
      }

      /* eslint-disable */
      if (window.js_obj) {
        js_obj.logout();
      }
      /* eslint-enable */

      setTimeout(() => {
        newRouter.push({
          name: 'welcome.Login',
          query: {
            dt: JSON.stringify(dtLink)
          }
        });
      }, 100);
    }

  }

  //用户冻结
  if (data.code === 11001) {
    newStore.get.dispatch({
      type: 'UserFreeze',
      freeze : true,
      freezesMsg : data.msg,
    });
  }
  return data;
}, (err) => {
  let errMsg = err.message;

  Vue.$loadingClose();

  newStore.get.dispatch({
    type: 'Loading',
    isShow: false,
  });

  if (-1 !== errMsg.indexOf('timeout')) {
    let config = err.config;

    if (!config || !config.retry || config.__retryCount >= config.retry) {
      newStore.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        title : '温馨提示',
        msg   : '网络请求超时',
        lists : [
          {
            msg: '重新加载',
            class: 'ok',
            func () {
              window.location.reload();
            }
          },
        ]
      });
      return Promise.reject(err);
    }

    config.__retryCount = config.__retryCount || 0;

    config.__retryCount += 1;

    let backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1);
    });

    return backoff.then(() => {
      return axios(config);
    });

  }
  else if (-1 !== errMsg.indexOf('Network')) {

    newStore.get.dispatch({
      type  : 'handleChangeDialog',
      active: true,
      title : '错误提示',
      msg   : `${_.get(err, 'config.url')}\n${errMsg}请求错误`,
      lists : [
        {
          msg: '关闭',
          class: 'ok',
        },
      ]
    });

    return Promise.reject(err);

  }

  return Promise.reject(err);
});


/* eslint-disable */
let vm = new Vue({
  el: '#app',
  router: newRouter,
  store: newStore,
  Common,
  template: '<App/>',
  components: { App }
});

window.vm = vm;
/* eslint-enable */
