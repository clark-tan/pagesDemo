<!--
 * @Description: 进度查询
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-03-27 10:01:31
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-18 10:22:57
 -->

<template>
  <a-layout class="businessProcessLayout">
    <!-- 顶部搜索栏 -->
    <a-layout-header>
      <a-tabs v-model="activeKey" @change="tabChange">
        <template slot="tabBarExtraContent">
          <a-input-search placeholder="请输入搜索关键词" style="width: 200px" @search="onSearch" />
        </template>
        <a-tab-pane :key="1" tab="预约进度查询"> </a-tab-pane>
        <a-tab-pane :key="2" tab="办件进度查询"> </a-tab-pane>
      </a-tabs>
      <div v-show="activeKey === 1">
        <a-radio-group v-model="radioValue" @change="radioChange">
          <a-radio :value="0">全部业务</a-radio>
          <a-radio :value="1">预约成功</a-radio>
          <a-radio :value="2">预约未成功</a-radio>
          <!-- <a-radio :value="3">暂存</a-radio> -->
        </a-radio-group>
      </div>
      <div v-show="activeKey === 2">
        <a-radio-group v-model="radioValue" @change="radioChange">
          <a-radio :value="0">全部业务</a-radio>
          <!-- <a-radio :value="1">待处理</a-radio>
          <a-radio :value="2">处理中</a-radio> -->
          <a-radio :value="3">已正式受理</a-radio>
          <a-radio :value="4">测量中</a-radio>
          <a-radio :value="5">测量完成</a-radio>
        </a-radio-group>
      </div>
    </a-layout-header>

    <a-layout-content>
      <a-skeleton
        active
        :paragraph="{ rows: skeletonRow }"
        :loading="onSpinning"
        tip="正在加载..."
        :spinning="onSpinning"
      >
        <template v-if="listData && listData.length > 0">
          <busi-descriptions :listData="listData" :tableFid="tableFid" :titleFid="titleFid">
            <template slot="descTitle" slot-scope="currentList">
              <template v-for="(item, index) in currentList.currentList">
                <a-col
                  :key="index"
                  :span="8"
                  v-if="item.key == 'GCMC' || item.key == 'YWBH'"
                >{{ item.label }}: {{ item.value || '-' }}
                </a-col>
                <a-col :key="index" :span="8" v-if="item.key == 'DQZT'">
                  {{ item.label }}:
                  <template>
                    <a-tag v-if="item.value === '未通过' || item.value === '预审不通过'" class="unSubmit">{{
                      item.value
                    }}</a-tag>
                    <a-tag v-else-if="item.value === '预审通过' || item.value === '已完成'" class="survey-done">{{
                      item.value
                    }}</a-tag>
                    <a-tag v-else-if="item.value == '预约未成功'" class="reserve-fail">{{ item.value }}</a-tag>
                    <a-tag v-else class="other">{{ item.value }}</a-tag>
                  </template>
                  <a-button
                    size="small"
                    type="primary"
                    ghost
                    class="optBtn"
                    v-if="item.value == '已提交预约'"
                    @click="handleFallBack(currentList.currentList)"
                  >收回
                  </a-button>
                  <a-button
                    size="small"
                    type="danger"
                    ghost
                    class="optBtn"
                    v-if="item.value === '暂存'"
                    @click="handleDeleteItem(currentList.currentList)"
                  >删除
                  </a-button>
                  <a-button
                    size="small"
                    type="default"
                    class="optBtn"
                    v-if="
                      item.value === '已打回' ||
                        item.value === '预约未成功' ||
                        item.value === '暂存' ||
                        item.value === '预审不通过'
                    "
                    @click="handelEditAgain(currentList.currentList)"
                  >编辑
                  </a-button>
                </a-col>
              </template>
            </template>
            <template slot="table" slot-scope="tableData">
              <!-- 组件栏 -->
              <busi-table :tableData="tableData.tableData"></busi-table>
            </template>
          </busi-descriptions>
        </template>
        <s-empty v-else /> </a-skeleton
      ></a-layout-content>

    <a-back-top />
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { tableUtils, routeUtils } from '@/utils/index'
import BusiTable from './component/BusiTable'
import BusiDescriptions from '@/views/common/BusiDescriptions'
import SEmpty from '@/views/common/SEmpty'

