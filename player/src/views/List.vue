<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getHqList, getNewList, getSingerList, getBanner } from '@/api/list'
import { PlayCircleOutlined } from '@ant-design/icons-vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import 'swiper/css/effect-coverflow'

import { EffectCoverflow, Autoplay } from 'swiper'

interface Banner {
  imageUrl: string
  targetId: string
  typeTitle: string
}

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
    hqList.list = hqListRes.playlists
  }
  const newListRes = await getNewList(0)
  if (newListRes.code === 200) {
    newList.list = newListRes.data
  }
  const singerListRes = await getSingerList(-1, -1)
  if (singerListRes.code === 200) {
    singerList.list = singerListRes.artists
  }
})

const onSwiper = () => {}

const onSlideChange = () => {}
/**
 * 播放热门歌曲
 */
const songPlay = (id: string) => {
  console.log(id)
}

/**
 * 打开精选歌单
 */
const openAlbum = () => {}

/**
 * 打开歌手热门歌曲50
 */
const openSingerSong = () => {}
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
      <h4 class="text-lg mb-4 mt-4">{{ newList.name }}</h4>
      <a-list
        :data-source="newList.list"
        :grid="{ gutter: 20, xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 3, xxxl: 4 }"
      >
        <template #renderItem="{ item }">
          <a-list-item @click="songPlay">
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
      <h4 class="text-lg mb-4 mt-4">{{ hqList.name }}</h4>
      <a-list
        :data-source="hqList.list"
        :grid="{ gutter: 20, xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 6, xxxl: 8 }"
      >
        <template #renderItem="{ item }">
          <a-list-item @click="openAlbum">
            <a-card :bordered="false" :body-style="{ width: '150px', padding: 0, margin: '0 auto' }">
              <template #cover>
                <img class="cover-img" :src="item.coverImgUrl" alt="" />
              </template>
              <a-card-meta :title="item.name"></a-card-meta>
            </a-card> </a-list-item></template
      ></a-list>
    </div>
    <div>
      <h4 class="text-lg mb-4 mt-4">{{ singerList.name }}</h4>
      <a-list
        :data-source="singerList.list"
        :grid="{ gutter: 20, xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 6, xxxl: 8 }"
      >
        <template #renderItem="{ item }">
          <a-list-item @click="openSingerSong">
            <a-card :bordered="false" :body-style="{ width: '150px', padding: 0, margin: '0 auto' }">
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
    width: 50px;
    height: 50px;
  }
  .ant-list-item-meta-content {
    width: 60%;
  }
  .ant-list-item-meta-avatar {
    position: relative;
  }
  .icon-play {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
}
.cover-img {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 5px;
}

:deep(.ant-card-meta-title){
  text-align: center;
}
:deep(.swiper) {
  // height: 300px;
  margin: 20px 0;
  border-radius: 10px;
  img {
    border-radius: 10px;
  }
}
</style>
