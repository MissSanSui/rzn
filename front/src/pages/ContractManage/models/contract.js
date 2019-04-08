import { queryContracts, addContract, updateUser, validateUserName,ableUser,disableUser } from '@/services/api';

export default {
  namespace: 'contract',

  state: {
    loading: false,
    data: {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      console.log("contract fetch payload==", payload)
      let response = yield call(queryContracts, payload);
      var result = {
        list: [],
        pagination: {},
      }
      if (response.code ==0&& response.rows.length > 0) {
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
    *add({ payload, success, fail }, { call }) {
      let formData = new FormData()
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          formData.append(key, payload[key])
        }
      });
      console.log("contract add formData==", formData)
      let response = yield call(addContract, formData)
      if (!response || response.flag != "0") {
        response = response || {}
        console.log(" addUser  fail==", response)
        if (fail && typeof fail === 'function') {
          fail(response.msg || '');
        }
      }
      else {
        if (success && typeof success === 'function') {
          success();
        }
      }
    },
    * update({ payload, success, fail }, { call, put }) {
      // console.log("updateUser=payload=", payload)
      let formData = new FormData()
      Object.keys(payload.params).forEach((key) => {
        if (payload.params[key]) {
          formData.append(key, payload.params[key])
        }
      });
      let response = yield call(updateUser, formData);
      if (response.flag == "0") {
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
    *validate({ payload, callback }, { call, put }) {
      console.log("contract validate payload==", payload)
      let response = yield call(validateUserName, payload);
      console.log("contract validate response==", response)
      callback(response.valid)
    },
  },
  reducers: {
    save(state, action) {
      // console.log("action==", action)
      return {
        ...state,
        data: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload
      };
    },
  },
};
