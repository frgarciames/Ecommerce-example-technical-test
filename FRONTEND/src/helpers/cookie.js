export const getCookie = (name) => {
  let cookie = {};
  document.cookie.split(';').forEach(el =>  {
    let [k,v] = el.split('=');
    cookie[k.trim()] = v;
  })
  return cookie[name];
}

export const deleteCookie = (name) => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
};