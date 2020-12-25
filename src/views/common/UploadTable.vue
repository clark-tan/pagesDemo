<!--
 * @Description: Table表格内部含上传逻辑，且上传成功后，内联显示
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-27 14:46:05
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 14:04:09
-->

<template>
  <div>
    <a-table
      size="small"
      :columns="columns"
      :data-source="data"
      :loading="tableLoading"
      :pagination="pagination"
      :rowKey="
        record => {
          return record['tableIndex']
        }
      "
      :expandedRowKeys="expandedRowKeys"
      @expandedRowsChange="expandedRowsChange"
    >
      <template slot="expandedRowRender" slot-scope="record">
        <template v-if="record.FJLIST && record.FJLIST.length > 0">
          <template v-for="(item, index) in record.FJLIST">
            <a-row :key="index" :style="{ marginBottom: '4px', textAlign: 'left', background: '#E6F7FF' }">
              <a-col span="18" style="left: 45px">
                <a :href="item.FJURL" target="_blank" :style="{ marginRight: '10px' }">{{ item.FJNAME || '-' }}</a>
              </a-col>
              <a-col span="6" style="text-align: right;right: 40px">
                <a-button
                  v-if="disabled == false"
                  type="link"
                  size="small"
                  @click="deleteFile(record, index)"
                >删除</a-button
                >
              </a-col>
            </a-row>
          </template>
        </template>
        <s-empty v-else />
      </template>
      <template slot="action" slot-scope="text, record">
        <!-- {{ record }} -->
        <a-upload
          :action="MaterialUpload"
          :multiple="true"
          :file-list="record.action"
          :showUploadList="false"
          @change="info => handleChange(info, record)"
        >
          <a-button size="small" type="primary" icon="upload"> </a-button>
        </a-upload>
      </template>
    </a-table>
  </div>
</template>

<script>
import { MaterialUpload } from '@/api/common/urlString'
import { tableUtils } from '@/utils/index'
import SEmpty from '@/views/common/SEmpty'
export default {
  name: 'UploadTable',
  components: { 's-empty': SEmpty },
  props: {
    tableData: {
      default: () => {},
      type: Object,
      required: true
    },
    disabled: {
      default: false,
      type: Boolean,
      required: false
    },
    pagination: {
      default: false,
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      showTemplate: true,
      data: [],
      columns: [],
      tableLoading: false,
      MaterialUpload,
      expandedRowKeys: []
    }
  },
  computed: {},
  watch: {
    tableData: {
      handler (val, oldVal) {
        if (!this._.isEmpty(val)) {
          this.tableLoading = true
          const tableData = JSON.parse(JSON.stringify(this.tableData))
          this.columns = this.getTableColumn(tableData)
          this.data = this.getTableData(tableData)
          this.handleExpandedRows()
          this.tableLoading = false
        }
      },
      immediate: true,
      deep: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    getTableColumn (obj) {
      if (!this._.isEmpty(obj)) {
        const output = tableUtils.handleColumns(obj)
        output.push({
          dataIndex: 'action',
          key: 'action',
          title: '操作',
          scopedSlots: { customRender: 'action' }
        })
        return output
      } else {
        return {}
      }
    },
    getTableData (obj) {
      let temp = []
      if (!this._.isEmpty(obj)) {
        const data = obj.rowsList
        if (data) {
          temp = data.map((item, index) => {
            return {
              ...item,
              tableIndex: index,
              action: []
            }
          })
        }
      } else {
        temp = []
      }
      return temp
    },
    handleChange (info, record) {
      let fileList = [...info.fileList]
      const file = info.file
      if (file.response && file.status === 'done') {
        if (file.response.code === 0) {
          record.FJLIST.push({
            FJNAME: file.response.data[0].fileName,
            FJURL: file.response.data[0].fileUrl
          })
          this.expandedRowKeys.push(record.tableIndex)
        } else {
          this.$message.error('文件上传失败！')
        }
      } else if (file.status === 'error') {
        this.$message.error('文件上传失败！')
      }
      fileList = fileList.map(file => {
        if (file.response && file.status === 'done') {
          if (file.response.code === 0) {
          } else {
          }
        }
        return file
      })
      record.action = fileList
    },
    deleteFile (record, index) {
      record.FJLIST.splice(index, 1)
      if (record.FJLIST && record.FJLIST.length === 0) {
        this.expandedRowKeys = []
      }
    },
    // 获取上传的文件数据 (外部调用)
    getSubmitData () {
      const data = JSON.parse(JSON.stringify(this.data))
      return data.map((items, indexs) => {
        delete items.tableIndex
        delete items.action
        return items
      })
    },
    // 该上传的文件是否已经全部上传 (外部调用) hasSFBX是否有'是否必填字段'
    isAllSubmit (hasSFBX = false) {
      let isAllSubmit = true
      if (this.data && this.data.length > 0) {
        this.data.map((item, index) => {
          if (!hasSFBX) {
            if (item.FJLIST.length <= 0) {
              isAllSubmit = false
            }
          } else {
            if (item.FJLIST.length <= 0 && item.SFBX && item.SFBX === '是') {
              isAllSubmit = false
            }
          }
        })
      } else {
        isAllSubmit = false
      }
      return isAllSubmit
    },
    // 展开表格  （外部调用）
    handleExpandedRows () {
      console.log(this.data)
      this.data.map((items, indexs) => {
        if (items.FJLIST && items.FJLIST.length > 0) {
          this.expandedRowKeys.push(items.tableIndex)
        }
      })
    },
    expandedRowsChange (expandedRows) {
      this.expandedRowKeys = expandedRows
    }
  }
}
</script>

<style scoped lang="less">
.a {
  color: rgb(178, 197, 201);
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
</style>
