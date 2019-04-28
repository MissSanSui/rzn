import { routerRedux } from 'dva/router';
import { resetPassword } from '@/services/api';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'resetPassword',

  state: {
    status: undefined
  },

  effects: {
    *reset({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);

      // reset successfully
      console.log("response===", response)
      if (response.data) {
        yield put({
          type: 'changeStatus',
          payload: {},
        });
        reloadAuthorized();
        yield put(routerRedux.goBack());
        
      }
    }
  },
  reducers: {
    changeStatus(state) {
      console.log(state)
      return {
        ...state
      };
    },
  },
};
