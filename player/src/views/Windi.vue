<script setup lang="ts">
const changeDark = () => {
  const htmlDom = document.querySelector('html')
  const classList = htmlDom.getAttribute('class')
  console.log(classList)
  if (classList.indexOf('dark') === -1) {
    htmlDom.setAttribute('class', `${classList} dark`)
  } else {
    htmlDom.setAttribute('class', classList.replace(' dark', ''))
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
  <button class="btn btn-green" @click="changeDark">切换深色模式</button>
</template>

<style></style>
