<!--
 * @Autor: junhui li
 * @Date: 2020-12-07 15:26:51
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 15:16:37
 * @Description: 投诉及建议列表
-->
<template>
  <div>
    <busi-descriptions
      v-if="!this._.isEmpty(orginData.rowsList)"
      :listData="listData"
      :tableFid="[]"
      :titleFid="titleFid"
    >
      <a-row slot="descTitle" slot-scope="currentList">
        <!-- {{ currentList.currentList }} -->
        <template v-for="(colValue, colIndex) in currentList.currentList">
          <a-col
            :key="colIndex"
            :span="8"
            v-if="colValue['key'] === 'JYBT' || colValue['key'] === 'JYRQ'"
          >{{ colValue['label'] }}: {{ colValue['value'] }}</a-col
          >
          <a-col
            :key="colIndex"
            :span="8"
            v-if="colValue['key'] === 'DQZT'"
          >{{ colValue['label'] }}: {{ colValue['value'] }}
            <template v-if="colValue['value'] === '未提交'">
              <a-button
                class="titleButton"
                size="small"
                type="primary"
                @click="handleEditAgain(currentList)"
              >重新编辑</a-button
              >
            </template>
            <template v-if="colValue['value'] != '未提交'">
              <a-button
                class="titleButton"
                size="small"
                type="primary"
                @click="handleQueryMore(currentList)"
              >查看详情</a-button
              >
            </template>
          </a-col>
        </template>
      </a-row>
    </busi-descriptions>
    <a-empty v-if="this._.isEmpty(orginData.rowsList) && !onSpinning" />
  </div>
</template>

<script>
import BusiDescriptions from '@/views/common/BusiDescriptions'
import { tableUtils } from '@/utils/index'
export default {
  name: 'MainList',
  components: { BusiDescriptions },
  data () {
    return {
      orginData: {},
      listData: [],
      afterColumns: [], // 处理后的col
      titleFid: ['JYBT', 'JYRQ', 'DQZT', 'RID']
    }
  },
  props: {
    onSpinning: {
      type: Boolean,
      default: false
    },
    radioValue: {
      type: Number,
      default: 1
    },
    searchValue: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    '$store.state.suggestAndComplaintModel.queryComplaint': function () {
      this.QueryComplaint()
    },
    '$store.state.suggestAndComplaintModel.querySuggestions': function () {
      this.QuerySuggestions()
    }
  },
  mounted () {
    this.QueryComplaint()
  },
  methods: {
    // 投诉查询
    QueryComplaint () {
      this.orginData = {}
      this.$emit('update:onSpinning', true)
      this.$WebApi.suggest['QueryComplaint']({
        type: this.radioValue,
        keyword: Window._.trim(this.searchValue),
        userid: this.user.userID
      })
        .then((data) => {
          this.orginData = data
          this.listData = tableUtils.table2Desc(data, 1.5, false)
          this.afterColumns = tableUtils.deleteHideColumns(data)
          this.$emit('update:onSpinning', false)
        })
        .catch((err) => {
          this.$emit('update:onSpinning', false)
          console.log(err)
        })
    },
    // 建议查询
    QuerySuggestions () {
      this.orginData = {}
      this.$emit('update:onSpinning', true)
      this.$WebApi.suggest['QuerySuggestions']({
        type: this.radioValue,
        keyword: Window._.trim(this.searchValue),
        userid: this.user.userID
      })
        .then((data) => {
          this.orginData = data
          this.listData = tableUtils.table2Desc(data, 1.5, false)
          this.afterColumns = tableUtils.deleteHideColumns(data)
          this.$emit('update:onSpinning', false)
        })
        .catch((err) => {
          this.$emit('update:onSpinning', false)
          console.log(err)
        })
    },
    handleEditAgain (currentList) {
      this.$emit('editAgain', currentList.currentList)
    },
    handleQueryMore (currentList) {
      this.$emit('queryMore', currentList.currentList)
    }
  }
}
</script>

<style>
</style>
