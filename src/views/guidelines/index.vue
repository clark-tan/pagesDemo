<!--
 * @Description: 通知公告
 * @Version: 2.0
 * @Autor: Ethan Jiang
 * @Date: 2020-04-01 15:59:36
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-22 15:51:55
 -->
<template>
  <a-row class="guideLayout">
    <a-skeleton active :loading="spinning"/>
    <div class="list2pagi">
      <guide-list
        :spinning.sync="spinning"
        :page="page"
        @showMore="showMore"
        v-if="showList"
      />
      <guide-detail v-else :moreData="moreData" @backList="backList" />
    </div>
    <a-back-top />
  </a-row>
</template>

<script>
import GuideList from './components/GuideList'
import GuideDetail from './components/GuideDetail'
export default {
  name: 'Guide',
  components: {
    GuideList,
    GuideDetail
  },
  props: {},
  data () {
    return {
      spinning: false,
      showList: true,
      moreData: {},
      page: {}
    }
  },
  methods: {
    showMore (data) {
      this.showList = false
      this.moreData = data
    },
    backList (data) {
      this.showList = true
      this.moreData = {}
      this.page = data
    }
  }
}
</script>

<style scoped lang="less">
.guideLayout {
  flex: 1;
  background: #fff;
  padding: 20px 40px;

  /deep/ .list2pagi {
    display: flex;
    flex-direction: column;
    height: 100%;

    .tab-head {
      height: 37px;
    }

    .tab-content {
      flex: 1;
      overflow: auto;
    }

    .pagination {
      height: 32px;
      margin-top: 10px;
      text-align: right;
    }

    .ant-pagination-options-size-changer.ant-select {
      margin-right: 0;
    }

    .ant-tabs-nav .ant-tabs-tab {
      padding: 0 16px 16px;
    }

    .ant-list-item-meta-description {
      color: #5a5a5a;
      font-size: 14px;
      line-height: 22px;
    }

    a {
      color: #5a5a5a;
    }

    .ant-spin-nested-loading {
      height: 100%;

      .ant-spin-container {
        height: 100%;
      }
    }
  }
}
</style>
