<!--
 * @Description: 材料补充
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-03-27 10:01:31
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-09 11:07:08
 -->

<template>
  <a-layout class="smLayout">
    <div class="my-tab-head">
      <a-tabs v-model="activeKey" @change="handleTabsChange">
        <a-tab-pane key="0" tab="待补充材料"></a-tab-pane>
        <a-tab-pane key="1" tab="已补充材料"></a-tab-pane>
      </a-tabs>
    </div>

    <div class="my-spin">
      <a-spin tip="正在加载..." :spinning="onSpinning">
        <template v-if="listData && listData.length > 0">
          <div v-for="(items, indexs) in listData" :key="indexs">
            <a-card title :bordered="false" size="small">
              <!-- {{items}} -->
              <a-descriptions title size="small" bordered>
                <template v-for="(item, index) in items">
                  <a-descriptions-item
                    v-if="item.key != 'XYBCCL' && item.key != 'CODE' && item.key != 'ZLZT'"
                    :key="index"
                    :label="item.label"
                    :span="item.span"
                  >{{ item.value || '-' }}</a-descriptions-item
                  >
                  <a-descriptions-item v-if="item.key == 'ZLZT'" :key="index" :label="item.label" :span="item.span">
                    <template v-if="item.value == '已接收'">
                      <a-tag color="#87d068">已接收</a-tag>
                    </template>
                    <template v-if="item.value == '待接收'">
                      <a-tag color="#FF8800">待接收</a-tag>
                    </template>
                  </a-descriptions-item>
                </template>
                <template v-for="(item, index) in items">
                  <a-descriptions-item v-if="item.key == 'XYBCCL'" :key="index" :label="item.label" :span="3">
                    <a @click="showModal(items, indexs)">{{ fixCL(item) || '-' }}</a>
                  </a-descriptions-item>
                </template>
              </a-descriptions>
              <div class="buttonDiv">
                <a-button
                  v-if="activeKey == '0'"
                  type="primary"
                  size="small"
                  @click="showModal(items, indexs)"
                >上传材料</a-button
                >
                <template v-for="(item, index) in items">
                  <a-button
                    :key="index"
                    v-if="item['key'] == 'ZLZT' && item['value'] == '待接收' && activeKey == '1'"
                    type="primary"
                    size="small"
                    @click="handleWithdraw(items, indexs)"
                  >撤回，重新上传</a-button
                  >
                </template>
              </div>
            </a-card>
          </div>
        </template>
        <s-empty v-else />
      </a-spin>
    </div>

    <a-modal
      :title="programTitle"
      :visible="materialsBox"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      :maskClosable="false"
      width="900px"
    >
      <template slot="footer">
        <template v-if="activeKey == '0'">
          <a-button key="back" @click="handleSave" :disabled="isUploading">暂存</a-button>
          <a-button key="submit" type="primary" @click="handleOk" :disabled="isUploading">提交</a-button>
        </template>
        <template v-else>{{ null }}</template>
      </template>
      <!-- {{materialsBoxItems}} -->
      <a-descriptions title size="small" bordered>
        <template v-for="(item, index) in materialsBoxItems">
          <a-descriptions-item
            v-if="item.key != 'CODE' && item.key != 'XYBCCL'"
            :key="index"
            :label="item.label"
            :span="item.span"
          >{{ item.value }}</a-descriptions-item
          >
        </template>
      </a-descriptions>
      <div v-for="(item, index) in materialsBoxItems" :key="index">
        <template v-if="item.key == 'XYBCCL'">
          <p style="text-align: center">需要补充的材料</p>
          <SmTable
            ref="smtable"
            :tableData="tableData"
            :disabled="activeKey == '1'"
            @uploadStatusChange="handleUploadStatusChange"
          ></SmTable>
        </template>
      </div>
    </a-modal>
    <a-back-top />
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import SmTable from './component/SmTable'
import SEmpty from '@/views/common/SEmpty'

