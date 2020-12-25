<!--
 * @Description: table组件，用于上传各种文件，例如委托书。。。
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-09-03 15:56:44
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-17 14:28:12
-->
<!--  -->
<template>
  <div class="OtherTable">
    <div class="content">
      <p>
        {{ WTS.WTSSM || '委托书说明:' }}
        <a :href="WTS.WTSMB" download="委托书模板">下载委托书模板</a>
      </p>

      <upload-table ref="WTTable" :tableData="tableData" :disabled="false"></upload-table>
    </div>
    <div class="footer">
      <div class="my-button">
        <template v-if="_.isEmpty(permission.isTemporarySave) && permission.isTemporarySave === true">
          <a-button type="primary" @click="saveCurrentData">暂存</a-button>
        </template>
        <!-- <a-button type="primary" @click="isEnableSubmit">检验</a-button> -->
        <a-button @click="handleTableData(-1)">上一步</a-button>
        <a-button type="primary" @click="handleTableData(1)">{{ isLast ? '提交申请' : '下一步' }}</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import UploadTable from '@/views/common/UploadTable'
export default {
  name: 'OtherTable',
  components: { 'upload-table': UploadTable },
  props: {
    isLast: {
      default: false,
      type: Boolean,
      required: true
    },
    permission: {
      default: () => {},
      type: Object,
      required: true
    },
    remoteData: {
      default: () => {},
      type: Object,
      required: false
    }
  },
  data () {
    return {
      WTS: {
        WTSSM: '',
        WTSMB: ''
      }, // 委托书相关字段
      tableData: {
        columns: [],
        hideColumns: [],
        rowsList: []
      } // 上传表格所需数据
    }
  },
  computed: {},
  watch: {
    remoteData: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.fillData2form(newValue)
        }
      },
      immediate: true, // 刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  },
  created () {},
  mounted () {
    this.tableData = this.getTableData()
    this.getCLWTS() // 获取测量委托书模板
  },
  methods: {
    // 获取测量委托书表格数据，目前无api返回数据，手造
    getTableData () {
      return {
        columns: [
          {
            label: '序号',
            key: 'index',
            type: 'text'
          },
          {
            label: '材料名称',
            key: 'CLMC',
            type: 'text'
          },
          {
            label: '备注说明',
            key: 'BZSM',
            type: 'text'
          },
          {
            label: '附件',
            key: 'FJLIST',
            type: 'text'
          }
        ],
        hideColumns: ['BZSM', 'FJLIST'],
        rowsList: [
          {
            index: '1',
            CLMC: '规划核实测量委托书',
            BZSM: '',
            FJLIST: []
          },
          {
            index: '2',
            CLMC: '土地测绘委托书',
            BZSM: '',
            FJLIST: []
          },
          {
            index: '3',
            CLMC: '房产实测委托书',
            BZSM: '',
            FJLIST: []
          }
        ]
      }
    },
    // 获取测量委托书模板
    getCLWTS () {
      this.$WebApi.preBusiness['GetEntrustTempWeb']()
        .then(res => {
          this.WTS = res.rowsList[0].WTSMB
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleTableData (num) {
      if (num === 1) {
        if (this.isEnableSubmit()) {
          this.$emit('currentStepOK', {
            componentName: 'OtherTable',
            num: num
          })
        }
      } else {
        this.$emit('currentStepOK', {
          componentName: 'OtherTable',
          num: num
        })
      }
    },
    // 判断所有表单选项是否满足提交要求
    isEnableSubmit () {
      let isEnableSubmit = true
      if (!this.$refs.WTTable.isAllSubmit()) {
        isEnableSubmit = false
      }
      if (isEnableSubmit) {
        // this.$message.success('委托书填写成功')
      } else {
        this.$message.error('委托书填写失败')
      }
      return isEnableSubmit
    },
    // 外部调用获取数据
    getSubmitData () {
      return {
        // REC_CLWTS: this.$refs.WTTable.getSubmitData()
        files: this.$refs.WTTable.getSubmitData()
      }
    },
    saveCurrentData () {
      this.$emit('saveAllData')
    },
    fillData2form (obj) {
      if (!Window._.isEmpty(obj)) {
        this.$set(this.tableData, 'rowsList', obj['REC_CLWTS'])
      }
    }
  }
}
</script>

<style scoped lang="less">
.OtherTable {
  padding: 0 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
  }
  .footer {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .my-button {
      min-width: 300px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
