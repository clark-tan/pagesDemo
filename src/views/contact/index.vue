<!--
 * @Description: 联系我们
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-07-06 10:26:04
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 13:57:28
-->

<template>
  <div class="pubInfo">
    <a-row style="background: #fff">
      <!-- to do -->
      <card/>
    </a-row>
    <map-modal/>
  </div>
</template>

<script>
import Card from './component/card'
import MapModal from './component/mapModal'

export default {
  name: 'Contact',
  components: {
    Card,
    MapModal
  },
  props: {},
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.pubInfo {
  flex: 1;
  height: 100%;
  background: @diy-global-bg-color;
  padding: 0 30px 30px 0;
}
</style>
