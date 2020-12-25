<!--
 * @Description: 进度查询
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-03-27 10:01:31
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-10 13:53:32
 -->

<template>
  <a-layout class="businessProcessLayout">
    <!-- <a-tabs v-model="activeKey" @change="tabChange" style>
      <a-tab-pane tab="全部业务" :key="0"></a-tab-pane>
      <a-tab-pane tab="进行中" :key="1"></a-tab-pane>
      <a-tab-pane tab="已完成" :key="2"></a-tab-pane>
    </a-tabs> -->
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
              <a-col :key="index" :span="8" v-if="item.key == 'SQBH'">{{ item.label }}: {{ item.value || '-' }} </a-col>
              <a-col :key="index" :span="8" v-if="item.key == 'GCMC'">{{ item.label }}: {{ item.value || '-' }} </a-col>
              <a-col :key="index" :span="8" v-if="item.key == 'DQZT'">
                {{ item.label }}:
                <template>
                  <a-tag v-if="item.value == '未提交'" class="unSubmit">{{ item.value }}</a-tag>
                  <a-tag v-else-if="item.value == '测量完成'" class="survey-done">{{ item.value }}</a-tag>
                  <a-tag v-else-if="item.value == '预约未成功'" class="reserve-fail">{{ item.value }}</a-tag>
                  <a-tag v-else class="other">{{ item.value }}</a-tag>
                </template>
                <a-button
                  size="small"
                  type="danger"
                  ghost
                  class="optBtn"
                  v-if="item.value == '未提交'"
                  @click="handleDeleteItem(currentList.currentList)"
                >删除
                </a-button>
                <a-button
                  size="small"
                  type="default"
                  class="optBtn"
                  v-if="item.value == '未提交'"
                  @click="handelEditAgain(currentList.currentList)"
                >编辑
                </a-button>
              </a-col>
            </template>
          </template>
          <template slot="table" slot-scope="tableData">
            <busi-table :tableData="tableData.tableData"></busi-table>
          </template>
        </busi-descriptions>
      </template>
      <s-empty v-else />
    </a-skeleton>
    <a-back-top />
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { tableUtils } from '@/utils/index'
import BusiTable from './component/BusiTable'
import BusiDescriptions from '@/views/common/BusiDescriptions'
import SEmpty from '@/views/common/SEmpty'

export default {
  name: 'BusiOnProcess',
  components: { 'busi-table': BusiTable, 'busi-descriptions': BusiDescriptions, 's-empty': SEmpty },
  props: {},
  data () {
    return {
      activeKey: 0,
      onSpinning: false,
      listData: [],
      skeletonRow: 4,
      tableFid: ['JFQDLIST', 'CGQDLIST', 'FJCLQDLIST'],
      titleFid: ['SQBH', 'GCMC', 'DQZT']
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  created () {
    console.log(this.skeletonRow)
  },
  mounted () {
    this.QueryEntrust()
  },
  provide () {
    return {
      reload: this.QueryEntrust()
    }
  },
  methods: {
    tabChange (activeKey) {
      switch (activeKey) {
        case 0:
          this.QueryEntrust()
          break
        case 1:
          this.QueryEntrust(1)
          break
        case 2:
          this.QueryEntrust(2)
          break
        default:
          break
      }
    },
    // type 1代表预受理，2代表正式受理,3材料补充,4代表查看上传报告的数据（苏州）,5满意度评价
    QueryEntrust (type) {
      this.listData = []
      this.onSpinning = true
      this.$WebApi.busiProcess['QueryEntrust']({
        type: type,
        userid: this.user.userID
      })
        .then(res => {
          const arr = tableUtils.table2Desc(res)
          this.listData = arr
          this.onSpinning = false
        })
        .catch(err => {
          console.log(err)
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
        name: 'preBusiness',
        params: {
          docunid: CODE
        }
      })
    },
    handleDeleteItem (items) {
      console.log(items)
      let CODE
      items.map((item, index) => {
        if (item['key'] === 'RID') {
          CODE = item['value']
        }
      })
      this.DeleteTemporarilyByCode(CODE)
    },
    DeleteTemporarilyByCode (code) {
      this.$WebApi.busiProcess['DeleteTemporarilyByCode']({
        code: code,
        userid: this.user.userID
      })
        .then(res => {
          this.$message.success('删除成功！')
          this.QueryEntrust()
        })
        .catch(err => {
          this.$message.error('删除失败！')
          console.log(err)
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

/deep/ .ant-tabs-bar {
  margin: 0;
}
/deep/ .ant-tabs-nav-wrap {
  margin-left: 20px;
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
