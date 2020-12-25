<!--
 * @Description: 在线看报告
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-03-27 10:01:31
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-09 10:37:01
 -->

<template>
  <a-layout class="reportOnlineLayout">
    <a-spin v-if="!this._.isEmpty(orginData)" tip="正在加载..." :spinning="onSpinning">
      <busi-descriptions :listData="listData" tableFid="WTSX">
        <a-row slot="descTitle" slot-scope="currentList">
          <template v-for="(colValue, colIndex) in currentList.currentList">
            <a-col
              :key="colIndex"
              :span="8"
              v-if="colValue['key'] === 'SQRQ' || colValue['key'] === 'YWBH'"
            >{{ colValue['label'] }}: {{ colValue['value'] }}</a-col
            >
            <a-col :key="colIndex" :span="8" v-if="colValue['key'] === 'DQZT'">
              {{ colValue['label'] }}:
              <template>
                <a-tag v-if="colValue['value'] == '未提交'" class="unSubmit">{{ colValue['value'] }}</a-tag>
                <a-tag v-else-if="colValue['value'] == '测量完成'" class="survey-done">{{ colValue['value'] }}</a-tag>
                <a-tag v-else-if="colValue['value'] == '预约未成功'" class="reserve-fail">{{
                  colValue['value']
                }}</a-tag>
                <a-tag v-else class="other">{{ colValue['value'] }}</a-tag>
              </template>
            </a-col>
          </template>
        </a-row>
        <template slot="table">
          <report-table :tableData="tableData.tableData"></report-table>
        </template>
      </busi-descriptions>
    </a-spin>
    <a-spin v-else tip="正在加载..." :spinning="onSpinning">
      <a-empty />
    </a-spin>
    <a-back-top />
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { tableUtils } from '@/utils/index'

import ReportTable from './component/ReportTable'
import BusiDescriptions from '@/views/common/BusiDescriptions'

export default {
  name: 'BusiOnProcess',
  components: { 'report-table': ReportTable, 'busi-descriptions': BusiDescriptions },
  props: {},
  data () {
    return {
      listData: [],
      tableData: {},
      onSpinning: false,
      orginData: {},
      afterColumns: [] // 处理后的col
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  mounted () {
    this.QueryEntrust()
  },
  methods: {
    QueryEntrust () {
      this.orginData = {}
      this.onSpinning = true
      this.$WebApi.reportOnline['QueryEntrust']({
        type: 4,
        userid: this.user.userID
      })
        .then(res => {
          this.orginData = res
          this.listData = tableUtils.table2Desc(res)
          this.afterColumns = tableUtils.deleteHideColumns(res)
          this.onSpinning = false
        })
        .catch(err => {
          console.log(err)
          this.onSpinning = false
        })
    }
  }
}
</script>

<style scoped lang="less">
.unSubmit {
  background-color: @diy-unSubmit-color;
  color: white;
}
.survey-done {
  background-color: @diy-survey-done-color;
  color: white;
}
.reserve-fail {
  background-color: @diy-reserve-fail-color;
  color: white;
}
.other {
  background-color: @diy-other-color;
  color: white;
}
</style>
