<!--
 * @Description: 业务预约 or 项目委托(永州改造)
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-03-30 17:49:18
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 16:27:59
 -->

<template>
  <div ref="PreBusiness" style="height: 100%">
    <a-layout class="preBusinessLayout">
      <a-layout-header class="pageHeader">
        <a-steps :current="current" size="small">
          <a-step v-for="(item, index) in processData" :key="index" :title="item.componentDesc" />
        </a-steps>
      </a-layout-header>
      <a-layout-content class="content">
        <ShowProtocol
          v-show="currentComponentName === 'ShowProtocol'"
          ref="showProtocol"
          :isLast="componentNameArray.indexOf('ShowProtocol') === componentNameArray.length - 2 ? true : false"
          :permission="permissions.ShowProtocol"
          @currentStepOK="handleCurrentStepOK"
          @saveAllData="saveAllData"
        ></ShowProtocol>
        <CommonFormFinal
          v-if="componentReFresh.commonForm"
          v-show="currentComponentName === 'CommonFormFinal'"
          ref="commonForm"
          :isLast="componentNameArray.indexOf('CommonFormFinal') === componentNameArray.length - 2 ? true : false"
          :remoteData="
            componentNameArray.indexOf('CommonFormFinal') > -1
              ? processData[componentNameArray.indexOf('CommonFormFinal')]['data']
              : {}
          "
          :permission="permissions.CommonFormFinal"
          @currentStepOK="handleCurrentStepOK"
          @saveAllData="saveAllData"
        ></CommonFormFinal>
        <FileTable
          v-show="currentComponentName === 'FileTable'"
          ref="fileTable"
          :isLast="componentNameArray.indexOf('FileTable') === componentNameArray.length - 2 ? true : false"
          :remoteData="
            componentNameArray.indexOf('FileTable') > -1
              ? processData[componentNameArray.indexOf('FileTable')]['data']
              : {}
          "
          :permission="permissions.FileTable"
          @currentStepOK="handleCurrentStepOK"
          @saveAllData="saveAllData"
        ></FileTable>
        <CascaderSelect
          v-show="currentComponentName === 'CascaderSelect'"
          ref="cascaderSelect"
          :isLast="componentNameArray.indexOf('CascaderSelect') === componentNameArray.length - 2 ? true : false"
          :remoteData="
            componentNameArray.indexOf('CascaderSelect') > -1
              ? processData[componentNameArray.indexOf('CascaderSelect')]['data']
              : {}
          "
          :permission="permissions.CascaderSelect"
          @currentStepOK="handleCurrentStepOK"
          @saveAllData="saveAllData"
        ></CascaderSelect>
        <OtherTable
          v-show="currentComponentName === 'OtherTable'"
          ref="otherTable"
          :isLast="componentNameArray.indexOf('OtherTable') === componentNameArray.length - 2 ? true : false"
          :remoteData="
            componentNameArray.indexOf('OtherTable') > -1
              ? processData[componentNameArray.indexOf('OtherTable')]['data']
              : {}
          "
          :permission="permissions.OtherTable"
          @currentStepOK="handleCurrentStepOK"
          @saveAllData="saveAllData"
        ></OtherTable>
        <Result
          v-if="currentComponentName === 'Result'"
          ref="result"
          :isLast="componentNameArray.indexOf('Result') === componentNameArray.length - 2 ? true : false"
          :isSubmitSuccess="isSubmitSuccess"
          :permission="permissions.Result"
          @currentStepOK="handleCurrentStepOK"
          @submitAllData="submitAllData"
        ></Result>
        <!-- <template v-if="stepData.current === 0">
          <CommonForm ref="commonForm"></CommonForm>
        </template> -->
        <!-- <template v-if="stepData.current === 1">
          <a-result status="success" title="您提交成功" sub-title=""></a-result>
          <div style="text-align: center;">
            <a-row :gutter="4" type="flex" justify="center" align="middle">
              <a-col :span="4"><a-button type="primary" @click="hadleRefresh">继续申请</a-button></a-col>
              <a-col :span="4"><a-button type="primary" @click="handleQueryMore">查看申请详情</a-button></a-col>
            </a-row>
          </div>
        </template> -->
      </a-layout-content>
      <!-- <a-layout-footer class="footer">
        <a-button v-if="stepData.current === 0" type="primary" @click="handleSubmit">提交申请</a-button>
      </a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
