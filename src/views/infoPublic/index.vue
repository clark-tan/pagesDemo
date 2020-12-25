<!--
 * @Description: 信息公开
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-05 17:51:03
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-10 17:10:33
-->

<template>
  <div style="flex: 1">
    <!-- <a-skeleton active :loading="loading" :paragraph="{ rows: 4 }"> -->
    <div id="inforPub" ref="inforPubref">
      <a-anchor :affix="false" class="anchor" @click="handleClick" :getContainer="() => $el.parentElement">
        <template v-for="(item, index) in anchors">
          <a-anchor-link :key="index" :href="'#' + item.RID" :title="item.TITLE" />
        </template>
      </a-anchor>
      <!-- cardmap -->
      <card-map :propData="data"/>
    </div>
  </div>
</template>

<script>
import cardMap from './components/cardMap'
localStorage.removeItem('_Amp_raster')
export default {
  name: 'InfoPublic',
  components: {
    cardMap
  },
  props: {},
  data () {
    return {
      data: [],
      loading: false,
      anchors: []
    }
  },
  mounted () {
    // this.showMap()
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
