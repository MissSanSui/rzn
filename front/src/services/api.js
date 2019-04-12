import { stringify } from 'qs';
import request from '@/utils/request';
const { NODE_ENV, APP_TYPE, TEST } = process.env;
// const backendAddr = (() => {
//   const env = NODE_ENV
//   console.log(env)
//   switch (env) {
//     case 'dev': return {
//       sample: 'http://localhost',
//     };
//     case 'qa': return {
//       sample: 'http://localhost',
//     };
//     case 'production': return {
//       sample: 'http://localhost',
//     };
//     default: return {
//       sample: 'http://localhost',
//     };
//   }
// })();
export async function fakeAccountLogin(params) {
  return request('/frame-web/sso', {
    // return request('api/entry/login', {
    method: 'POST',
    body: params,
  });
}

export async function addUser(params) {
  return request('/frame-web/user/saveUserInfo', {
    method: 'POST',
    body: params,
  });
}
export async function updateUser(params) {
  return request('/frame-web/user/UpdateUserInfo', {
    method: 'POST',
    body: params,
  });
}
export async function queryUsers(params) {
  return request(`/frame-web/user/userPageList?${stringify(params)}`)
}
export async function validateUserName(params) {
  return request(`/frame-web/user/validateUserName?${stringify(params)}`)
}
export async function ableUser(params) {
  return request(`/frame-web/user/ableUser?${stringify(params)}`)
}
export async function disableUser(params) {
  return request(`/frame-web/user/disableUser?${stringify(params)}`)
}


export async function queryRoomList(params) {
  return request(`/frame-web/rooms/roomsList?${stringify(params)}`)
}

//Contract
export async function addContract(params) {
  return request('/frame-web/contracts/saveContracts', {
    method: 'POST',
    body: params,
  });
}
export async function updateContract(params) {
  return request('/frame-web/contracts/UpdateContractsInfo', {
    method: 'POST',
    body: params,
  });
}
export async function queryContracts(params) {
  return request(`/frame-web/contracts/contractsList?${stringify(params)}`)
}
export async function deleteContract(params) {
  return request(`/frame-web/contracts/deleteContractByNo?${stringify(params)}`)
}


//CourseWare
export async function addCourseWare(params) {
  return request('/frame-web/coursewares/saveCoursewares', {
    method: 'POST',
    body: params,
  });
}
export async function updateCourseWare(params) {
  return request('/frame-web/coursewares/UpdateCoursewaresInfo', {
    method: 'POST',
    body: params,
  });
}
export async function queryCourseWares(params) {
  return request(`/frame-web/coursewares/coursewaresList?${stringify(params)}`)
}
export async function deleteCourseWare(params) {
  return request(`/frame-web/coursewares/deleteCoursewaresByNo?${stringify(params)}`)
}

export async function queryCoursewareImages(params) {
  return request(`/frame-web/coursewaresImags/coursewaresImagsList?${stringify(params)}`)
}
export async function saveCourseWareImage(params) {
  return request('/frame-web/coursewaresImags/saveCoursewaresImags', {
    method: 'POST',
    body: params,
  });
}
export async function deleteCourseWareImage(params) {
  return request(`/frame-web/coursewaresImags/deleteCoursewaresImags?${stringify(params)}`)
}


//room
export async function saveRoomCourseWare(params) {
  return request('/frame-web/roomsCoursewares/saveRoomsCoursewares', {
    method: 'POST',
    body: params,
  });
}
export async function queryRoomCoursewares(params) {
  return request(`/frame-web/roomsCoursewares/roomsCoursewaresList?${stringify(params)}`)
}
export async function deleteRoomCourseWare(params) {
  return request('/frame-web/roomsCoursewares/deleteRoomsCoursewares', {
    method: 'POST',
    body: params,
  });
}


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request( `/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}


export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
