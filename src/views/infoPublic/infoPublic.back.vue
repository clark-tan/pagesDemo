<!--
 * @Description: 信息公开
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-05 17:51:03
 * @LastEditors: clark tan
 * @LastEditTime: 2020-11-11 14:21:07
-->

<template>
  <div>
    <!-- <a-skeleton active :loading="loading" :paragraph="{ rows: 4 }"> -->
    <div id="inforPub" ref="inforPubref">
      <a-anchor :affix="false" class="anchor" @click="handleClick" :getContainer="() => $el.parentElement">
        <template v-for="(item, index) in anchors">
          <a-anchor-link :key="index" :href="'#' + item.RID" :title="item.TITLE" />
        </template>
      </a-anchor>
      <div id="myCard">
        <template v-for="(item, index) in data">
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
    </div>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
import Vue from 'vue'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
Vue.use(VueAMap)
localStorage.removeItem('_Amp_raster')
VueAMap.initAMapApiLoader({
  key: '38bc8138adb1cb845be46f3873d73db8',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})
export default {
  name: 'InfoPublic',
  components: { editor: Editor },
  props: {},
  data () {
    const self = this
    return {
      tinymce,
      data: [],
      loading: false,
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
      },
      anchors: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // this.showMap()
    console.log(this.$refs.inforPubref.parentElement)
    this.GetInfoList()
  },
  methods: {
    GetInfoList () {
      this.anchors = []
      this.loading = true
      this.$WebApi.publicInformation['GetInfoList']()
        .then(data => {
          this.data = data
          this.anchors = JSON.parse(JSON.stringify(data))
          this.anchors.push({
            RID: 'amap',
            TITLE: '联系地址'
          })
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.loading = false
        })
    },
    getContainer () {
      return document.getElementById('myCard')
    },
    showMap () {
      VueAMap.initAMapApiLoader({
        key: '38bc8138adb1cb845be46f3873d73db8',
        plugin: [
          'Autocomplete',
          'PlaceSearch',
          'Scale',
          'OverView',
          'ToolBar',
          'MapType',
          'PolyEditor',
          'AMap.CircleEditor'
        ],
        v: '1.4.4'
      })
    },
    handleClick (e, link) {
      e.preventDefault()
      console.log(link)
    }
  }
}
</script>

<style scoped lang="less">
#inforPub {
  overflow: auto;
  height: 100%;
}
.anchor {
  position: fixed;
  top: 80px;
  width: 150px;
  height: 200px;
  right: 0px;
}
/deep/ .ant-card-head {
  border-bottom: 0 solid #e8e8e8;
}
/deep/ .ant-card-head-title {
  border-left: 4px solid @diy-div-border-color;
}
/deep/ .ant-card {
  padding: 20px 0 0 0;
  > .ant-card-body {
    padding: 20px 20px 0 20px;
  }
}
.amap-demo {
  height: 500px;
  padding: 20px;
}
.amap-page-container {
  background: #fff;
  height: 100%;
}
</style>
