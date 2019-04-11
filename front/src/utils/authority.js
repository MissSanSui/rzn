// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? sessionStorage.getItem('antd-pro-authority') : str;
    // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return ['admin'];
  //  authority ||
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return sessionStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
export function setUserId(id) {
  return sessionStorage.setItem('userid', JSON.stringify(id));
}
export function getUserId() {
  return sessionStorage.getItem('userid') ||12;
}