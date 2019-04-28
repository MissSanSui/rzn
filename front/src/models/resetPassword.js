import { routerRedux } from 'dva/router';
import { resetPassword } from '@/services/api';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'resetPassword',

  state: {
    
  },

  effects: {
    *reset({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);

      // reset successfully
      console.log("response===", response)
      if (response.data) {
        reloadAuthorized();
        yield put(routerRedux.replace('/user/login'));
      }
    }
  }
};
