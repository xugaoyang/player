import request from '@/utils/request'

/**
 * 获取歌曲url
 */
export function getSongUrl(id: string) {
  return request({
    url: '/song/url',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 获取歌词
 * @param {string} id
 * @returns
 */
export function getLyric(id: string) {
  return request({
    url: '/lyric',
    method: 'get',
    params: {
      id,
    },
  })
}

/**
 * 获取歌曲详情
 * @param id 
 * @returns 
 */
export function getSongDetail(id: string) {
  return request({
    url: '/song/detail',
    method: 'get',
    params: {
      id,
    },
  })
}