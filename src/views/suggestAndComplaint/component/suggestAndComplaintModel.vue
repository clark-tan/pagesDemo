<!--
 * @Autor: junhui li
 * @Date: 2020-12-07 17:20:58
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 14:05:11
 * @Description: 建议弹窗
-->
<template>
  <div>
    <!-- 协议 -->
    <a-modal
      :visible="protocolData.visible"
      :title="protocolData.title"
      :confirm-loading="protocolData.confirmLoading"
      @ok="handleProtocolOK"
      @cancel="handleProtocolCancel"
      :footer="null"
      :maskClosable="false"
      width="600px"
    >
      <div>
        <div style="text-indent: 2em">{{ this.protocolData.content.title }}</div>
        <div style="margin: 10px 0 5px 0">
          <span style="font-size: 16px; font-weight: bold">注意事项:</span>
        </div>
        <div style="color: red"><a-icon type="exclamation-circle" /> 请认真填写信息，确保所填信息真实有效！</div>
        <div class="protocolContentData">
          <a-list size="small" :split="false" :data-source="protocolData.content.data">
            <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
              {{ item }}
            </a-list-item>
          </a-list>
        </div>
      </div>
      <div class="addClass">
        <div class="buttonClass">
          <a-button type="danger" @click="handleComplaint">我要投诉</a-button>
          <a-button type="primary" @click="handleSuggest">我要建议</a-button>
        </div>
      </div>
    </a-modal>

    <!-- 建议 -->
    <a-modal
      :visible="suggestData.visible"
      :title="suggestData.title"
      :confirm-loading="suggestData.confirmLoading"
      :closable="suggestData.closable"
      @ok="handleSuggestOK"
      @cancel="handleSuggestCancel"
      :maskClosable="false"
      width="800px"
    >
      <template slot="footer">
        <a-button type="default" @click="handleSaveSuggestData" :disabled="suggestData.confirmLoading">暂存</a-button>
        <a-button type="primary" @click="handleSuggestOK" :disabled="suggestData.confirmLoading">提交</a-button>
      </template>
      <a-form-model
        ref="suggestForm"
        :model="suggestFormData"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 17 }"
      >
        <a-form-model-item label="建议标题" prop="REC_JYBT" ref="REC_JYBT">
          <a-input placeholder="请输入建议标题" v-model="suggestFormData.REC_JYBT" />
        </a-form-model-item>
        <a-form-model-item label="建议类型" prop="REC_JYLX" ref="REC_JYLX">
          <a-select placeholder="请选择建议类型" v-model="suggestFormData.REC_JYLX" @change="JYLX_Change">
            <template v-for="(item, index) in inData.JYLX_LIST">
              <a-select-option :key="index" :value="item.value">
                {{ item.value }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="建议人姓名" prop="REC_JYRXM" ref="REC_JYRXM">
          <a-input placeholder="请输入建议人姓名" v-model="suggestFormData.REC_JYRXM" />
        </a-form-model-item>
        <a-form-model-item label="身份证号" prop="REC_SFZHM" ref="REC_SFZHM">
          <a-input placeholder="请输入身份证号" v-model="suggestFormData.REC_SFZHM" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="REC_LXDH" ref="REC_LXDH">
          <a-input placeholder="请输入联系电话" v-model="suggestFormData.REC_LXDH" />
        </a-form-model-item>
        <a-form-model-item label="电子邮箱" prop="REC_DZYX" ref="REC_DZYX">
          <a-input placeholder="请输入电子邮箱" v-model="suggestFormData.REC_DZYX" />
        </a-form-model-item>
        <a-form-model-item label="联系地址" prop="REC_LXDZ" ref="REC_LXDZ">
          <a-input placeholder="请输入联系地址" v-model="suggestFormData.REC_LXDZ" />
        </a-form-model-item>
        <a-form-model-item label="建议内容" prop="REC_JYNR" ref="REC_JYNR">
          <a-input placeholder="请输入建议内容" v-model="suggestFormData.REC_JYNR" />
        </a-form-model-item>
        <a-form-model-item label="附件上传" prop="fileurl" ref="fileurl">
          <div class="clearfix">
            <a-upload
              :action="MaterialUpload"
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              @change="handleUploadChange"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">请上传图片</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handlePicModalCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!-- 投诉 -->
    <a-modal
      ref="complaint"
      :visible="complaintData.visible"
      :title="complaintData.title"
      :confirm-loading="complaintData.confirmLoading"
      :closable="complaintData.closable"
      @ok="handleComplaintOK"
      @cancel="handleComplaintCancel"
      :maskClosable="false"
      width="800px"
    >
      <template slot="footer">
        <a-button
          type="default"
          @click="handleSaveComplaintData"
          :disabled="complaintData.confirmLoading"
        >暂存</a-button
        >
        <a-button type="primary" @click="handleComplaintOK" :disabled="complaintData.confirmLoading">提交</a-button>
      </template>
      <a-form-model
        ref="complaintForm"
        :model="complaintFormData"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 17 }"
      >
        <a-form-model-item label="投诉标题" prop="REC_TSBT" ref="REC_TSBT">
          <a-input placeholder="请输入投诉标题" v-model="complaintFormData.REC_TSBT" />
        </a-form-model-item>
        <a-form-model-item label="投诉类型" prop="REC_TSLX" ref="REC_TSLX">
          <a-select placeholder="请选择投诉类型" v-model="complaintFormData.REC_TSLX" @change="TSLX_Change">
            <template v-for="(item, index) in inData.TSLX_LIST">
              <a-select-option :key="index" :value="item.value">
                {{ item.value }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="投诉人姓名" prop="REC_TSRXM" ref="REC_TSRXM">
          <a-input placeholder="请输入投诉人姓名" v-model="complaintFormData.REC_TSRXM" />
        </a-form-model-item>
        <a-form-model-item label="身份证号" prop="REC_SFZHM" ref="REC_SFZHM">
          <a-input placeholder="请输入身份证号" v-model="complaintFormData.REC_SFZHM" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="REC_LXDH" ref="REC_LXDH">
          <a-input placeholder="请输入联系电话" v-model="complaintFormData.REC_LXDH" />
        </a-form-model-item>
        <a-form-model-item label="电子邮箱" prop="REC_DZYX" ref="REC_DZYX">
          <a-input placeholder="请输入电子邮箱" v-model="complaintFormData.REC_DZYX" />
        </a-form-model-item>
        <a-form-model-item label="联系地址" prop="REC_LXDZ" ref="REC_LXDZ">
          <a-input placeholder="请输入联系地址" v-model="complaintFormData.REC_LXDZ" />
        </a-form-model-item>
        <a-form-model-item label="投诉内容" prop="REC_TSNR" ref="REC_TSNR">
          <a-input placeholder="请输入投诉内容" v-model="complaintFormData.REC_TSNR" />
        </a-form-model-item>
        <a-form-model-item label="附件上传" prop="fileurl" ref="fileurl">
          <div class="clearfix">
            <a-upload
              :action="MaterialUpload"
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              @change="handleUploadChange"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">请上传图片</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handlePicModalCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { MaterialUpload } from '@/api/common/urlString'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  name: 'SuggestAndComplaintModel',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    '$store.state.suggestAndComplaintModel.showProtocol': function () {
      this.protocolData.visible = true
      this.getDataFromLoginInfo()
    }
  },
  mounted () {
    this.getDataFromLoginInfo()
  },
  data () {
    return {
      rules: {
        REC_JYBT: [
          {
            required: true,
            message: '请输入建议标题',
            trigger: ['change', 'blur']
          }
        ],
        REC_TSBT: [
          {
            required: true,
            message: '请输入投诉标题',
            trigger: ['change', 'blur']
          }
        ],
        REC_JYLX: [
          {
            required: true,
            message: '请选择建议类型',
            trigger: ['change']
          }
        ],
        REC_TSLX: [
          {
            required: true,
            message: '请选择投诉类型',
            trigger: ['change']
          }
        ],
        REC_JYRXM: [
          {
            required: true,
            message: '请输入建议人姓名',
            trigger: ['change', 'blur']
          }
        ],
        REC_TSRXM: [
          {
            required: true,
            message: '请输入投诉人姓名',
            trigger: ['change', 'blur']
          }
        ],
        REC_SFZHM: [
          {
            required: true,
            message: '请输入身份证号码',
            trigger: ['change', 'blur']
          }
        ],
        REC_LXDH: [
          {
            required: false,
            message: '请输入联系电话',
            trigger: ['change', 'blur']
          }
        ],
        REC_LXDZ: [
          {
            required: false,
            message: '请输入联系地址',
            trigger: ['change', 'blur']
          }
        ],
        REC_DZYX: [
          {
            required: false,
            message: '请输入电子邮箱',
            trigger: ['change', 'blur']
          }
        ],
        REC_JYNR: [
          {
            required: false,
            message: '请输入建议内容',
            trigger: ['change', 'blur']
          }
        ],
        REC_TSNR: [
          {
            required: false,
            message: '请输入投诉内容',
            trigger: ['change', 'blur']
          }
        ],
        fileurl: [
          {
            required: false,
            message: '请上传附件'
          }
        ]
      },
      inData: {
        JYLX_LIST: [
          {
            value: '网站建议'
          },
          {
            value: '部门建议'
          },
          {
            value: '我要纠错'
          }
        ],
        TSLX_LIST: [
          {
            value: '网站投诉'
          },
          {
            value: '部门投诉'
          },
          {
            value: '其他'
          }
        ]
      },
      protocolData: {
        visible: false,
        title: '关于投诉与建议说明',
        confirmLoading: false,
        content: {
          title:
            '欢迎您进入平昌县建设工程项目“多审合一”网上办事大厅提出您的投诉与建议，填写前，请仔细阅读以下注意事项。',
          data: [
            '1、接受自然人、法人或其他组织对平昌县自然资源局和规划局改进工程建设项目“多测合一”办事服务效能、服务方式及网上办事大厅建设的意见和建议。',
            '2、感谢您给我们提出的宝贵的建议。我们会进行严格保密。您的个人信息绝不会向外公开，请根据您的实际情况或内心真实想法如实填写。',
            '3、您可以在用户中心查看您提出的投诉与建议的回复情况。',
            '4、您必须对您填写信息的真实性负责，对其带来的影响承担相应的责任。'
          ]
        }
      },
      suggestData: {
        visible: false,
        title: '新增建议',
        confirmLoading: false
      },
      suggestFormData: {
        REC_JYBT: '',
        REC_JYLX: '',
        REC_JYRXM: '',
        REC_SFZHM: '',
        REC_LXDH: '',
        REC_LXDZ: '',
        REC_DZYX: '',
        REC_JYNR: '',
        fileurl: []
      },
      suggestSubmitData: {},
      MaterialUpload,
      fileList: [],
      previewVisible: false,
      complaintData: {
        visible: false,
        title: '新增投诉',
        confirmLoading: false,
        closable: true
      },
      complaintFormData: {
        REC_TSBT: '',
        REC_TSLX: '',
        REC_TSRXM: '',
        REC_SFZHM: '',
        REC_LXDH: '',
        REC_LXDZ: '',
        REC_DZYX: '',
        REC_TSNR: '',
        fileurl: []
      },
      previewImage: ''
    }
  },
  methods: {
    // 从用户信息表读取必要信息
    getDataFromLoginInfo () {
      const object = this.user
      let ZJLX
      let ZJHM
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (key === 'MAILBOX') {
            this.complaintFormData.REC_DZYX = object[key]
            this.suggestFormData.REC_DZYX = object[key]
          }
          if (key === 'MOBILEPHONE') {
            this.complaintFormData.REC_LXDH = object[key]
            this.suggestFormData.REC_LXDH = object[key]
          }
          if (key === 'DWDZ') {
            this.complaintFormData.REC_LXDZ = object[key]
            this.suggestFormData.REC_LXDZ = object[key]
          }
          if (key === 'USERNAME') {
            this.complaintFormData.REC_TSRXM = object[key]
            this.suggestFormData.REC_JYRXM = object[key]
          }
          if (key === 'ZJLX') {
            ZJLX = object[key]
            if (ZJLX === '身份证') {
              this.complaintFormData.REC_SFZHM = ZJHM
              this.suggestFormData.REC_SFZHM = ZJHM
            }
          }
          if (key === 'ZJHM') {
            ZJHM = object[key]
            if (ZJLX === '身份证') {
              this.complaintFormData.REC_SFZHM = ZJHM
              this.suggestFormData.REC_SFZHM = ZJHM
            }
          }
        }
      }
      if (ZJLX === '身份证') {
        this.complaintFormData.REC_SFZHM = ZJHM
        this.suggestFormData.REC_SFZHM = ZJHM
      }
    },
    handleProtocolOK () {
      this.protocolData.visible = false
    },
    handleProtocolCancel () {
      this.protocolData.visible = false
    },
    handleComplaint () {
      this.fileurl = []
      this.fileList = []
      this.protocolData.visible = false
      this.complaintData.visible = true
    },
    handleSuggest () {
      this.fileurl = []
      this.fileList = []
      this.protocolData.visible = false
      this.suggestData.visible = true
    },
    handleSuggestOK (e) {
      this.suggestSubmitData = {
        ...this.suggestFormData,
        userid: this.user.userID,
        docunid: this.docunid
      }
      this.$refs.suggestForm.validate((boolean, obj) => {
        if (boolean) {
          this.SubmitSuggestions()
        } else {
          this.$message.warning('请输入所有必填表单项')
        }
      })
    },
    handleSuggestCancel (e) {
      this.suggestData.visible = false
      this.clearnData()
    },
    handleSaveSuggestData () {
      this.suggestSubmitData = {
        ...this.suggestFormData,
        userid: this.user.userID,
        docunid: this.docunid
      }
      this.SaveSuggestionsDataByTemporarily()
    },
    JYLX_Change (value) {
      console.log(value)
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleUploadChange ({ fileList, file }) {
      this.fileList = fileList
      if (
        file &&
        file.status === 'done' &&
        file.response &&
        file.response.code === 0 &&
        file.response.data[0].fileUrl
      ) {
        this.fileurl.push(file.response.data[0].fileUrl)
      }
      if (file && file.status === 'removed' && file.url) {
        const url = file.url
        Window._.remove(this.fileurl, (item) => {
          return item === url
        })
      }
      if (this.suggestData.visible === true) {
        this.$set(this.suggestFormData, 'fileurl', JSON.parse(JSON.stringify(this.fileurl)))
        this.$refs.suggestForm.validateField('fileurl')
      }
      if (this.complaintData.visible === true) {
        this.$set(this.complaintFormData, 'fileurl', JSON.parse(JSON.stringify(this.fileurl)))
        this.$refs.complaintForm.validateField('fileurl')
      }
    },
    handlePicModalCancel () {
      this.previewVisible = false
    },
    handleComplaintOK (e) {
      this.complaintSubmitData = {
        ...this.complaintFormData,
        userid: this.user.userID,
        docunid: this.docunid
      }
      this.$refs.complaintForm.validate((boolean, obj) => {
        if (boolean) {
          this.SubmitComplaint()
        } else {
          this.$message.warning('请输入所有必填表单项')
        }
      })
    },
    handleComplaintCancel (e) {
      this.complaintData.visible = false
      this.clearnData()
    },
    handleSaveComplaintData () {
      this.complaintSubmitData = {
        ...this.complaintFormData,
        userid: this.user.userID,
        docunid: this.docunid
      }
      console.log(this.complaintSubmitData)
      this.SaveComplaintDataByTemporarily()
    },
    TSLX_Change (value) {
      console.log(value)
    },
    // 投诉暂存
    SaveComplaintDataByTemporarily () {
      this.complaintData.confirmLoading = true
      this.complaintData.closable = false
      this.$WebApi.suggest['SaveComplaintDataByTemporarily']({
        data: JSON.stringify(this.complaintSubmitData)
      })
        .then((data) => {
          this.emitQueryComplaint()
          this.complaintData.confirmLoading = false
          this.complaintData.visible = false
          this.complaintData.closable = true
          this.clearnData()
        })
        .catch((err) => {
          console.log(err)
          this.emitQueryComplaint()
          this.complaintData.confirmLoading = false
          this.complaintData.visible = false
          this.complaintData.closable = true
          this.clearnData()
        })
    },
    // 投诉提交
    SubmitComplaint () {
      this.complaintData.confirmLoading = true
      this.complaintData.closable = false
      this.$WebApi.suggest['SubmitComplaint']({
        data: JSON.stringify(this.complaintSubmitData)
      })
        .then((data) => {
          this.emitQueryComplaint()
          this.complaintData.confirmLoading = false
          this.complaintData.visible = false
          this.complaintData.closable = true
          this.clearnData()
        })
        .catch((err) => {
          console.log(err)
          this.emitQueryComplaint()
          this.complaintData.confirmLoading = false
          this.complaintData.visible = false
          this.complaintData.closable = true
          this.clearnData()
        })
    },
    clearnData () {
      this.complaintFormData = {
        REC_TSBT: '',
        REC_TSLX: '',
        REC_TSRXM: '',
        REC_SFZHM: '',
        REC_LXDH: '',
        REC_LXDZ: '',
        REC_DZYX: '',
        REC_TSNR: '',
        fileurl: []
      }
      this.suggestFormData = {
        REC_JYBT: '',
        REC_JYLX: '',
        REC_JYRXM: '',
        REC_SFZHM: '',
        REC_LXDH: '',
        REC_LXDZ: '',
        REC_DZYX: '',
        REC_JYNR: '',
        fileurl: []
      }
      this.fileurl = []
      this.fileList = []
      this.suggestSubmitData = {}
      this.complaintSubmitData = {}
      this.saveData = {}
    },
    // 建议暂存
    SaveSuggestionsDataByTemporarily () {
      this.suggestData.confirmLoading = true
      this.suggestData.closable = false
      this.$WebApi.suggest['SaveSuggestionsDataByTemporarily']({
        data: JSON.stringify(this.suggestSubmitData)
      })
        .then((data) => {
          this.emitQuerySuggestions()
          this.suggestData.confirmLoading = false
          this.suggestData.visible = false
          this.suggestData.closable = true
          this.clearnData()
        })
        .catch((err) => {
          console.log(err)
          this.emitQuerySuggestions()
          this.suggestData.confirmLoading = false
          this.suggestData.visible = false
          this.suggestData.closable = true
          this.clearnData()
        })
    },
    // 建议提交
    SubmitSuggestions () {
      this.suggestData.confirmLoading = true
      this.suggestData.closable = false
      this.$WebApi.suggest['SubmitSuggestions']({
        data: JSON.stringify(this.suggestSubmitData)
      })
        .then((data) => {
          this.emitQuerySuggestions()
          this.suggestData.confirmLoading = false
          this.suggestData.visible = false
          this.suggestData.closable = true
          this.clearnData()
        })
        .catch((err) => {
          console.log(err)
          this.emitQuerySuggestions()
          this.suggestData.confirmLoading = false
          this.suggestData.visible = false
          this.suggestData.closable = true
          this.clearnData()
        })
    },
    emitQueryComplaint () {
      // TODO 控制状态调用QueryComplaint
      this.$store.commit('CHANGE_QUERY_COMPLAINT')
    },
    emitQuerySuggestions () {
      // TODO 调用其他组件中的QuerySuggestions
      this.$store.commit('CHANGE_QUERY_SUGGESTIONS')
    }
  }
}
</script>

<style scoped lang="less">
.addClass {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .buttonClass {
    width: 300px;
    display: flex;
    justify-content: space-around;
  }
}

.protocolContentData {
  text-indent: 2rem;
  margin: 5px 0 10px 0;
  border: 1px solid rgba(221, 221, 221, 1);
  background: rgba(244, 244, 244, 1);
  border-radius: 4px;
}
</style>
