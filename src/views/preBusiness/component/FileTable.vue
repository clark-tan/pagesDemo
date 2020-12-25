<!--
 * @Description: table组件，用于上传各种文件，例如委托书。。。
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-09-03 15:56:44
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-17 14:27:55
-->
<!--  -->
<template>
  <div class="FileTable">
    <div class="content">
      <!-- {{ tableData }} -->
      <upload-table ref="uploadTable" :tableData="tableData" :disabled="false"></upload-table>
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
  name: 'FileTable',
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
      tableData: {
        columns: [],
        hideColumns: [],
        rowsList: []
      }, // 上传表格所需数据
      submitData: []
    }
  },
  computed: {},
  watch: {
    remoteData: {
      handler (newValue, oldValue) {
        if (newValue) {
          console.log(newValue)
          // this.fillData2form(newValue)
        }
      },
      immediate: true, // 刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    },
    '$store.state.preBusniess.HandlePreBusniessState': function () {
      const Data = this.$store.state.preBusniess.SaveData
      if (Data) {
        const saveData = Data['saveData']
        const ischange = Data['ischange']
        if (saveData && saveData.length > 0) {
          const temp = []
          saveData.map((item, index) => {
            if (item.clsx && item.clsx.length > 0) {
              const clsx = item.clsx[item.clsx.length - 1]
              if (!Window._.isEmpty(clsx)) {
                temp.push(clsx)
              }
            }
          })
          this.GetProvideFileList(temp.join(';'), ischange)
        }
      }
    }
  },
  // created () {
  //   bus.$on('CascaderSelectSaveData', ({ saveData, ischange }) => {
  //     if (saveData && saveData.length > 0) {
  //       const temp = []
  //       saveData.map((item, index) => {
  //         if (item.clsx && item.clsx.length > 0) {
  //           const clsx = item.clsx[item.clsx.length - 1]
  //           if (!Window._.isEmpty(clsx)) {
  //             temp.push(clsx)
  //           }
  //         }
  //       })
  //       this.GetProvideFileList(temp.join(';'), ischange)
  //     }
  //   })
  // },
  mounted () {},
  methods: {
    // 获取需要提供附件材料列表
    GetProvideFileList (code, ischange) {
      this.$WebApi.preBusiness['GetProvideFileList']({
        sWTSX: code
      })
        .then(res => {
          if (res['rowsList'] && res['rowsList'].length > 0) {
            this.tableData = res
            if (!ischange) {
              this.$set(this.tableData, 'rowsList', this.remoteData.files)
            }
          }
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
      if (!this.$refs.uploadTable.isAllSubmit(true)) {
        isEnableSubmit = false
      }
      if (isEnableSubmit) {
        // this.$message.success('材料上传成功')
      } else {
        this.$message.error('材料上传失败')
      }
      return isEnableSubmit
    },
    // 外部调用获取数据
    getSubmitData () {
      return {
        files: this.$refs.uploadTable.getSubmitData()
      }
    },
    saveCurrentData () {
      this.$emit('saveAllData')
    },
    fillData2form (obj) {
      // if (!Window._.isEmpty(obj)) {
      //   this.$WebApi.preBusiness['GetProvideFileList']({
      //     sWTSX: ''
      //   })
      //     .then(res => {
      //       if (res['rowsList'] && res['rowsList'].length > 0) {
      //         this.tableData = res
      //         this.$set(this.tableData, 'rowsList', obj.files)
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      // }
    }
  }
}
</script>

<style scoped lang="less">
.FileTable {
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
