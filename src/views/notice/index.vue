<!--
 * @Description: 通知公告
 * @Version: 2.0
 * @Autor: Ethan Jiang
 * @Date: 2020-04-01 15:59:36
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-22 16:18:02
 -->
<template>
  <a-row class="noticeLayout">
    <a-spin tip="正在加载..." :spinning="spinning">
      <notice-list
        :spinning.sync="spinning"
        :page="page"
        @showMore="showMore"
        v-if="showList"
      />
      <notice-detail v-else :moreData="moreData" @backList="backList" />
    </a-spin>
    <a-back-top />
  </a-row>
</template>

<script>
import NoticeList from './components/NoticeList'
import NoticeDetail from './components/NoticeDetail'
export default {
  name: 'Notice',
  components: {
    NoticeList,
    NoticeDetail
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
.noticeLayout {
  flex: 1;
  background: #fff;
  padding: 20px 40px;

  /deep/ a {
    color: #5a5a5a;
  }

  .ant-spin-nested-loading {
    height: 100%;

    /deep/ .ant-spin-container {
      height: 100%;
    }
  }
}

</style>
