<!--
 * @Description: 政策法规
 * @Version: 2.0
 * @Autor: clark tan
 * @Date: 2020-04-01 15:59:36
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-22 15:13:01
 -->
<template>
  <a-row class="policiesAndRegulationsLayout">
    <div class="list2pagi">
      <PoliciesAndRegulationsList :page="page" @showMore="showMore" v-if="showList" />
      <PoliciesAndRegulationsDetail v-else :moreData="moreData" @backList="backList" />
    </div>
    <a-back-top />
  </a-row>
</template>

<script>
import PoliciesAndRegulationsList from './components/PoliciesAndRegulationsList'
import PoliciesAndRegulationsDetail from './components/PoliciesAndRegulationsDetail'
export default {
  name: 'PoliciesAndRegulations',
  components: {
    PoliciesAndRegulationsList,
    PoliciesAndRegulationsDetail
  },
  props: {},
  data () {
    return {
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
.policiesAndRegulationsLayout {
  flex: 1;
  background: #fff;
  padding: 20px 40px;

  /deep/ .list2pagi {
    display: flex;
    flex-direction: column;
    height: 100%;

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
