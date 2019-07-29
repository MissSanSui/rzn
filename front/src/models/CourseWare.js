import {
  queryCourseWares, addCourseWare, updateCourseWare, deleteCourseWare,
  saveCourseWareImage, deleteCourseWareImage, queryCoursewareImages
} from '@/services/api';
import { getUserId } from '@/utils/authority';

export default {
  namespace: 'courseWare',
  state: {
    data: {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
      fileList: []
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      payload.coursewares_tea = getUserId()
      // console.log("courseWare fetch payload==", payload)
      let response = yield call(queryCourseWares, payload);
      // console.log("courseWare fetch response==", response)
      var result = {}
      if (response.rows && response.rows.length > 0) {
        result.list = response.rows
        result.total = response.total
        result.pagination={
          total: response.total
        }
      }
      const data = yield select(state => state.courseWare.data)
      console.log("data==", data)
      let res = { ...data, ...result }
      console.log("res==", res)
      yield put({
        type: 'save',
        payload: { ...data, ...result },
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
      let formData = new FormData()
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          formData.append(key, payload[key])
        }
      });
      let response = yield call(updateCourseWare, formData);
      if (!response.flag) {
        if (success && typeof success === 'function') {
          success();
        }
      } else {
        if (fail && typeof fail === 'function') {
          fail(response.msg);
        }
      }
      fileList = response.data.rows.map((file) => {
        file.url = coursewares_images
        return file;
      });
      yield put({
        type: 'save',
        payload: {
          fileList: fileList
        },
      });
    },
    *saveImage({ payload, success, fail }, { call, put }) {
      console.log("courseWare update payload==", payload)
      let formData = new FormData()
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          formData.append(key, payload[key])
        }
      });
      let response = yield call(saveCourseWareImage, formData);
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
    *deleteImage({ payload, success, fail }, { call, put }) {
      console.log("courseWare deleteImage payload==", payload)
      let response = yield call(deleteCourseWareImage, payload);
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
    *fetchImages({ payload, success, fail }, { call, put, select }) {
      // console.log("courseWare fetchImages payload==", payload)
      let response = yield call(queryCoursewareImages, payload);
      console.log("courseWare fetchImages response==", response)
      var fileList =[]
      if (response.rows.length > 0) {
        fileList = response.rows.map((file) => {
          file.url = file.coursewares_images
          file.uid = file.id
          return file;
        });
        if (success && typeof success === 'function') {
          success(fileList);
        }
      } else {
        if (fail && typeof fail === 'function') {
          fail(response.msg);
        }
      }
      const data = yield select(state => state.courseWare.data)
      yield put({
        type: 'save',
        payload: {
          ...data, fileList: fileList
        },
      });
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
      console.log("action.payload==", action.payload)
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
