import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { addAccountUser } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'sys',

  state: {
    status: undefined,
  },

  effects: {
    *addUser({ payload }, { call, put }) {
      const response = yield call(addAccountUser, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      
    },
  },

};
