import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha,logout } from '@/services/api';
import { setAuthority, setUserId } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    currentUser: {}
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      // Login successfully
      console.log("response===", response)
      if (response.data) {
        yield put({
          type: 'changeLoginStatus',
          payload: response.data.currentUser,
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        console.log(params);
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            console.log("redirect===", redirect)
            return;
          }
        }
        console.log("redirect=/==/")
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put ,call}) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          user_status: false,
          role: 'guest',
          user_id:"",
        },
      });
      console.log("logout call=")
      let response = yield call(logout, {});
      console.log("logout response=",response)
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log("payload==", payload);
      setAuthority(payload.role || "guest");
      setUserId(payload.user_id)
      return {
        ...state,
        currentUser: payload,
      };
    },
  },
};
