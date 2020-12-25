<!--
 * @Description: 在线缴费
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-19 09:17:28
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-09 14:43:21
-->

<template>
  <div class="PayOnline">
    <a-skeleton active :loading="onSpinning">
      <div v-if="data && data.length > 0" class="table2pagi">
        <div class="table" style="flex: 1;">
          <a-table
            :columns="columns"
            :data-source="showData ? showData : []"
            :loading="tableLoading"
            :pagination="false"
            :customRow="customRow"
            :rowKey="
              record => {
                return record['RID']
              }
            "
          >
            <template slot="JFZT" slot-scope="text, record">
              <a-tag v-if="record.JFZT === '未缴费'" class="unStart">{{ record.JFZT }}</a-tag>
              <a-tag v-else-if="record.JFZT === '已缴费'" class="survey-done">{{ record.JFZT }}</a-tag>
            </template>
          </a-table>
        </div>
        <div class="pagination">
          <a-pagination
            v-model="pagination.current"
            :total="pagination.total"
            :pageSize="pagination.pageSize"
            :pageSizeOptions="pagination.pageSizeOptions"
            show-size-changer
            show-quick-jumper
            :show-total="total => `共 ${total} 项`"
            @change="handleChange"
            @showSizeChange="handleSizeChange"
          />
        </div>
      </div>
      <s-empty v-else />
    </a-skeleton>

    <a-modal
      ref="myModal"
      :title="modalData.title"
      :visible="modalData.visible"
      :confirm-loading="modalData.confirmLoading"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
      :destroyOnClose="true"
      :maskClosable="false"
      :footer="null"
      width="800px"
    >
      <div style="min-height: 400px">
        <a-row type="flex" justify="center">
          <a-col :span="12">
            <a-steps :current="stepsCurrent" size="small">
              <a-step v-for="(item, index) in steps" :key="index" :title="item.title" />
            </a-steps>
          </a-col>
        </a-row>

        <div style="margin: 20px">
          <template v-if="stepsCurrent === 0">
            <a-descriptions title="" bordered size="small">
              <template v-for="(item, index) in modalData.content">
                <a-descriptions-item
                  v-if="item.key != 'JFZT' && item.key != 'YSJE'"
                  :key="index"
                  :label="item.label"
                  :span="1.5"
                >
                  {{ item.value || '-' }}
                </a-descriptions-item>
              </template>
            </a-descriptions>
            <div style="margin-top: 10px">
              <template v-for="(item, index) in modalData.content">
                <span :key="index" v-if="item.key === 'JFZT'">
                  <span>缴费状态：</span>
                  <a-tag class="unStart">{{ item.value }}</a-tag>
                  <a-button size="small" type="primary" @click="handleCharge(item.value)">在线缴费</a-button>
                </span>
                <span :key="index" v-if="item.key === 'YSJE'">
                  <span style="margin-left: 20px">缴费金额：</span>
                  <a-tag class="survey-done">{{ item.value }}</a-tag>
                </span>
              </template>
            </div>
          </template>
          <template v-if="stepsCurrent === 1">
            <a-row type="flex" justify="center">
              <a-col :span="10">
                <div style="text-align: center">
                  <span style="color: rgba(0, 0, 0, 0.85);font-weight: bold;font-size: 16px;line-height: 1.5;">
                    <template>请用微信关注此公众号进行缴费</template>
                  </span>
                  <div style="margin: 20px">
                    <img :src="QRCOdeUrl" alt="二维码" width="200" height="200" />
                  </div>
                  <a-row type="flex" justify="center">
                    <a-col :span="12"><a-button type="default" @click="stepsCurrent--">返回缴费详情</a-button></a-col>
                    <a-col :span="12"><a-button type="primary" @click="handleBack">返回列表</a-button></a-col>
                  </a-row>
                </div>
              </a-col>
            </a-row>
          </template>
        </div>
      </div>
    </a-modal>

    <a-modal
      ref="servicedModal"
      :title="servicedModalData.title"
      :visible="servicedModalData.visible"
      :confirm-loading="servicedModalData.confirmLoading"
      @ok="handleServicedModalOk"
      @cancel="handleServicedModalCancel"
      :destroyOnClose="true"
      :maskClosable="false"
      :footer="null"
      width="800px"
    >
      <a-descriptions title="" bordered size="small">
        <template v-for="(item, index) in servicedModalData.content">
          <a-descriptions-item
            v-if="item.key != 'JFZT' && item.key != 'YSJE'"
            :key="index"
            :label="item.label"
            :span="1.5"
          >
            {{ item.value || '-' }}
          </a-descriptions-item>
        </template>
      </a-descriptions>
      <div style="margin-top: 20px;">
        <template v-for="(item, index) in servicedModalData.content">
          <span :key="index" v-if="item.key === 'JFZT'">
            <span>缴费状态：</span>
            <a-tag class="survey-done">{{ item.value }}</a-tag>
          </span>
          <span :key="index" v-if="item.key === 'YSJE'">
            <span style="margin-left: 20px">缴费金额：</span>
            <a-tag class="survey-done">{{ item.value }}</a-tag>
          </span>
        </template>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tableUtils } from '@/utils/index'
