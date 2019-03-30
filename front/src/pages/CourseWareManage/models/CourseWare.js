import { queryCourseWares, addCourseWare } from '@/services/api';

export default {
  namespace: 'courseWare',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      let response = yield call(queryCourseWares, payload);
      var result = {}
      if (response.rows && response.rows.length > 0) {
        result.list = response.rows
        result.total = response.total
      }
      yield put({
        type: 'save',
        payload: result,
      });
    },
    *add({ payload, success, fail }, { call, put }) {
      let response = yield call(addCourseWare, payload.params);
      if (!response.flag) {
        if (success && typeof success === 'function') {
          success();
        }
      } else {
        if (fail && typeof fail === 'function') {
          fail(response.msg);
        }
      }
    },
    *update({ payload, success, fail }, { call, put }) {
      let response = yield call(addUser, payload.params);
      if (!response.flag) {
        if (success && typeof success === 'function') {
          success();
        }
      } else {
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
  },
};
