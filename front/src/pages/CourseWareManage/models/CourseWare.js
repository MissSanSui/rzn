<<<<<<< HEAD
import { queryCourseWares, addCourseWare,updateCourseWare,deleteCourseWare } from '@/services/api';
=======
import { queryCourseWares, addCourseWare,updateCourseWare,deleteCourseWare,
  saveCourseWareImage,deleteCoursewareImage,queryCoursewareImages } from '@/services/api';
>>>>>>> courseware image
import { getUserId } from '@/utils/authority';

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
      payload.coursewares_tea = getUserId()
      // console.log("courseWare fetch payload==", payload)
      let response = yield call(queryCourseWares, payload);
      // console.log("courseWare fetch response==", response)
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
      let formData = new FormData()
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          formData.append(key, payload[key])
        }
      });
      formData.append("coursewares_tea", getUserId())
      console.log("courseWare add formData==", formData)
      let response = yield call(addCourseWare, formData);
      console.log("courseWare add response==", response)
      if (!response.code) {
        if (success && typeof success === 'function') {
          success(JSON.parse(response.data));
        }
      } else {
        if (fail && typeof fail === 'function') {
          fail(response.msg);
        }
      }
    },
    *update({ payload, success, fail }, { call, put }) {
      console.log("courseWare update payload==", payload)
      let response = yield call(updateCourseWare, payload.params);
      
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
    *saveImage({ payload, success, fail }, { call, put }) {
      console.log("courseWare update payload==", payload)
      let response = yield call(saveCourseWareImage, payload.params);
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
    *delete({ payload, success, fail }, { call, put }) {
      console.log("courseWare update payload==", payload)
      let response = yield call(deleteCourseWare, payload.params);
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
