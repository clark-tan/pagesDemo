<!--
 * @Description:
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-09-04 09:34:16
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-17 14:28:21
-->

<template>
  <div class="cascader-select">
    <div class="content">
      <template v-if="reload">
        <template v-for="(item, index) in saveData">
          <div :key="index" class="my-items">
            <div class="my-item">
              <div v-if="index === 0" class="item-header">测量事项</div>
              <a-cascader
                ref="cascader"
                :allowClear="false"
                :options="options"
                :fieldNames="{
                  label: 'title',
                  value: 'title',
                  children: 'rows'
                }"
                v-model="saveData[index].clsx"
                :display-render="displayRender"
                :show-search="{ filter }"
                expand-trigger="hover"
                placeholder="请选择测量事项"
                @change="(value, selectedOptions) => clsxChange(index, value, selectedOptions)"
              />
            </div>
            <div class="my-item">
              <div v-if="index === 0" class="item-header">测绘单位</div>
              <a-select
                show-search
                placeholder="请选择测绘公司"
                v-model="saveData[index].cldw"
                option-filter-prop="children"
                style="width: 200px"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="value => compChange(index, value)"
              >
                <template v-for="(selectItem, selectIndex) in selectData">
                  <a-select-option :key="selectIndex" :value="selectItem.value">
                    {{ selectItem.value }}
                  </a-select-option>
                </template>
              </a-select>
            </div>
            <div class="my-item">
              <div v-if="index === 0" class="item-header">联系人</div>
              <a-input :value="saveData[index].LXR || '-'" disabled>
                <a-icon slot="prefix" type="user" />
              </a-input>
            </div>
            <div class="my-item">
              <div v-if="index === 0" class="item-header">联系电话</div>
              <a-input :value="saveData[index].LXDH || '-'" disabled>
                <a-icon slot="prefix" type="phone" />
              </a-input>
            </div>
            <div class="my-item">
              <div v-if="index === 0" class="item-header">操作</div>
              <a-button type="danger" @click="deleteItem(index)">删除</a-button>
            </div>
          </div>
        </template>
      </template>

      <div class="add-button">
        <a-button type="primary" @click="addRows">添加</a-button>
      </div>
    </div>
    <div class="footer">
      <div class="my-button">
        <template v-if="_.isEmpty(permission.isTemporarySave) && permission.isTemporarySave === true">
          <a-button type="primary" @click="saveCurrentData">暂存</a-button>
        </template>

        <!-- <a-button type="primary" @click="isEnableSubmit">校验</a-button> -->
        <a-button @click="handleTableData(-1)">上一步</a-button>
        <a-button type="primary" @click="handleTableData(1)">{{ isLast ? '提交申请' : '下一步' }}</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CascaderSelect',
  components: {},
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
      reload: true,
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ],
      selectData: [],
      selectedOptions: [],
      saveData: [
        {
          clsx: [],
          cldw: '',
          LXR: '',
          LXDH: ''
        }
      ],
      ischange: false
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
    this.GetMeasurementItems()
  },
  methods: {
    GetSurveyCompanyInfo (tableChdw, index) {
      this.$WebApi.busiProcess['GetSurveyCompanyInfo']({
        chdw: tableChdw
      })
        .then(res => {
          this.saveData[index].LXR = res.LXR
          this.saveData[index].LXDH = res.LXDH
        })
        .catch(err => {
          console.log(err)
        })
    },
    GetMeasurementItems () {
      this.$WebApi.preBusiness['GetMeasurementItems']()
        .then(res => {
          const clsx = res.rowsList[0].CLSX
          const cldw = res.rowsList[0].CLDW
          this.options = clsx
          this.selectData = cldw
        })
        .catch(err => {
          console.log(err)
        })
    },
    clsxChange (index, value, selectedOptions) {
      this.ischange = true
      selectedOptions[selectedOptions.length - 1].disabled = true
      this.selectedOptions[index] = selectedOptions
      // this.saveData[index].clsx = value
      // bus.$emit('CascaderSelectSaveData', { saveData: this.saveData, ischange: this.ischange })
      this.$store.commit('CHANGE_SAVE_DATA', { saveData: this.saveData, ischange: this.ischange })
      this.$store.commit('CHANGE_HANDLE_PRE_BUSNISS_STATE')
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    filter (inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    compChange (index, value) {
      // this.saveData[index].cldw = value
      this.GetSurveyCompanyInfo(value, index)
    },
    handleBlur () {},
    handleFocus () {},
    filterOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    addRows () {
      this.ischange = true
      this.saveData.push({
        clsx: [],
        cldw: '',
        LXR: '',
        LXDH: ''
      })
      // bus.$emit('CascaderSelectSaveData', { saveData: this.saveData, ischange: this.ischange })
      this.$store.commit('CHANGE_SAVE_DATA', { saveData: this.saveData, ischange: this.ischange })
      this.$store.commit('CHANGE_HANDLE_PRE_BUSNISS_STATE')
    },
    deleteItem (index) {
      this.ischange = true
      if (this.selectedOptions[index]) {
        if (this.selectedOptions[index].length > 0) {
          this.selectedOptions[index][this.selectedOptions[index].length - 1].disabled = false
        } else {
          this.selectedOptions[index]['disabled'] = false
        }
        this.selectedOptions.splice(index, 1)
      }

      const temp = JSON.parse(JSON.stringify(this.saveData))
      temp.splice(index, 1)

      this.saveData = []
      this.saveData = temp
      // bus.$emit('CascaderSelectSaveData', { saveData: this.saveData, ischange: this.ischange })
      this.$store.commit('CHANGE_SAVE_DATA', { saveData: this.saveData, ischange: this.ischange })
      this.$store.commit('CHANGE_HANDLE_PRE_BUSNISS_STATE')
      this.reload = false
      this.$nextTick(() => {
        this.reload = true
      })
    },
    handleTableData (num) {
      if (num === 1) {
        if (!Window._.isEmpty(this.remoteData)) {
          // bus.$emit('CascaderSelectSaveData', { saveData: this.saveData, ischange: this.ischange })
          this.$store.commit('CHANGE_SAVE_DATA', { saveData: this.saveData, ischange: this.ischange })
          this.$store.commit('CHANGE_HANDLE_PRE_BUSNISS_STATE')
        }

        if (this.isEnableSubmit()) {
          this.$emit('currentStepOK', {
            componentName: 'CascaderSelect',
            num: num
          })
        } else {
        }
      } else {
        this.$emit('currentStepOK', {
          componentName: 'CascaderSelect',
          num: num
        })
      }
    },
    // 判断所有表单选项是否满足提交要求
    isEnableSubmit () {
      let isEnableSubmit = true
      if (this.saveData && this.saveData.length > 0) {
        this.saveData.map((item, index) => {
          if (Window._.isEmpty(item.cldw)) {
            isEnableSubmit = false
          }
          if (item.clsx && item.clsx.length === 0) {
            isEnableSubmit = false
          }
        })
      } else {
        isEnableSubmit = false
      }
      if (isEnableSubmit) {
        // this.$message.success('测量事项填写成功')
      } else {
        this.$message.error('测量事项填写失败')
      }
      return isEnableSubmit
    },
    // 外部调用获取数据
    getSubmitData () {
      // const temp = []
      // if (this.saveData && this.saveData.length > 0) {
      //   this.saveData.map((item, index) => {
      //     temp.push(item.clsx[item.clsx.length - 1])
      //   })
      // }
      const temp = this.saveData
      return {
        REC_CLSX: temp
      }
    },
    saveCurrentData () {
      this.$emit('saveAllData')
    },
    fillData2form (args) {
      if (!Window._.isEmpty(args)) {
        this.saveData = args['REC_CLSX']
        args['REC_CLSX'].map((items, indexs) => {
          const temp = items.clsx[items.clsx.length - 1]
          this.addDisable2options(this.options, temp)
        })
      }
    },
    addDisable2options (options, temp) {
      options.map((item, index) => {
        if (item.title === temp) {
          item.disabled = true
          this.selectedOptions.push(item)
        }
        if (item.rows && item.rows.length > 0) {
          this.addDisable2options(item.rows, temp)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.cascader-select {
  padding: 0 20px 0 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
    .my-items {
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .my-item {
        display: inline-block;
        .item-header {
          text-align: center;
          margin: 10px 0 10px 0;
          font-size: larger;
          font-weight: bolder;
        }
      }
    }

    .add-button {
      margin: 10px 0 0 0px;
    }
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
