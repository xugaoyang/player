<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getHqList, getNewList, getSingerList } from '@/api/list'
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
</script>

<template>
  <div style="padding: 0 50px;">
    <div>
      <h4 class="text-lg mb-4 mt-4">{{ newList.name }}</h4>
      <a-list
        :data-source="newList.list"
        :grid="{ gutter: 20, xs: 2, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4, xxxl: 6 }"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.artists[0].name">
              <template #title>
                <a @click.prevent>{{ item.name }}</a>
              </template>
              <template #avatar>
                <a-avatar :src="item.album.picUrl" />
              </template>
            </a-list-item-meta> </a-list-item></template
      ></a-list>
    </div>
    <div>
      <h4 class="text-lg mb-4 mt-4">{{ hqList.name }}</h4>
      <a-list
        :data-source="hqList.list"
        :grid="{ gutter: 20, xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 8, xxxl: 12 }"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card :bordered="false" :body-style="{ width: '100px', padding: 0 }">
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
        :grid="{ gutter: 20, xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 8, xxxl: 12 }"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card :bordered="false" :body-style="{ width: '100px', padding: 0 }">
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
}
.cover-img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
