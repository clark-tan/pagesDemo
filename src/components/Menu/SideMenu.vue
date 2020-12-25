<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <!-- <logo /> -->
    <div :class="[fixSiderbar ? 'ant-fixed-sidemenu' : null]">
      <s-menu
        :collapsed="collapsed"
        :menu="menus"
        :theme="theme"
        :mode="mode"
        @select="onSelect"
        style="padding: 16px 0px; width: 256px;"></s-menu>
    </div>
  </a-layout-sider>

</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
