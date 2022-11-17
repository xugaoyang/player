<script setup lang="ts">
import { ref, reactive, onMounted, toRaw} from 'vue'
import { getHqList,getHqDetail, getHqSongs, getNewList, getSingerList, getBanner } from '@/api/list'
import { getSongUrl } from '@/api/info'
import { PlayCircleOutlined, SwapRightOutlined } from '@ant-design/icons-vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow, Autoplay } from 'swiper'
import { usePlayerStore } from '@/store/player'

interface Banner {
  imageUrl: string
  targetId: string
  typeTitle: string
}

const playerStore = usePlayerStore()
const banners = ref<Banner[] | null>(null)
const hqList = reactive({
  name: '精品歌单',
  list: [],
})
const newList = reactive({
  name: '新歌速递',
  list: [],
})
const singerList = reactive({
  name: '歌手分类',
  list: [],
})

onMounted(async () => {
  const bannerRes = await getBanner(0)
  if (bannerRes.code === 200) {
    banners.value = bannerRes.banners
  }
  const hqListRes = await getHqList()
  if (hqListRes.code === 200) {
    hqList.list = hqListRes.playlists.slice(0, 12)
  }
  const newListRes = await getNewList(0)
  if (newListRes.code === 200) {
    newList.list = newListRes.data.slice(0, 12)
  }
  const singerListRes = await getSingerList(-1, -1)
  if (singerListRes.code === 200) {
    singerList.list = singerListRes.artists.slice(0, 12)
  }
})

const onSwiper = () => {}

const onSlideChange = () => {}
/**
 * 播放热门歌曲
 */
const songPlay = async (song: any) => {
  const data = toRaw(song)
  console.log(data)
  const res = await getSongUrlById(data.id)
  playerStore.player.playAudioSource(res)
  // TODO:添加进当前播放列表

  playerStore.player.addToList(data)
}

/**
 * 打开精选歌单
 */
const openAlbum = async (id) => {
  const detailRes = await getHqDetail(id)
  console.log(detailRes)
  if (detailRes.code === 200) {
    // TODO:去歌单详情页
  }
  const listRes = await getHqSongs(id)
  console.log(listRes)
  if (listRes.code === 200) {
    playerStore.player.list = listRes.songs
  }
}

/**
 * 打开歌手热门歌曲50
 */
const openSingerSong = () => {}

/**
 * @description 去对应类型的列表界面
 * @param type new hq singer
 */
const getMore = (type: string) => {}

const getSongUrlById = async (id: string) => {
  const res = await getSongUrl(id)
  if (res.code === 200) {
    return res.data[0].url
  }
  return ''
}
</script>

<template>
  <div style="padding: 0 50px">
    <swiper
      :grabCursor="true"
      :effect="'coverflow'"
      :slides-per-view="3"
      :loop="true"
      :autoplay="true"
      :coverflow-effect="{ rotate: 50, depth: 100, slideShadows: false }"
      :modules="[EffectCoverflow, Autoplay]"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="banner in banners" :key="banner.targetId"
        ><img :src="banner.imageUrl" :alt="banner.typeTitle"
      /></swiper-slide>
    </swiper>
    <div>
      <h4 class="text-lg mb-4 mt-4 font-bold">
        {{ newList.name
        }}<span class="float-right flex items-center font-normal" click="getMore('new')">more<swap-right-outlined /></span>
      </h4>
      <a-list
        :data-source="newList.list"
        :grid="{ gutter: 20, xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 3, xxxl: 3 }"
      >
        <template #renderItem="{ item }">
          <a-list-item @click="songPlay(item)">
            <a-list-item-meta :description="item.artists[0].name">
              <template #title>
                <a @click.prevent>{{ item.name }}</a>
              </template>
              <template #avatar>
                <a-avatar :src="item.album.picUrl" />
                <PlayCircleOutlined class="icon-play" />
              </template>
            </a-list-item-meta> </a-list-item></template
      ></a-list>
    </div>
    <div>
      <h4 class="text-lg mb-4 mt-4 font-bold">
        {{ hqList.name
        }}<span class="float-right flex items-center font-normal " click="getMore('hq')">more<swap-right-outlined /></span>
      </h4>
      <a-list
        :data-source="hqList.list"
        :grid="{ gutter: 200, xs: 2, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4, xxxl: 4 }"
      >
        <template #renderItem="{ item }">
          <a-list-item @click="openAlbum(item.id)">
            <a-card :bordered="false" :body-style="{ width: '100%', padding: 0 }">
              <template #cover>
                <img class="cover-img" :src="item.coverImgUrl" alt="" />
              </template>
              <a-card-meta :title="item.name"></a-card-meta>
            </a-card> </a-list-item></template
      ></a-list>
    </div>
    <div>
      <h4 class="text-lg mb-4 mt-4 font-bold">
        {{ singerList.name
        }}<span class="float-right flex items-center font-normal" click="getMore('singer')">more<swap-right-outlined /></span>
      </h4>
      <a-list
        :data-source="singerList.list"
        :grid="{ gutter: 200, xs: 2, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4, xxxl: 4 }"
      >
        <template #renderItem="{ item }">
          <a-list-item @click="openSingerSong">
            <a-card :bordered="false" :body-style="{ width: '100%', padding: 0 }">
              <template #cover>
                <img class="cover-img" :src="item.picUrl" alt="" />
              </template>
              <a-card-meta :title="item.name"></a-card-meta>
            </a-card> </a-list-item></template
      ></a-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-list-item-meta) {
  align-items: center;
  flex: none;
  width: 100%;

  .ant-avatar {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }

  .ant-list-item-meta-content {
    width: 60%;
  }

  .ant-list-item-meta-avatar {
    position: relative;
  }

  .icon-play {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 20px;
    color: rgb(255 255 255 / 80%);
    transform: translate(-50%, -50%);
  }
}

.cover-img { 
  margin-bottom: 10px;
  width: 100%;
  min-height: auto;
  border-radius: 10px;
}

:deep(.ant-card-meta-title) {
  text-align: left;
}

:deep(.swiper) {
  margin: 20px 0;
  border-radius: 10px;

  img {
    border-radius: 10px;
  }
}
</style>
