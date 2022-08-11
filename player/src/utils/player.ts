// 播放器类
import { Howl, Howler } from 'howler'
class Player {
  progress: number;
  playStatus: boolean;
  repeatMode: string;
  volume: number;
  mute: boolean;
  list: never[];
  current: number;
  playlistSource: { type: string; id: number; };
  currentTrack: { id: number; };
  playNextList: never[];
  howler: any;
  
  constructor() {
    this.playStatus = false // 是否正在播放中
    this.progress = 0 // 当前播放歌曲的进度
    this.repeatMode = 'off' // off | on | one
    this.volume = 1 // 0 to 1
    this.mute = false // 是否静音

    // 播放信息
    this.list = []; // 播放列表
    this.current = 0; // 当前播放歌曲在播放列表里的index
    this.playlistSource = { type: 'album', id: 123 }; // 当前播放列表的信息
    this.currentTrack = { id: 86827685 }; // 当前播放歌曲的详细信息
    this.playNextList = []; // 当这个list不为空时，会优先播放这个list的歌

    // howler
    this.howler = null
  }

  init() {
    Howler.volume(this.volume)
  }
  playAudioSource(source: string, autoplay=true) {
    Howler.unload()
    this.howler = new Howl({
      src: [source],
      html5: true,
      preload: true,
      format: ['mp3', 'webm'],
      onend: () => {
        console.log('finished')
      }
    })
    if (autoplay) {
      this.play()
    }
  }
  play() {
    if(this.howler.playing()) return
    this.howler.play()
    this.howler.once('play', () => {
      this.playStatus = true
    })
  }
}