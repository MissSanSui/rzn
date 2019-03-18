import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { addUser } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'usermanage',

  state: {
    status: undefined,
  },

  effects: {
    *addUser({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(addUser, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      
    },
  },

};
