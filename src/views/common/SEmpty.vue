<!--
 * @Description: 自定义空状态
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-05 14:13:28
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-07-20 15:36:33
-->

<template>
  <a-empty
    :image="imgPath"
    :image-style="{
      height: height
    }"
  >
    <span slot="description"> </span>
  </a-empty>
</template>

<script>
export default {
  name: 'SEmpty',
  components: {},
  props: {
    height: {
      default: '100%',
      type: String
    }
  },
  data () {
    return {
      imgPath: require('@/assets/images/empty.png')
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
