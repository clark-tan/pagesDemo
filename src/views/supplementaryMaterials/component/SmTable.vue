<!--
 * @Description: Table 包含进度查询一些特殊逻辑
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-27 14:46:05
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 14:05:25
-->

<template>
  <div>
    <a-table
      size="small"
      :columns="columns"
      :data-source="data ? data : []"
      :loading="tableLoading"
      :pagination="false"
      :rowKey="
        record => {
          return record['index']
        }
      "
      :expandedRowKeys="expandedRowKeys"
      @expandedRowsChange="expandedRowsChange"
    >
      <template slot="expandedRowRender" slot-scope="record">
        <template v-if="record.showdata && record.showdata.length > 0">
          <!-- {{ record }} -->
          <template v-for="(item, index) in record.showdata">
            <a-row :key="index" :style="{ marginBottom: '4px', textAlign: 'left' }">
              <a-col span="8">
                <a :href="item.url" target="_blank" :style="{ marginRight: '10px' }">{{ item.name }}</a></a-col
                >
              <a-col span="4">
                <a-button
                  v-if="disabled == false"
                  type="danger"
                  size="small"
                  icon="delete"
                  @click="deleteFile(record, index)"
                ></a-button
                ></a-col>
            </a-row>
          </template>
        </template>
        <a-empty v-else />
      </template>
      <template slot="action" slot-scope="text, record">
        <template>
          <a-upload
            name="file"
            :multiple="true"
            :action="MaterialUpload"
            :file-list="record.action"
            :showUploadList="false"
            :disabled="disabled == true"
            @change="info => handleChange(info, record)"
          >
            <a-button size="small" type="primary" icon="upload" :disabled="disabled == true">点这里上传</a-button>
          </a-upload>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { MaterialUpload } from '@/api/common/urlString'
export default {
  name: 'SmTable',
  components: {},
  props: {
    tableData: {
      default: () => {},
      type: Object,
      required: true
    },
    disabled: {
      default: false,
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      MaterialUpload,
      expandedRowKeys: [],
      data: [],
      columns: [],
      tableLoading: false,
      isUploading: false
    }
  },
  computed: {},
  watch: {
    tableData: {
      handler (val, oldVal) {
        if (!this._.isEmpty(val)) {
          this.tableLoading = true
          this.columns = this.getTableColumn(this.tableData)
          this.data = this.getTableData(this.tableData)
          this.tableLoading = false
        }
      },
      // immediate: true,  //刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  },
  created () {},
  mounted () {
    this.columns = this.getTableColumn(this.tableData)
    this.data = this.getTableData(this.tableData)
  },
  methods: {
    getTableColumn (obj) {
      if (!this._.isEmpty(obj)) {
        const columns = obj.columns
        const hideColumns = obj.hideColumns
        const outColumns = columns.filter(items => !hideColumns.some(item => item === items.key))
        const output = outColumns.map((item, index) => {
          return {
            dataIndex: item['key'],
            key: item['key'],
            title: item['label'],
            scopedSlots: { customRender: item['key'] }
          }
        })
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
      this.expandedRowKeys = []
      if (!this._.isEmpty(obj)) {
        const data = obj.rowsList
        temp = data.map((item, index) => {
          let names = []
          let urls = []
          const showdata = []
          for (const key in item) {
            if (key === 'NAME') {
              names = item[key]
              if (item[key] && item[key].length > 0) {
                this.expandedRowKeys.push(index)
              }
            }
            if (key === 'ZCURL') {
              urls = item[key]
            }
          }
          names.map((nameItem, nameIndex) => {
            showdata.push({
              name: nameItem,
              url: urls[nameIndex]
            })
          })
          return {
            ...item,
            index: index,
            showdata: showdata,
            action: []
          }
        })
      } else {
        temp = []
      }
      return temp
    },
    handleChange (info, record) {
      let fileList = [...info.fileList]
      const file = info.file
      if (file.status && file.status === 'removed') {
      } else {
        this.isUploading = true
        this.$emit('uploadStatusChange', this.isUploading)
      }
      if (file.response && file.status === 'done') {
        if (file.response.code === 0) {
          record.showdata.push({
            name: file.response.data[0].fileName,
            url: file.response.data[0].fileUrl
          })
          record.NAME.push(file.response.data[0].fileName)
          record.ZCURL.push(file.response.data[0].fileUrl)
          this.expandedRowKeys.push(record.index)
        } else {
          this.$message.error('文件上传失败！')
        }
        this.isUploading = false
        this.$emit('uploadStatusChange', this.isUploading)
      }
      if (file.status === 'error') {
        this.$message.error('文件: ' + file.name + '上传失败！')
        this.isUploading = false
        this.$emit('uploadStatusChange', this.isUploading)
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
    expandedRowsChange (expandedRows) {
      this.expandedRowKeys = expandedRows
    },
    deleteFile (record, index) {
      record.showdata.splice(index, 1)
      record.NAME.splice(index, 1)
      record.ZCURL.splice(index, 1)
      if (record.NAME && record.NAME.length === 0) {
        this.expandedRowKeys.splice(record.index, 1, null)
      }
    }
  }
}
</script>

<style scoped lang="less">
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
/deep/ .ant-table-thead {
  background-color: @diy-table-thead-bg-color;
}
/deep/ .ant-modal-header {
  padding: 10px 24px;
  color: rgba(0, 0, 0, 0.65);
  background: @diy-modal-header-bg-color;
  border-bottom: 1px solid @diy-modal-border-color;
  border-radius: 4px 4px 0 0;
}
.clbgfj {
  /deep/ .ant-descriptions-item-label {
    width: 80%;
    text-align: center;
  }
  /deep/ .ant-descriptions-item-content {
    width: 20%;
  }
}
</style>