import { lightApi } from '@/api/common/baseUrl'
import { mapGetters, mapActions } from 'vuex'
import { routeUtils } from '@/utils/index'
// import { Result } from '@/components'
import ShowProtocol from './component/ShowProtocol'
import CommonFormFinal from './component/CommonFormFinal'
import FileTable from './component/FileTable'
import CascaderSelect from './component/CascaderSelect'
import OtherTable from './component/OtherTable'
import Result from './component/Result'

export default {
  name: 'PreBusiness',
  components: { CommonFormFinal, CascaderSelect, FileTable, ShowProtocol, OtherTable, Result },
  inject: ['reloadRoot'],
  props: {},
  data () {
    return {
      lightApi,
      pageHeight: 0,
      stepData: {
        current: 0,
        steps: [{ title: '申请表单' }, { title: '结果' }]
      },
      docunid: '',
      saveData: {},
      current: 0,
      permissions: {
        ShowProtocol: {},
        CommonFormFinal: {},
        CascaderSelect: {},
        FileTable: {},
        OtherTable: {},
        Result: {}
      },
      componentReFresh: {
        commonForm: true
      },
      currentComponentName: '',
      currentComponentDesc: '',
      processData: [
        {
          componentDesc: '预约协议',
          componentName: 'ShowProtocol',
          data: {}
        },
        {
          componentDesc: '预约基础表',
          componentName: 'CommonFormFinal',
          permission: {
            REC_GCMC: {
              isShow: true,
              isCheck: true
            },
            REC_GCBH: {
              isShow: true,
              isCheck: true
            },
            REC_JSXZ: {
              isShow: true,
              isCheck: true
            },
            REC_TDLY: {
              isShow: true,
              isCheck: true
            },
            REC_XZQ: {
              isShow: true,
              isCheck: true
            },
            REC_GCXXDD: {
              isShow: true,
              isCheck: true
            },
            REC_WTDW: {
              isShow: true,
              isCheck: true
            },
            REC_LXR: {
              isShow: true,
              isCheck: true
            },
            REC_LXDH: {
              isShow: true,
              isCheck: true
            },
            REC_DZYX: {
              isShow: true,
              isCheck: true
            },
            REC_QJFS: {
              isShow: true,
              isCheck: true
            },
            REC_SJDZ: {
              isShow: true,
              isCheck: true
            },
            REC_SJR: {
              isShow: true,
              isCheck: true
            },
            REC_SJDH: {
              isShow: true,
              isCheck: true
            }
          },
          data: {}
        },
        {
          componentDesc: '测量事项',
          componentName: 'CascaderSelect',
          data: {}
        },
        {
          componentDesc: '材料上传',
          componentName: 'FileTable',
          data: {}
        },
        {
          componentDesc: '委托书',
          componentName: 'OtherTable',
          data: {}
        },
        {
          componentDesc: '预约提交',
          componentName: 'Result',
          data: {}
        }
      ],
      componentNameArray: [],
      isSubmitSuccess: true,
      isSaveSuccess: true
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  watch: {},
  created () {
    this.pageHeight = window.innerHeight
  },
  mounted () {
    this.docunid = this.$route.params.docunid
    if (!this._.isEmpty(this.user) && !this._.isEmpty(this.docunid)) {
      // this.GetPersonAppointmentDetail() // 获取以前暂存的数据
      this.GetDataByTemporarilyToCode()
    } else {
      this.GetComponentConfig()
    }
  },
  updated () {},
  methods: {
    ...mapActions(['setPageNum', 'setDocunid']),
    GetComponentConfig () {
      this.$WebApi.preBusiness['GetComponentConfig']()
        .then(res => {
          console.log(res)
          if (res && res.length > 0) {
            this.currentComponentName = res[0].componentName
            this.currentComponentDesc = res[0].componentDesc
            this.processData = res
            this.getComponentName(res) // 函数执行顺序不能变化
            // this.handleProcessData(JSON.parse(JSON.stringify(res)))
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 数组数据改变后  强制重新加载component
    handleProcessData (ProcessData) {
      if (ProcessData && ProcessData.length > 0) {
        ProcessData.map((item, index) => {
          if (item.permission && !Window._.isEmpty(item.permission)) {
            if (this.componentNameArray.indexOf(item.componentName) > -1) {
              this.permissions[item.componentName] = item.permission
              this.componentReFresh[item.componentName] = false
              this.$nextTick(() => {
                this.componentReFresh[item.componentName] = true
              })
            }
          }
        })
      }
    },
    GetDataByTemporarilyToCode () {
      this.$WebApi.preBusiness['GetDataByTemporarilyToCode']({
        code: this.docunid,
        userid: this.user.userID
      })
        .then(res => {
          console.log(res)
          this.currentComponentName = res[0].componentName
          this.currentComponentDesc = res[0].componentDesc
          this.processData = res.slice(0, res.length - 1)
          console.log(res.slice(0, res.length - 1))
          this.getComponentName(res.slice(0, res.length - 1)) // 函数执行顺序不能变化
        })
        .catch(err => {
          console.log(err)
        })
    },
    GetPersonAppointmentDetail (submitData) {
      this.$WebApi.busiProcess['GetPersonAppointmentDetail']({
        sRID: this.docunid
      })
        .then(res => {
          console.log(res)
          const temp = {}
          this.saveData = res.rowsList[0]
          temp.REC_DZYX = this.saveData.DZYX
          temp.REC_GCMC = this.saveData.GCMC
          temp.REC_GCXXDD = this.saveData.GCXXDD
          temp.REC_GCBH = this.saveData.GGZH
          temp.REC_WTDW = this.saveData.JSDW
          temp.REC_JSXZ = this.saveData.JSXZ
          temp.REC_LXDH = this.saveData.LXDH
          temp.REC_LXR = this.saveData.LXR
          temp.REC_QJFS = this.saveData.QJFS
          temp.REC_TDLY = this.saveData.TDLY
          temp.REC_XZQ = this.saveData.XZQ
          this.$refs.commonForm.form = { ...temp }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getComponentName (array) {
      const temp = []
      if (array && array.length > 0) {
        array.map((item, index) => {
          if (!Window._.isEmpty(item.componentName)) {
            temp.push(item.componentName)
          }
        })
      }
      this.componentNameArray = temp
      this.handleProcessData(JSON.parse(JSON.stringify(array)))
    },
    handleSubmit () {
      let submitData = []
      if (this.componentNameArray.indexOf('CommonFormFinal') > -1 && this.$refs.commonForm.isEnableSubmit()) {
        const componentName = 'CommonFormFinal'
        this.processData[this.componentNameArray.indexOf(componentName)].data = this.$refs.commonForm.getSubmitData()
      }
      if (this.componentNameArray.indexOf('CascaderSelect') > -1 && this.$refs.cascaderSelect.isEnableSubmit()) {
        const componentName = 'CascaderSelect'
        // eslint-disable-next-line standard/computed-property-even-spacing
        this.processData[
          this.componentNameArray.indexOf(componentName)
        ].data = this.$refs.cascaderSelect.getSubmitData()
      }
      if (this.componentNameArray.indexOf('FileTable') > -1 && this.$refs.fileTable.isEnableSubmit()) {
        const componentName = 'FileTable'
        this.processData[this.componentNameArray.indexOf(componentName)].data = this.$refs.fileTable.getSubmitData()
      }

      if (this.componentNameArray.indexOf('OtherTable') > -1 && this.$refs.otherTable.isEnableSubmit()) {
        const componentName = 'OtherTable'
        this.processData[this.componentNameArray.indexOf(componentName)].data = this.$refs.otherTable.getSubmitData()
      }
      submitData = JSON.parse(JSON.stringify(this.processData))
      submitData.push({
        userid: this.user.userID,
        docunid: this.docunid
      })
      console.log(submitData)
      this.handleSubmitData(submitData)
    },
    handleSave () {
      let saveData = []
      if (this.componentNameArray.indexOf('CommonFormFinal') > -1) {
        const componentName = 'CommonFormFinal'
        this.processData[this.componentNameArray.indexOf(componentName)].data = this.$refs.commonForm.getSubmitData()
      }
      if (this.componentNameArray.indexOf('CascaderSelect') > -1) {
        const componentName = 'CascaderSelect'
        // eslint-disable-next-line standard/computed-property-even-spacing
        this.processData[
          this.componentNameArray.indexOf(componentName)
        ].data = this.$refs.cascaderSelect.getSubmitData()
      }
      if (this.componentNameArray.indexOf('FileTable') > -1) {
        const componentName = 'FileTable'
        this.processData[this.componentNameArray.indexOf(componentName)].data = this.$refs.fileTable.getSubmitData()
      }

      if (this.componentNameArray.indexOf('OtherTable') > -1) {
        const componentName = 'OtherTable'
        this.processData[this.componentNameArray.indexOf(componentName)].data = this.$refs.otherTable.getSubmitData()
      }
      saveData = JSON.parse(JSON.stringify(this.processData))
      saveData.push({
        userid: this.user.userID,
        docunid: this.docunid
      })
      console.log(saveData)
      this.handleSaveData(saveData)
    },
    handleSaveData (saveData) {
      // this.$WebApi.preBusiness['SaveDataByTemporarily']({
      //   data: JSON.stringify(saveData)
      // })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    handleSubmitData (submitData) {
      this.$WebApi.preBusiness['SubmitEntrust']({
        data: JSON.stringify(submitData)
      })
        .then(res => {
          console.log(res)
          this.isSubmitSuccess = true
        })
        .catch(err => {
          console.log(err)
          this.isSubmitSuccess = false
        })
    },
    handleQueryMore () {
      // this.$router.push('/portal/businessProcess')
      this.$router.push({
        name: 'businessProcess',
        params: {
          hasRefresh: true
        }
      })
    },
    hadleRefresh () {
      const _this = this
      routeUtils.reloadComponent(_this)
    },
    handleCurrentStepOK (obj) {
      console.log(obj)
      let stepNum = this.current
      if (obj.num === 1) {
        this.current = ++stepNum
      } else if (obj.num === -1) {
        this.current = --stepNum
      }
      if (this.processData[stepNum]) {
        this.currentComponentName = this.processData[stepNum].componentName
        this.currentComponentDesc = this.processData[stepNum].componentDesc
      }
    },
    submitAllData () {
      this.handleSubmit()
    },
    saveAllData () {
      this.handleSave()
    }
  }
}
</script>

<style scoped lang="less">
.preBusinessLayout {
  height: 100%;
  background-color: @diy-global-bg-color;
  display: flex;
  flex-direction: column;
  width: 100%;
  // 头部步骤
  .pageHeader {
    background-color: @diy-global-bg-color;
    align-self: center;
    width: 90%;
    height: 50px;
    display: flex;
    align-items: center;
  }
  // 溢出滚动表单
  .content {
    flex: 1;
    overflow: auto;
    .form {
      margin: 0 2px;
    }
    .uploadList {
      margin-bottom: 2px;
      a + button {
        margin-left: 5px;
      }
    }
  }
  // 底部固定按钮
  .footer {
    height: 50px;
    background: @diy-global-bg-color;
    align-self: center;
    .stepsAction {
      button + button {
        margin-left: 8px;
      }
    }
  }
}
</style>