export default {
  name: 'SupplementaryMaterials',
  components: { SmTable, SEmpty },
  props: {},
  data () {
    return {
      tableData: {
        columns: [
          {
            label: '材料名称',
            key: 'CLMC',
            type: 'texgt'
          },
          {
            label: '备注说明',
            key: 'BZSM',
            type: 'texgt'
          },
          {
            label: '上传文件名',
            key: 'NAME',
            type: 'texgt'
          },
          {
            label: '上传文件地址',
            key: 'ZCURL',
            type: 'texgt'
          }
        ],
        hideColumns: ['NAME', 'ZCURL'],
        rowsList: []
      },
      isUploading: false,
      activeKey: '0',
      materialsBoxItems: {},
      onSpinning: false,
      listData: [],
      programTitle: '上传附件',
      materialsBox: false,
      confirmLoading: false,
      submitData: {}, // submit单体文件
      savedData: {} // 暂存单体文件
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(
      { user: 'userInfo' }
      // ...
    )
  },
  created () {},
  mounted () {
    this.QueryEntrust()
  },
  methods: {
    TemporaryMaterialsList () {
      this.$WebApi.supplementaryMaterials['TemporaryMaterialsList']({
        data: JSON.stringify(this.savedData)
      })
        .then(res => {
          this.QueryEntrust()
        })
        .catch(err => {
          console.log(err)
        })
    },
    SupplMaterialsList () {
      this.$WebApi.supplementaryMaterials['SupplMaterialsList']({
        data: JSON.stringify(this.submitData)
      })
        .then(res => {
          this.materialsBox = false
          this.confirmLoading = false
          this.$message.success('提交成功！！')
          this.QueryEntrust()
        })
        .catch(err => {
          console.log(err)
        })
    },
    QueryEntrust () {
      this.listData = []
      this.onSpinning = true
      this.$WebApi.supplementaryMaterials['GetSupplyMaterialList']({
        userid: this.user.userID,
        type: this.activeKey
      })
        .then(res => {
          const arr = this.handleBusiOnProData(res)
          this.listData = arr
          this.onSpinning = false
        })
        .catch(err => {
          console.log(err)
          this.onSpinning = false
        })
    },
    RevokeSupplyMaterial (code) {
      this.onSpinning = true
      this.$WebApi.supplementaryMaterials['RevokeSupplyMaterial']({
        code: code
      })
        .then(res => {
          this.QueryEntrust()
          this.onSpinning = false
        })
        .catch(err => {
          console.log(err)
          this.onSpinning = false
        })
    },
    handleBusiOnProData (res) {
      let arr = []
      const columns = res['columns']
      // const hideColumns = res['hideColumns']
      const rowsList = res['rowsList']
      // const afterCol = columns.filter(items => !hideColumns.some(item => item === items.key))
      arr = rowsList.map((items, indexs) => {
        const temp = []
        // eslint-disable-next-line no-unused-vars
        let isBCFS = false // 判断是否从 现场送过来
        console.log(columns)
        columns.map((item, index) => {
          if (item.key === 'BCFS' && items[item.key] === '现场送过来') {
            console.log('hehe')
            isBCFS = true
          }
          temp.push({
            key: item.key,
            value: items[item.key],
            label: item.label,
            type: item.type,
            span: 1.5
          })
        })
        console.log(isBCFS)
        if (!isBCFS) {
          temp.map((item, index) => {
            if (item.key === 'LXR' || item.key === 'LXDH' || item.key === 'JSDZ') {
              delete temp[index]
            }
          })
        }
        const temp2 = Window._.compact(temp)
        return temp2
      })
      return arr
    },
    showModal (data, indexs) {
      this.$set(this.tableData, 'rowsList', [])
      data.map((item, index) => {
        if (item.key === 'XYBCCL') {
          this.$set(this.tableData, 'rowsList', item.value)
        }
      })
      this.materialsBoxItems = data
      this.materialsBox = true
    },
    handleOk (e) {
      let isAll = true
      const tableData = JSON.parse(JSON.stringify(this.$refs.smtable[0].data))
      tableData.map(item => {
        delete item.showdata
        delete item.action
        delete item.index
        if (item.NAME && item.NAME.length === 0) {
          isAll = false
        }
      })
      if (isAll) {
        const _submitData = {}
        this.materialsBoxItems.map((item, index) => {
          _submitData[item['key']] = item['value']
        })
        _submitData['XYBCCL'] = tableData
        this.submitData = _submitData
        this.SupplMaterialsList()
        this.confirmLoading = true
      } else {
        this.$message.warning('请上传所有材料！')
      }
    },
    handleCancel (e) {
      this.materialsBox = false
    },
    fixCL (data) {
      const a = data.value.map((ite, ind) => {
        return ite.CLMC
      })
      return a.join(';')
    },
    handleSave () {
      const tableData = JSON.parse(JSON.stringify(this.$refs.smtable[0].data))
      tableData.map(item => {
        delete item.showdata
        delete item.action
        delete item.index
      })
      const _savedData = {}
      this.materialsBoxItems.map((item, index) => {
        if (item['key'] === 'CODE') {
          _savedData[item['key']] = item['value']
        }
        if (item['key'] === 'XYBCCL') {
          _savedData[item['key']] = tableData
        }
      })
      this.savedData = _savedData
      this.TemporaryMaterialsList()
      this.confirmLoading = true
      setTimeout(() => {
        this.materialsBox = false
        this.confirmLoading = false
        this.$message.success('暂存成功！！')
      }, 2000)
    },
    handleTabsChange (key) {
      this.QueryEntrust()
    },
    handleWithdraw (items, indexs) {
      let code
      const _this = this
      items.map((item, index) => {
        if (item['key'] === 'CODE') {
          code = item['value']
        }
      })
      this.$confirm({
        title: '请确认是否撤回已补充材料？',
        content: '若确认撤回，该补充材料任务放回到“待补充材料页面”',
        onOk () {
          _this.RevokeSupplyMaterial(code)
        },
        onCancel () {}
      })
    },
    handleUploadStatusChange (status) {
      this.isUploading = status
    }
  }
}
</script>

<style scoped lang="less">
.smLayout {
  background: @diy-global-bg-color;
  height: 100%;
  display: flex;
  flex-direction: column;
  .my-tab-head {
    height: 45px;
  }
  .my-spin {
    flex: 1;
    overflow: auto;
  }
}
.buttonDiv {
  text-align: center;

  border-bottom: 1px solid @diy-description-content-bg-color;
  border-left: 1px solid @diy-description-content-bg-color;
  border-right: 1px solid @diy-description-content-bg-color;
  button {
    margin: 10px 0;
  }
}
/deep/ .ant-descriptions-title {
  background: @diy-description-header-bg-color;
  margin: 0 0 10px;
  padding: 10px;
  border-bottom: 1px solid @diy-description-content-bg-color;
  font-size: 14px;
  vertical-align: middle;
}
/deep/ .ant-tabs-bar {
  margin: 0;
}
/deep/ .ant-tabs-nav-wrap {
  margin-left: 20px;
}
/deep/ .ant-card-small > .ant-card-body {
  padding: 20px;
}
/deep/ .ant-descriptions-bordered .ant-descriptions-item-label {
  background-color: @diy-description-content-bg-color;
}
/deep/ .ant-descriptions-item-label {
  width: 15%;
  text-align: center;
  word-break: break-all;
}
/deep/ .ant-descriptions-item-content {
  width: 35%;
  word-break: break-all;
}
/deep/ .ant-table-small > .ant-table-content > .ant-table-body > table {
  > .ant-table-thead > tr > th {
    text-align: center;
  }
  > .ant-table-tbody > tr > td {
    text-align: center;
  }
}
/deep/ .ant-table-body {
  margin: 0 !important;
  .ant-table-thead {
    background: rgba(179, 189, 199, 1);
  }
}
</style>
