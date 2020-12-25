<!--
 * @Autor: junhui li
 * @Date: 2020-11-25 13:41:03
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 17:23:13
 * @Description:
-->
<template>
  <a-modal
    v-model="modalData.visible"
    :title="modalData.title"
    :footer="null"
    @ok="handleModalOk"
    :afterClose="modelCloseCommitVuex"
    width="800px"
  >
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
  </a-modal>
</template>

<script>
import VueAMap from 'vue-amap'
import Vue from 'vue'
import axios from 'axios'
Vue.use(VueAMap)
export default {
  name: 'MapModal',
  data () {
    const self = this
    return {
      modalData: {
        visible: false,
        title: '这只是一个标题'
      },
      mapData: {
        center: [111.619794, 26.43678],
        zoom: 11,
        marker: {
          center: [111.619794, 26.43678],
          radius: 20,
          fillColor: 'rgba(220,20,60,1)',
          fillOpacity: 2,
          events: {
            click: () => {
              self.mapData.window.visible = !self.mapData.window.visible
            }
          }
        },
        window: {
          position: [111.619794, 26.43678],
          visible: true,
          content: '我只是一个窗口'
        }
      }
    }
  },
  watch: {
    '$store.state.contact.mapModelState': function (val) {
      if (val) {
        this.go2Address(this.$store.state.contact.contactItem)
      }
    }
  },
  methods: {
    go2Address (item) {
      this.$set(this.modalData, 'title', item.name)
      this.$set(this.mapData.window, 'content', item.name)
      if (!item.longitude || !item.latitude) {
        const location = this.getLocation(item.address)
        const longitude = location[0]
        const latitude = location[1]
        this.$set(this.mapData, 'center', [Number(longitude), Number(latitude)])
        this.$set(this.mapData.marker, 'center', [Number(longitude), Number(latitude)])
        this.$set(this.mapData.window, 'position', [Number(longitude), Number(latitude)])
      } else {
        this.$set(this.mapData, 'center', [Number(item.longitude), Number(item.latitude)])
        this.$set(this.mapData.marker, 'center', [Number(item.longitude), Number(item.latitude)])
        this.$set(this.mapData.window, 'position', [Number(item.longitude), Number(item.latitude)])
      }
      this.showMap()
      this.modalData.visible = true
    },
    handleModalOk () {
      this.modalData.visible = false
    },
    modelCloseCommitVuex () {
      this.$store.commit('CHANGE_MAP_MODEL_STATE', false)
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
    async getLocation (address) {
      console.log('请求经纬度')
      try {
        const location = await axios({
          method: 'get',
          url: 'https://restapi.amap.com/v3/geocode/geo',
          params: {
            key: '38bc8138adb1cb845be46f3873d73db8',
            address: address
          }
        })
        const addressLocation = location.data.geocodes[0].location.split(',')
        return addressLocation
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.amap-demo {
  height: 500px;
  padding: 0px;
}
/deep/ .ant-modal-header {
  padding: 10px 24px;
  color: rgba(0, 0, 0, 0.65);
  background: @diy-modal-header-bg-color;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
  .ant-modal-title {
    margin: 0;
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    word-wrap: break-word;
  }
}
/deep/ .ant-modal-close-x {
  display: block;
  width: 36px;
  height: 45px;
  font-size: 16px;
  font-style: normal;
  line-height: 45px;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
  color: white;
}
</style>
