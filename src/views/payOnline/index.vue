<!--
 * @Description: 在线缴费
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-19 09:17:28
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-09 15:44:35
-->
<!--
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                               神兽保佑            永无BUG
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
  mounted () {},
  methods: {
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
    handleChange (page, pageSize) {
      const data = JSON.parse(JSON.stringify(this.data))
      this.showData = data.slice((page - 1) * pageSize, page * pageSize)
    },
    handleSizeChange (current, size) {
      this.$set(this.pagination, 'pageSize', size)
      this.$set(this.pagination, 'current', 1)
      const data = JSON.parse(JSON.stringify(this.data))
      this.showData = data.slice(this.pagination.current - 1, this.pagination.current + size - 1)
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
