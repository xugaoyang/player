<script setup lang="ts">
import { ref, reactive, onMounted, toRaw } from 'vue'
import {
  getUserDetail,
  getUserAccount,
  getUserSubcount,
  getUserLevel,
  getUserBinding,
  getUserPlaylist
} from '@/api/user'
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { useMainStore } from '@/store'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3583965_sufozqssd4o.js'
})
const mainStore = useMainStore()

const data = reactive({
  userDetail: {
    profile: {
      avatarUrl: ''
    }
  },
  playlist: []
})
const userPlaylist = async () => {
  const res = await getUserPlaylist(mainStore.account.id)
  console.log(res)
  if (res.code === 200) {
    data.playlist = res.playlist
  }
}
onMounted(async () => {
  const userDetailRes = await getUserDetail(mainStore.account.id)
  console.log(userDetailRes)
  if (userDetailRes) {
    data.userDetail = Object.assign({}, userDetailRes)
  }
  console.log(toRaw(data.userDetail))
  userPlaylist()
})
</script>

<template>
  <div class="p-50px flex">
    <div class="mr-20px">
      <a-image
        class="rounded-1/2"
        :width="200"
        :src="data.userDetail.profile.avatarUrl"
      ></a-image>
    </div>

    <div class="text-18px">
      <p class="text-24px font-bold">{{ data.userDetail.profile.nickname }}</p>
      <p class="flex items-center">
        <span class="text-blue-400 pr-10px">lv{{ data.userDetail.level }}</span>
        <icon-font
          v-if="data.userDetail.profile.gender"
          type="icon-nan"
          class="text-24px"
          :style="iconFontSize"
        />
        <icon-font v-else type="icon-nv" class="pr-5px" :style="iconFontSize" />
      </p>
      <div class="flex justify-between divide-x-1px mb-20px">
        <div class="pr-10px">
          <p>动态</p>
          <p class="text-center font-bold">
            {{ data.userDetail.profile.eventCount }}
          </p>
        </div>
        <div class="px-10px">
          <p>关注</p>
          <p class="text-center font-bold">
            {{ data.userDetail.profile.follows }}
          </p>
        </div>
        <div class="px-10px">
          <p>粉丝</p>
          <p class="text-center font-bold">
            {{ data.userDetail.profile.followeds }}
          </p>
        </div>
      </div>
      <p>个人介绍：{{ data.userDetail.profile.signature }}</p>
    </div>
  </div>
  <!-- 个人歌单 -->
  <div class="p-50px">
    <h3 class="text-lg mb-4 mt-4 font-bold">个人歌单</h3>
    <a-list
      :data-source="data.playlist"
      :grid="{
        gutter: 50,
        xs: 2,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 5,
        xxl: 6,
        xxxl: 6
      }"
    >
      <template #renderItem="{ item }">
        <a-list-item class="cursor-pointer">
          <a-card :bordered="false" :body-style="{ width: '100%', padding: 0 }">
            <template #cover>
              <img class="cover-img" :src="item.coverImgUrl" alt="" />
            </template>
            <a-card-meta :title="item.name"></a-card-meta>
          </a-card> </a-list-item></template
    ></a-list>
  </div>
  <div></div>
</template>

<style lang="scss" scoped>
:deep(.ant-card-cover) {
  position: relative;
  padding-top: 100%;
  width: 100%;
  height: 0;
}

.cover-img {
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  width:100%;
  height:100%;
  border-radius: 5px;
}
</style>
