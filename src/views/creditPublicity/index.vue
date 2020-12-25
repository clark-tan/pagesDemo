<!--
 * @Description: 信用公示
 * @Version: 2.0
 * @Autor: Ethan Jiang
 * @Date: 2020-04-01 15:59:36
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-07 17:25:34
 -->
<template>
  <div style="flex: 1;">
    <a-row class="creditPublicityLayout">
      <a-skeleton active :loading="spinning"/>
      <div class="list2pagi">
        <credit-publicity-list
          :spinning.sync="spinning"
          :page="page"
          @showMore="showMore"
          v-if="showList"
        />
        <credit-publicity-detail v-else :moreData="moreData" @backList="backList" />
      </div>
      <a-back-top />
    </a-row>
  </div>

</template>

<script>
import CreditPublicityList from './components/CreditPublicityList'
import CreditPublicityDetail from './components/CreditPublicityDetail'
export default {
  name: 'CreditPublicity',
  components: {
    CreditPublicityList,
    CreditPublicityDetail
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
.list2pagi {
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
}
/deep/ .ant-pagination-options-size-changer.ant-select {
  margin-right: 0;
}
.creditPublicityLayout {
  height: 100%;
  background: #fff;
    padding: 20px 40px;
}
/deep/ .ant-tabs-nav .ant-tabs-tab {
  padding: 0 16px 16px;
}
/deep/ .ant-list-item-meta-description {
  color: #5a5a5a;
  font-size: 14px;
  line-height: 22px;
}
/deep/ a {
  color: #5a5a5a;
}
.ant-spin-nested-loading {
  height: 100%;
  /deep/ .ant-spin-container {
    height: 100%;
  }
}
</style>
