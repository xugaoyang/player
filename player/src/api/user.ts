import request from '@/utils/request'

/**
 * 获取用戶详情
 * @param {string} uid
 * @returns
 */
export function getUserDetail(uid:string) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: {
      uid
    }
  })
}

/**
 * 获取账户信息
 * @returns 
 */
export function getUserAccount() {
  return request({
    url: '/user/account',
    method: 'get',
  })
}

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 * @returns 
 */
export function getUserSubcount() {
  return request({
    url: '/user/subcount',
    method: 'get',
  })
}

/**
 * 获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度
 * @returns 
 */
export function getUserLevel() {
  return request({
    url: '/user/level',
    method: 'get',
  })
}

/**
 * 获取用户绑定信息
 * @returns 
 */
export function getUserBinding() {
  return request({
    url: '/user/binding',
    method: 'get',
  })
}


/**
 * 获取用户歌单
 * @param {string} uid
 * @returns 
 */
export function getUserPlaylist(uid:string) {
  return request({
    url: '/user/playlist',
    method: 'get',
    params: {
      uid
    }
  })
}
