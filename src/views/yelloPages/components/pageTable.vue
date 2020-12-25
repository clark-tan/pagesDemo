<template>
  <div>
    <!-- table -->
    <div class="table">
      <a-table
        :columns="columns"
        :dataSource="showData"
        :customRow="customRow"
        bordered
        :pagination="false"
        size="small"
        :rowKey="
          record => {
            return record['code']
          }
        "
        :scroll="{ x: tableX, y: tableY }"
      >
        <!-- :scroll="{ x: tableX, y: tableY }" -->
        <!-- <template slot="download" slot-scope="text, record">
              <template v-for="(item, index) in record.uploadlist">
                <span :key="index">
                  <a-button type="link" @click.stop="handleDwnFile(item.url)">{{ item.name }}</a-button>
                </span>
              </template>
            </template> -->
        <span slot="action">
          <a href="">操作</a>
        </span>
      </a-table>
    </div>

    <!-- 分页 -->
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
</template>

<script>
import moment from 'moment'
export default {
  name: 'PageTable',
  data () {
    return {
      form: {
        jglx: '不限',
        fwjgmc: '',
        gsd: [],
        dwzz: '不限',
        // rzsj: moment(this.getNowFormatDate(), 'YYYY-MM-DD HH:mm:ss')
        dateStart: '',
        dateEnd: ''
      },
      tableX: 1000,
      tableY: 300,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      orginColumns: [],
      columns: [
        { title: '单位名称', dataIndex: 'dwmc', key: 'dwmc' },
        { title: '单位性质', dataIndex: 'dwxz', key: 'dwxz' },
        { title: '办公详细地址', dataIndex: 'bgxxdz', key: 'bgxxdz' },
        { title: '成立日期', dataIndex: 'clrq', key: 'clrq' },
        { title: '注册地址市', dataIndex: 'zcdzs', key: 'zcdzs' },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      showData: [],
      data: [],
      customRow: (record, index) => {
        return {
          on: {
            // 事件
            click: event => {
              this.showMore(record)
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
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    formData: {
      handler (val) {
        this.form = val
        this.getSurveyInstitutionsList()
      },
      deep: true
    }
  },
  mounted () {
    this.getSurveyInstitutionsList()
    this.changeTableStyle()
    window.onresize = () => {
      this.changeTableStyle()
    }
  },
  methods: {
    moment,
    getNowFormatDate () {
      const date = new Date()
      const seperator1 = '-'
      const seperator2 = ':'
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      const currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds()
      return currentdate
    },
    changeTableStyle () {
      this.tableX = this.$el.clientWidth - 40 - 19
      this.tableY = this.$el.clientHeight - 40 - 275 - 42 - 40 - 10
    },
    formatTime (str) {
      if (!Window._.isEmpty(str)) {
        const dateee = new Date(str).toJSON()
        const date = new Date(new Date(dateee).getTime() + 8 * 3600 * 1000)
          .toISOString()
          .replace(/T/g, ' ')
          .replace(/\.[\d]{3}Z/, '')
        return date
      } else {
        return ''
      }
    },
    getSurveyInstitutionsList () {
      this.spinning = true
      this.$WebApi.chdw['SurveyInstitutionsList']({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        jgmc: this.form.fwjgmc,
        jglx: this.form.jglx === '不限' ? '' : this.form.jglx,
        dwzz: this.form.dwzz === '不限' ? '' : this.form.dwzz,
        gsd: this.form.gsd,
        dateStart: this.form.dateStart,
        dateEnd: this.form.dateEnd
        // rzsj: this.formatTime(this.form.rzsj)
      })
        .then(data => {
          this.showData = data.rowsList
          this.pagination.total = data.count
          this.spinning = false
        })
        .catch(err => {
          this.spinning = false
          console.log(err)
        })
    },
    showMore (record) {
      // this.$router.push({
      //   name: 'guideMore',
      //   params: {
      //     data: record,
      //     page: this.pagination.current,
      //     pageSize: this.pagination.pageSize
      //   }
      // })
    },
    handleDwnFile (url) {
      window.open(url, '_blank')
    },
    // 分页
    handleChange (page, pageSize) {
      // const data = JSON.parse(JSON.stringify(this.data))
      // this.showData = data.slice((page - 1) * pageSize, page * pageSize)
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      this.getSurveyInstitutionsList()
    },
    // 分页
    handleSizeChange (current, size) {
      // this.$set(this.pagination, 'pageSize', size)
      // if (this.data.length / size + 1 >= current) {
      // } else {
      //   this.$set(this.pagination, 'current', this.data.length / size + 1)
      // }
      // const data = JSON.parse(JSON.stringify(this.data))
      // this.showData = data.slice((this.pagination.current - 1) * size, this.pagination.current * size)
      this.pagination.current = current
      this.pagination.pageSize = size
      this.getSurveyInstitutionsList()
    }
  }
}
</script>

<style scoped lang="less">
.table {
  margin-top: 10px;
  flex: 1;
  overflow: auto;
}
.pagination {
  height: 32px;
  margin-top: 10px;
  text-align: right;
}
/deep/ .ant-table-small > .ant-table-content > .ant-table-scroll {
  > .ant-table-header > table > .ant-table-thead > tr > th {
    text-align: center;
  }
  > .ant-table-body > table > .ant-table-tbody > tr > td {
    text-align: center;
  }
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
/deep/ .ant-spin-container {
  height: 100%;
}
</style>
