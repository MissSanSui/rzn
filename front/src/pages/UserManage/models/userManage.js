import { queryUsers } from '@/services/api';

export default {
  namespace: 'userManage',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log("queryUsers fetch==")
      let response = yield call(queryUsers, payload);
      var result = {}
      result.list = response
      console.log("queryUsers  result===",result)
      yield put({
        type: 'save',
        payload: result,
      });
    },
  },

  reducers: {
    save(state, action) {
      console.log("action==",action)
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