export default {
  name: 'BusiOnProcess',
  components: { 'busi-table': BusiTable, 'busi-descriptions': BusiDescriptions, 's-empty': SEmpty },
  props: {},
  data () {
    return {
      activeKey: 1,
      onSpinning: false,
      searchValue: '',
      radioValue: 0,
      searchType: 1,
      listData: [],
      skeletonRow: 4,
      tableFid: ['WTSX'],
      titleFid: ['GCMC', 'YWBH', 'DQZT']
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  created () {
    if (this.$route.params.hasRefresh) {
      this.hadleRefresh()
    }
  },
  mounted () {
    this.QueryEntrust()
  },
  provide () {
    return {
      busiProReload: this.QueryEntrust
    }
  },
  methods: {
    tabChange (activeKey) {
      this.searchType = activeKey
      this.radioValue = 0
      this.QueryEntrust()
    },
    // type 1代表预受理，2代表正式受理,3材料补充,4代表查看上传报告的数据（苏州）,5满意度评价
    QueryEntrust () {
      this.listData = []
      this.onSpinning = true
      this.$WebApi.busiProcess['QueryEntrust']({
        type: this.searchType,
        // userid: this.user.userID,
        flow: this.radioValue,
        keyword: this.searchValue
      })
        .then((res) => {
          const arr = tableUtils.table2Desc(res, 1.5, false)
          this.listData = arr
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          this.onSpinning = false
        })
    },
    CallBack (docunid) {
      this.onSpinning = true
      this.$WebApi.busiProcess['CallBack']({
        docunid: docunid
      })
        .then((res) => {
          console.log(res)
          this.QueryEntrust()
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          this.onSpinning = false
        })
    },
    handelEditAgain (items) {
      let CODE
      items.map((item, index) => {
        if (item['key'] === 'RID') {
          CODE = item['value']
        }
      })
      this.$router.push({
        name: 'PreBusiness',
        params: {
          docunid: CODE
        }
      })
    },
    handleDeleteItem (items) {
      const _this = this
      console.log(items)
      let CODE
      items.map((item, index) => {
        if (item['key'] === 'RID') {
          CODE = item['value']
        }
      })
      this.$confirm({
        title: '请您确认是否删除本业务?',
        content: '业务一经删除，不可恢复，请谨慎操作！',
        onOk () {
          _this.DeleteTemporarilyByCode(CODE)
        },
        onCancel () {}
      })
    },
    handleFallBack (items) {
      let docunid
      items.map((item, index) => {
        if (item['key'] === 'RID') {
          docunid = item['value']
        }
      })
      this.CallBack(docunid)
    },
    DeleteTemporarilyByCode (code) {
      this.$WebApi.busiProcess['DeleteTemporarilyByCode']({
        code: code,
        userid: this.user.userID
      })
        .then((res) => {
          this.$message.success('删除成功！')
          this.QueryEntrust()
        })
        .catch((err) => {
          this.$message.error('删除失败！')
          console.log(err)
        })
    },
    onSearch (searchValue) {
      console.log(searchValue)
      this.searchValue = searchValue
      this.QueryEntrust()
    },
    radioChange (e) {
      console.log(e.target.value)
      this.radioValue = e.target.value
      this.QueryEntrust()
    },
    hadleRefresh () {
      const _this = this
      routeUtils.reloadComponent(_this)
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

/deep/ .ant-tabs-bar {
  margin: 0;
}
/deep/ .ant-layout-header {
  height: 100px;
  padding: 0 20px;
  line-height: 48px;
  background: @diy-global-bg-color;
}
.businessProcessLayout {
  background-color: @diy-global-bg-color;
  height: 100%;

  .optBtn {
    margin-left: 10px;
    float: right;
  }

  .optBtn + .optBtn {
    margin-left: 5px;
  }
}
</style>
