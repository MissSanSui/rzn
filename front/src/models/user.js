import { query as queryUsers, queryCurrent } from '@/services/user';
import { getUserId } from '@/utils/authority';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      let data = {}
      data.user_id = getUserId()
      console.log("fetchCurrent==data",data)
      if(data.user_id!=""){
        console.log("fetchCurrent==data",data)
        const response = yield call(queryCurrent,data);
        console.log("fetchCurrent==response",response)
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      }else{
        yield put({
          type: 'saveCurrentUser',
          payload: {},
        });
      }
    },


  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
