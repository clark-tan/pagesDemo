<!--
 * @Description: 政策法规列表
 * @Version: 2.0
 * @Autor: clark tan
 * @Date: 2020-04-01 15:59:36
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-22 15:22:09
 -->
<template>
  <div class="PoliciesAndRegulationsListContainer">
    <div class="my-card">
      <a-card title="" style="width: 100%" size="small" :bordered="false">
        <a-form-model ref="ruleForm" :model="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }" class="form">
          <a-form-model-item
            label=" "
            prop="bt"
            :colon="false"
            ref="bt"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input-search
              placeholder="请输入标题关键字"
              enter-button="查询"
              size="default"
              v-model="form.bt"
              @search="onSearch"
            />
          </a-form-model-item>
        </a-form-model>
      </a-card>
    </div>
    <a-skeleton v-if="spinning" active :loading="spinning" />
    <template v-else-if="showData && showData.length > 0">
      <a-table :columns="columns" :data-source="showData" :pagination="false" class="table">
        <a slot="name" slot-scope="record, row" style="margin: 0" @click="showMore(row)">
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
          :show-total="total => `共 ${total} 项`"
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
  name: 'PoliciesAndRegulationsList',
  components: { 's-empty': SEmpty },
  props: {
    page: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      form: {
        bt: ''
      },
      columns: [
        { title: '标题', dataIndex: 'bt', key: 'bt', ellipsis: true, scopedSlots: { customRender: 'name' } },
        { title: '发布时间', dataIndex: 'fbsj', key: 'fbsj', ellipsis: true, width: 400, align: 'center' }
      ],
      listData: [],
      showData: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      spinning: false
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
    this.goPoliciesAndRegulationsList()
  },
  methods: {
    // 通知事件
    goPoliciesAndRegulationsList () {
      this.spinning = true
      this.$WebApi.policiesAndRegulations['PoliciesAndRegulationsList']({
        bt: this.form.bt
      })
        .then(data => {
          this.listData = data.rowsList
          this.showData = JSON.parse(JSON.stringify(this.listData)).slice(
            (this.pagination.current - 1) * this.pagination.pageSize,
            this.pagination.current * this.pagination.pageSize
          )
          this.$set(this.pagination, 'total', data.rowsList.length)
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.spinning = false
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
    },
    onSearch (value) {
      this.goPoliciesAndRegulationsList()
    }
  }
}
</script>

<style scoped lang="less">
.PoliciesAndRegulationsListContainer {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .table {
    flex: 1;
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

  .pagination {
    margin-top: 20px;
    text-align: right;

    /deep/ .ant-pagination-options-size-changer.ant-select {
      margin-right: 0;
    }
  }
}
</style>
