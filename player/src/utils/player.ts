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
  currentSong: { id: number; };
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
    this.list = []; // 播放列表
    this.currentIndex = 0; // 当前播放歌曲在播放列表里的index
    this.currentTime = 0; // 当前歌曲进度，秒
    this.currentPos = 0; // 当前歌曲进度，百分比
    this.currentSong = { id: 86827685 }; // 当前播放歌曲的详细信息
    this.listSource = { type: 'album', id: 123 }; // 当前播放列表的信息
    this.nextList = []; // 当这个list不为空时，会优先播放这个list的歌
    // howler
    this._howler = null
  }

  init() {
    Howler.volume(this.volume)
  }
  playAudioSource(source: string, autoplay=true) {
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
        setInterval(() => {
          // 当前进度时间
          this.currentTime = this._howler.seek()
          // 当前进度位置，进度条所占百分比
          this.currentPos = (this._howler.seek()/this._howler.duration()) * 100
        }, 1000)
      },
      onpause: () => {},
      onstop: () => {},
      onend: () => {
        console.log('finished')
      }
    })
    if (autoplay) {
      this.play()
    }
  }
  play() {
    if(this._howler.playing()) return
    this._howler.play()
    this._howler.once('play', () => {
      this.isPlaying = true
    })
  }
}
