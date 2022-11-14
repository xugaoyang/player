import { getSongUrl, getSongDetail } from '@/api/info'

// 播放器类
import { Howl, Howler } from 'howler'
export default class {
  progress: number;
  isPlaying: boolean;
  loopMode: string;
  volume: number;
  mute: boolean;
  list: never[];
  currentIndex: number;
  currentTime: number;
  currentPos: number;
  currentSong: any;
  listSource: { type: string; id: number; };
  nextList: never[];
  _howler: any;

  constructor() {
    this.isPlaying = false // 是否正在播放中
    this.progress = 0 // 当前播放歌曲的进度
    this.loopMode = 'off' // 单曲:single，关闭循环:off，列表:list
    this.volume = 1 // 0 to 1
    this.mute = false // 是否静音

    // 播放信息
    this.list = [] // 播放列表
    this.currentIndex = 0 // 当前播放歌曲在播放列表里的index
    this.currentTime = 0 // 当前歌曲进度，秒
    this.currentPos = 0 // 当前歌曲进度，百分比
    this.currentSong = {
      al: {
        picUrl: '/src/assets/avatar.png'
      },
      ar: [
        {
          name: ''
        }
      ],
      name: '',
      dt: 0,
      id: ''
    } // 当前播放歌曲的详细信息
    this.listSource = { type: 'album', id: 123 } // 当前播放列表的信息
    this.nextList = [] // 当这个list不为空时，会优先播放这个list的歌
    // howler
    this._howler = null
  }
  get GET_PLAYING() {
    return this.isPlaying
  }
  SET_PLAYING(val: boolean) {
    this.isPlaying = val
  }
  init() {
    Howler.volume(this.volume)
  }
  playAudioSource(source: string, autoplay = true) {
    Howler.unload()
    this._howler = new Howl({
      src: [source],
      html5: true,
      preload: true,
      format: ['mp3', 'webm'],
      onload: () => {
        console.log('load')
      },
      onplay: () => {
        console.log('play')
        this.SET_PLAYING(true)
        setInterval(() => {
          // 当前进度时间
          this.currentTime = this._howler.seek()
          // 当前进度位置，进度条所占百分比
          this.currentPos =
            (this._howler.seek() / this._howler.duration()) * 100
        }, 1000)
      },
      onpause: () => {
        this.SET_PLAYING(false)
      },
      onstop: () => {},
      onend: () => {
        console.log('finished')
        this.callbackAfterFinish()
      }
    })
    if (autoplay) {
      this.play()
    }
  }
  play() {
    if (this._howler.playing()) return
    this._howler.play()
  }

  pause() {
    this._howler?.pause()
    this.SET_PLAYING(false)
  }

  async addToList(data: any) {
    const hasIdx = this.list.findIndex((val) => val.id === data.id)
    console.log('是否有重复id数据', hasIdx)
    if (hasIdx < 0) {
      const currentIdx = this.list.findIndex(
        (val) => val!.id === this.currentSong!.id
      )
      this.currentIndex = currentIdx + 1
      this.list.splice(currentIdx + 1, 0, data)
    } else {
      this.currentIndex = hasIdx
    }
    const currentSongInfo = await getSongDetail(data.id)
    this.currentSong = currentSongInfo.songs[0]
  }

  // 上一首
  async toPrevSong() {
    const currentIndex =
      this.currentIndex - 1 < 0 ? this.list.length - 1 : this.currentIndex - 1
    this.currentIndex = currentIndex
    const currentSongInfo = await getSongDetail(this.list[this.currentIndex].id)
    this.currentSong = currentSongInfo.songs[0]
    const res = await getSongUrl(this.currentSong.id)
    if (res.code === 200) {
      this.playAudioSource(res.data[0].url)
    }
  }
  // 下一首
  async toNextSong() {
    const currentIndex =
      this.currentIndex + 1 === this.list.length ? 0 : this.currentIndex + 1
    this.currentIndex = currentIndex
    const currentSongInfo = await getSongDetail(this.list[this.currentIndex].id)
    this.currentSong = currentSongInfo.songs[0]
    const res = await getSongUrl(this.currentSong.id)
    if (res.code === 200) {
      this.playAudioSource(res.data[0].url)
    }
  }

  // 播放完成后的处理逻辑
  callbackAfterFinish() {
    console.log(this.loopMode, '1')
    // 列表循环，自动播放下一首
    if (this.loopMode === 'list') {
      // toNext()
    }
    // 单曲循环
    if (this.loopMode === 'single') {
      getSongUrl(this.currentSong.id).then((res) => {
        if (res.code === 200) {
          this.playAudioSource(res.data[0].url)
        }
      })
    }
    if (this.loopMode === 'off') {
      this.SET_PLAYING(false)
    }
  }
  // 切换循坏模式
  changeLoop() {
    const loopArr = ['single', 'list', 'off']
    const idx = loopArr.findIndex((item) => item === this.loopMode)
    this.loopMode = idx + 1 === loopArr.length ? loopArr[0] : loopArr[idx + 1]
  }
}
