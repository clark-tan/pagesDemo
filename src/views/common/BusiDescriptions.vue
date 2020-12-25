<!--
 * @Description: description 业务组件，内部包含table等
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-12 14:48:43
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-09-22 14:35:25
-->

<template>
  <div class="busiDesc">
    <div v-for="(items, indexs) in listData" :key="indexs">
      <a-card title :bordered="false" size="small">
        <a-descriptions size="small" bordered>
          <a-row slot="title">
            <slot name="descTitle" :currentList="items"></slot>
          </a-row>
          <template v-for="(item, index) in items">
            <a-descriptions-item
              v-if="
                hideFid.indexOf(item.key) === -1 &&
                  titleFid.indexOf(item.key) === -1 &&
                  tableFid.indexOf(item.key) === -1 &&
                  item.key != 'RID'
              "
              :key="index"
              :label="item.label"
              :span="item.span"
            >{{ item.value || '-' }}
            </a-descriptions-item>
          </template>
          <slot name="hideFid"> </slot>
        </a-descriptions>

        <template v-for="(item, index) in items">
          <!-- 此处为表格字段显示，大部分情况下为WTSX -->
          <template v-if="tableFid.indexOf(item.key) !== -1 && item.key != 'JFQDLIST'">
            <div :key="index" v-if="item.value['rowsList'] && item.value['rowsList'].length > 0">
              <div class="wtsxClass">
                {{ item.label }}
              </div>
              <slot name="table" :tableData="item.value"></slot>
            </div>
          </template>
          <!-- 单独为缴费考虑兼容的写法 -->
          <template v-if="tableFid.indexOf(item.key) !== -1 && item.key === 'JFQDLIST'">
            <div
              :key="index"
              v-if="item.value['JFQD'] && item.value['JFQD']['rowsList'] && item.value['JFQD']['rowsList'].length > 0"
            >
              <div class="wtsxClass">
                {{ item.label }}
              </div>
              <div>TODO:后期在进度里也可以直接缴费</div>
              <slot name="table" :tableData="item.value['JFQD']"></slot>
            </div>
          </template>
        </template>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusiDescriptions',
  components: {},
  props: {
    listData: {
      default: () => [],
      type: Array,
      required: true
    },
    tableFid: {
      default: () => [],
      type: Array,
      required: true
    },
    titleFid: {
      default: () => ['XMBH', 'DQZT', 'WTRQ', 'RID'],
      type: Array,
      required: false
    },
    hideFid: {
      default: () => [],
      type: Array,
      required: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {
    tableData: {
      handler (newValue, oldValue) {
        if (!this._.isEmpty(newValue)) {
          console.log(newValue)
        }
      },
      deep: true
    }
  },
  created () {},
  methods: {}
}
</script>

<style scoped lang="less">
.busiDesc {
  background: @diy-global-bg-color;
}
/deep/ .ant-card-small > .ant-card-body {
  padding: 20px;
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
  word-break: break-all;
}
/deep/ .ant-descriptions-item-content {
  width: 35%;
  word-break: break-all;
}
/deep/ .ant-descriptions-bordered .ant-descriptions-item-label {
  background-color: @diy-description-content-bg-color;
}
.wtsxClass {
  text-align: center;
  font-weight: bold;
  padding: 8px;
  border: 1px solid @diy-description-content-bg-color;
  border-top: 0;
  border-bottom: 0;
}
</style>