import SEmpty from '@/views/common/SEmpty'
export default {
  name: 'PayOnline',
  components: { 's-empty': SEmpty },
  props: {},
  data () {
    return {
      modalData: {
        title: '在线缴费',
        visible: false,
        confirmLoading: false,
        content: []
      },
      servicedModalData: {
        title: '已缴费详情',
        visible: false,
        confirmLoading: false,
        content: []
      },
      stepsCurrent: 0,
      steps: [{ title: '缴费详情' }, { title: '缴费方式' }],
      tableLoading: false,
      columns: [],
      data: [],
      showData: [],
      onSpinning: false,
      fakeData: {
        columns: [],
        hideColumns: [],
        rowsList: []
      },
      infoData: [
        {
          label: '标题',
          key: 'title',
          value: '永州市勘测事务中心收费联系单'
        },
        {
          label: '编号',
          key: 'serialNumber',
          value: '1233216545878987'
        },
        {
          label: '名称',
          key: 'name',
          value: '永州市项目'
        },
        {
          label: '单价',
          key: 'unitPrice',
          value: '	1.50'
        },
        {
          label: '数量',
          key: 'count',
          value: '2'
        },
        {
          label: '金额（元）',
          key: 'amount',
          value: '3.00'
        },
        {
          label: '二维码',
          key: 'QRCode',
          value: 'www.runoob.com/wp-content/uploads/2016/04/trolltunga.jpg'
        }
      ],
      JFData: {},
      JFColumns: [],
      JFTableData: [],
      QRCOdeUrl: '',
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      customRow: (record, index) => {
        return {
          on: {
            // 事件
            click: event => {
              // this.showMore(record)
              console.log(record)
              this.showModal(record)
            }, // 点击行
            dblclick: event => {},
            contextmenu: event => {},
            mouseenter: event => {}, // 鼠标移入行
            mouseleave: event => {}
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo', pageInfo: 'pageInfo' })
  },
  watch: {},
  created () {},
  mounted () {
    this.QRCOdeUrl = this.pageInfo.qrcode || ''
    console.log(this.pageInfo)
    this.QueryEntrust(6)
  },
  methods: {
    // type 1代表预受理，2代表正式受理,3材料补充,4代表查看上传报告的数据（苏州）,5满意度评价
    QueryEntrust (type) {
      this.fakeData = []
      this.onSpinning = true
      this.$WebApi.busiProcess['QueryEntrust']({
        type: type,
        userid: this.user.userID
      })
        .then(res => {
          console.log(res)
          this.fakeData = res
          const data = this.fakeData
          const rowsList = data.rowsList
          this.pagination.total = rowsList.length
          this.columns = tableUtils.handleColumns(data)
          this.data = rowsList
          this.showData = JSON.parse(JSON.stringify(this.data)).slice(0, this.pagination.pageSize)
          this.onSpinning = false
        })
        .catch(err => {
          console.log(err)
          this.onSpinning = false
        })
    },
    showModal (record) {
      console.log(record)
      const data = {
        columns: this.fakeData.columns,
        hideColumns: ['RID'],
        rowsList: [record]
      }
      if (record.JFZT === '已缴费') {
        this.servicedModalData.visible = true
        this.servicedModalData.content = tableUtils.table2Desc(data)[0]
      } else {
        this.modalData.visible = true
        this.modalData.content = tableUtils.table2Desc(data)[0]
      }
    },
    handleModalOk () {
      this.modalData.visible = false
    },
    handleModalCancel () {
      this.modalData.visible = false
      this.stepsCurrent = 0
    },
    handleChange (page, pageSize) {
      const data = JSON.parse(JSON.stringify(this.data))
      this.showData = data.slice((page - 1) * pageSize, page * pageSize)
    },
    handleSizeChange (current, size) {
      this.$set(this.pagination, 'pageSize', size)
      this.$set(this.pagination, 'current', 1)
      const data = JSON.parse(JSON.stringify(this.data))
      this.showData = data.slice(this.pagination.current - 1, this.pagination.current + size - 1)
    },
    handleBack () {
      // const _this = this
      // routeUtils.reloadComponent(_this)
      // TODO: 等有接口后，重新获取table数据
      this.QueryEntrust(6)
      this.handleModalOk()
      this.stepsCurrent = 0
    },
    handleCharge (chargeData) {
      console.log(chargeData)
      // this.JFData = chargeData
      // const data = chargeData.JFQD
      // this.JFColumns = tableUtils.handleColumns(data)
      // this.JFTableData = data.rowsList
      this.stepsCurrent++
    },
    handleServicedModalOk () {
      this.servicedModalData.visible = false
    },
    handleServicedModalCancel () {
      this.servicedModalData.visible = false
    }
  }
}
</script>

<style scoped lang="less">
.unStart {
  background-color: @diy-unStart-color;
  color: white;
}
.survey-done {
  background-color: @diy-survey-done-color;
  color: white;
}
.PayOnline {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: @diy-global-bg-color;
  height: 100%;
  .table2pagi {
    display: flex;
    flex-direction: column;
    height: 100%;
    .table {
      flex: 1;
    }
    .pagination {
      text-align: right;
    }
  }
}
.table {
  flex: 1;
}
/deep/ .ant-pagination-options-size-changer.ant-select {
  margin-right: 0;
}
/deep/ .ant-table > .ant-table-content > .ant-table-body > table {
  > .ant-table-thead > tr > th {
    text-align: center;
  }
  > .ant-table-tbody > tr > td {
    text-align: center;
  }
}
/deep/ .ant-table > .ant-table-content > .ant-table-body {
  margin: 0;
}
/deep/ .ant-descriptions-item-label {
  width: 15%;
  text-align: center;
}
/deep/ .ant-descriptions-item-content {
  width: 35%;
}
/deep/ .ant-modal-header {
  padding: 10px 24px;
  color: rgba(0, 0, 0, 0.65);
  background: @diy-modal-header-bg-color;
  border-bottom: 1px solid @diy-modal-border-color;
  border-radius: 4px 4px 0 0;
  .ant-modal-title {
    margin: 0;
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    word-wrap: break-word;
  }
}
/deep/ .ant-modal-close-x {
  display: block;
  width: 36px;
  height: 45px;
  font-size: 16px;
  font-style: normal;
  line-height: 45px;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
  color: white;
}
</style>
