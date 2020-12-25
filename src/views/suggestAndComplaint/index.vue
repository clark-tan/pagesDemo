<!--
 * @Description: 投诉与建议  产品版
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-07-08 09:13:41
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 15:17:32
-->
<template>
  <div class="suggest">
    <a-tabs v-model="activeKey" @change="tabChange">
      <template slot="tabBarExtraContent">
        <a-button icon="plus" type="primary" @click="showProtocol">新增投诉与建议</a-button>
        <a-input-search placeholder="请输入搜索关键词" style="width: 200px;margin-left: 20px" @search="onSearch" />
      </template>
      <a-tab-pane key="1" tab="投诉"> </a-tab-pane>
      <a-tab-pane key="2" tab="建议"> </a-tab-pane>
    </a-tabs>
    <div class="radio">
      <a-radio-group v-model="radioValue" @change="radioChange">
        <a-radio :value="1">所有状态</a-radio>
        <a-radio :value="2">未提交</a-radio>
        <a-radio :value="3">待回复</a-radio>
        <a-radio :value="4">处理中</a-radio>
        <a-radio :value="5">已回复</a-radio>
      </a-radio-group>
    </div>

    <!-- 主内容list -->
    <a-layout class="ShowOrganizations" style="background: #fff">
      <a-spin tip="正在加载..." :spinning="onSpinning" :delay="delayTime">
        <!-- TODO： MainList -->
        <main-list
          :onSpinning.sync="onSpinning"
          :radioValue="radioValue"
          :searchValue="searchValue"
          :user="user"
          @queryMore="queryMore"
          @editAgain="editAgain" />
      </a-spin>
      <a-back-top />
    </a-layout>

    <!-- 新增投诉与建议 -->
    <sac-model :user="user" />

    <!-- 详情 -->
    <a-modal
      :visible="queryMoreData.visible"
      :title="queryMoreData.title"
      :confirm-loading="queryMoreData.confirmLoading"
      @ok="handleMoreDataOK"
      @cancel="handleMoreDataCancel"
      :maskClosable="false"
      width="1000px"
    >
      <div class="queryMoreData">
        <div class="info-border">
          <div class="info-border-inner">
            <template v-if="activeKey === '1'">投诉信息</template>
            <template v-else>建议信息</template>
          </div>
        </div>
        <a-descriptions title="" bordered>
          <template v-for="(item, index) in moreData">
            <template v-if="item.key != 'RID'">
              <template
                v-if="
                  item.key != 'HFR' &&
                    item.key != 'HFSJ' &&
                    item.key != 'ZXDH' &&
                    item.key != 'HFNR' &&
                    item.key != 'FILE2'
                "
              >
                <template v-if="item.key === 'FILE1'">
                  <a-descriptions-item :key="index" label="上传文件" :span="item.span">
                    <template v-for="(file, fileIndex) in item.value">
                      <div :key="fileIndex">
                        <a :href="file" target="_blank">文件{{ fileIndex + 1 }}</a>
                      </div>
                    </template>
                  </a-descriptions-item>
                </template>

                <a-descriptions-item v-else :key="index" :label="item.label" :span="item.span">
                  {{ item.value }}
                </a-descriptions-item>
              </template>
            </template>
          </template>
        </a-descriptions>
        <div class="info-border">
          <div class="info-border-inner">回复信息</div>
        </div>
        <a-descriptions title="" bordered>
          <template v-for="(item, index) in moreData">
            <template v-if="item.key != 'RID'">
              <template
                v-if="
                  item.key === 'HFR' ||
                    item.key === 'HFSJ' ||
                    item.key === 'ZXDH' ||
                    item.key === 'HFNR' ||
                    item.key === 'FILE2'
                "
              >
                <template v-if="item.key === 'FILE2'">
                  <a-descriptions-item :key="index" label="回复文件" :span="item.span">
                    <template v-for="(file, fileIndex) in item.value">
                      <div :key="fileIndex">
                        <a :href="file" target="_blank">文件{{ fileIndex + 1 }}</a>
                      </div>
                    </template>
                  </a-descriptions-item>
                </template>

                <a-descriptions-item v-else :key="index" :label="item.label" :span="item.span">
                  {{ item.value }}
                </a-descriptions-item>
              </template>
            </template>
          </template>
        </a-descriptions>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tableUtils } from '@/utils/index'

// 组件拆分
import MainList from './component/mainList.vue'
import SuggestAndComplaintModel from './component/suggestAndComplaintModel'

