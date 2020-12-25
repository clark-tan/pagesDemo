<!--
 * @Description: 入驻申请ApplyForSettle
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-09-08 11:51:29
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-24 17:43:15
-->
<template>
  <div ref="PreBusiness" style="height: 100%; width: 1200px; margin: auto; padding: 50px 0;">
    <a-layout class="preBusinessLayout">
      <a-layout-header class="pageHeader">
        <a-steps :current="stepData.current" size="small">
          <a-step v-for="(item, index) in stepData.steps" :key="index" :title="item.title" />
        </a-steps>
      </a-layout-header>
      <a-layout-content class="content">
        <template v-if="stepData.current === 0">
          <CommonForm ref="zgTable"></CommonForm>
        </template>
        <template v-if="stepData.current === 1">
          <a-result status="success" title="您提交成功" sub-title=""></a-result>
          <div style="text-align: center;">
            <a-row :gutter="4" type="flex" justify="center" align="middle">
              <a-col :span="4"><a-button type="primary" @click="hadleRefresh">继续申请</a-button></a-col>
              <a-col :span="4"><a-button type="primary" @click="handleQueryMore">查看申请详情</a-button></a-col>
              <a-col :span="4"><a-button type="primary" @click="backHome">返回首页</a-button></a-col>
            </a-row>
          </div>
        </template>
      </a-layout-content>
      <a-layout-footer class="footer">
        <a-button v-if="stepData.current === 0" type="primary" @click="handleSubmit">提交申请</a-button>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { lightApi } from '@/api/common/baseUrl'
import { mapGetters, mapActions } from 'vuex'
import { routeUtils } from '@/utils/index'
import { Result } from '@/components'
import CommonForm from './component/CommonForm'

export default {
  name: 'ApplyForSettle',
  components: { CommonForm, Result },
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
      saveData: {}
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
      // this.stepData.current = 1
      this.GetPersonAppointmentDetail() // 获取以前暂存的数据
    }
  },
  updated () {},
  methods: {
    ...mapActions(['setPageNum', 'setDocunid']),
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
          this.$refs.zgTable.form = { ...temp }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSubmit () {
      if (this.$refs.zgTable.isFulfillSubmit()) {
        const submitData = JSON.parse(JSON.stringify(this.$refs.zgTable.getFormData()))
        submitData['userid'] = this.user.userID
        submitData['docunid'] = this.docunid
        this.handleSubmitData(submitData)
        this.stepData.current++
      } else {
        this.$message.warning('请您检查表单是否有必填项未填！')
      }
    },
    handleSubmitData (submitData) {
      this.$WebApi.preBusiness['SubmitEntrust']({
        data: JSON.stringify(submitData)
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
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
    backHome () {
      this.$router.push('/portal/home')
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
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
  }
  // 溢出滚动表单
  .content {
    flex: 1;
    overflow: hidden;
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
