import request from '@/utils/request'

/**
 * @function 手机登录
 * @param {string} phone 
 * @param {string} password 
 * @returns 
 */
export function loginByPhone(phone, password) {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params: {
      phone,
      password
    },
  })
}

/**
 * @function 邮箱登录
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export function loginByEmail(email, password) {
  return request({
    url: '/login',
    method: 'get',
    params: {
      email,
      password
    },
  })
}

/**
 * 
 * @function 退出登录
 */
export function logout() {
  return request({
    url: '/login',
    method: 'get',
  })
}

/**
 * 获取用户详情
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * - uid : 用户 id
 * @param {number} uid
 */
export function userDetail(uid) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: {
      uid,
      timestamp: new Date().getTime(),
    },
  })
}

/**
 * 获取账号详情
 * 说明 : 登录后调用此接口 ,可获取用户账号信息
 */
export function userAccount() {
  return request({
    url: '/user/account',
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  })
}

/**
 * @function 获取用户信息，歌单收藏，mv,dj数量
 */
export function userSubcount() {
  return request({
    url: '/user/subcount',
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  })
}

/**
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * - uid : 用户 id
 * - limit : 返回数量 , 默认为 30
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {Object} params
 * @param {number} params.uid
 * @param {number} params.limit
 * @param {number} params.offset
 */
export function userPlaylist(params) {
  return request({
    url: '/user/playlist',
    method: 'get',
    params,
  })
}

/**
 * 获取用户播放记录
 * 说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
 * - uid : 用户 id
 * - type : type=1 时只返回 weekData, type=0 时返回 allData
 * @param {Object} params
 * @param {number} params.uid
 * @param {number} params.type
 */
export function userPlayHistory(params) {
  return request({
    url: '/user/record',
    method: 'get',
    params,
  })
}

/**
 * 喜欢音乐列表（需要登录）
 * 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
 * - uid: 用户 id
 * @param {number} uid
 */
export function userLikedSongsIDs(uid) {
  return request({
    url: '/likelist',
    method: 'get',
    params: {
      uid,
      timestamp: new Date().getTime(),
    },
  })
}
