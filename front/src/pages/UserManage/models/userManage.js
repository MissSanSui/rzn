import { queryUsers, addUser, updateUser } from '@/services/api';

export default {
  namespace: 'userManage',

  state: {
    loading: false,
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      let response = yield call(queryUsers, payload);
      var result = {
        list: [],
        pagination: {},
      }
      if (response.rows && response.rows.length > 0) {
        result.list = response.rows
        result.pagination.total = response.total
      }
      yield put({
        type: 'save',
        payload: result,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *add({ payload, success, fail }, { call, put }) {
      console.log("addUser=payload=", payload)
      let response = yield call(addUser, payload.params);
      if (!response || response.flag) {
        response = response||{}
        console.log(" addUser  fail==", response)
        if (fail && typeof fail === 'function') {
          fail(response.msg||'');
        }
      }
      else {
        if (success && typeof success === 'function') {
          success();
        }
      }
    },
    * update({ payload, success, fail }, { call, put }) {
      console.log("updateUser=payload=", payload)
      let response = yield call(updateUser, payload.params);
      if (!response.flag) {
        if (success && typeof success === 'function') {
          success();
        }
      } else {
        console.log(" updateUser  fail==", response)
        if (fail && typeof fail === 'function') {
          fail(response.msg);
        }
      }
    },

  },
  reducers: {
    save(state, action) {
      console.log("action==", action)
      return {
        ...state,
        data: action.payload,
      };
    },
    changeLoading(state, action) {
      console.log("action==", action)
      return {
        ...state,
        loading: action.payload
      };
    },
  },
};
