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
      console.log("courseWare fetch payload==", payload)
      let response = yield call(queryCourseWares, payload);
      console.log("courseWare fetch response==", response)
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
      console.log("courseWare add payload==", payload)
      let response = yield call(addCourseWare, payload.params);
      console.log("courseWare add response==", response)
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
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
