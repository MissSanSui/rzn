import request from '@/utils/request';
import { stringify } from 'qs';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request(`/frame-web/user/userEditView?${stringify(params)}`)
}