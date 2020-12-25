<!--
 * @Autor: junhui li
 * @Date: 2020-11-30 11:11:13
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-10 17:15:09
 * @Description:
-->
<template>
  <div id="myCard">
    <template v-for="(item, index) in propsData">
      <a-card size="small" :key="index" :bordered="false" style="width: 100%" :id="item.RID">
        <template
          slot="title"
        ><span style="margin-left: 10px">{{ item.TITLE }}</span></template
        >
        <editor :inline="true" :initial-value="item.CONTENT" :disabled="true" :init="init" />
      </a-card>
    </template>
    <div class="amap-page-container" id="amap">
      <el-amap vid="amapDemo3" :center="mapData.center" :zoom="mapData.zoom" class="amap-demo">
        <el-amap-circle-marker
          :center="mapData.marker.center"
          :radius="mapData.marker.radius"
          :fill-color="mapData.marker.fillColor"
          :fill-opacity="mapData.marker.fillOpacity"
          :events="mapData.marker.events"
        ></el-amap-circle-marker>
        <el-amap-info-window
          :position="mapData.window.position"
          :visible="mapData.window.visible"
          :content="mapData.window.content"
        >
        </el-amap-info-window>
      </el-amap>
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import VueAMap from 'vue-amap'
import Vue from 'vue'
import Editor from '@tinymce/tinymce-vue'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '38bc8138adb1cb845be46f3873d73db8',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})
export default {
  name: 'CardMap',
  components: { editor: Editor },
  mounted () {
    console.log('test11')
    console.log(this.data)
  },
  data () {
    const self = this
    return {
      tinymce,
      init: {
        height: 400,
        branding: false,
        menubar: false
      },
      mapData: {
        center: [111.619794, 26.43678],
        zoom: 12,
        marker: {
          center: [111.619794, 26.43678],
          radius: 20,
          fillOpacity: 1,
          fillColor: 'rgba(220,20,60,1)',
          events: {
            click: () => {
              self.$nextTick(() => {
                self.mapData.window.visible = !self.mapData.window.visible
              })
            }
          }
        },
        window: {
          visible: true,
          position: [111.619794, 26.43678],
          content: '永州市冷水滩区湘永路267号'
        }
      }
    }
  },
  watch: {
    propsData: (val) => {
      console.log(val)
    }
  },
  props: {
    propsData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
#myCard {
  width: 100%;
  height: 100%;

  .amap-page-container {
    height: 100%;
    width: 100%;
  }
}
</style>