export default {
  name: 'Suggest',
  components: {
    MainList,
    'sac-model': SuggestAndComplaintModel
  },
  props: {},
  data () {
    return {
      delayTime: 500,
      queryMoreData: {
        visible: false,
        title: '查看详情',
        confirmLoading: false,
        closable: true
      },
      complaintSubmitData: {},
      fileurl: [],
      searchValue: '',
      activeKey: '1',
      radioValue: 1,
      onSpinning: false,
      docunid: '',
      saveData: {}, // 暂存返回处理后的数据
      moreData: []
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  watch: {},
  methods: {
    // 建议详情
    GetSuggestionsSurveyInfo (sDocUNID, type) {
      this.fileurl = []
      this.fileList = []
      this.$WebApi.suggest['GetSuggestionsSurveyInfo']({
        sDocUNID: sDocUNID,
        userid: this.user.userID
      })
        .then(data => {
          console.log(data)
          if (type === 0) {
            const items = {}
            this.docunid = data.rowsList[0].RID
            const temp = JSON.parse(JSON.stringify(data.rowsList[0]))
            if (temp.FILE1) {
              items.fileurl = temp.FILE1
              this.fileurl = temp.FILE1
              this.fileList = temp.FILE1.map((file, index) => {
                return {
                  uid: index,
                  name: index + '.png',
                  status: 'done',
                  url: file
                }
              })
              delete temp.FILE1
            }

            delete temp.RID
            if (temp.FILE2) {
              delete temp.FILE2
            }

            for (const key in temp) {
              if (temp.hasOwnProperty(key)) {
                items['REC_' + key] = temp[key]
              }
            }
            this.saveData = items
            this.suggestFormData = this.saveData
            this.suggestData.visible = true
          } else {
            this.moreData = tableUtils.table2Desc(data, 1.5, false)[0]
            console.log(this.moreData)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 投诉详情 GetComplaintSurveyInfo
    GetComplaintSurveyInfo (sDocUNID, type) {
      this.fileurl = []
      this.fileList = []
      this.$WebApi.suggest['GetComplaintSurveyInfo']({
        sDocUNID: sDocUNID,
        userid: this.user.userID
      })
        .then(data => {
          console.log(data)
          // type 0:编辑  1：查看
          if (type === 0) {
            const items = {}
            this.docunid = data.rowsList[0].RID
            const temp = JSON.parse(JSON.stringify(data.rowsList[0]))
            if (temp.FILE1) {
              items.fileurl = temp.FILE1
              this.fileurl = temp.FILE1
              this.fileList = temp.FILE1.map((file, index) => {
                return {
                  uid: index,
                  name: index + '.png',
                  status: 'done',
                  url: file
                }
              })
              delete temp.FILE1
            }

            delete temp.RID
            if (temp.FILE2) {
              delete temp.FILE2
            }

            for (const key in temp) {
              if (temp.hasOwnProperty(key)) {
                items['REC_' + key] = temp[key]
              }
            }
            this.saveData = items
            this.complaintFormData = this.saveData
            this.complaintData.visible = true
          } else {
            this.moreData = tableUtils.table2Desc(data, 1.5, false)[0]
            console.log(this.moreData)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSearch (value) {
      this.searchValue = value
      this.$nextTick(() => {
        if (this.activeKey === '2') {
          this.emitQuerySuggestions()
        } else {
          this.emitQueryComplaint()
        }
      })
    },
    tabChange (activeKey) {
      if (activeKey === '2') {
        this.emitQuerySuggestions()
      } else {
        this.emitQueryComplaint()
      }
    },
    radioChange (e) {
      console.log(e.target.value)
      this.radioValue = e.target.value
      this.$nextTick(() => {
        if (this.activeKey === '2') {
          this.emitQuerySuggestions()
        } else {
          this.emitQueryComplaint()
        }
      })
    },
    editAgain (colValue) {
      // TODO: 接口返回的数据不正确，后续处理
      console.log(colValue)
      let sDocUNID = ''
      colValue.map((item, index) => {
        if (item.key === 'RID') {
          sDocUNID = item.value
        }
      })
      if (this.activeKey === '2') {
        this.GetSuggestionsSurveyInfo(sDocUNID, 0)
      } else {
        this.GetComplaintSurveyInfo(sDocUNID, 0)
      }
    },
    queryMore (data) {
      console.log(data)
      let sDocUNID = ''
      data.map((item, index) => {
        if (item.key === 'RID') {
          sDocUNID = item.value
        }
      })
      if (this.activeKey === '2') {
        this.GetSuggestionsSurveyInfo(sDocUNID, 1)
      } else {
        this.GetComplaintSurveyInfo(sDocUNID, 1)
      }

      this.queryMoreData.visible = true
      console.log(data)
    },

    // 更多
    handleMoreDataOK () {
      this.queryMoreData.visible = false
    },
    handleMoreDataCancel () {
      this.queryMoreData.visible = false
    },

    // 新增投诉建议
    showProtocol () {
      this.emitShowProtocol()
    },
    emitQuerySuggestions () {
      this.$store.commit('CHANGE_QUERY_SUGGESTIONS')
    },
    emitQueryComplaint () {
      this.$store.commit('CHANGE_QUERY_COMPLAINT')
    },
    emitShowProtocol () {
      this.$store.commit('CHANGE_SHOW_PROTOCOL')
    }
  }
}
</script>

<style scoped lang="less">
.suggest {
  background: @diy-global-bg-color;
  width: 100%;
  height: 100%;

  .radio {
    margin-left: 20px;
  }
}

.titleButton {
  float: right;
}

/deep/ .ant-tabs-nav-scroll {
  margin-left: 20px;
}
.queryMoreData {
  /deep/ .ant-descriptions-item-label {
    width: 15%;
    text-align: center;
    word-break: break-all;
  }
  /deep/ .ant-descriptions-item-content {
    width: 35%;
    word-break: break-all;
  }
}
.info-border {
  margin: 10px 0;
  border-left: 3px solid #4293f4;
  .info-border-inner {
    margin-left: 10px;
    font-size: 16px;
    color: black;
  }
}
</style>
