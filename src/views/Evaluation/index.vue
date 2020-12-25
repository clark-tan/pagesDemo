/* eslint-disable vue/no-template-shadow */
<!--
 * @Description: 满意度评价（中山）
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-03-27 10:01:31
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-09 13:43:20
 -->

<template>
  <a-layout class="satisfactionEvaluationLayout">
    <a-skeleton active :loading="onSpinning">
      <BusiDescriptions v-if="listData && listData.length > 0" :listData="listData">
        <a-row slot="descTitle" slot-scope="currentList">
          <template v-for="(colValue, colIndex) in currentList.currentList">
            <a-col
              :key="colIndex"
              :span="8"
              v-if="colValue['key'] === 'CREATETIME' || colValue['key'] === 'GCMC'"
            >{{ colValue['label'] }}: {{ colValue['value'] || '-' }}</a-col
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
          <SeTable
            :tableData="tableData.tableData.tableData"
            :allItem="tableData.tableData.items"
            :descData="tableData.tableData.descData"
          ></SeTable>
        </template>
      </BusiDescriptions>
      <s-empty v-else />
    </a-skeleton>
    <a-back-top />
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { tableUtils } from '@/utils/index'
import SeTable from './component/SeTable'
import BusiDescriptions from './component/BusiDescriptions'
import SEmpty from '@/views/common/SEmpty'

export default {
  name: 'Evaluation',
  components: { 's-empty': SEmpty, SeTable, BusiDescriptions },
  props: {},
  data () {
    return {
      listData: [],
      tableData: {},
      onSpinning: false,
      orginData: {}
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  mounted () {
    this.QueryEntrust()
  },
  provide: function () {
    return {
      reload: this.QueryEntrust
    }
  },
  methods: {
    QueryEntrust () {
      this.orginData = {}
      this.onSpinning = true
      this.$WebApi.satisfactionEvaluation['QueryEntrust']({
        type: 5,
        userid: this.user.userID
      })
        .then(res => {
          this.orginData = res
          this.listData = tableUtils.table2Desc(res, 1.5, false)
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
.satisfactionEvaluationLayout {
  height: 100%;
  background-color: #fff;
}
</style>
