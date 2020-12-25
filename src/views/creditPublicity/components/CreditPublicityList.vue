<!--
 * @Description: 信用公示的列表
 * @Version: 2.0
 * @Autor: Ethan Jiang
 * @Date: 2020-04-01 15:59:36
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-07 17:27:52
 -->
<template>
  <div class="creditPublicityListContainer">
    <template v-if="showData && showData.length > 0">
      <a-table
        :columns="columns"
        :data-source="showData"
        :pagination="false"
        class="table tableHeightAuto"
        :scroll="{ y: true }"
      >
        <a slot="name" slot-scope="record, row, index" :key="index" style="margin: 0" @click="showMore(row)">
          {{ record }}
        </a>
      </a-table>
      <div class="pagination">
        <a-pagination
          v-model="pagination.current"
          :total="pagination.total"
          :pageSize="pagination.pageSize"
          :pageSizeOptions="pagination.pageSizeOptions"
          show-size-changer
          show-quick-jumper
          :show-total="(total) => `共 ${total} 项`"
          @change="handleChange"
          @showSizeChange="handleSizeChange"
        />
      </div>
    </template>
    <template v-else>
      <s-empty />
    </template>
  </div>
</template>

<script>
import SEmpty from '@/views/common/SEmpty'
export default {
  name: 'CreditPublicityList',
  components: { 's-empty': SEmpty },
  props: {
    spinning: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      columns: [
        { title: '单位', dataIndex: 'name', key: 'name', scopedSlots: { customRender: 'name' } },
        { title: '分数', dataIndex: 'extra', key: 'extra', width: 250, align: 'center' }
      ],
      listData: [],
      showData: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      click: this.spinning
    }
  },
  computed: {},
  watch: {},
  created () {
    if (this.page.current) {
      this.pagination.current = this.page.current
      this.pagination.pageSize = this.page.pageSize
    }
  },
  mounted () {
    this.getCreditList()
  },
  methods: {
    // 通知事件
    getCreditList () {
      this.$emit('update:spinning', true)
      this.$WebApi.credit['getUnitCreditListLike']({})
        .then(data => {
          const temp = data.rowsList
          this.listData = temp.map((item, index) => {
            return {
              ...item,
              name: '【' + item.address + '】' + item.name,
              extra: Number(item.all_score) * 20 + '分',
              markdown: item.blackmark
            }
          })
          this.showData = JSON.parse(JSON.stringify(this.listData)).slice(
            (this.pagination.current - 1) * this.pagination.pageSize,
            this.pagination.current * this.pagination.pageSize
          )
          console.log(this.showData)
          this.$set(this.pagination, 'total', data.rowsList.length)
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.$emit('update:spinning', false)
        })
    },
    showMore (record) {
      this.$emit('showMore', {
        data: record,
        page: this.pagination.current,
        pageSize: this.pagination.pageSize
      })
    },
    handleChange (page, pageSize) {
      const data = JSON.parse(JSON.stringify(this.listData))
      this.showData = data.slice((page - 1) * pageSize, page * pageSize)
    },
    handleSizeChange (current, size) {
      this.$set(this.pagination, 'pageSize', size)
      if (this.listData.length / size + 1 >= current) {
      } else {
        this.$set(this.pagination, 'current', this.listData.length / size + 1)
      }
      const data = JSON.parse(JSON.stringify(this.listData))
      this.showData = data.slice((this.pagination.current - 1) * size, this.pagination.current * size)
    }
  }
}
</script>

<style scoped lang="less">
.creditPublicityListContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  .table {
    flex: 1;
    height: 0;
  }
  .pagination {
    margin-top: 20px;
    text-align: right;
  }
}
.listTitle {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #595959;
}
.listTime {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999999;
  line-height: 12px;
}
/deep/ .ant-pagination-options-size-changer.ant-select {
  margin-right: 0;
}
/deep/ .ant-tabs-nav .ant-tabs-tab {
  padding: 0 16px 16px;
}
/deep/ .ant-list-item-meta-description {
  color: #5a5a5a;
  font-size: 14px;
  line-height: 22px;
}
/deep/ a {
  color: #5a5a5a;
}
.ant-spin-nested-loading {
  height: 100%;
  /deep/ .ant-spin-container {
    height: 100%;
  }
}

// 自适应y轴高度
.tableHeightAuto {
  height: 100%;
  overflow: hidden;

  /deep/ .ant-spin-nested-loading,
  /deep/ .ant-spin-container,
  /deep/ .ant-table,
  /deep/ .ant-table-content,
  /deep/ .ant-table-scroll {
    height: 100%;
  }

  /deep/ .ant-table-scroll {
    display: flex;
    flex-direction: column;

    .ant-table-header {
      overflow-y: auto !important;
    }

    .ant-table-body {
      flex: 1;
      overflow-y: auto !important;
    }
  }

  /deep/ .ant-table-empty {
    .ant-table-body {
      flex: unset;
    }

    .ant-table-placeholder {
      flex: 1;
    }
  }
}
</style>
