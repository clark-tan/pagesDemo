<!--
 * @Description: 通知公告
 * @Version: 2.0
 * @Autor: Ethan Jiang
 * @Date: 2020-04-01 15:59:36
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-22 16:12:16
 -->
<template>
  <div class="list2pagi">
    <template v-if="showData && showData.length > 0">
      <div class="listData">
        <a-list item-layout="vertical" size="small" :pagination="false" :data-source="showData">
          <a-list-item slot="renderItem" key="item.bt" slot-scope="item">
            <template slot="actions">
              <span class="listTime">{{ item.fbsj }}</span>
            </template>
            <a-list-item-meta :description="item.zy">
              <span slot="title" class="listTitle">
                <a @click="showMore(item)">{{ item.bt }}</a>
              </span>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
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
    </template>
    <template v-else>
      <s-empty />
    </template>
  </div>
</template>

<script>
import SEmpty from '@/views/common/SEmpty'
export default {
  name: 'NoticeList',
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
      listData: [],
      showData: [],
      pagination2: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 10
      },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100']
      }
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
    this.goNoticeList()
  },
  methods: {
    // 通知事件
    goNoticeList () {
      this.$emit('update:spinning', true)
      this.$WebApi.notice['NoticeList']({
        bt: ''
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
.list2pagi {
  display: flex;
  flex-direction: column;
  height: 100%;

  /deep/ a {
    color: #5a5a5a;
  }

  .ant-spin-nested-loading {
    height: 100%;
    /deep/ .ant-spin-container {
      height: 100%;
    }
  }

  .listData {
    flex: 1;

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

    /deep/ .ant-list-item-meta-description {
      color: #5a5a5a;
      font-size: 14px;
      line-height: 22px;
    }
  }

  .pagination {
    height: 32px;
    margin-top: 10px;
    text-align: right;

    /deep/ .ant-pagination-options-size-changer.ant-select {
      margin-right: 0;
    }
  }
}
</style>
