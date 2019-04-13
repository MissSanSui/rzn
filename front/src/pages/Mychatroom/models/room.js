
import { queryMyrooms, addMyroom, updateMyroom, deleteMyroom } from '@/services/api';
export default {
  namespace: 'mychatroom',

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
    *add({ payload, success, fail }, { call }) {
        console.log("2222",payload)
      let formData = new FormData()
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          formData.append(key, payload[key])
        }
      });
      console.log("4444",formData)
      let response = yield call(addMyroom, formData)
      console.log("5555",response)
      if (response.code) {
        response = response || {}
        console.log(" addMyroom  fail==", response)
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
