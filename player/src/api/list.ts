import request from '@/utils/request'

/**
 * 获取banner
 * @param {number} type 0:pc 1: android 2: iphone 3:ipad
 * @returns
 */
export function getBanner(type: number) {
  return request({
    url: '/banner',
    method: 'get',
    params: {
      type,
    },
  })
}

/**
 * 获取歌单分类
 * @returns
 */
export function getCatList() {
  return request({
    url: '/playlist/catlist',
    method: 'get',
  })
}

/**
 * 获取热门歌单分类
 * @returns
 */
export function getHotList() {
  return request({
    url: '/playlist/catlist',
    method: 'get',
  })
}

/**
 * 获取精品歌单
 * @returns
 */
export function getHqList() {
  return request({
    url: '/top/playlist/highquality',
    method: 'get',
  })
}
/**
 * 新歌速递
 * @param {number} type 全部：0 华语：7 欧美：96 韩国：16
 * @returns
 */
export function getNewList(type: number) {
  return request({
    url: '/top/song',
    method: 'get',
    params: {
      type,
    },
  })
}

/**
 * 歌手分类列表
 * @param {number} type 全部：-1 男歌手：1 女歌手：2 乐队：3
 * @param {number} area 全部：-1 华语：7 欧美：96 日本：8 韩国：16 其他：0
 * @returns
 */
export function getSingerList(type: number, area: number) {
  return request({
    url: '/artist/list',
    method: 'get',
    params: {
      type,
      area,
    },
  })
}

/**
 * 获取歌手热门50首歌曲
 * @param {string} id 歌手id
 * @returns 
 */
export function getSingerTop50(id: string) {
  return request({
    url: '/artist/top/song',
    method: 'get',
    params: {
      id
    },
  })
}

/**
 * 歌手全部歌曲
 * @param {string} id 歌手id
 * @returns 
 */
export function getSingerAll(id: string) {
  return request({
    url: '/artist/songs',
    method: 'get',
    params: {
      id
    },
  })
}