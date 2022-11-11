<script setup lang="ts">
const changeDark = () => {
  const htmlDom = document.querySelector('html')
  const htmlClassList = htmlDom.getAttribute('class')
  if (htmlClassList.indexOf('dark') === -1) {
    htmlDom.setAttribute('class', `${htmlClassList} dark`)
  } else {
    htmlDom.setAttribute('class', htmlClassList.replace(' dark', ''))
  }
}

</script>

<template>
  <button
    bg="blue-400 hover:blue-500 dark:yellow-500 dark:hover:yellow-600"
    text="sm white"
    font="mono light"
    p="y-2 x-4"
    border="2 rounded blue-200"
  >
    Button
  </button>
  <div class="py-20px"></div>
  <button class="btn btn-green" @click="changeDark">切换深色模式</button>
</template>

<style></style>
