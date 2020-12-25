<template>
  <component :is="homePath" />
</template>

<script>
import { mixin } from '@/utils/mixin'

export default {
  mixins: [mixin],
  data () {
    return {
      // key为布局模式的值，value为对应的组件
      homeComponent: {
        topmenu: () => import(`@/views/home/topMenuHome`),
        sidemenu: () => import(`@/views/home/sideMenuHome`)
      }
    }
  },
  computed: {
    homePath () {
      return this.homeComponent[this.layoutMode]
    }
  }
}
</script>
