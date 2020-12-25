<template>
  <div class="logo">
    <router-link :to="{path:'/'}">
      <!-- <LogoSvg alt="logo" /> -->
      <img :src="logoSrc" class="logoImg" alt="logo">
      <h1 class="logoTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'
import { mapGetters } from 'vuex'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      pageInfo: 'pageInfo'
    }),
    logoSrc () { return (this.pageInfo.logo || '').replace(/\\/g, '/') },
    title () { return (this.pageInfo.title || '') }
  }
}
</script>

<style lang="less" scoped>
.title{
  font-size: 12px !important;
}
.logoTitle {
  color: #fff;
  margin-bottom: 0;
  line-height: 1;
  padding-left: 10px;
  font-weight: 400 !important;
}
</style>
