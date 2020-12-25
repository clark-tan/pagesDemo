<!--
 * @Description: 预约进场
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-03-27 10:01:31
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 17:15:51
 -->

<template>
  <a-layout class="reservationEnterLayout">
    <a-spin v-if="listData && listData.length > 0" tip="正在加载..." :spinning="onSpinning">
      <!-- TODO: table数据不规范，暂不整理 -->
      <!-- <BusiDescriptions :listData="listData" tableFid="WTSXJYYJCZT"></BusiDescriptions> -->
      <div class="busiDesc">
        <div style="color: red;font-size: large;margin-left: 20px">注：请提前3天，预约进场时间</div>
        <div v-for="(items, indexs) in listData" :key="indexs">
          <a-card title :bordered="false" size="small">
            <a-descriptions size="small" bordered>
              <a-row slot="title">
                <template v-for="(item, index) in items">
                  <a-col :key="index" :span="8" v-if="item.key == 'SQRQ'">{{ item.label }}: {{ item.value }}</a-col>
                  <a-col :key="index" :span="8" v-if="item.key == 'YWBH'">{{ item.label }}: {{ item.value }}</a-col>
                  <a-col :key="index" :span="8" v-if="item.key == 'DQZT'">
                    {{ item.label }}:
                    <template>
                      <a-tag v-if="item.value == '未提交'" class="unSubmit">{{ item.value }}</a-tag>
                      <a-tag v-else-if="item.value == '测量完成'" class="survey-done">{{ item.value }}</a-tag>
                      <a-tag v-else-if="item.value == '预约未成功'" class="reserve-fail">{{ item.value }}</a-tag>
                      <a-tag v-else class="other">{{ item.value }}</a-tag>
                    </template>
                  </a-col>
                </template>
              </a-row>
              <template v-for="(item, index) in items">
                <a-descriptions-item
                  v-if="
                    item.key != 'YWBH' &&
                      item.key != 'DQZT' &&
                      item.key != 'SQRQ' &&
                      item.key != 'RID' &&
                      item.key != 'WTSXJYYJCZT'
                  "
                  :key="index"
                  :label="item.label"
                  :span="item.span"
                >{{ item.value }}</a-descriptions-item
                >
              </template>
            </a-descriptions>
            <template v-for="(item, index) in items">
              <div :key="index" v-if="item.key == 'WTSXJYYJCZT' && item.value">
                <div class="wtsxClass">
                  {{ item.label }}
                </div>
                <ReTable
                  :allItem="items"
                  :tableData="{ columns: outerColumns, hideColumns: [], rowsList: item.value }"
                ></ReTable>
              </div>
            </template>
          </a-card>
        </div>
      </div>
    </a-spin>
    <a-spin v-else tip="正在加载..." :spinning="onSpinning">
      <a-empty />
    </a-spin>

    <a-back-top />
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import ReTable from './component/ReTable'
import BusiDescriptions from '@/views/common/BusiDescriptions'

export default {
  name: 'ReservationEnter',
  components: { ReTable, BusiDescriptions },
  props: {},
  provide: function () {
    return {
      reload: this.QueryAppointmentApproach
    }
  },
  data () {
    return {
      tableData: {},
      onSpinning: false,
      listData: [],
      data: [],
      outerColumns: [
        {
          title: '测量事项',
          dataIndex: 'CLSX',
          scopedSlots: { customRender: 'CLSX' }
        },
        {
          title: '测量机构',
          dataIndex: 'CLDW',
          scopedSlots: { customRender: 'CLDW' }
        },
        {
          title: '测绘机构联系方式',
          dataIndex: 'LXDH',
          scopedSlots: { customRender: 'LXDH' }
        },
        {
          title: '测量状态',
          dataIndex: 'CLZT',
          scopedSlots: { customRender: 'CLZT' }
        },
        {
          title: '预约进场时间',
          dataIndex: 'YYJCSJ',
          scopedSlots: { customRender: 'YYJCSJ' },
          width: '200px'
        },
        {
          title: '操作',
          dataIndex: 'ZT',
          scopedSlots: { customRender: 'ZT' },
          width: '150px'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  created () {},
  mounted () {
    this.QueryAppointmentApproach()
  },
  methods: {
    QueryAppointmentApproach () {
      this.listData = []
      this.onSpinning = true
      this.$WebApi.reservationEnter['QueryAppointmentApproach']({
        userid: this.user.userID
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
    handleBusiOnProData (response) {
      let arr = []
      var res = response[0]
      const columns = res['columns']
      const rowsList = res['rowsList']
      arr = rowsList.map(element => {
        const temp = []
        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            const { label, type } = queryOther(key)
            temp.push({
              key: key,
              value: element[key],
              span: 1.5,
              label,
              type
            })
          }
        }
        return temp
      })

      function queryOther (key) {
        let label = {}
        label = columns.map((ele, i) => {
          if (ele['key'] === key) {
            return {
              label: ele['label'],
              type: ele['type']
            }
          } else {
            return 0
          }
        })
        const arr = window._.pull(window._.uniq(label), 0)
        label = arr[0]
        return label
      }
      return arr
    }
  }
}
</script>

<style scoped lang="less">
.unSubmit {
  background-color: @diy-unSubmit-color;
  color: white
}
.survey-done {
  background-color: @diy-survey-done-color;
  color: white
}
.reserve-fail {
  background-color: @diy-reserve-fail-color;
  color: white
}
.other {
  background-color: @diy-other-color;
  color: white
}
.busiDesc {
  background: @diy-global-bg-color;
}
/deep/ .ant-card-small > .ant-card-body {
  padding: 0 20px 40px 20px;
}
/deep/ .ant-descriptions-title {
  margin: 0;
  padding: 10px;
  vertical-align: middle;
  background: @diy-description-header-bg-color;
  font-size: 14px;
  font-weight: bold;
}
/deep/ .ant-descriptions-item-label {
  width: 15%;
  text-align: center;
}
/deep/ .ant-descriptions-item-content {
  width: 35%;
}
/deep/ .ant-descriptions-bordered .ant-descriptions-item-label {
  background-color: @diy-description-content-bg-color;
}
.wtsxClass {
  text-align: center;
  font-weight: bold;
  padding: 8px;
  border: 1px solid @diy-description-border-bg-color;
  border-top: 0;
  border-bottom: 0;
}
/deep/ .ant-table-small > .ant-table-content > .ant-table-body > table {
  > .ant-table-thead > tr > th {
    text-align: center;
  }
  > .ant-table-tbody > tr > td {
    text-align: center;
  }
}
/deep/ .ant-table-small > .ant-table-content > .ant-table-body {
  margin: 0;
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
