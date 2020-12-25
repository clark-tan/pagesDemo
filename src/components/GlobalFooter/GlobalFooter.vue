<!--
 * @Description:
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-08-07 10:25:52
 * @LastEditors: clark tan
 * @LastEditTime: 2020-11-11 15:20:54
-->
<template>
  <div class="footer">
    <div v-html="pageInfo.edition || ''"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GlobalFooter',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      pageInfo: 'pageInfo'
    })
  },
  mounted () {
    console.log(this.pageInfo)
  }
}
</script>

<style lang="less" scoped>
.footer {
  background: @diy-global-footer-bg-color;
  font-size:14px;
  color: @diy-global-footer-color;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
