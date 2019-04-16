import {
  queryRoomList, removeFakeList, addFakeList, updateFakeList, saveRoomCourseWare,
  queryRoomCoursewares, queryCoursewareImages, deleteRoomCourseWare, findContracts,
  updateRoom, saveRoomCourseWareAndUser, queryRoom, deleteRoomCourseWareAndUser
} from '@/services/api';

export default {
  namespace: 'room',

  state: {
    list: [],
    imageList: [],
    courseWareIds: [],
    userIds: "",
    contractList: [],
  },

  effects: {
    *fetchRoom({ payload, success, fail }, { call, put }) {
      const response = yield call(queryRoom, payload);
      if (!response.code) {
        if (success && typeof success === 'function') {
          success(response.data);
        }
      }
    },
    *updateRoom({ payload, success, fail }, { call, select }) {
      let { courseWareIds, userIds } = yield select(state => state.room)
      payload.user_ids = userIds
      console.log("room updateRoom payload==", payload)
      
      let formData = new FormData()
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          formData.append(key, payload[key])
        }
      });
      let response = yield call(updateRoom, formData)
      if (response.code) {
        response = response || {}
        if (fail && typeof fail === 'function') {
          fail(response.msg || '');
        }
      }
      else {
        if (success && typeof success === 'function') {
          success();
          yield put({
            type: 'save',
            payload: { },
          });
        }
      }
    },
    *saveCourseWare({ payload, success, fail }, { call, put, select }) {
      console.log("room saveCourseWare payload==", payload)
      let { imageList, courseWareIds } = yield select(state => state.room)
      let data = {}
      data.coursewares_no = payload.coursewares_no
      courseWareIds.push(payload.coursewares_no)
      let response = yield call(queryCoursewareImages, data);
      if (response.rows && response.rows.length > 0) {
        imageList = imageList.concat(response.rows)
        yield put({
          type: 'save',
          payload: {
            imageList: imageList,
            courseWareIds: courseWareIds
          },
        });
        if (success && typeof success === 'function') {
          success();
        }
      } else {
        if (fail && typeof fail === 'function') {
          fail();
        }
      }

    },
    *fetchImages({ payload, success, fail }, { call, put, select }) {
      let result = yield call(queryRoomCoursewares, payload);
      let imageList = []
      let courseWareIds = []
      // console.log("imageList===", imageList)
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
      // let formData = new FormData()
      // Object.keys(payload).forEach((key) => {
      //   if (payload[key]) {
      //     formData.append(key, payload[key])
      //   }
      // });
      // let response = yield call(deleteRoomCourseWare, formData);
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
      // if (success && typeof success === 'function') {
      //   success();
      // }
      yield put({
        type: 'save',
        payload: {
          imageList: images,
          courseWareIds: ids
        },
      });
    },
    *fetchContracts({ payload, success, fail }, { call, put, select }) {
      console.log("room fetchContracts payload==", payload)
      let response = yield call(findContracts, payload);
      console.log("fetchContracts==response=", response)
      if (!response.code) {
        yield put({
          type: 'save',
          payload: {
            contractList: response.data,
          },
        });
      }
    },
    *selectUsers({ payload, }, { put }) {
      yield put({
        type: 'save',
        payload: {
          userIds: payload,
        },
      });
    },
    *saveCourseWareAndUser({ payload, success, fail }, { call, put, select }) {
      let { courseWareIds, userIds } = yield select(state => state.room)
      payload.coursewares_nos = courseWareIds.join(',')
      payload.user_ids = userIds
      let formData = new FormData()
      Object.keys(payload).forEach((key) => {
        if (payload[key]) {
          formData.append(key, payload[key])
        }
      });
      let response = yield call(saveRoomCourseWareAndUser, formData);
      if (!response.code) {
        if (success && typeof success === 'function') {
          success();
        }
      } else {
        if (fail && typeof fail === 'function') {
          fail(response.msg);
        }
      }
    },
    *deleteCourseWareAndUser({ payload, success, fail }, { call, put, select }) {
      console.log("room deleteCourseWareAndUser payload==", payload)
      let response = yield call(deleteRoomCourseWareAndUser, payload);
      console.log("room deleteCourseWareAndUser response==", response)
      yield put({
        type: 'save',
        payload: {
          userIds: "",
          imageList: [],
          courseWareIds: []
        },
      });
      if (!response.code) {
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
    subscriptions: {
      //监听地址，如果地址含有app则跳转到登陆页
      setup({ dispatch, history }) {
        history.listen(path => {
          console.log("subscriptions  path==", path)
        });
      },
    },

  },
};
