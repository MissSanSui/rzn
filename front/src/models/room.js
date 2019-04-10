import {
  queryRoomList, removeFakeList, addFakeList, updateFakeList, saveRoomCourseWare,
  queryRoomCoursewares, queryCoursewareImages, deleteRoomCourseWare
} from '@/services/api';

export default {
  namespace: 'room',

  state: {
    list: [],
    imageList: [],
    courseWareIds: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log("room  fetch payload===", payload)
      const response = yield call(queryRoomList, payload);
      console.log("room  fetch response===", response)
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *saveCourseWare({ payload, success, fail }, { call, put, select }) {
      console.log("room saveCourseWare payload==", payload)
      let formData = new FormData()
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          formData.append(key, payload[key])
        }
      });
      let response = yield call(saveRoomCourseWare, formData);
      if (!response.code) {
        let { imageList, courseWareIds } = yield select(state => state.room)
        let data = {}
        data.coursewares_no = payload.coursewares_no
        courseWareIds.push(payload.coursewares_no)
        let response = yield call(queryCoursewareImages, data);
        console.log("fetchImages   response==", response)
        if (response.rows && response.rows.length > 0) {
          imageList = imageList.concat(response.rows)
          yield put({
            type: 'save',
            payload: {
              imageList: imageList,
              courseWareIds: courseWareIds
            },
          });
        }
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
      console.log("room fetchImages payload==", payload)
      let result = yield call(queryRoomCoursewares, payload);
      let imageList = []
      let courseWareIds = []
      console.log("imageList===", imageList)
      if (result.rows && result.rows.length > 0) {
        // let imageList = yield select(state => state.room.imageList)
        for (var i = 0; i < result.rows.length; i++) {
          let data = {}
          data.coursewares_no = result.rows[i].coursewares_no
          courseWareIds.push(result.rows[i].coursewares_no)
          let response = yield call(queryCoursewareImages, data);
          if (response.rows && response.rows.length > 0) {
            imageList = imageList.concat(response.rows)
          }
        }
      }
      console.log("courseWareIds===", courseWareIds)
      yield put({
        type: 'save',
        payload: {
          imageList: imageList,
          courseWareIds: courseWareIds
        },
      });
    },
    *removeCourseWare({ payload, success, fail }, { call, put, select }) {
      console.log("room removeCourseWare payload==", payload)
      let formData = new FormData()
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          formData.append(key, payload[key])
        }
      });
      let response = yield call(deleteRoomCourseWare, formData);
      if (!response.code) {
        let { imageList, courseWareIds } = yield select(state => state.room)
        let images = []
        imageList.forEach(item => {
          if (item.coursewares_no != payload.coursewares_no) {
            images.push(item)
          }
        })
        let ids = []
        courseWareIds.forEach(item => {
          if (item != payload.coursewares_no) {
            ids.push(item)
          }
        })
        console.log("ids===", ids)
        if (success && typeof success === 'function') {
          success();
        }
        yield put({
          type: 'save',
          payload: {
            imageList: images,
            courseWareIds: ids
          },
        });
      } else {
        if (fail && typeof fail === 'function') {
          fail(response.msg);
        }
      }
    },


  },

  reducers: {
    save(state, action) {
      console.log("save action.payload==", {
        ...state,
        ...action.payload,
      })
      return {
        ...state,
        ...action.payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
