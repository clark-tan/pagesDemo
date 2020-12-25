<!--
 * @Description: hack路由刷新
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-04 13:34:35
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-06-22 14:34:03
-->

<template>
  <div></div>
</template>

<script>
export default {
  name: 'FixRouter',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
    const route = this.$route.query
    this.$router.push({
      path: route.path
    })
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
