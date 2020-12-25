<template>
  <svg class="customIcon" aria-hidden="true">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>

<script>
export default {
  name: 'CustomIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.customIcon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 2px;
}
</style>
